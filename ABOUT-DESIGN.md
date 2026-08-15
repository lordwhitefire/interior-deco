# About Page Redesign — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/whitefire-about-ui-implementation.md` (the About UI spec).
**Decision:** implement the spec **verbatim** (copy from §22, components from §7, colors/typography/layout from §2–3). The page's 4 photos are **new local assets** (user-generated, kept local — not Sanity), named descriptively so the agent can identify them without viewing them. User decisions: (1) extract shared components (option A) and refactor Home to use them; (2) header/footer — "do exactly what is here" (the spec): About renders the spec's own `SiteHeader`, and after a live review the user overrode the spec's "keep the global footer" note: the old global Footer is hidden on `/about` and the shared Whitefire `SiteFooter` renders instead (same as Home); (3) this document is a new file (`ABOUT-DESIGN.md`).

## 1. Files to change

| File | Change |
|---|---|
| `app/components/whitefire/SiteLogo.tsx` (NEW) | Spec §7 `SiteLogo` (bronze `W` + WHITEFIRE/INTERIOR lockup) — shared. |
| `app/components/whitefire/SiteHeader.tsx` (NEW) | Spec §7 `SiteHeader`, parameterized: `activePath` (default `/`) + `showSearch` (About shows it; Home keeps its current look without search). Nav labels exactly per spec: HOME/ABOUT/SERVICES(⌄)/PROJECTS/BLOG/TEAM/TESTIMONIALS/CONTACT. Active state = bronze text + 2px bronze underline. Search icon → `/search` (existing search system). Mobile menu with `aria-expanded`. |
| `app/components/whitefire/PrimaryButton.tsx` (NEW) | Spec §7 `PrimaryButton` (`filled`/`outline`). |
| `app/components/whitefire/SectionEyebrow.tsx` (NEW) | Spec §7 `SectionEyebrow`. |
| `app/components/whitefire/SectionHeading.tsx` (NEW) | From Home's `_index.tsx` `SectionHeading` (eyebrow/title/description/align/light). |
| `app/components/whitefire/SiteFooter.tsx` (NEW) | From Home's `_index.tsx` `SiteFooter` (minimal Whitefire footer) — shared, for consistency. |
| `app/routes/_index.tsx` | Refactor to import the shared components above; remove local copies. **Visual output stays identical** (search icon off on Home). |
| `app/root.tsx` | Hide the old global `NavigationBar` **and `Footer`** on `/about` (and `/`). The spec's header must appear over the hero (no double headers); the old footer was replaced by the shared Whitefire `SiteFooter` after user's live review. |
| `app/routes/about.tsx` | Rewrite per spec §7: `SiteHeader` (active `/about`, search) + `AboutHero` + `StorySection` + `ValuesSection` + `ApproachSection` + `AboutClosingCTA`. Copy verbatim from spec §22. Meta per spec §19. No Sanity loader (images are local imports). Old `AboutHero/AboutQuote/AboutTeam/AboutCtaForm` imports removed (components stay on disk, unused). |

## 2. Page content (verbatim from spec — UNTOUCHED)

- **Hero:** `ABOUT WHITEFIRE INTERIOR` / `Thoughtful Design. Meaningful Spaces.` / studio description / `OUR APPROACH` → `#our-approach`
- **Story:** `OUR STORY` / `Designing with Purpose, Delivering with Passion.` + 2 paragraphs
- **Values:** `OUR VALUES` / Timeless Design (custom 3-ring SVG) / Sustainability (`Leaf`) / Client-Centered (`UserRound`) / Excellence (`ShieldCheck`) — thin-line bronze icons, no cards
- **Approach:** `OUR APPROACH` / `A Collaborative Journey from Concept to Creation` + 4 steps (Discover/Design/Develop/Deliver with `CircleCheck`)
- **Closing CTA:** `LET'S CREATE SOMETHING BEAUTIFUL` / `Ready to Start Your Project?` / `GET IN TOUCH` → `/contact`
- **NO** team gallery, stats, testimonials, blog previews, newsletter, or client-logos sections (spec §22 forbids them).

Icons from `lucide-react` (already a dependency — no new deps).

## 3. Image mapping (NEW local assets — pending user move)

Source files to be placed in `app/assets/images/` (user renames them; agent verifies existence at start):

| Slot | File (descriptive name) | Spec alt text |
|---|---|---|
| About hero | `about_hero_dark_living_room_fireplace.jpg` | "Warm luxury living room with dark wood cabinetry, fireplace, neutral seating and greenery." |
| Our Story | `about_story_console_vase_dome_lamp.jpg` | "Sophisticated interior console with vase, greenery, lamp and architectural artwork." |
| Our Approach | `about_approach_three_designers_worktable.jpg` | "Three interior designers collaborating over plans and material samples at a design studio table." |
| Closing CTA | `about_closing_dark_banner_table_vase.jpg` | "Dark luxury interior with round table, vase, artwork and neutral seating." |

- All four are imported directly into `about.tsx` (local, no loader).
- **Defensive fallback:** if a file is missing at build time, fall back to an existing Home asset (`living_design.jpg` / `Concept.jpg` / etc.) so the page never breaks.
- Alt text from spec §6. Agent cannot view images (model limit) — user visually confirms on the dev server.

## 4. Shared components (user chose option A)

- New shared set in `app/components/whitefire/` used by **both** Home and About.
- `SiteHeader` props: `activePath?: string; showSearch?: boolean` — About: `/about` + search; Home: `/` + no search (Home visuals unchanged).
- After refactor, verify Home renders identically (build + browser).

## 5. Accepted consequences

- About loses the old AI-search `NavigationBar`; the spec's Whitefire header (search icon → `/search`) replaces it on About only.
- The old global `Footer` is hidden on `/about` (user override after live review); the shared Whitefire `SiteFooter` renders instead, matching Home.
- Copy is static constants (spec text), NOT fetched from Sanity — the `aboutPage` document has no matching image fields (verified: all null) and spec §11 forbids inventing schema.
- The 4 images are local files, not Sanity — deliberate user choice ("keep it local first").
- No new dependencies; lucide-react already installed.

## 6. Verification

1. Confirm the 4 `about_*.jpg` files exist in `app/assets/images/`.
2. `npm run build` (must succeed).
3. `tsc --noEmit` — no new errors in changed files (`about.tsx`, `_index.tsx`, `root.tsx`, shared components; repo has pre-existing errors elsewhere).
4. `npm run dev` → `http://localhost:3000/about`:
   - Whitefire header over hero, ABOUT bronze + underlined, search icon → `/search`, mobile menu works
   - Hero / story / values / approach / closing CTA render with spec copy
   - 4 photos render correctly (user visually confirms — agent can't see images)
   - Whitefire footer renders; old global Footer absent on `/about`; no double headers/footers
5. `http://localhost:3000/` — Home unchanged (same visuals, search icon absent).

## 7. Out of scope

- Restyling any other page (contact/blog/team etc. keep the old global header/footer).
- Moving the 4 About images to Sanity (user said "keep it local first").
- Replacing spec copy with CMS content.
- Fixing pre-existing repo-wide ESLint crash / typecheck errors.
