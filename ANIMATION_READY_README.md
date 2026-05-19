# Aagontuk Animation-Ready Setup

This package keeps the current deployed site stable from `public/` and adds a future-proof React animation workspace in `src/`.

## Current live mode
Render can stay exactly as it is:

```bash
Build Command:
rm -f package-lock.json && npm install --omit=dev --no-audit --no-fund --legacy-peer-deps --registry=https://registry.npmjs.org

Start Command:
node server.js
```

The live website still serves `public/`.

## Future animation support
Added:

- Vite React support
- Tailwind config
- `@/` alias support
- `src/components/ui`
- `src/components/effects`
- `src/lib/utils.js` with `cn()`
- `SafeBlock` error boundary
- safe GooeyText-style morph component
- safe HeroRail parallax-style component
- `public/animation-runtime.js` for small non-React DOM effects

## Rule for future animations
Never paste Next.js/shadcn components directly into the live page. Convert them into this app structure first:

- `next/image` → `img`
- `next/link` → `a` or React Router Link
- `.tsx` types → JSX or full TypeScript setup
- `@/lib/utils` works now
- wrap fancy effects with `SafeBlock`
- cleanup `requestAnimationFrame`, timers, and event listeners

## When ready to migrate frontend fully to Vite
Use this Render build command:

```bash
npm install --no-audit --no-fund --legacy-peer-deps --registry=https://registry.npmjs.org && npm run build
```

Then set environment variable:

```env
AE_USE_DIST=true
```

Until the current UI is rebuilt in `src/`, keep `AE_USE_DIST` unset/false so the stable public site remains live.
