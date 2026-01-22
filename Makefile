# Cross-repo shortcuts for corp submodule: infrastructure-plan, backend-test, investor-pack.
# Focuses on corporate site with Next.js.

.PHONY: all init build test deploy lint clean infrastructure-plan backend-test investor-pack

all: lint test build deploy

init:
	@echo "Initializing corp site..."
	npm install

build:
	@echo "Building corp site..."
	npm run build

test:
	@echo "Testing corp site..."
	npm test
	# E2E focus: npx playwright test

deploy:
	@echo "Deploying corp site..."
	./scripts/deploy.sh

lint:
	@echo "Linting corp site..."
	npm run lint

clean:
	@echo "Cleaning corp site..."
	rm -rf .next node_modules

infrastructure-plan:
	@echo "Planning infrastructure from corp..."
	make -C ../infra plan

backend-test:
	@echo "Testing backend from corp..."
	make -C ../core backend-test

investor-pack:
	@echo "Packaging for investor from corp..."
	make -C ../investor all