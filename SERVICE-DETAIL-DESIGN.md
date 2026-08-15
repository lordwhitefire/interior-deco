# Service Detail Pages — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/page-04-bedroom-makeover-ui-implementation.md` (the Bedroom Makeover spec — used as the **template** for all 8 services).

**Goal:** Replace the Sanity-driven `services.$slug.tsx` with a static implementation reading from 8 JSON files in `app/data/services/`. All 8 services share the exact same Bedroom Makeover template. **Images generated via Pollinations.ai** (batch, save locally, update JSON).

---

## 1. The 8 Services (from Services index grid)

| Slug | Title |
|---|---|
| `interior-design` | Interior Design |
| `space-planning` | Space Planning |
| `custom-furniture` | Custom Furniture |
| `renovation` | Renovation |
| `styling-decor` | Styling & Decor |
| `material-selection` | Material Selection |
| `lighting-design` | Lighting Design |
| `project-management` | Project Management |

Bedroom Makeover is **not** one of these 8 — it's the visual reference we copy for each.

---

## 2. Files to Change

| File | Change |
|---|---|
| `app/data/services/interior-design.json` | NEW — Full page data for Interior Design |
| `app/data/services/space-planning.json` | NEW — Full page data for Space Planning |
| `app/data/services/custom-furniture.json` | NEW — Full page data for Custom Furniture |
| `app/data/services/renovation.json` | NEW — Full page data for Renovation |
| `app/data/services/styling-decor.json` | NEW — Full page data for Styling & Decor |
| `app/data/services/material-selection.json` | NEW — Full page data for Material Selection |
| `app/data/services/lighting-design.json` | NEW — Full page data for Lighting Design |
| `app/data/services/project-management.json` | NEW — Full page data for Project Management |
| `app/routes/services.$slug.tsx` | REPLACE — Remove Sanity loader, read JSON by slug, render Bedroom Makeover template, resolve generated image paths |
| `app/components/whitefire/Breadcrumbs.tsx` | NEW — Shared component (spec §4.2) |
| `app/components/whitefire/ServiceProcessStep.tsx` | NEW — Shared step (icon, number, title, desc, dotted connector) |
| `app/components/whitefire/ProjectCard.tsx` | NEW — Shared gallery card |
| `app/components/whitefire/ServiceInclusionItem.tsx` | NEW — Shared inclusion item |
| `app/components/whitefire/TrustItem.tsx` | NEW — Shared trust strip item |
| `scripts/generate-service-images.js` | NEW — Pollinations.ai batch generation script (48 images) |

**Reuse existing shared components:**
- `SiteHeader` (unified) — `activePath="/services"`, `showSearch`
- `SiteFooter` (shared minimal)
- `PrimaryButton` (filled = spec primary CTA)
- `SectionEyebrow` (spec eyebrows)
- `SectionHeading` (if needed)

---

## 3. JSON Schema (per service — follows Bedroom Makeover spec)

```json
{
  "slug": "interior-design",
  "hero": {
    "eyebrow": "OUR SERVICES",
    "title": "Interior Design",
    "description": "Full-service interior design tailored to your lifestyle, aesthetic, and functional needs.",
    "image": "services-hero-interior-design.jpg",
    "imageAlt": "Warm luxury living room with dark wood cabinetry, fireplace, neutral seating and greenery.",
    "primaryCta": { "label": "SCHEDULE A CONSULTATION", "href": "/contact" },
    "secondaryCta": { "label": "VIEW OUR WORK", "href": "/projects" }
  },
  "inclusions": [
    { "title": "Space Planning", "description": "Smart layouts that maximize comfort and flow.", "icon": "layout" },
    { "title": "Material & Finishes", "description": "Premium materials that bring warmth and elegance.", "icon": "materials" },
    { "title": "Custom Furniture", "description": "Bespoke pieces tailored to your style and needs.", "icon": "furniture" },
    { "title": "Styling & Decor", "description": "Curated decor and accessories to complete the look.", "icon": "styling" },
    { "title": "Lighting Design", "description": "Ambient and task lighting to set the perfect mood.", "icon": "lighting" },
    { "title": "Project Management", "description": "End-to-end management for a seamless experience.", "icon": "management" }
  ],
  "inclusionsImage": "services-inclusions-interior-design.jpg",
  "inclusionsImageAlt": "Warm bedroom seating area with shelving, art, and natural materials",
  "process": [
    { "number": "01", "title": "Discover", "description": "We understand your needs, style, and budget.", "icon": "discover" },
    { "number": "02", "title": "Design", "description": "We create layout concepts, mood boards, and 3D visuals.", "icon": "design" },
    { "number": "03", "title": "Plan", "description": "We finalize materials, furniture, and all the details.", "icon": "plan" },
    { "number": "04", "title": "Execute", "description": "Our team brings the design to life with precision and care.", "icon": "execute" },
    { "number": "05", "title": "Reveal", "description": "We style the space and reveal your transformed space.", "icon": "reveal" }
  ],
  "gallery": [
    { "title": "Moody Interior", "image": "services-gallery-interior-design-01.jpg", "imageAlt": "Dark warm interior", "href": "/projects" },
    { "title": "Natural Green Interior", "image": "services-gallery-interior-design-02.jpg", "imageAlt": "Warm neutral interior with green accents", "href": "/projects" },
    { "title": "Serene Neutral Interior", "image": "services-gallery-interior-design-03.jpg", "imageAlt": "Bright neutral interior", "href": "/projects" },
    { "title": "Arched Interior", "image": "services-gallery-interior-design-04.jpg", "imageAlt": "Interior with arched wall and neutral furnishings", "href": "/projects" }
  ],
  "cta": {
    "eyebrow": "READY TO TRANSFORM YOUR SPACE?",
    "title": "Let's Create Your\nPerfect Retreat",
    "description": "Book a consultation with our design experts and take the first step toward your dream space.",
    "image": "about_closing_dark_banner_table_vase.jpg",
    "imageAlt": ""
  },
  "trust": [
    { "title": "Personalized Designs", "description": "Every space is uniquely tailored to you.", "icon": "personalized" },
    { "title": "Quality Assured", "description": "We use the finest materials and work with trusted craftspeople.", "icon": "quality" },
    { "title": "On-Time Delivery", "description": "We respect your time and deliver as promised.", "icon": "delivery" },
    { "title": "Client Satisfaction", "description": "Your happiness is our greatest reward.", "icon": "satisfaction" }
  ]
}
```

Each of the 8 JSON files has the **same structure** — only these fields differ per service:
- `slug`, `hero.title`, `hero.description`, `hero.image`, `hero.imageAlt`
- `inclusionsImage`, `inclusionsImageAlt`
- `gallery[].image`, `gallery[].title`, `gallery[].imageAlt`
- `cta.image` (shared constant: `about_closing_dark_banner_table_vase.jpg`)

Everything else (inclusion items, process steps, trust items, CTA copy) stays identical across all 8 services — exactly as the Bedroom Makeover spec defines.

---

## 4. Image Strategy — Pollinations.ai (Batch Generation)

**Total images:** 48 generated (6 per service × 8 services) + 1 shared CTA (reuse existing `about_closing_dark_banner_table_vase.jpg`)

| Slot | Per Service | Filename Pattern | Description |
|---|---|---|---|
| Hero | 1 | `services-hero-{slug}.jpg` | Cinematic service identity |
| Inclusions | 1 | `services-inclusions-{slug}.jpg` | Supporting bedroom/living context |
| Gallery 1-4 | 4 | `services-gallery-{slug}-01.jpg` ... `04.jpg` | 4 distinct project images |
| **Total per service** | **6** | | |
| **All services** | **48** | | |
| **CTA (shared)** | **0** (reuse existing) | `about_closing_dark_banner_table_vase.jpg` | Dark atmospheric |

**Generation workflow:**
1. Write 48 curated prompts in `scripts/prompts/service-images.md` (reviewed/approved)
2. Run `node scripts/generate-service-images.js` → Pollinations.ai batch → saves to `app/assets/images/`
3. Filenames: `services-hero-interior-design.jpg`, `services-inclusions-space-planning.jpg`, `services-gallery-renovation-01.jpg`, etc.
4. Update 8 JSON files with generated filenames
5. Route resolves images via local imports (no runtime generation)

**CTA image:** Shared constant `about_closing_dark_banner_table_vase.jpg` (existing asset — no generation).

---

## 5. Page Structure (Bedroom Makeover template verbatim)

```
SiteHeader (unified, activePath="/services", showSearch)
  ↓
ServiceHero — cinematic image, dark overlay, breadcrumbs, title, description, dual CTAs
  ↓
ServiceInclusions — 2-col (text + image), 6 icon items
  ↓
ServiceProcess — 5 steps with dotted connectors, dark icon circles
  ↓
ServiceGalleryStrip — 4 images, 1.6:1 ratio, mobile scroll-snap
  ↓
ConsultationCTA — dark bg, subtle image, dual content, bronze button
  ↓
ServiceTrustStrip — 4 columns, thin separators, bronze icons
  ↓
SiteFooter (shared minimal)
```

**Framed stage:** Same as Home/About/Services — outer `bg-[#E8E2D8]`, 1440px panel `bg-[#F7F4EE]` + hairline ring.

---

## 6. Verification

1. `npm run build` succeeds.
2. `tsc --noEmit` — no new errors.
3. For each of the 8 slugs:
   - curl `/services/{slug}` — spec copy present, SERVICES active, breadcrumbs render, 6 inclusions, 5 process steps, 4 gallery images, CTA, trust strip.
   - Full-page 1920px screenshot → `/home/lordwhitefire/interior-deoc-screenshot/`.
4. Home / About / Services index unchanged.

---

## 7. Out of Scope

- Sanity integration (replaced with static JSON).
- New font dependencies.
- Swiper for gallery (native scroll-snap per spec; Swiper only if needed).
- Any service not in the 8-grid list.

---

**Ready to proceed: write prompts file, then generate images.**