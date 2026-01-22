#!/bin/bash
###############################################################################
# test.sh - Corporate Website Test Suite
# Comprehensive testing for the corporate/marketing website
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

# Test configuration
RUN_LINT="${RUN_LINT:-true}"
RUN_TYPE_CHECK="${RUN_TYPE_CHECK:-true}"
RUN_FORMAT_CHECK="${RUN_FORMAT_CHECK:-true}"
RUN_UNIT_TESTS="${RUN_UNIT_TESTS:-true}"
RUN_BUILD_CHECK="${RUN_BUILD_CHECK:-false}"
FAIL_FAST="${FAIL_FAST:-false}"

# Track results
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()

echo -e "${GREEN}=== Corporate Website Test Suite ===${NC}"
echo "Project Root: $PROJECT_ROOT"
echo "Node Version: $(node --version)"
echo "NPM Version: $(npm --version)"
echo "Timestamp: $(date)"
echo ""

# Change to project root
cd "$PROJECT_ROOT"

# Helper function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"

    echo -e "${BLUE}▶ Running: $test_name${NC}"

    if eval "$test_command"; then
        echo -e "${GREEN}✓ $test_name passed${NC}"
        ((TESTS_PASSED++))
        echo ""
        return 0
    else
        echo -e "${RED}✗ $test_name failed${NC}"
        ((TESTS_FAILED++))
        FAILED_TESTS+=("$test_name")
        echo ""

        if [ "$FAIL_FAST" == "true" ]; then
            echo -e "${RED}Fail-fast enabled. Stopping tests.${NC}"
            exit 1
        fi
        return 1
    fi
}

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found!${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Warning: node_modules not found. Running npm install...${NC}"
    npm install
    echo ""
fi

# 1. ESLint - Code Linting
if [ "$RUN_LINT" == "true" ]; then
    run_test "ESLint (Code Linting)" "npm run lint"
fi

# 2. TypeScript - Type Checking
if [ "$RUN_TYPE_CHECK" == "true" ]; then
    if [ -f "tsconfig.json" ]; then
        run_test "TypeScript (Type Checking)" "npx tsc --noEmit"
    else
        echo -e "${YELLOW}⚠ Skipping TypeScript check (tsconfig.json not found)${NC}"
        echo ""
    fi
fi

# 3. Prettier - Format Checking
if [ "$RUN_FORMAT_CHECK" == "true" ]; then
    if command -v npx &> /dev/null && npm list prettier &> /dev/null; then
        run_test "Prettier (Format Checking)" "npm run format:check"
    else
        echo -e "${YELLOW}⚠ Skipping format check (Prettier not configured)${NC}"
        echo ""
    fi
fi

# 4. Unit Tests (Jest/Vitest)
if [ "$RUN_UNIT_TESTS" == "true" ]; then
    # Check if test script exists in package.json
    if grep -q '"test"' package.json; then
        run_test "Unit Tests" "npm test"
    else
        echo -e "${YELLOW}⚠ Skipping unit tests (test script not configured)${NC}"
        echo ""
    fi
fi

# 5. Build Validation
if [ "$RUN_BUILD_CHECK" == "true" ]; then
    run_test "Build Validation" "npm run build"

    # Verify build artifacts
    if [ -d ".next" ]; then
        echo -e "${GREEN}✓ Build artifacts verified${NC}"
        echo ""
    else
        echo -e "${RED}✗ Build artifacts not found${NC}"
        ((TESTS_FAILED++))
        FAILED_TESTS+=("Build artifacts verification")
        echo ""
    fi
fi

# Summary
echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}Test Suite Summary${NC}"
echo -e "${BLUE}===========================================${NC}"
echo -e "Total tests run: $((TESTS_PASSED + TESTS_FAILED))"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

# List failed tests
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}Failed tests:${NC}"
    for test in "${FAILED_TESTS[@]}"; do
        echo -e "  ${RED}✗${NC} $test"
    done
    echo ""
    echo -e "${RED}=== TEST SUITE FAILED ===${NC}"
    exit 1
else
    echo -e "${GREEN}=== ALL TESTS PASSED ===${NC}"
    exit 0
fi
