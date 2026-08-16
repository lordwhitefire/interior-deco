# ACCESSIBILITY-PLAN.md

- Source-of-truth: this file + `PLAN-WORKFLOW.md` rules.
- Goal: make the site keyboard-navigable and structurally sound for assistive tech, without touching colors, the carousel, motion settings, or any existing links.

## User decisions (explicit)

1. Search icon (header, links to nonexistent /search → 404): **remove it** (icon + `showSearch` prop).
2. Header/footer: **full refactor** into `root.tsx` (single shared landmarks). **NO skip-to-content button.**
3. Testimonials carousel (home Swiper): **do not touch** — no modules, no keyboard, no motion changes.
4. Projects category tabs (`projects._index.tsx`): **add arrow-key navigation** (Left/Right/Home/End) + tabpanel wiring.
5. Mobile menu: add `aria-controls`/`id` + Escape-to-close.
6. Contact form `FormField`: add `htmlFor`/`id` association so labels connect to inputs.
7. Blog author social icons (`href="#"`): **keep them as-is** — no removal, no changes.
8. Reduced motion: **nothing added** — no `prefers-reduced-motion` rules, nothing that disables animations/transitions.
9. Colors: **do not touch** — contrast findings are documented below only, never fixed by color changes.
10. Add `eslint-plugin-jsx-a11y` (dev dependency) and enable its recommended rules.

## Files to change

| File | Change |
|---|---|
| `app/root.tsx` | Render `<SiteHeader/>` + `<main id="main">` + `<SiteFooter/>` once; compute `activePath` from `useLocation()`; drop `showSearch` |
| `app/components/whitefire/SiteHeader.tsx` | Remove search icon + `showSearch` prop; mobile nav: `id="mobile-menu"` + `aria-controls` on toggle; Escape closes menu (keydown effect) |
| All 19 route files (`app/routes/*.tsx`) | Delete `<SiteHeader …/>` and `<SiteFooter/>` instances + their imports (26 references) |
| `app/routes/projects._index.tsx` | Tabs: roving `tabIndex`, `onKeyDown` (ArrowLeft/Right/Home/End), `aria-controls`, `role="tabpanel"` labelled by active tab |
| `app/routes/contact.tsx` | `FormField`: generate `id` from label, add `htmlFor` on label |
| `app/tailwind.css` | Add global `:focus-visible` outline (additive only — does not remove anything) |
| `package.json` | Add `eslint-plugin-jsx-a11y` dev dependency |
| `.eslintrc.cjs` | Extend `plugin:jsx-a11y/recommended`; fix errors it surfaces |

## Page structure

- `root.tsx` owns: header (nav landmark) → main (#main) → footer. Every page inherits it; routes contain only page content.
- SiteHeader desktop nav unchanged (all 9 links + GET IN TOUCH), search icon removed.
- Projects page keeps its tablist → tabpanel structure; sort select and grid/list toggle unchanged.

## Image / alt status

- Alt text is already in place everywhere (Sanity `alt` with fallbacks; decorative images use `alt=""`). No changes planned.

## Contrast findings (documented only — not fixed, per decision 9)

- White text on gold buttons (#B89558 / #9A7950): ≈ 2.8:1 (AA needs 4.5:1).
- Gold eyebrow text #9A7A4A on cream #F7F4EE: ≈ 3.6:1 at 10px.
- Meta gray #777066 on cream: ≈ 4.5:1 (borderline).
- Gold-on-dark and body text pairs pass.

## Verification

1. `npx tsc --noEmit` + `npm run lint` + `npm run build` — clean.
2. Restart server (serve.sh); all 51 URLs return 200 (no layout regression: header stays fixed, heroes keep their top padding).
3. Keyboard walkthrough checklist (manual):
   - Tab from top: header links reachable, focus highlight visible on every link/button.
   - Mobile menu: open with button, Escape closes, `aria-controls` wired (narrow viewport).
   - `/projects`: arrow keys move between category tabs, Enter/Space activate, panel updates.
   - `/contact`: clicking a label focuses its input; Tab order through all fields + submit.
4. Confirm carousel, social icons, and all colors are byte-identical (no changes made).

## Status

- [x] All implementation steps done; tsc/lint/build clean; 49/49 sitemap URLs 200;
      single header/footer/main with `id="main"`; search icon gone; tabs wired;
      contact labels linked
- [ ] Manual keyboard walkthrough (browser) + commit to main
