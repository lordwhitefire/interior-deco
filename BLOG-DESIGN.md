# Blog Index Page — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/PAGE_07_BLOG_UI_IMPLEMENTATION_PACKAGE.md` (UI spec).
**Status:** Plan — waiting for "go" before coding.

---

## 1. What this page is

The Whitefire Interior **Blog index** at `/blog`:

- dark cinematic hero (eyebrow `OUR BLOG` + serif `Design Inspiration & Expert Insights`);
- two-column editorial content area;
- three-column grid of six article cards;
- right sidebar: search, categories with counts, featured post, dark newsletter card;
- compact pagination (`1 2 3 ... NEXT`);
- split editorial philosophy CTA above the footer;
- shared SiteHeader (BLOG active) + **original SiteFooter (unchanged)**.

**Data:** VERBATIM build from the design package — static mock data in `app/data/blogMock.ts`. **No Sanity.** Local images only. CMS wiring comes later (owner's next instruction).

---

## 2. Decisions already made (owner-confirmed)

| Question | Decision |
|---|---|
| Data source | Static mock (design package §6 content), no Sanity — structure-first build |
| Routes | Rewrite existing `app/routes/blog.tsx` (old Sanity blog page is replaced); legacy `/blogs/...` routes stay untouched |
| Footer | **Original `SiteFooter` (tiny dark placeholder) — NOT the package's 5-column ivory footer** (owner instruction) |
| Header | Shared `SiteHeader` with `activePath="/blog"` (BLOG active, gold underline); page renders its own header over the hero |
| Stage | Same framed 1440px pattern as services/projects (`#E8E2D8` outer + `#F7F4EE` panel + hairline shadow) |
| Legacy chrome | Add `/blog` + `/blog/*` to `hideGlobalHeader` in `root.tsx` |
| Search | Client-side filter on mock data via `?q=` GET form (integration point, no backend) |
| Categories | `?category=` links with bronze active state (mock slugs + counts) |
| Pagination | `?page=` param; UI verbatim (1, 2, 3, …, NEXT); with only 6 mock articles, pages 2–3 show the designed "No articles found" empty state |
| Newsletter | Client-side mock states (idle/submitting/success/error + validation); Mailchimp API is NOT working, so no real call — dev server runs with fake env (`MAILCHIMP_API_KEY=dummy-us1 MAILCHIMP_LIST_ID=dummy`) so nothing crashes |
| Other article slugs (detail) | Fake links — cards link to `/blog/{slug}`, every slug renders the detail layout (structure first); only bold-patterns has real body copy, others reuse it as placeholder |
| Image rule | No new downloads; each role gets a distinct local image; featured post intentionally reuses card-1 image (design-sanctioned); no other reuse |

---

## 3. Page structure (top to bottom)

```
<div framed stage (E8E2D8 outer + 1440px panel F7F4EE)>
  SiteHeader (activePath="/blog")
  <main>
    BlogHero            — dark image, left gradient, OUR BLOG eyebrow, serif title, supporting copy
    BlogContentSection  — 1440px, main (72%) + sidebar (28%), gap ~40px
      MainColumn
        h2 "Latest Articles"
        BlogArticleGrid — 3-col desktop / 2-col tablet / 1-col mobile (6 ArticleCards)
        BlogPagination  — [1] [2] [3] [...] [NEXT]
      Sidebar (~270px)
        BlogSearch      — GET form, ?q=, "Search articles..."
        BlogCategories  — CATEGORIES eyebrow, name + count rows, thin dividers
        FeaturedPostCard— reuses article 1 (kitchen) image, READ ARTICLE →
        NewsletterCTA   — dark card, Stay Inspired, email + SUBSCRIBE
    BlogPhilosophyCTA   — 46/54 image/text split, OUR PHILOSOPHY, LEARN MORE ABOUT US → /about
  </main>
  SiteFooter (original, unchanged)
```

---

## 4. Component details

### BlogHero
- `min-h-[350px]` desktop, `min-h-[320px]` mobile, `pt-[68px]` for the header.
- Full-bleed local image (`object-cover`), left-to-right dark gradient overlay.
- Eyebrow: 10px uppercase tracked bronze `OUR BLOG`.
- Title: serif, 42→62px, `Design Inspiration & Expert Insights`.
- Copy: 13–14px white/85, the exact package sentence.

### ArticleCard
- Whole card links to `/blog/{slug}` (new detail route).
- Thin warm-gray border (`#DDD8D0`), ivory body (`#FAF8F4`), no rounding.
- Image `aspect-[1.45/1]`, `object-cover`, hover scale 1.025 over 500ms, `motion-reduce` respected.
- Category (9px bronze uppercase), serif title 20px, excerpt 12px, meta row (date • read time, 8px tracked).

### BlogSearch
- `Form method="get" role="search"`, sr-only label, 40px input, placeholder `Search articles...`, search icon button right.
- Filters mock articles by title/excerpt/category (client-side), preserves `category`/`page` params.

### BlogCategories
- Mock list with counts: All Articles 24 · Interior Design 8 · Kitchen Design 4 · Bathroom Design 3 · Bedroom Design 3 · Design Trends 4 · Design Advice 2.
- Rows `divide-y`, name left / count right, active = bronze + `aria-current="page"`; "All Articles" → `/blog`.

### FeaturedPostCard
- Article 1 (Kitchen Design / Bold Patterns…, May 6 2024, 5 MIN READ) with its image, `READ ARTICLE →`, links to detail.

### NewsletterCTA
- Dark card (`#181716`), serif `Stay Inspired`, description, email input, bronze filled SUBSCRIBE, privacy line.
- States: idle → submitting (450ms) → success (`role="status"`); invalid email → error (`role="alert"`).

### BlogPagination
- Square/rectangular controls, `h-9`, gap 10px; active page dark filled, others outlined; ellipsis span; NEXT (with arrow) when `currentPage < totalPages`.
- `href(page)` preserves `q` + `category`.

### BlogPhilosophyCTA
- `lg:grid-cols-[46%_54%]`; image left (min-h 160px desktop / 220px mobile), content right.
- Eyebrow `OUR PHILOSOPHY`, serif `Timeless Design. Thoughtful Spaces. Inspired Living.`, body copy, `LEARN MORE ABOUT US →` → `/about`.

---

## 5. Mock data (app/data/blogMock.ts)

- 6 articles exactly from the package: slugs `bold-patterns-balanced-spaces-in-kitchens`, `neutral-tones-lasting-impressions`, `the-return-of-natural-materials`, `creating-a-restful-retreat-bedroom-design-tips`, `spa-worthy-bathrooms-at-home`, `how-to-style-shelves-like-a-designer` with title/excerpt/date/readTime/category.
- `categories`, `featuredArticle`, `pagination {1, 3}`, `philosophy` verbatim.
- Shared with the detail page route.

---

## 6. Image mapping (local assets, no downloads)

Only the **8 remaining blog images** (of the 14) are used — the 6 already used on the home page (`blog-2`, `blog-3`, `blog-5`, `blog-6`, `blog-7`, `Blog.jpeg`) and about/services identity images are NOT touched. Every role below is one of the 8 unused files, each used once:

| Role | File |
|---|---|
| Blog hero | `kitchen_design.jpg` |
| Card 1 Kitchen + Featured (reuse, sanctioned) | `blog-details-banner.jpg` |
| Card 2 Neutral living | `Blog-1.jpeg` |
| Card 3 Natural materials | `blog-4.jpeg` |
| Card 4 Bedroom retreat | `blog-details-2.jpeg` |
| Card 5 Spa bathroom | `Ideas.jpg` |
| Card 6 Styled shelves | `interior_design.jpg` |
| Philosophy CTA | `blog-details-1.jpeg` |

The detail page reuses this same pool (all 8 already used once → reuse allowed per IMAGE-USAGE-RULE). Subjects inferred from filenames (model cannot view images); swaps possible after screenshots.

---

## 7. Interactions / a11y / SEO

- Cards keyboard-accessible with visible focus; `aria-current="page"` on active nav + pagination; menu `aria-expanded` (existing SiteHeader).
- One h1 (hero), h2 sections, h3 card titles.
- Meta: `Blog | Whitefire Interior`, description + OG (hero image).
- Hero eager/high priority; all below-fold images lazy.
- Mobile: single column, sidebar stacks below grid, pagination wraps, no horizontal overflow.

---

## 8. Verification

1. `npm run build`.
2. Dev server (`MAILCHIMP_API_KEY=dummy-us1 MAILCHIMP_LIST_ID=dummy`), curl `/blog`: 200, hero copy, 6 cards, sidebar modules, pagination, philosophy CTA, footer; no legacy `role="banner"/contentinfo`.
3. Screenshots desktop 1920 + mobile 390 → `/home/lordwhitefire/interior-deoc-screenshot/`.
4. Stop and wait for owner's next instruction.