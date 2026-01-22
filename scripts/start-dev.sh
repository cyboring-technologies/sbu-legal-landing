#!/bin/bash
###############################################################################
# start-dev.sh - Corporate Website Development Server
# Starts the Next.js development server for the corporate/marketing site
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Configuration
DEV_PORT="${PORT:-3000}"
AUTO_OPEN_BROWSER="${AUTO_OPEN_BROWSER:-true}"
CLEAR_CACHE="${CLEAR_CACHE:-false}"

echo -e "${GREEN}=== Corporate Website Development Server ===${NC}"
echo "Project Root: $PROJECT_ROOT"
echo "Node Version: $(node --version)"
echo "NPM Version: $(npm --version)"
echo "Dev Port: $DEV_PORT"

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

# Load environment variables
if [ -f ".env.local" ]; then
    echo -e "${GREEN}Loading .env.local${NC}"
    set -a
    source .env.local
    set +a
else
    echo -e "${YELLOW}Warning: .env.local not found. Using defaults.${NC}"
    if [ -f ".env.local.example" ]; then
        echo -e "${BLUE}Hint: Copy .env.local.example to .env.local and configure${NC}"
    fi
fi

# Clear cache if requested
if [ "$CLEAR_CACHE" == "true" ]; then
    echo -e "${BLUE}Clearing Next.js cache...${NC}"
    rm -rf .next
    echo -e "${GREEN}✓ Cache cleared${NC}"
fi

# Check if port is already in use
if command -v lsof &> /dev/null; then
    if lsof -Pi :$DEV_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}Warning: Port $DEV_PORT is already in use${NC}"
        echo -e "${YELLOW}Attempting to kill process on port $DEV_PORT...${NC}"
        lsof -ti:$DEV_PORT | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
elif command -v netstat &> /dev/null; then
    if netstat -an | grep ":$DEV_PORT.*LISTEN" >/dev/null 2>&1; then
        echo -e "${YELLOW}Warning: Port $DEV_PORT appears to be in use${NC}"
    fi
fi

# Function to open browser
open_browser() {
    local url="http://localhost:$DEV_PORT"
    echo -e "${BLUE}Opening browser at $url${NC}"

    # Wait for server to be ready
    sleep 3

    # Detect OS and open browser
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "$url" 2>/dev/null || true
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        open "$url" 2>/dev/null || true
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        start "$url" 2>/dev/null || true
    fi
}

# Open browser in background if enabled
if [ "$AUTO_OPEN_BROWSER" == "true" ]; then
    open_browser &
fi

# Display helpful information
echo -e "${GREEN}===========================================${NC}"
echo -e "${GREEN}Starting corporate website dev server...${NC}"
echo -e "${GREEN}===========================================${NC}"
echo ""
echo -e "${BLUE}Server will be available at:${NC}"
echo -e "  ${GREEN}➜${NC} Local:   http://localhost:$DEV_PORT"
echo -e "  ${GREEN}➜${NC} Network: http://$(hostname -I | awk '{print $1}'):$DEV_PORT"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Start development server
npm run dev
