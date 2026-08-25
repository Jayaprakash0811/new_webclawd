# IDL Portfolio System — Rebuilt Homepage

Production-grade Next.js marketing homepage rebuild.
Zero inline styles. Full Tailwind. Framer Motion. Typed throughout.

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** (extended config with design tokens)
- **Framer Motion** (scroll-triggered reveals, AnimatePresence)
- **Fonts:** Fraunces (display) · Bricolage Grotesque (UI) · JetBrains Mono (labels)

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Before You Launch

**1. Set your LinkedIn DM URL**
```ts
// src/lib/linkedin.ts
export const LINKEDIN_DM_URL = 'https://www.linkedin.com/in/YOUR-PROFILE/'
```

**2. Update contact/privacy page routes**
The footer links to `/contact` and `/privacy` — create these pages or update the hrefs.

**3. Update template routes**
`TemplateCard` routes to `/templates/[slug]`. Create that route or update `handleClick` in `PortfolioShowcase.tsx`.

---

## File Structure

```
src/
├── app/
│   ├── fonts.ts            — Fraunces + Bricolage + JetBrains Mono
│   ├── globals.css         — Tailwind directives + base reset
│   ├── layout.tsx          — Root layout with font variables
│   └── page.tsx            — Homepage (8 sections)
│
├── types/
│   ├── index.ts            — Template, TemplatePreview, MosaicEntry
│   ├── nav.ts              — NavItem
│   ├── feature.ts          — FeatureItem
│   ├── footer.ts           — FooterLink, FooterNavColumn
│   └── how-it-works.ts     — FlowStepData
│
├── lib/
│   ├── utils.ts            — cn() (clsx + tailwind-merge)
│   ├── motion.ts           — Shared Framer Motion variants + constants
│   ├── linkedin.ts         — LINKEDIN_DM_URL ← UPDATE THIS
│   └── templates/
│       ├── data.ts         — 20 Template objects
│       └── categories.ts   — CategoryMeta[], ALL_CATEGORIES
│
└── components/
    ├── ui/
    │   ├── Eyebrow.tsx
    │   ├── GhostButton.tsx
    │   ├── GlowOverlay.tsx
    │   ├── LinkedInCTA.tsx
    │   ├── PulsingDot.tsx
    │   └── ScarcityBadge.tsx
    │
    └── sections/
        ├── navbar/         — Navbar, NavLogo, NavLinks, NavActions, MobileDrawer
        ├── hero/           — HeroSection, HeroContent, MosaicGrid, MosaicCard, CardSVG, PostGridCTA
        ├── how-it-works/   — HowItWorks, FlowStrip (FlowStep + FlowArrow inside)
        ├── portfolio-showcase/ — PortfolioShowcase (all sub-components co-located)
        ├── feature/        — FeatureSection (all sub-components co-located)
        ├── mid-cta/        — MidCTA (all sub-components co-located)
        ├── final-cta/      — FinalCTA (all sub-components co-located)
        └── footer/         — Footer (all sub-components co-located)
```

---

## Pricing Rule

Pricing appears in **exactly one place**:
`PortfolioShowcase.tsx` → `TemplateCard` footer → `font-mono text-xs text-white/30`

It is removed from: Navbar, Hero, MidCTA, FinalCTA, Footer.
`PricingSection` is retired entirely.

---

## Design Tokens (tailwind.config.ts)

| Token      | Value     | Usage                          |
|------------|-----------|--------------------------------|
| `bg-base`  | `#080808` | Page background                |
| `bg-surface` | `#0f0f0f` | Alternate section background |
| `bg-elevated`| `#141414` | Card backgrounds             |
| `accent`   | `#facc15` | Scarcity badges only           |
| `font-display` | Fraunces | Headlines only              |
| `font-sans`  | Bricolage Grotesque | UI + body        |
| `font-mono`  | JetBrains Mono | Labels + eyebrows      |
