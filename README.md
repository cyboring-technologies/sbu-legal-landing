# Corp Module: Corporate Site Next.js, Marketing Pages, and Static Assets for Vortex SaaS

## Overview

This submodule (`corp/`) is the corporate website for Vortex SaaS, built with Next.js and React. It serves as the marketing hub, featuring static pages, a blog, and service descriptions for our specialized business branches and Strategic Business Units (SBUs).

### Business Structure

**Vortex-Legal**: Our primary business branch specializing in AI-powered processing of legal and judicial documents. The corporate site showcases our regional presence and capabilities across Central America.

**Strategic Business Units (SBUs)**: Organized by country using ISO 3166-1 alpha-2 codes:

- **Vortex-Legal-NI** (Nicaragua) - MVP launch market - Featured service page
- **Vortex-Legal-PA** (Panama) - Second market expansion - Featured service page
- **Vortex-Legal-CR** (Costa Rica) - Strategic regional market - Featured service page
- **Vortex-Legal-GT** (Guatemala) - Regional expansion - Service page planned
- **Vortex-Legal-HN** (Honduras) - Regional expansion - Service page planned
- **Vortex-Legal-SV** (El Salvador) - Regional expansion - Service page planned
- **Vortex-Legal-BZ** (Belize) - Regional expansion - Service page planned

Key features:

- Responsive, SEO-optimized pages with Tailwind CSS.
- Blog with dynamic slugs and listing.
- Service pages for Strategic Business Units with country-specific content.
- Integration with shared UI kit from `core/shared/` (if applicable).
- Deployment to Azure Static Web Apps (SWA) for fast, global delivery.
- Internationalization (i18n) with dynamic language routing (e.g., /en, /es) supporting regional variations.

This module focuses on marketing and static content for Vortex-Legal operations across Central America, complementing the dynamic frontend app in `frontend/`. It aligns with Vortex's cloud-native approach, emphasizing simplicity and scalability.

For the full project overview, see the root `README.md` in the superimposed repository.

## Prerequisites

- Node.js v20+ (with npm/yarn).
- TypeScript (global or via npm).
- Docker (optional for builds).
- GitHub account (for workflows).
- Azure CLI (for deployment).

## Setup

1. **Initialize Environment**:
   - Copy `.env.local.example` to `.env.local` and fill in values (e.g., API keys if needed for forms/analytics).
   - Install dependencies: `npm install`.

2. **Connect to Shared Libraries**:
   - Use `.npmrc` for npm manifests to connect with shared packages from `core/`. Use .npmrc to configure the npm manifest and connect to shared packages from core/shared/. This enables the use of the platform's UI Kit on corporate pages.

3. **VSCode Configuration**:
   - Open in VSCode with recommended extensions from `.vscode/extensions.json` (e.g., ESLint, Tailwind, MDX).
   - Use tasks from `.vscode/tasks.json` for build/deploy.

4. **Generate Artifacts**:
   - Run `npm run generate-sitemap` via `scripts/generate-sitemap.js` for sitemap.xml.

## Usage

### Makefile Commands

The `Makefile` provides cross-repo shortcuts:

- `make init`: Setup and install.
- `make build`: Build Next.js site.
- `make test`: Run tests.
- `make deploy`: Deploy to SWA/ACA.
- `make dev`: Start development server.

### Scripts

Operational helpers in `scripts/`:

- `deploy.sh`: Deployment script.
- `generate-sitemap.js`: Generate sitemap.xml.

Run with `./scripts/<script>.sh` or via Makefile.

### Development

- Start server: `npm run dev` (localhost:3000).
- Build: `npm run build`.
- Lint: `npm run lint`.
- Test: `npm run test`.

Prioritize E2E tests initially for core pages.

### Deployment

- **Local/Preview**: Use Docker: `docker build -t corp-site .` and run.
- **CI/CD**: GitHub workflows:
  - `ci.yml`: Lint, test, validate.
  - `deploy.yml`: Deploy to Azure Container Apps or SWA.
  - `release.yml`: Semantic Release for versioning.
- Dependabot (`dependabot.yml`) updates dependencies.

## Folder Structure

- **`README.md`**: This file – overview and instructions.
- **`CHANGELOG.md`**: Release history.
- **`Makefile`**: Cross-repo shortcuts.
- **`Dockerfile` / `.dockerignore`**: For building site image.
- **`eslintrc.json` / `.releaserc.json` / `commitlint.config.js`**: Linting, release, commit validation.
- **`.gitignore`**: Ignores node_modules, .next, .env.local.
- **`.env.local.example`**: Env vars template.
- **`.npmrc`**: NPM config for shared libraries.
- **`package.json`**: Dependencies and scripts.
- **`tsconfig.json`**: TypeScript config.
- **`next.config.js`**: Next.js settings.
- **`tailwind.config.ts`**: Tailwind CSS config.
- **`postcss.config.js`**: PostCSS for Tailwind.
- **`.github/`**: GitHub configs.
- **`workflows/`**: CI, deploy, release.
- **`contributing.md`**: Dev guide.
- **`dependabot.yml`**: Dependency updates.
- **`.vscode/`**: VSCode settings, tasks, debug for Azure/Next.js.
- **`scripts/`**: Helpers (deploy, sitemap generation).
- **`tests/`**: Test structure.
- **`unit/`**: Unit tests (e.g., example.test.tsx).
- **`e2e/`**: E2E tests (e.g., home.spec.ts with Playwright/Cypress).
- **`public/`**: Static assets (images.svg, fonts.woff2, robots.txt).
- **`src/`**: Source code.
- **`app/`**: Next.js App Router.
  - `layout.tsx`: Root layout (nav/footer).
  - `page.tsx`: Home page.
  - `global.css`: Global styles.
  - `[lang]/`: Language routes.
  - `layout.tsx`: Language-specific layout.
  - `page.tsx`: Language home.
  - `about-page.tsx`: About page.
  - `contact-page.tsx`: Contact page.
  - `blog/`: Blog section.
  - `page.tsx`: Listing.
  - `[slug]-page.tsx`: Dynamic post.
  - `services/`: Service pages.
  - `legal-ni-page.tsx`: Vortex-Legal Nicaragua (MVP)
  - `legal-pa-page.tsx`: Vortex-Legal Panama
  - `legal-cr-page.tsx`: Vortex-Legal Costa Rica
  - `legal-gt-page.tsx`: Vortex-Legal Guatemala (planned)
  - `legal-hn-page.tsx`: Vortex-Legal Honduras (planned)
  - `legal-sv-page.tsx`: Vortex-Legal El Salvador (planned)
  - `legal-bz-page.tsx`: Vortex-Legal Belize (planned)
- **`content/`**: MDX content.
- **`blog/`**: Posts (e.g., en-my-first-post.mdx).
- **`pages/`**: Static pages (e.g., en-about.mdx).
- **`services/`**: Service descriptions for Vortex-Legal SBUs.
  - `legal-ni-en.mdx`, `legal-ni-es.mdx`: Nicaragua market content
  - `legal-pa-en.mdx`, `legal-pa-es.mdx`: Panama market content
  - `legal-cr-en.mdx`, `legal-cr-es.mdx`: Costa Rica market content
  - Additional country-specific MDX files for GT, HN, SV, BZ (planned)
- **`.next/`**: Build output (generated).
- **`node_modules/`**: Dependencies (generated).

## Architecture Notes

- **Routing**: Dynamic for languages; supports i18n.
- **Content Management**: MDX for easy editing of blog/posts/services without redeploys.
- **Styling**: Tailwind with PostCSS for lean, responsive design.
- **SEO**: Sitemap, robots.txt, meta tags in layouts.
- **Testing**: Focus on E2E for user flows; unit for components as complexity grows.
- **Integration**: Can pull from shared UI kit; static nature suits SWA deployment.

Content/Code Integration: Use MDX to allow marketers and copywriters to edit content. This isn't just text; because MDX processes JSX, they can directly import complex React components (such as charts, forms, or shared UI Kit elements from core/shared/) into their .mdx files.

For ADRs (e.g., multi-region), see root `/docs/ADRs/`.

## Contributing

Follow `.github/contributing.md` for issues, PRs, and Conventional Commits. Use semantic-release for versioning.

## License

[License not specified; assume proprietary or as per root repository.]

## Contact

For issues, open a GitHub issue in this submodule. For project-wide questions, refer to the root repository.
# Trigger deployment 11/17/2025 03:02:29

# Deploy 11/17/2025 03:03:38
