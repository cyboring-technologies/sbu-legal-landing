# Bilingual Support Implementation Guide

## What Has Been Implemented

### 1. **Infrastructure Setup** ✅

- **next-intl** library installed (v4.5.5)
- i18n configuration created (`src/i18n.ts`)
- Locale routing structure with `[locale]` directory
- Static site generation compatible

### 2. **Translation Files** ✅

- English translations: `src/messages/en.json` (~150 keys)
- Spanish translations: `src/messages/es.json` (~150 keys)
- Complete coverage for all sections:
  - Navigation
  - Hero
  - Problems
  - Solution
  - Services
  - Testimonials
  - FAQ
  - Contact
  - Footer

### 3. **Language Toggle Component** ✅

- Component created: `src/components/LanguageToggle.tsx`
- Integrated into Header component (desktop and mobile)
- Saves language preference to localStorage
- Icon-based toggle (EN/ES)

### 4. **Auto Language Detection** ✅

- Root page (`src/app/page.tsx`) detects browser language
- Falls back to saved preference in localStorage
- Redirects to `/en/` or `/es/` automatically

### 5. **Routing Structure** ✅

```
app/
├── layout.tsx (root layout with ThemeProvider)
├── page.tsx (language detection & redirect)
└── [locale]/
    ├── layout.tsx (NextIntlClientProvider)
    └── page.tsx (current homepage - needs translation integration)
```

## What Needs to Be Done

### 1. **Update Page Components to Use Translations**

The `src/app/[locale]/page.tsx` file still has hardcoded English/Spanish text. You need to:

Replace hardcoded text with translation hooks:
\`\`\`tsx
'use client';

import { useTranslations } from 'next-intl';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
// ... other imports

export default function HomePage() {
const t = useTranslations();

return (
<Layout>
<Hero
title={t('hero.title')}
subtitle={t('hero.subtitle')}
description={t('hero.description')}
primaryCTA={{
          text: t('hero.primaryCTA'),
          href: '/contact',
        }}
secondaryCTA={{
          text: t('hero.secondaryCTA'),
          href: '/our-services',
        }}
/>
{/_ Rest of the component using t('section.key') _/}
</Layout>
);
}
\`\`\`

### 2. **Update Other Page Routes**

Move and update these pages to the `[locale]` structure:

- `src/app/about-us/` → `src/app/[locale]/about-us/`
- `src/app/contact/` → `src/app/[locale]/contact/`
- `src/app/our-services/` → `src/app/[locale]/our-services/`
- `src/app/prices/` → `src/app/[locale]/prices/`
- `src/app/questions-and-answers/` → `src/app/[locale]/questions-and-answers/`

### 3. **Update Header Component Navigation**

The Header component navigation items should use translations:
\`\`\`tsx
const t = useTranslations('navigation');

const navigation = [
{ name: t('home'), href: '/' },
{ name: t('services'), href: '/our-services' },
{ name: t('prices'), href: '/prices' },
{ name: t('about'), href: '/about-us' },
{ name: t('faq'), href: '/questions-and-answers' },
{ name: t('contact'), href: '/contact' },
];
\`\`\`

### 4. **Update Footer Component**

The Footer component should use translations for all text:
\`\`\`tsx
const t = useTranslations('footer');
// Use t('companyName'), t('tagline'), etc.
\`\`\`

### 5. **Fix Link Paths**

All internal links need to include the locale:
\`\`\`tsx
import { useLocale } from 'next-intl';

const locale = useLocale();

<Link href={`/${locale}/contact`}>...</Link>
\`\`\`

Or create a helper function:
\`\`\`tsx
const localizedHref = (path: string) => `/${locale}${path}`;
\`\`\`

### 6. **Build and Test**

\`\`\`bash
cd frontend/corporate-web
npm run build

# Check for any build errors

# If successful, rebuild Docker container

cd ..
docker-compose up -d --build corporate-web
\`\`\`

## Translation Key Structure

The translation files follow this structure:
\`\`\`json
{
"navigation": { "home": "...", "services": "..." },
"hero": { "title": "...", "subtitle": "..." },
"problems": { "title": "...", "subtitle": "...", "items": [...] },
"solution": { "title": "...", "features": [...] },
"services": { "title": "...", "items": [...] },
"testimonials": { "title": "...", "items": [...] },
"faq": { "title": "...", "items": [...] },
"contact": { "title": "...", "form": {...} },
"footer": { "companyName": "...", "copyright": "..." }
}
\`\`\`

## Testing Checklist

- [ ] Navigate to root (`/`) → Should redirect to `/en/` or `/es/` based on browser
- [ ] Click language toggle → Should switch languages and stay on same page
- [ ] Refresh page → Should maintain language preference
- [ ] All navigation links work in both languages
- [ ] All text is translated (no hardcoded English/Spanish)
- [ ] Footer copyright year dynamic: `{year}` variable works
- [ ] Build succeeds without errors
- [ ] Docker container runs successfully

## Notes

- **Static Export**: The project uses `output: 'export'` in next.config.js
- **No Middleware**: Middleware doesn't work with static export, so we use client-side detection
- **localStorage**: Language preference is saved in `preferred-locale` key
- **Fallback**: Default language is English (en)
- **Supported Locales**: en, es (defined in `src/i18n.ts`)

## Quick Commands

\`\`\`bash

# Test build

cd c:/cyboring/frontend/corporate-web
npm run build

# Rebuild container

cd c:/cyboring/frontend
docker-compose up -d --build corporate-web

# View logs

docker-compose logs -f corporate-web
\`\`\`
