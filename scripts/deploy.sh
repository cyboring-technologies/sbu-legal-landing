#!/bin/bash
###############################################################################
# deploy.sh - Corporate Website Deployment
# Deploys the Next.js corporate/marketing site to Azure Static Web Apps (SWA)
# or Azure Container Apps (ACA)
# Supports multiple environments: dev, staging, production
###############################################################################

set -e  # Exit on error
set -o pipefail  # Exit on pipe failure

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Default values
ENVIRONMENT="${1:-dev}"
DEPLOYMENT_TYPE="${2:-swa}"  # swa (Static Web Apps) is default for corporate site

echo -e "${GREEN}=== Corporate Website Deployment Script ===${NC}"
echo "Environment: $ENVIRONMENT"
echo "Deployment Type: $DEPLOYMENT_TYPE"
echo "Timestamp: $(date)"

# Change to project root
cd "$PROJECT_ROOT"

# Validate Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}Error: Azure CLI is not installed!${NC}"
    echo "Install from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check Azure login status
echo -e "${BLUE}Checking Azure authentication...${NC}"
if ! az account show &> /dev/null; then
    echo -e "${YELLOW}Not logged in to Azure. Running az login...${NC}"
    az login
fi

# Get current subscription
SUBSCRIPTION=$(az account show --query name -o tsv)
echo -e "${GREEN}Using Azure subscription: $SUBSCRIPTION${NC}"

# Load environment-specific variables
if [ -f ".env.$ENVIRONMENT" ]; then
    echo -e "${GREEN}Loading .env.$ENVIRONMENT${NC}"
    set -a
    source ".env.$ENVIRONMENT"
    set +a
elif [ -f ".env.local" ]; then
    echo -e "${YELLOW}Using .env.local (environment-specific config not found)${NC}"
    set -a
    source .env.local
    set +a
else
    echo -e "${RED}Error: No environment configuration found!${NC}"
    exit 1
fi

# Validate required environment variables
REQUIRED_VARS=("AZURE_RESOURCE_GROUP" "AZURE_LOCATION")
for VAR in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo -e "${RED}Error: $VAR is not set!${NC}"
        exit 1
    fi
done

# Build before deployment
echo -e "${BLUE}Building corporate website...${NC}"
if [ -f "$SCRIPT_DIR/build.sh" ]; then
    bash "$SCRIPT_DIR/build.sh"
else
    npm run build
fi

# Generate sitemap before deployment
echo -e "${BLUE}Generating sitemap...${NC}"
if [ -f "$SCRIPT_DIR/generate-sitemap.js" ]; then
    node "$SCRIPT_DIR/generate-sitemap.js" || echo -e "${YELLOW}Sitemap generation skipped${NC}"
fi

# Deploy based on type
if [ "$DEPLOYMENT_TYPE" == "swa" ]; then
    echo -e "${BLUE}=== Deploying to Azure Static Web Apps ===${NC}"

    SWA_NAME="${AZURE_STATIC_WEB_APP_NAME:-corporate-web-$ENVIRONMENT}"

    echo "Static Web App Name: $SWA_NAME"

    # Install SWA CLI if not present
    if ! command -v swa &> /dev/null; then
        echo -e "${YELLOW}Installing Azure Static Web Apps CLI...${NC}"
        npm install -g @azure/static-web-apps-cli
    fi

    # Check if SWA resource exists
    if az staticwebapp show --name "$SWA_NAME" --resource-group "$AZURE_RESOURCE_GROUP" &> /dev/null; then
        echo -e "${GREEN}Static Web App exists${NC}"
    else
        echo -e "${BLUE}Creating new Static Web App...${NC}"
        az staticwebapp create \
            --name "$SWA_NAME" \
            --resource-group "$AZURE_RESOURCE_GROUP" \
            --location "$AZURE_LOCATION" \
            --sku Free \
            --source "https://github.com/${GITHUB_REPOSITORY:-jai-alb/frontend}" \
            --branch "${GITHUB_REF_NAME:-main}" \
            --app-location "corporate-web" \
            --output-location ".next"
    fi

    # Deploy using SWA CLI
    echo -e "${BLUE}Deploying to Static Web Apps...${NC}"
    if [ -n "$AZURE_STATIC_WEB_APPS_API_TOKEN" ]; then
        swa deploy \
            --app-location "./" \
            --output-location ".next" \
            --deployment-token "$AZURE_STATIC_WEB_APPS_API_TOKEN"
    else
        echo -e "${YELLOW}Warning: AZURE_STATIC_WEB_APPS_API_TOKEN not set${NC}"
        echo "Get token from Azure Portal: Static Web App > Manage deployment token"
        exit 1
    fi

    # Get app URL
    APP_URL=$(az staticwebapp show \
        --name "$SWA_NAME" \
        --resource-group "$AZURE_RESOURCE_GROUP" \
        --query defaultHostname -o tsv)

    echo -e "${GREEN}✓ Deployment successful!${NC}"
    echo -e "${GREEN}Corporate Website URL: https://$APP_URL${NC}"

elif [ "$DEPLOYMENT_TYPE" == "aca" ]; then
    echo -e "${BLUE}=== Deploying to Azure Container Apps ===${NC}"

    # Set deployment-specific variables
    APP_NAME="${AZURE_CONTAINER_APP_NAME:-corporate-web-$ENVIRONMENT}"
    CONTAINER_ENV="${AZURE_CONTAINER_ENV:-corporate-env-$ENVIRONMENT}"
    ACR_NAME="${AZURE_CONTAINER_REGISTRY}"
    IMAGE_NAME="${ACR_NAME}.azurecr.io/${APP_NAME}:${GITHUB_SHA:-latest}"

    echo "App Name: $APP_NAME"
    echo "Container Environment: $CONTAINER_ENV"
    echo "Image: $IMAGE_NAME"

    # Build Docker image
    echo -e "${BLUE}Building Docker image...${NC}"
    docker build -t "$IMAGE_NAME" .

    # Login to ACR
    echo -e "${BLUE}Logging in to Azure Container Registry...${NC}"
    az acr login --name "$ACR_NAME"

    # Push image
    echo -e "${BLUE}Pushing image to ACR...${NC}"
    docker push "$IMAGE_NAME"

    # Check if container app exists
    if az containerapp show --name "$APP_NAME" --resource-group "$AZURE_RESOURCE_GROUP" &> /dev/null; then
        echo -e "${BLUE}Updating existing container app...${NC}"
        az containerapp update \
            --name "$APP_NAME" \
            --resource-group "$AZURE_RESOURCE_GROUP" \
            --image "$IMAGE_NAME"
    else
        echo -e "${BLUE}Creating new container app...${NC}"

        # Load autoscaling parameters
        if [ -f "$SCRIPT_DIR/autoscaling-params.json" ]; then
            MIN_REPLICAS=$(jq -r '.minReplicas' "$SCRIPT_DIR/autoscaling-params.json")
            MAX_REPLICAS=$(jq -r '.maxReplicas' "$SCRIPT_DIR/autoscaling-params.json")
        else
            MIN_REPLICAS=1
            MAX_REPLICAS=5
        fi

        az containerapp create \
            --name "$APP_NAME" \
            --resource-group "$AZURE_RESOURCE_GROUP" \
            --environment "$CONTAINER_ENV" \
            --image "$IMAGE_NAME" \
            --target-port 3000 \
            --ingress external \
            --min-replicas "$MIN_REPLICAS" \
            --max-replicas "$MAX_REPLICAS" \
            --cpu 0.25 \
            --memory 0.5Gi
    fi

    # Get app URL
    APP_URL=$(az containerapp show \
        --name "$APP_NAME" \
        --resource-group "$AZURE_RESOURCE_GROUP" \
        --query properties.configuration.ingress.fqdn -o tsv)

    echo -e "${GREEN}✓ Deployment successful!${NC}"
    echo -e "${GREEN}Corporate Website URL: https://$APP_URL${NC}"

else
    echo -e "${RED}Error: Unknown deployment type: $DEPLOYMENT_TYPE${NC}"
    echo "Supported types: swa (Static Web Apps), aca (Container Apps)"
    exit 1
fi

echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo "Timestamp: $(date)"
