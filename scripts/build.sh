#!/bin/bash
###############################################################################
# build.sh - Corporate Website Build Script
# Builds the Next.js corporate/marketing site with validation
###############################################################################

set -e  # Exit on error
set -o pipefail  # Exit on pipe failure

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${GREEN}=== Corporate Website Build Script ===${NC}"
echo "Project Root: $PROJECT_ROOT"
echo "Node Version: $(node --version)"
echo "NPM Version: $(npm --version)"

# Change to project root
cd "$PROJECT_ROOT"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found!${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Warning: node_modules not found. Running npm install...${NC}"
    npm install
fi

# Validate environment variables (optional but recommended)
if [ -f ".env.local" ]; then
    echo -e "${GREEN}Found .env.local file${NC}"
    set -a
    source .env.local
    set +a
else
    echo -e "${YELLOW}Warning: .env.local not found. Using defaults.${NC}"
fi

# Clean previous build
echo -e "${GREEN}Cleaning previous build...${NC}"
rm -rf .next
rm -rf out

# Run linting
echo -e "${GREEN}Running linter...${NC}"
if npm run lint; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠ Linting found issues (continuing build)${NC}"
fi

# Run format check
echo -e "${GREEN}Checking code formatting...${NC}"
if npm run format:check; then
    echo -e "${GREEN}✓ Format check passed${NC}"
else
    echo -e "${YELLOW}⚠ Format issues found (continuing build)${NC}"
fi

# Run build
echo -e "${GREEN}Building Next.js corporate website...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Check if build output exists
if [ -d ".next" ]; then
    echo -e "${GREEN}✓ Build artifacts created in .next/${NC}"

    # Show build size
    if command -v du &> /dev/null; then
        BUILD_SIZE=$(du -sh .next | cut -f1)
        echo "Build size: $BUILD_SIZE"
    fi
else
    echo -e "${RED}✗ Build artifacts not found${NC}"
    exit 1
fi

# Generate sitemap (if script exists)
if [ -f "scripts/generate-sitemap.js" ]; then
    echo -e "${GREEN}Generating sitemap...${NC}"
    node scripts/generate-sitemap.js || echo -e "${YELLOW}Sitemap generation skipped${NC}"
fi

echo -e "${GREEN}=== Build Complete ===${NC}"
echo "Build timestamp: $(date)"
