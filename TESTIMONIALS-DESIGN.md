# Testimonials Page (PAGE_13) — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/PAGE_13_TESTIMONIALS.md`.
**Status:** Approved — building.

---

## 1. What this page is

Whitefire Interior Testimonials at `/testimonials`:

- dark cinematic hero (image + left dark overlay, eyebrow `TESTIMONIALS`, serif h1 `Kind Words. Beautiful Spaces.`, gold divider, supporting copy);
- centered intro (`CLIENT TESTIMONIALS` / `What Our Clients Say` / description);
- 6 testimonial cards in an editorial grid (3 cols desktop / 2 tablet / 1 mobile, warm `#efebe7` cards, bronze serif quote mark, body, thin divider, circular client photo, name, project/location);
- 4-item trust statistics strip (4 cols desktop, 2×2 mobile);
- dark split consultation CTA (image 55% left, charcoal right, `READY TO CREATE YOUR OWN STORY?` / `Let's Design Something Beautiful` / `SCHEDULE A CONSULTATION` → /contact);
- shared `SiteHeader` (TESTIMONIALS active) + **original tiny `SiteFooter`**.

## 2. Data (real, owner-approved)

- Loader fetches real Sanity testimonials `*[_type == "testimonial"] | order(date desc)`, takes the **first 6** (deterministic).
- Each testimonial is matched to a **real project** from `app/data/projects.json` by exact `clientLocation` ⇄ `project.location` (case-insensitive) — all 18 locations match 1:1, so every card links to a real `/projects/:slug` page. Card metadata: real `clientName`, matched project title + real `clientLocation`, real client photo (circular 50px, `w=100&h=100`), real `review` text.
- **Stats strip (real numbers):** `18+` Projects Completed · `18+` Happy Clients · `5/5` Average Rating · `8` Team Members. Icons: Armchair / Users / Star / CalendarDays (bronze, 29px, thin stroke).
- Copy (eyebrows/headings/CTA text) is the package's representative Whitefire copy.
- `meta`: `Testimonials | Whitefire Interior` + package description.

## 3. Images

| Slot | Source |
|---|---|
| Hero | Unused pool (1) — `w=1920&h=1080` |
| CTA | Unused pool (1) — `w=1280&h=720` |
| Client avatars (6) | Real Sanity testimonial `clientImage` (identity exception) |

Pool accounting: **2 used → ~94 remain**.

## 4. Components (page-specific, inside `app/routes/testimonials.tsx`)

`TestimonialsHero` → `TestimonialsIntro` → `TestimonialGrid` (cards: quote mark, blockquote, divider, avatar, name, project link + location) → `TrustStats` → `ConsultationCTA`. Remix `Link` for internal links; `aria-hidden` overlays; h1 in hero, h2 for intro + CTA; lazy images below the fold; hero `fetchPriority="high"`.

## 5. Verification

- `npm run build` passes.
- `/testimonials` 200; exactly 6 real testimonials with real photos; every project name links to a real project page (200s); no legacy chrome (`role="banner"`/`contentinfo"` absent); stats show 4 real values.
- Screenshots desktop 1920 + mobile 390 → `interior-deoc-screenshot/testimonials-*.png`.
- Stop for owner review.