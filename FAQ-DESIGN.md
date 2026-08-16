# FAQ Page (PAGE_10) — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/page-10-faq-ui-implementation-package.md`.
**Status:** Approved — building.

---

## 1. What this page is

Whitefire Interior FAQ at `/faq`:

- dark photographic hero (real `faqPage.heroBackgroundImage`, left overlay, eyebrow `FAQ`, serif h1 `Answers to Common Questions`, gold divider, description);
- ivory main area: left rail (`CATEGORIES` nav + "Still Have Questions?" card + 4:5 supporting image) · 1px divider · FAQ content (groups of accordion items);
- dark split consultation CTA (`READY TO START YOUR PROJECT?` / `Let's Create Something Beautiful Together` / `SCHEDULE A CONSULTATION` → /contact);
- shared `SiteHeader` (FAQ active — FAQ added to the global nav) + **original tiny `SiteFooter`**.

## 2. Data (real, owner-approved)

- Loader fetches real `faqPage` doc (hero image) and all 50 real `faqItem` docs (`question`, `answer`, `category->title`, `displayOrder`).
- **Items are capped per category with a 2–4 mix (owner requirement); Service & Process category removed from the page (owner):** Design & Consultation 3 · General Questions 4 · Pricing & Timeline 2 · Project Related 4 → 13 items total, first items by `displayOrder`. Sidebar counts show the capped numbers; `All Questions` total = 13.
- Sidebar category buttons show real counts; `All Questions` (50) is the default; selecting a category filters groups and closes open items; empty state shown if a category has no items.
- Category group order follows the Sanity category docs' creation order (fetched and fixed at build time).
- Copy (hero/CTA/contact card text) is the package's representative Whitefire copy.
- `meta`: `FAQ | Whitefire Interior` + package description.

## 3. Images

| Slot | Source |
|---|---|
| Hero | **Real `faqPage.heroBackgroundImage`** (the page's own hero, `w=1920&h=880`) |
| Sidebar (4:5) | Unused pool (1) — `w=800&h=1000` |
| CTA | Unused pool (1) — `w=1280&h=720` |

Pool accounting: **2 used → ~92 remain**.

## 4. Components (page-specific, inside `app/routes/faq.tsx`)

- `FAQHero` — split dark hero.
- `FAQCategoryNavigation` — desktop sidebar buttons (`aria-pressed`, active warm-taupe `#ebe7e1`, right-aligned counts); mobile becomes a horizontally scrollable row.
- `ContactPromptCard` — `Still Have Questions?` + `CONTACT US →` (/contact).
- `FAQSection` — serif group heading + bordered item list (border-t, border-b per item, thin `#d8d4ce`).
- `AccordionItem` — native `<button>` trigger with `aria-expanded` + `aria-controls`, `role="region"` answer panel, Plus↔Minus (14px), `grid-rows-[1fr]↔[0fr]` 300ms animation, visible focus ring; multiple items may be open at once.
- `ConsultationCTA` — 50/50 split (image left, charcoal right).
- `useState` only; `useMemo` for filtered groups; no load-more button (package: none visible); no new dependencies.

## 5. Verification

- `npm run build` passes.
- `/faq` 200; 13 real questions render collapsed (3/4/2/4 per category, no Service & Process); categories filter correctly; accordion opens/closes (aria-expanded toggles, plus→minus); "All Questions" restores everything; no legacy chrome; FAQ link active in header.
- Screenshots desktop 1920 + mobile 390 → `interior-deoc-screenshot/faq-*.png`.
- Stop for owner review.