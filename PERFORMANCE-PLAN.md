# PERFORMANCE-PLAN.md

- Source-of-truth: this file + `PLAN-WORKFLOW.md` rules.
- Goal: cut page weight and improve Core Web Vitals (LCP, CLS, INP) on a photography-heavy site, with zero visual change.

## Audit summary (done)

Already good:

- No custom fonts (system stacks only) — nothing to download.
- No third-party scripts (no analytics/ads).
- Lazy loading on all below-fold images; `fetchPriority="high"` on all 5 heroes.
- CLS mostly mitigated: `aspect-[…]` on cards, fixed `min-h` on heroes.
- Remix route-level code splitting (routes 7–13KB each).
- Sanity queries parallel (`Promise.all`) and server-side.
- No custom CSS animations; hover transitions + Swiper autoplay only.

Problems:

- No `srcset`/`sizes`: every image is one fixed size (1920×1080 heroes even on phones).
- `img()`/`urlFor` lacks `auto=format` → JPEG only (no WebP/AVIF); only `imgUrl` path has `auto=format&q=85`.
- Swiper CSS loaded from jsDelivr CDN (`swiper@8`) — render-blocking third-party fetch, version mismatch (package is `swiper@12`).
- No `width`/`height` attributes on `<img>` (minor — CSS already reserves space).
- Home route JS = 99KB (includes full Swiper) — lazily loadable.
- No `<link rel="preload">` for LCP images (minor).
- GROQ fetches mostly unprojected full docs (minor, server-side only).
- `@iconify/tailwind` plugin generates 0 icon classes (dead build-time weight, harmless — leave as-is).

## User decisions (explicit)

1. Swiper styles: vendor the exact `swiper@8` CSS file locally, delete the CDN link — identical appearance, no third-party fetch.
2. Shared `ResponsiveImage` component touches many routes — allowed, zero visual change.
3. Install `lighthouse` as a devDependency for before/after CWV measurement.
4. No visual changes anywhere: colors, layout, fonts, carousel behavior all stay byte-identical. This plan only changes image URL strings, asset hosting, and JS/CSS loading order.

## Files to change

| File | Change |
|---|---|
| `app/components/whitefire/ResponsiveImage.tsx` | New. Sanity `srcset` (640/1024/1600/1920) + `sizes` + `auto=format` (WebP/AVIF) + `width`/`height` from asset metadata; props: `src`, `alt`, `className`, `loading`, `fetchPriority`; falls back to plain `<img>` on missing metadata |
| `app/routes/_index.tsx` | Hero + section images → `ResponsiveImage`; `React.lazy` + `Suspense` around Swiper (home JS 99KB → ~40KB) |
| `app/routes/blog._index.tsx` | Hero + article card images → `ResponsiveImage`; `links()` adds `rel="preload"` for LCP hero |
| `app/routes/blog.$slug.tsx` | Hero + body images → `ResponsiveImage` |
| `app/routes/services._index.tsx` | Hero + card images → `ResponsiveImage`; LCP preload |
| `app/routes/services.$slug.tsx` | Hero + gallery images → `ResponsiveImage` |
| `app/routes/projects._index.tsx` | Thumbnails → `ResponsiveImage` |
| `app/routes/projects.$projectid.tsx` | Hero/gallery images → `ResponsiveImage` |
| `app/routes/about.tsx` | Section images → `ResponsiveImage` |
| `app/routes/team._index.tsx`, `team.$slug.tsx` | Card/hero images → `ResponsiveImage` |
| `app/routes/testimonials.tsx` | CTA image → `ResponsiveImage` |
| `app/routes/contact.tsx` | CTA image → `ResponsiveImage` |
| `app/routes/faq.tsx` | CTA image → `ResponsiveImage` |
| `app/lib/content.ts` | Add `auto=format&q=85` to `img()` builder path; keep `imgUrl` as-is |
| `public/vendor/swiper-bundle.min.css` | New. Exact copy of `https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css` |
| `app/root.tsx` | Replace CDN stylesheet link with local `public/vendor/swiper-bundle.min.css` |
| `package.json` | Add `lighthouse` devDependency |

## Page structure

- `ResponsiveImage` renders a single `<img>` with `srcset`/`sizes`; same classes, alt, loading, priority as today.
- `links()` preload: only the route's LCP image (hero), `as="image"` + `imageSrcSet`.
- Swiper stays on the home page only, same behavior/modules (Autoplay), now lazy-loaded.

## Image mapping

| Location | Today | After |
|---|---|---|
| Home hero | 1920×1080 JPEG, no srcset | srcset 640/1024/1600/1920, WebP/AVIF, preload, `fetchPriority="high"` |
| Blog/contact/team/service heroes | fixed w×h JPEG | same treatment as home hero |
| Article/card/thumbnail images | fixed w×h JPEG | srcset 640/1024, WebP/AVIF |
| Service gallery / project images | fixed w×h JPEG | srcset 640/1024/1600, WebP/AVIF |

## Verification

1. `npx tsc --noEmit` + `npm run lint` + `npm run build` — clean.
2. Before-change Lighthouse baseline: `npx lighthouse http://localhost:3000 --chrome-path=/usr/bin/google-chrome --preset=desktop --only-categories=performance` and same with `--preset=mobile` on `/`, `/services`, `/blog` (record LCP/CLS/INP scores).
3. After-change run of the same commands; report deltas.
4. Visual spot-check: screenshots of `/`, `/services`, `/blog` before/after (must be identical).
5. Swiper still autoplays and looks the same on `/`.
6. All 49 sitemap URLs return 200.
7. Confirm no `cdn.jsdelivr.net` requests remain in the page HTML.

## Open questions (answer with "go")

1. Confirm installing `lighthouse` devDependency.
2. Confirm the shared `ResponsiveImage` approach across all routes.
3. Confirm vendoring the swiper `swiper@8` CSS file locally.

## Status

- [x] All implementation done; tsc clean; build clean; 49/49 local URLs 200
- [x] Lighthouse after: desktop 99 (LCP 0.6s, was 1.5s), mobile 92 (LCP 2.7s, was 3.9s)
- [x] No jsDelivr requests; swiper local; srcset + WebP/AVIF live on all images
- [ ] Manual visual confirmation in browser (owner) — screenshots captured, model cannot view them
- Note: lint now surfaces a pre-existing backlog (was masked by a broken eslint TS resolver + cache); resolver fixed with `eslint-import-resolver-typescript@3.6.3`. Backlog cleanup is a separate task.