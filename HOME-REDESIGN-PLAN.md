# Home Page Redesign — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/Whitefire_Home_UI_Implementation_Package.md`
**Decision:** implement the spec's Home page verbatim (copy, structure, colors, classes, mock data from §7), but wire the page images and client logos from Sanity. The user's later choice supersedes the earlier "use the repo image we have" instruction: **"wire images from sanity even logo images — do not touch my whitefire stuff."** Whitefire branding/copy stays verbatim.

## 1. Files to change

| File | Change |
|---|---|
| `app/routes/_index.tsx` | Spec §7 implementation as the route default export. Keep existing `meta`/`links` exports. Add a Sanity `loader` feeding image + logo data into the sections (fallback to current local assets if Sanity is down). Remove the old Sanity loader + old component imports. |
| `app/root.tsx` | Hide the global `NavigationBar` and `Footer` on `/` only, via `useLocation()`. Every other page untouched. |

## 2. Home page content (verbatim from spec §7 — UNTOUCHED)

All spec copy/structure stays: `SiteHeader` (WHITEFIRE wordmark, 8 nav items, `GET IN TOUCH`), `HomeHero` (`LUXURY INTERIOR DESIGN STUDIO` / `Designing Spaces. Elevating Lives.`), `ServicesSection`, `HomeStudioStatement`, `TestimonialsTrustSection` (`CLIENTS LOVE US` / `TRUSTED BY LEADING BRANDS`), `FeaturedProjectsSection` (5 cards), `HomeStats`, `LatestArticlesSection` (3 cards), `NewsletterCTA` (fakes success after 600ms), minimal `SiteFooter`. Project/article titles, locations, categories, dates, alt text all stay as the spec.

## 3. Sanity wiring (NEW — replaces the repo-asset mapping)

Reuse the repo's `sanityClient` + `urlFor` (`app/lib/sanity.client.ts`) and `groq`. New `loader` fetches, wrapped in try/catch so a Sanity outage falls back to the current local assets (page never breaks):

- `hero` → images[0] for hero bg, images[1] for newsletter bg
- `stylish` → images[0] for studio split
- `project` (6 avail) → first 5 images for project cards
- `article` (4 avail) → first 3 images for article cards
- `client` (8 avail) → real logo SVGs for the logo grid

| Slot | Current (local fallback) | New (Sanity) |
|---|---|---|
| Hero bg | `app/assets/images/living_design.jpg` | `hero.images[0]` |
| Studio | `app/assets/images/Concept.jpg` | `stylish.images[0]` |
| Project 1–5 | `project1/3/4/7`, `progect5` | first 5 `project` images |
| Article 1–3 | `blog-2/3/6` | first 3 `article` images |
| Newsletter bg | `app/assets/images/Perfect.jpg` | `hero.images[1]` |
| Client logos (8) | text brand names | 8 real `client` logo SVGs |

Component changes (optional props, fall back to existing mock constants when empty): `HomeHero({ image? })`, `HomeStudioStatement({ image? })`, `NewsletterCTA({ image? })`, `FeaturedProjectsSection({ images? })`, `LatestArticlesSection({ images? })` (swap only the `<img>` src), `TestimonialsTrustSection({ logos? })` (render real `<img>` logos grayscale + hover-to-color; text fallback otherwise). `HomePage` reads `useLoaderData<typeof loader>()` and passes props.

## 4. Necessary compile fix (not a design change)

- Spec imports only `{ useState }` but uses `React.FormEvent` → `import React, { useState } from "react";`
- `fetchPriority="high"` left as-is (passes through as `fetchpriority`).

## 5. Accepted consequences

- Whitefire branding/copy is **not** touched (header/footer wordmark, hero headline, nav, all section copy).
- Newsletter fakes success (spec behavior, not wired to `/api/newsletter`).
- Sanity project/article images pair with the spec's fictional titles (e.g. a real "Paris Saint-Germain Wine Bar" photo labeled "Villa Santhum") — unless user opts to also use real titles.
- AI search absent on Home (spec header has no search).
- `Services → /services`, `Projects → /projects` are empty layout-wrapper routes.
- Home renders in Tailwind's default serif stack; global font config untouched.
- Some Sanity client names share logo assets (Urban Nest/Signature Spaces, etc.) — that's the real data.

## 6. Verification

1. `npm run build` (must succeed)
2. `npm run typecheck` — no new errors in `_index.tsx` / `root.tsx` (repo has pre-existing errors elsewhere)
3. `npm run dev` → `http://localhost:3000`
4. Check: hero + overlaid header, 5-col services, dark studio split, testimonials, real logo grid, 5 project cards (Sanity photos), stats band, 3 article cards (Sanity photos), newsletter CTA, footer; no doubled header/footer; mobile menu toggles/closes.

## 7. Out of scope

- Restyling any other page.
- Changing the global serif font.
- Real newsletter backend wiring.
- Swapping project/article titles to real Sanity content (offer made; not chosen).
- Fixing the pre-existing repo-wide ESLint crash / typecheck errors.