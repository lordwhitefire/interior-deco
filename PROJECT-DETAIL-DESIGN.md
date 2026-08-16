# Project Detail Page — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/page-06-project-detail-amsterdam-jordaan-flower-shop.md` (UI spec).
**Status:** Plan — waiting for "go" before coding.

---

## 1. What this page is

The Whitefire **project case-study detail page** at `/projects/:slug` (all 18 real Sanity slugs). Editorial, cinematic, image-led:

- shared SiteHeader (PROJECTS active) over a dark cinematic hero;
- breadcrumbs (Home / Projects / title);
- project eyebrow + large serif title + description;
- gallery CTAs (VIEW PROJECT GALLERY → #gallery + circular VIEW ALL PHOTOS);
- project facts band (Location / Category / Completed / Size);
- "About the Project" story section (text + big editorial image);
- five-plus-image gallery strip with lightbox;
- highlights band: Our Solution / The Process / Materials & Finishes (with color swatches);
- dark project CTA band;
- shared SiteFooter.

**This page fully REPLACES the legacy `projects.$projectid.tsx`** (801 lines, old global chrome, carousel, related-projects section — all dropped per owner decision).

---

## 2. Decisions already made (owner-confirmed)

| Question | Decision |
|---|---|
| Story section content | Story body = the real **challenge** prose field ("About the Project") |
| Highlights band | 3 columns: **Our Solution** (real `solution`) · **The Process** (real `process` string) · **Materials & Finishes** (real `materials[]` list + real `colorPalette[]` hex swatches) |
| Related projects | DROPPED (page ends with the dark CTA band, per spec structure) |
| Legacy page | Full rewrite in place (same route file, same URL) |
| Data | Live Sanity loader (same client config as legacy) |
| 404 | Unknown slug → 404 (not a silent Amsterdam render) |
| Images | Hero = real `heroImage`; story image = real `thumbnail`; gallery = all 12 real gallery images with captions; CTA = constant shared image |
| Facts | Location = real `location` · Category = real `category` (display name) · Completed = real `completionDate` formatted (e.g. "March 2025") · Size = real `squareFootage` + " sq ft" |

---

## 3. Real Sanity fields used (verified on amsterdam-jordaan-flower-shop)

| Field | Example value | Used for |
|---|---|---|
| `title` | "Amsterdam Jordaan Flower Shop" | Hero title, breadcrumbs, meta |
| `slug` | "amsterdam-jordaan-flower-shop" | Route |
| `location` | "Jordaan, Amsterdam" | Fact: Location |
| `category` | "commercial" | Eyebrow ("Commercial Project"), Fact: Category |
| `completionDate` | "2025-03-05" | Fact: Completed (formatted "March 2025") |
| `squareFootage` | 640 | Fact: Size ("640 sq ft") |
| `challenge` | "17th-century canal house with 1.8 m beams and no refrigeration." | Story body |
| `solution` | "Steel rail system for 200 hanging vases, reclaimed brick cold-wall, and a 5 m skylight…" | Highlight: Our Solution |
| `process` | "Beam reinforce → steel rails → brick cold-wall → skylight hinge → final bloom." | Highlight: The Process |
| `materials` | ["Hot-rolled steel","Reclaimed Dutch brick","Tempered glass","Copper pipes"] | Materials description (joined with ", ") |
| `colorPalette` | ["#2C2C2C","#D4A574","#F5F5F0","#8B7355"] | Material swatch circles (hex, title=hex) |
| `heroImage` | asset ref | Hero photo (priority) |
| `thumbnail` | asset ref | Story editorial image (lazy) |
| `gallery` | 12 items with `caption`, `isFeatured` | Gallery strip + lightbox (captions shown) |
| `metaTitle` / `metaDescription` | exist | SEO meta |

All 18 projects verified to have hero + thumbnail. Every project has 12 gallery images.

---

## 4. Page structure (top to bottom)

```
<div framed stage (E8E2D8 outer + 1440px panel)>
  <main>
    ProjectHero        — dark cinematic hero, SiteHeader over it, breadcrumbs,
                         category eyebrow, serif title, description,
                         gold VIEW PROJECT GALLERY CTA, circular VIEW ALL PHOTOS
    ProjectOverview    — facts band: Overview text (challenge) + 4 facts (2×2 mobile, 4-up desktop)
    ProjectStory       — "About the Project" / serif story title / body / editorial image (1.7:1)
    ProjectGallery     — 12 images, 5-col desktop grid (wraps), mobile snap-scroll, lightbox
    ProjectHighlights  — 3 columns: Solution · Process · Materials (+ swatches)
    ProjectCta         — dark band, title/description/GET IN TOUCH, constant CTA image
  </main>
  SiteFooter
</div>
```

SiteHeader sits INSIDE the hero section (absolute over the dark image, like service detail heroes) with `activePath="/projects"`.

---

## 5. Component details

### ProjectHero
- `min-h-[560px]` desktop; hero image full-bleed `object-cover`, priority loading.
- Overlay: `bg-[linear-gradient(90deg,rgba(5,5,4,.94),rgba(5,5,4,.72)_30%,rgba(5,5,4,.30)_65%,rgba(5,5,4,.48))]`.
- Breadcrumbs: Home → Projects → {title} (shared `Breadcrumbs` component, dark variant).
- Eyebrow: `{Category} Project` (e.g. "Commercial Project", "Living Room Project") in bronze.
- Title: serif 42→64px, supports `\n` line breaks (none in real titles — single line is fine).
- Description: from loader = `challenge` prose (it IS the project description).
- Primary CTA: `VIEW PROJECT GALLERY →` gold, anchor `#gallery`.
- Circular `VIEW ALL PHOTOS` (Camera icon) bottom-right on desktop, anchor `#gallery`.

### ProjectOverview (facts band)
- Left column: `PROJECT OVERVIEW` eyebrow + overview text (= challenge).
- Right: 4 facts (MapPin Location / Tags Category / CalendarDays Completed / Ruler Size), icon bronze 24px, thin column dividers, 4-up desktop, 2×2 mobile.

### ProjectStory
- Left: `ABOUT THE PROJECT` eyebrow + serif heading + story body (= challenge) + outlined `THE DESIGN APPROACH` link → `#design-approach` (highlights band).
- Right: editorial image (thumbnail, `aspect-[1.7/1]`, lazy).

### ProjectGallery
- Section `id="gallery"`; `md:grid md:grid-cols-5` (12 images → rows of 5/5/2), gap ~6px; mobile horizontal snap-scroll (`min-w-[205px]`).
- Each thumb = button (opens lightbox at index), `aspect-[1.05/1]` cover, hover scale 1.025.
- **Lightbox** (`role="dialog" aria-modal`): black/90 backdrop, click-backdrop closes, X close, ChevronLeft/Right prev/next, Escape + ArrowLeft/ArrowRight keys, counter `n / 12`, image `max-h-[88vh]` contain. Focus/keyboard handled with a `useEffect` keydown listener.

### ProjectHighlights
- 3 columns with thin dividers, bronze icons (Lightbulb for solution? mapping: Our Solution = Sparkles, The Process = Lightbulb, Materials = Sparkles — keep 2 icons per spec: lightbulb + sparkles).
- Materials block: 5 swatch circles max (real palettes have 4–6 hexes; render all), `title={hex}` `aria-label`, then materials list joined with ", ".
- The band carries `id="design-approach"` (target of story CTA).

### ProjectCta
- Dark band (like services ConsultationCta): title "Have a Project in Mind?", body, `GET IN TOUCH →` /contact gold button, right-side image `about_closing_dark_banner_table_vase.jpg` with gradient overlay.

---

## 6. Loader

Live Sanity query per slug:
```
*[_type == "projectPage" && slug.current == $slug][0] {
  title, location, category, completionDate, squareFootage,
  challenge, solution, process, materials, colorPalette,
  metaTitle, metaDescription,
  "heroImage": heroImage.asset->url,
  "thumbnail": thumbnail.asset->url,
  "gallery": gallery[] { "url": asset->url, caption }
}
```
- `!project` → `throw new Response("Not found", { status: 404 })` (existing app 404 behavior).
- URL params appended at render: hero `?w=1920&h=880&fit=crop`, story `?w=1280&h=754&fit=crop` (1.7:1), gallery thumbs `?w=640&h=610&fit=crop&crop=center` (≈1.05:1), lightbox `?w=1920&h=1080&fit=min`.
- Date formatting: `completionDate` → "March 2025" (intl/`toLocaleDateString` with month+year, no external dep).
- Category display map: `commercial → Commercial`, `living-room → Living Room`, `kitchen → Kitchen`, `home-office → Home Office`, `bedroom → Bedroom`.

---

## 7. Files to change

| File | Change |
|---|---|
| `app/routes/projects.$projectid.tsx` | FULL REWRITE — new implementation per this plan (legacy chrome/carousel/related removed) |
| `app/root.tsx` | `hideGlobalHeader` adds exact `/projects` and `startsWith("/projects/")` (so the new index AND detail pages show no legacy chrome) |
| `PROJECT-DETAIL-DESIGN.md` | this file |

**Reused:** SiteHeader, SiteFooter, Breadcrumbs (dark), framed-stage pattern, lucide-react (MapPin, Tags, CalendarDays, Ruler, Camera, Lightbulb, Sparkles, Search, Menu, X, ArrowRight, ChevronLeft, ChevronRight). No new dependencies.

---

## 8. Meta / SEO

- Title: `{metaTitle || title} | Whitefire Interior`
- Description: `metaDescription || challenge` (fallback)
- OG image: hero image URL.

---

## 9. Verification

1. `npm run build` passes.
2. Curl `/projects/amsterdam-jordaan-flower-shop` → 200, spec copy present, facts correct ("Jordaan, Amsterdam", "Commercial", "March 2025", "640 sq ft"), 12 gallery images, materials + swatches, dark CTA.
3. Curl a bogus slug → 404.
4. Spot-check 2–3 other slugs (living-room, bedroom projects) render.
5. Legacy chrome absent on `/projects/*`.
6. Screenshots (desktop + mobile) → `/home/lordwhitefire/interior-deoc-screenshot/`; lightbox click-through via Playwright.

---

## 10. Out of scope

- Related projects section (dropped by owner).
- New Sanity fields or schema changes.
- The global `SiteStage` shared component (framed-stage pattern already covers >1920px).

**Ready to implement on "go".**