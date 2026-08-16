# Projects / Portfolio Index Page — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/page-05-projects-portfolio.md` (UI spec).
**Status:** Plan — waiting for "go" before coding.

---

## 1. What this page is

The Whitefire Interior **Projects / Portfolio index** at `/projects`:

- cinematic hero with real project photography;
- category filter chips;
- sort dropdown (newest / oldest / A–Z / Z–A);
- grid / list view toggle;
- 3-column image-led project card grid;
- pagination (9 per page → 18 real projects = 2 pages);
- dark consultation CTA band;
- shared SiteHeader (PROJECTS active) + SiteFooter.

**Data:** LIVE Sanity query (projectId `pzhistba`, dataset `production`). No new content is invented — only real fields are used.

---

## 2. Decisions already made (owner-confirmed)

| Question | Decision |
|---|---|
| Filter chips | Real Sanity room categories: **ALL PROJECTS · COMMERCIAL · LIVING ROOM · KITCHEN · HOME OFFICE · BEDROOM** (9+4+2+2+1 = 18) |
| Hero image | Real photo: **London Mayfair Townhouse** hero image (CDN) |
| Pagination | 9 per page (18 projects → page 1 = 9, page 2 = 9) |
| Card images | Each project's real **thumbnail**, re-cropped to 4:3 via CDN params (`cardUrl` in snapshot) |
| Sort | NEWEST/OLDEST by `completionDate`; A–Z / Z–A by title |
| View modes | Grid (default) + List (secondary) |
| Chrome | Framed stage pattern (same as services/about), shared SiteHeader/Footer, own header/footer rendered by the page, global legacy chrome hidden |
| Image rule | Thumbnail is each project's identity image (allowed reuse per IMAGE-USAGE-RULE.md); no other new images |

---

## 3. Page structure (top to bottom)

```
<div framed stage (E8E2D8 outer + 1440px panel F7F4EE)>
  SiteHeader (activePath="/projects")
  <main>
    PortfolioHero        — real hero photo, dark left gradient, eyebrow/title/copy/CTA
    PortfolioSection
      PortfolioToolbar   — chips + sort + grid/list toggle
      ProjectGrid        — 3-col grid of cards (or list rows)
      Pagination         — [←] [1] [2] [→]
    ConsultationCta      — dark band, constant copy + about_closing_dark_banner_table_vase.jpg
  </main>
  SiteFooter
```

---

## 4. Component details

### PortfolioHero
- Real hero image (London Mayfair Townhouse hero, CDN, high priority, `object-cover`, focal right).
- Overlay: `bg-gradient-to-r from-black/90 via-black/65 to-black/15` + subtle bottom gradient (same recipe as services hero).
- Copy (fixed, from spec):
  - eyebrow: `OUR PROJECTS`
  - title: `Spaces We're Proud Of` (serif, ~58–64px desktop)
  - body: "A curated selection of spaces that reflect our passion for timeless design and thoughtful detail."
  - CTA: `START YOUR PROJECT` → `/contact` (bronze filled)
- Height: `min-h-[430px]` desktop, `~390px` mobile.

### PortfolioToolbar
- **Chips** (buttons, `role="tab"` + `aria-selected`):
  `ALL PROJECTS` (default active, dark filled) · `COMMERCIAL` · `LIVING ROOM` · `KITCHEN` · `HOME OFFICE` · `BEDROOM` (light, hover bronze).
- **Sort**: native `<select>` `SORT BY: NEWEST / OLDEST / A–Z / Z–A` + ChevronDown, bordered ~130px.
- **View toggle**: two 38px bordered squares — Grid2X2 / List icons, active = dark filled.
- Mobile: chips horizontally scrollable; sort+view wrap to a second row.
- Any category change or sort change resets page to 1.

### ProjectCard (page-specific, in the route file)
Grid variant:
- `aspect-[4/3]`, `object-cover`, subtle hover scale `group-hover:scale-[1.03]`, dark bottom gradient overlay.
- Content bottom-left: bronze category (uppercase, e.g. `COMMERCIAL`, `LIVING ROOM`), serif white title, white location, `VIEW PROJECT →` bronze.
- Whole card = `<a href={/projects/{slug}}>`, focus-visible ring bronze.
- `loading` eager for first row, lazy below.

List variant:
- Horizontal row: 220px 4:3 image + right column (bronze category, serif title, location, VIEW PROJECT →), bordered light card.
- Same hover scale on image, arrow shift.

### Filtering / sorting / pagination (client-side)
- Loader returns all 18 projects (slug/title/location/category/completionDate/thumb). Filter+sort+page are React state in the route.
- Page slice: `(page-1)*9 .. page*9`. Pagination only shows when needed; arrows disabled at ends.
- Empty state (e.g. impossible with real data, but implemented): "No projects found." + VIEW ALL PROJECTS reset button.
- Category label map: `commercial → COMMERCIAL`, `living-room → LIVING ROOM`, `kitchen → KITCHEN`, `home-office → HOME OFFICE`, `bedroom → BEDROOM`.

### ConsultationCta
Same dark band as services index: eyebrow `HAVE A PROJECT IN MIND?`, title `Let's Create Something Extraordinary Together`, body, `SCHEDULE A CONSULTATION →` /contact, background `about_closing_dark_banner_table_vase.jpg` + dark overlay.

---

## 5. Data (Sanity loader)

GROQ (only card fields — no rich content):
```
*[_type == "projectPage"] | order(completionDate desc) {
  "slug": slug.current,
  title,
  location,
  category,
  "completionDate": completionDate,
  "thumb": thumbnail.asset->url
}
```
- Images: CDN URL + `?w=1280&h=960&fit=crop&crop=center&auto=format&q=85` (4:3) — added as `cardUrl` to `app/data/projects.json` snapshot AND derived in the loader (single source: `scripts/snapshot-sanity-projects.cjs` gets a `cardUrl` field; the route can also compute it from the raw asset URL to stay live).

Decision: **the route queries Sanity live** (like the legacy detail page does) rather than reading `projects.json` — the snapshot stays for services pages only. If the live query ever fails, keep the page shell + a restrained error block with TRY AGAIN.

Hero image: fixed constant in route = London Mayfair Townhouse hero URL (from snapshot `heroUrl`, with `?w=1920&h=880&fit=crop`).

---

## 6. Files to change

| File | Change |
|---|---|
| `app/routes/projects._index.tsx` | NEW — full portfolio index page (hero, toolbar, grid, pagination, CTA, meta) |
| `app/routes/projects.tsx` | stays as bare Outlet layout (no change) |
| `app/root.tsx` | `hideGlobalHeader` adds exact `/projects` and `startsWith("/projects/")` |
| `scripts/snapshot-sanity-projects.cjs` | add `cardUrl` (1280×960) to the snapshot |
| `app/data/projects.json` | regenerated (cardUrl added) |
| `PROJECTS-DESIGN.md` | this file |

**Reused:** SiteHeader, SiteFooter, PrimaryButton (CTA), framed-stage pattern, lucide-react (ArrowRight, ArrowLeft, ChevronDown, Grid2X2, List).

---

## 7. Meta / SEO

- Title: `Projects | Whitefire Interior`
- Description: "Explore Whitefire Interior's curated portfolio of residential, commercial, and hospitality interiors created with timeless design and thoughtful detail."
- OG: hero image URL.

---

## 8. Verification

1. `npm run build` passes.
2. `/projects` → 200; header PROJECTS active; old global chrome absent.
3. Curl check: hero copy, 18 cards, chips, sort options, pagination 2 pages, CTA copy.
4. Screenshots (1920 desktop + mobile ~390) → `/home/lordwhitefire/interior-deoc-screenshot/`.
5. Filter/sort/toggle/pagination click-through via Playwright.

---

## 9. Out of scope

- Sanity filtering/pagination server-side (client-side is fine for 18 items; revisit if dataset grows).
- The global `SiteStage` shared component (existing framed-stage pattern already fulfills the >1920px requirement).
- Fixing home page links to dead project slugs (tracked separately; the detail rewrite + new index are the real fix target).

**Ready to implement on "go".**