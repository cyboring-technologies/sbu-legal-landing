# README_LANDING.md

**STATUS**: DESCRIPTIVE · NON-AUTHORITATIVE · SUBORDINATE

---

## Document Purpose

This document describes the Landing Page project—an independent Next.js web application that serves as the public marketing and informational surface for the SBU Legal system.

**This document is descriptive, not prescriptive.**

It explains what the Landing Page **is**, not how the system **must** work.

---

## Authority and Governance

This document is **subordinate** to the following normative contracts:

1. `BASE_EXECUTION_CONTRACT.md`
2. `README_ENGINE_V2.md`
3. `README_GATEWAY_V2.md`
4. `UX_CONTRACT.md`

In case of conflict, those documents prevail.

**Changes permitted here**: Frontend implementation, UI/UX, content, styling, routing within the landing scope.

**Changes prohibited here**: Execution contracts, payment logic, authority boundaries, Engine/Gateway behavior.

---

## 1. Role of the Landing Page

The Landing Page is a **static, public-facing website** built with Next.js. Its responsibilities are:

### Primary Functions
- **Marketing**: Communicate product value, features, and positioning
- **Education**: Explain the one-shot execution model and system capabilities
- **Public Documentation**: Provide legal pages (privacy, terms, etc.)
- **Content**: Blog posts, case studies, and informational resources
- **Call-to-Action (CTA)**: Provide a single entry point to the Engine

### What It Is NOT
- Not a login surface
- Not a payment processor
- Not a session manager
- Not part of the execution runtime
- Not an onboarding flow
- Not a stateful application

The Landing Page has **no authority** over execution, payment, or user state.

---

## 2. Relationship with the Runtime System

### Connection to the Engine

The Landing Page connects to the Engine via a **single primary CTA** that:

- Opens the Engine directly in a new tab
- Introduces no intermediate UI or steps
- Uses neutral copy (e.g., "Start Execution")
- Transfers control completely to the Engine

**What happens on click:**
- User is directed to the Engine URL
- The Landing Page UI is discarded
- The Engine occupies the full viewport
- Authority begins at the Engine's Rubicon (payment validation)

**What does NOT happen on the Landing Page:**
- No login or authentication
- No payment processing
- No token issuance
- No status tracking
- No session continuity
- No execution state

### Clear Separation

The Landing Page and the Engine are **completely separate runtimes**:

- **Landing**: Next.js static site (this project)
- **Engine**: Cloudflare Durable Object (separate codebase)
- **Gateway**: Cloudflare Worker (separate codebase)

No visual elements, state, or authority persist across the boundary.

---

## 3. Architecture and Structure

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Internationalization**: next-intl
- **Testing**: Jest (unit), Playwright (E2E)
- **Deployment**: Cloudflare Pages (static export)

### Project Structure

```
src/
├── app/
│   ├── (landing)/          # Public marketing pages
│   │   ├── page.tsx        # Homepage
│   │   ├── pricing/        # Pricing information
│   │   ├── blog/           # Content/blog
│   │   ├── legal/          # Privacy, terms, etc.
│   │   └── ...
│   ├── (sovereign)/        # Isolated routes (if any)
│   └── api/                # API routes (dev proxies only)
├── components/             # Reusable UI components
├── i18n/                   # Internationalization config
├── messages/               # Translation files
└── utils/                  # Utility functions
```

### Routing

The Landing Page uses Next.js App Router with route groups:

- **(landing)**: Main public pages (home, pricing, blog, legal)
- **(sovereign)**: Isolated routes that don't share layout
- **api/**: Development-only proxy routes to Engine/Gateway (not in production)

### Main Sections

1. **Home**: Value proposition and primary CTA
2. **Pricing**: Transparent pricing information (descriptive, not transactional)
3. **Content/Blog**: Educational articles and case studies
4. **Legal**: Privacy policy, terms of service, compliance documents

### Internationalization

- Configured via `next-intl`
- Translation files in `src/messages/`
- Locale detection and routing handled by Next.js middleware

---

## 4. Technologies in Detail

### Frontend Stack
- **React 18**: UI component library
- **Next.js 14**: Framework with App Router
- **TypeScript**: Type safety and developer experience

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **next-themes**: Dark mode support
- **lucide-react**: Icon library

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Commitlint**: Conventional commit enforcement

### Testing
- **Jest**: Unit and component testing
- **Playwright**: End-to-end browser testing

### Deployment
- **Static Export**: `next build` with `output: 'export'`
- **Cloudflare Pages**: Hosting and CDN
- **No server-side runtime** in production

### Analytics
- (If implemented) Client-side analytics only
- No tracking of execution or payment events
- No cross-boundary user identification

---

## 5. Development Workflow

### Local Development

```bash
Standard Next.js development workflow. See README.dev.md for details.
```

### Development Proxies

Development-only proxies may exist. They are never present in production.

### Deployment

The Landing Page deploys as a static site to Cloudflare Pages:
1. `next build` generates static HTML/CSS/JS
2. Output directory (`out/`) is deployed to Cloudflare Pages
3. No server-side rendering or API routes in production

---

## 6. Governance and Change Control

### What Can Be Changed Here

**Permitted changes** (no approval from Engine/Gateway required):
- UI components and styling
- Marketing copy and content
- Blog posts and educational materials
- Legal page updates
- Internationalization and translations
- Frontend performance optimizations
- Accessibility improvements
- SEO enhancements

### What Cannot Be Changed Here

**Prohibited changes** (violate V2 contracts):
- Redefining the CTA contract (must remain single, direct, new-tab)
- Adding login, authentication, or session management
- Implementing payment or pricing logic
- Creating continuity between Landing and Engine
- Storing or tracking execution state
- Issuing tokens or performing authorization
- Modifying Engine or Gateway behavior

### When to Seek Approval

If a change affects:
- The CTA behavior or copy
- The mental model of one-shot execution
- The boundary between Landing and Engine
- Any implication of continuity or state

**→ Review with system architects before implementation.**

---

## 7. Relationship to Other Documentation

### For Frontend Developers
- Read this document first
- Refer to `I18N_IMPLEMENTATION.md` for internationalization
- Refer to `BRANDING.md` for visual identity
- Refer to `README.dev.md` for development setup

### For System Architects
- This document is **informational only**
- For execution contracts, see `README_ENGINE_V2.md`
- For payment contracts, see `README_GATEWAY_V2.md`
- For UX invariants, see `UX_CONTRACT.md`

### For Marketing/Content Agents
- This document explains technical constraints
- You can modify content within the Landing scope
- You cannot modify execution, payment, or authority logic
- CTA copy must remain neutral and direct

---

## 8. Final Principle

The Landing Page can be **arbitrarily complex** as a website—rich content, animations, interactive demos, multi-language support, etc.

But it is **simple in its authority**:

> **It informs, frames, and cedes control.**

It does not execute, authorize, or persist.

When the user clicks the CTA, the Landing Page's job is complete.

---

## Questions or Conflicts?

If this document conflicts with a V2 contract, **the contract prevails**.

If you're unsure whether a change belongs in the Landing Page or the Engine/Gateway, **ask before implementing**.

---

**Last Updated**: 2026-02-05  
**Document Type**: Descriptive Reference  
**Normative Authority**: None