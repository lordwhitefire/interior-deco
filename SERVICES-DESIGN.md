# Services Page Design — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/whitefire-services-ui-implementation(1).md` (the updated Services UI spec).

**Goal:** build the Services page (`/services`) to match the spec exactly, using the same shared components and framed-stage look as Home and About.

**User decisions:**
- No fade/gradient at the grid → CTA edge. Straight edge, exactly per spec.
- CTA is dark near-black `#171511` (not brown).
- No dark overlay on the CTA image (spec verbatim: `opacity-90`, image must be naturally dark).
- Reuse existing local assets for all 10 images (no new images needed).
- Shared minimal dark `SiteFooter` (same as Home/About), not the spec's light multi-column footer.

---

## 1. Files to change

| File | Change |
|---|---|
| `app/routes/services._index.tsx` (NEW) | The full Services page: `ServicesHero`, `ServicesIntroduction`, `ServicesGrid` (8 cards), `ServicesCTA` + `CTAValue`. Types and data verbatim from spec §5–6. Meta per spec §19. |
| `app/components/whitefire/SiteHeader.tsx` | Add `variant: "services"`: solid near-black header `bg-[#0D0C0A]`, 76px tall, SERVICES active (bronze + underline), search icon, GET IN TOUCH, mobile menu. |
| `app/root.tsx` | `hideGlobalHeader` also hides the old nav/footer on `/services`. |

No other files change. No new dependencies.

## 2. Page structure (spec verbatim)

```
SiteHeader (solid dark, SERVICES active)
  ↓
ServicesHero — dark cinematic photo, left overlay, H1 "Designing Spaces That Inspire", SCHEDULE A CONSULTATION button
  ↓
ServicesIntroduction — centered: WHAT WE DO / "Comprehensive Interior Design Services" + paragraph
  ↓
ServicesGrid — 8 cards: 4×2 desktop, 2×4 tablet, 1×8 mobile
  ↓
ServicesCTA — dark #171511 band, 3 columns (30% image | 42% text | 28% value points), GET IN TOUCH button
  ↓
SiteFooter — shared minimal dark footer
```

No extra sections. No fade at any section boundary.

## 3. Service cards

- Thin border, no rounded corners, rectangular.
- Image on top (ratio ~1.48:1), circular bronze number badge (01–08) overlapping top-left.
- Serif title, small description, `LEARN MORE →` with bronze arrow.
- Hover: image scales slightly, card gets soft shadow, arrow slides right.

## 4. Image mapping (existing local assets)

| Slot | Asset |
|---|---|
| Hero | `living_design.jpg` |
| 01 Interior Design | `interior_design.jpg` |
| 02 Space Planning | `kitchen_design.jpg` |
| 03 Custom Furniture | `modern_cupboard.jpg` |
| 04 Renovation | `sylish_kitchen.jpg` |
| 05 Styling & Decor | `Concept.jpg` |
| 06 Material Selection | `Ideas.jpg` (fallback pick — no obvious match; confirm visually, easy to swap) |
| 07 Lighting Design | `modern_reading.jpg` |
| 08 Project Management | `project1.jpg` |
| CTA | `about_closing_dark_banner_table_vase.jpg` |

The agent cannot see images, so the user confirms visually from the screenshot and asks for swaps if needed.

## 5. Verification

1. `npm run build` succeeds.
2. `tsc --noEmit`: no new errors in changed files.
3. curl `/services`: spec copy present, SERVICES active, old global nav/footer absent.
4. Full-page 1920px screenshot (Playwright + system Chrome) → `/home/lordwhitefire/interior-deoc-screenshot/`.
5. Home and About unchanged.
