# Blog Detail Page — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/page-08-blog-detail-bold-patterns.md` (UI spec).
**Status:** Plan — waiting for "go" before coding.

---

## 1. What this page is

The Whitefire Interior **blog article page** at `/blog/{slug}`:

- dark cinematic article hero (breadcrumbs, category, serif title, excerpt, meta row);
- two-column editorial layout: article column (65–68%) + sidebar (28–30%);
- wide lead image, intro copy, 4 numbered sections with inline 2- and 3-image groups;
- share bar (Facebook/Pinterest/X/LinkedIn/Email);
- previous/next post navigation;
- sidebar: About the Author, Categories, Recent Posts, dark newsletter card;
- shared SiteHeader (BLOG active) + **original SiteFooter (unchanged)**.

**Data:** VERBATIM build from the design package — static mock data (shared `app/data/blogMock.ts`). **No Sanity.** Local images only.

---

## 2. Decisions already made (owner-confirmed)

| Question | Decision |
|---|---|
| Route | NEW `app/routes/blog.$slug.tsx` (cards link here); legacy `/blogs/...` routes untouched |
| Data | Static mock; full body content only exists for bold-patterns (package §6) |
| Other 5 slugs | Fake links — every card links to `/blog/{slug}` and every slug renders the full PAGE_08 layout with that article's own hero/category/date/readTime, reusing the 4-section body as visible placeholder (structure first, owner-confirmed); CMS wiring replaces content later |
| Footer | **Original `SiteFooter` (tiny dark placeholder) — NOT the package's 5-column ivory footer** (owner instruction) |
| Header | Shared `SiteHeader` `activePath="/blog"`; page renders its own header over the hero |
| Stage | Same framed 1440px pattern as services/projects |
| Legacy chrome | Add `/blog/*` to `hideGlobalHeader` in `root.tsx` (covered with `/blog` in BLOG-DESIGN.md) |
| Breadcrumbs | Shared `Breadcrumbs` component, dark variant: Home / Blog / title |
| Newsletter | Client-side mock states only (Mailchimp API not working — no real call; fake env vars keep dev server alive) |
| Unknown slug | 404 (only the 6 mock slugs resolve) |
| Meta/SEO | Title `{title} | Whitefire Interior` + package description; hero image as OG |

---

## 3. Page structure (top to bottom)

```
<div framed stage (E8E2D8 outer + 1440px panel F7F4EE)>
  SiteHeader (activePath="/blog")
  <main>
    BlogDetailHero     — dark hero image, breadcrumbs, category eyebrow, serif title, excerpt, meta row
    MainArticleShell   — 1320px grid 2.15fr / 0.95fr, gap 48–60px
      ArticleColumn
        LeadImage      — 16:8, eager + high priority
        BlogArticleBody— intro paragraphs + 4 numbered sections + inline image groups + final statement
        ShareBar       — divider, "Share this article", 5 square buttons
        PreviousNextPosts — prev "Style Shelves", next "Return of Natural Materials" (thumb + text)
      BlogSidebar
        AuthorCard     — ABOUT THE AUTHOR, 66px square W mark, bio, socials
        CategoryList   — same 7 categories + counts (right-aligned)
        RecentPosts    — 4 thumb rows (Natural Materials / Restful Retreat / Spa Bathrooms / Style Shelves)
        NewsletterCard — dark, Stay Inspired, email + SUBSCRIBE
  </main>
  SiteFooter (original, unchanged)
```

---

## 4. Component details

### BlogDetailHero
- `min-h-[350px]`, image `object-cover`, left-to-right charcoal gradient (0.92→0.15).
- Breadcrumbs: `Home / Blog / {category}` (light text over dark).
- Category eyebrow 10px bronze uppercase; serif title 39→51px (wraps `Bold Patterns, / Balanced Spaces / in Kitchens` naturally on desktop, no forced breaks).
- Excerpt 13–14px white/90; meta row: Clock3 date · Clock3 read time · UserRound `By {author}` (10px, white/80).

### BlogArticleBody
- Two intro paragraphs (package §8) 14px/1.7 charcoal.
- Sections: serif h2 18px `{n}. {title}`, paragraphs 14px/1.7, then image groups:
  - Section 1 → 2 columns (`grid-cols-2`), gap 1.5;
  - Sections 2–3 → 3 columns (`grid-cols-3`);
  - Section 4 → text only.
- Inline images `aspect-[1.5/1]`, `object-cover`, lazy.
- Mobile: all groups collapse to 1 column, order preserved.

### ShareBar
- `border-y`, py 3.5; label `Share this article`; 5 square 28px buttons with `aria-label`; external links `target="_blank" rel="noreferrer"`; email uses `mailto:`.

### PreviousNextPosts
- Two side-by-side links (stack on mobile): prev left (ChevronLeft + thumb 68×54 + title), next right (mirrored). Serif titles 13px, bronze hover.

### BlogSidebar
- **AuthorCard:** 66×66 black square with serif `W`, name `Whitefire Interior`, bio, Instagram/Pinterest/LinkedIn icons.
- **CategoryList:** rows name/count, count right-aligned, bronze hover.
- **RecentPosts:** 4 rows, thumb 66×56, serif title 13px, date 9px, links to detail slugs.
- Thin `#D9D4CC` dividers between modules.

### NewsletterCard
- Dark `#171717`, serif `Stay Inspired` 25px, description, email input (required), bronze filled SUBSCRIBE, `role="status"` success message, privacy line.

---

## 5. Mock data (app/data/blogMock.ts)

- 6 articles (shared with blog index): slug/title/excerpt/date/readTime/category/image.
- `bold-patterns-balanced-spaces-in-kitchens` carries the full detail payload: hero + lead images, meta (May 6 2024 · 5 min read · Whitefire Interior), author, 4 sections (Start with a Statement / Balance with Neutrals / Layer in Texture / Keep It Personal) with paragraph + image lists, categories, 4 recent posts, previous (`how-to-style-shelves-like-a-designer`) + next (`the-return-of-natural-materials`).
- Other slugs render with their own hero data + the same body as placeholder.

---

## 6. Image mapping (local assets, no downloads)

Reuses the same **8 remaining blog images** from the index (all used once there → reuse allowed per IMAGE-USAGE-RULE). No home-page images, no about/services identity images:

| Role | File |
|---|---|
| Detail hero | `blog-details-banner.jpg` |
| Lead 16:8 | `kitchen_design.jpg` |
| Section 1 (2 imgs) | `blog-details-1.jpeg`, `blog-details-2.jpeg` |
| Section 2 (3 imgs) | `interior_design.jpg`, `Ideas.jpg`, `Blog-1.jpeg` |
| Section 3 (3 imgs) | `blog-4.jpeg`, `interior_design.jpg` (reuse), `Blog-1.jpeg` (reuse) |
| Recent posts thumbs | reuse card images: `blog-4.jpeg` (natural materials), `blog-details-2.jpeg` (bedroom), `Ideas.jpg` (bathroom), `interior_design.jpg` (shelves) — reuse sanctioned by package §12 |
| Prev/next thumbs | reuse `interior_design.jpg` + `blog-4.jpeg` (same assets as recent rows, sanctioned) |
| Author mark | Text `W` block — no image |

Subjects inferred from filenames (model cannot view images); swaps possible after screenshots.

---

## 7. Interactions / a11y / SEO

- Semantic: header/nav/main/article/aside/section/footer; h1 hero, h2 sections, h2 sidebar modules.
- Visible focus rings; newsletter error `role="alert"`, success `role="status"`.
- Hero + lead eager/high priority; inline + thumbnails lazy.
- Meta per package §19: title, description, canonical slug, OG (title/excerpt/image), `BlogPosting` structured data noted for later.
- Mobile: hero 380–430px, one column, sidebar after article, inline groups 1-col, prev/next stack, no horizontal overflow.

---

## 8. Verification

1. `npm run build`.
2. Dev server (`MAILCHIMP_API_KEY=dummy-us1 MAILCHIMP_LIST_ID=dummy`), curl:
   - `/blog/bold-patterns-balanced-spaces-in-kitchens` → 200, hero/meta, lead, 4 sections, 2- and 3-col groups, share bar, prev/next, sidebar modules;
   - `/blog/neutral-tones-lasting-impressions` → 200 placeholder;
   - `/blog/does-not-exist` → 404;
   - no legacy `role="banner"/contentinfo`.
3. Screenshots desktop 1920 + mobile 390 → `/home/lordwhitefire/interior-deoc-screenshot/`.
4. Stop and wait for owner's next instruction.