# SEO PLAN

Site: Whitefire Interior (interior design portfolio, 13 routes)
Production domain (canonicals/sitemap): `https://interior-deco-kappa.vercel.app`

## Current state (verified)

- Unique `<title>` on every page — DONE (e.g. "Projects | Whitefire Interior", detail pages "…| Whitefire Interior")
- Meta descriptions — present on most; verify all routes have one
- OG/Twitter tags — present on home, about, services._index, services.$slug, projects.$projectid; MISSING on blog._index, blog.$slug, projects._index, team._index, team.$slug, testimonials, faq, contact
- Canonical — MISSING everywhere
- sitemap.xml / robots.txt — MISSING
- llms.txt (AI-agent access file, llmstxt.org) — MISSING
- Favicon — old-brand image from Sanity; needs Whitefire "W"
- Structured data — NONE
- Meaningful alt text, clean heading hierarchy, descriptive slug URLs — DONE

## Steps

### 1. Meta completeness (all route files)
- `<link rel="canonical" href="https://interior-deco-kappa.vercel.app{path}">` on every page via `links()` — detail pages use real slugs
- Add og:title / og:description / og:image / og:url + twitter:card / twitter:title / twitter:description / twitter:image to the 8 routes missing them, each using its own real image (article image, member photo, project hero, page hero)
- Ensure every route exports a unique meta description
- SITE_URL constant (avoid repeating the domain literal everywhere)

### 2. robots.txt + sitemap.xml (dynamic Remix routes, no deps)
- `app/routes/robots[.]txt.tsx` — Allow all + Sitemap URL
- `app/routes/sitemap[.]xml.tsx` — generated from real data:
  - 9 top pages: /, /about, /services, /projects, /blog, /team, /testimonials, /faq, /contact
  - 18 projects, 6 blog articles, 8 team members, 8 services (only valid slugs)
  - = 49 URLs, always accurate

### 3. llms.txt (llmstxt.org spec, for AI agents)
- `app/routes/llms[.]txt.tsx` — dynamic route generating `/llms.txt` from real data
- Format per spec: H1 "Whitefire Interior" → blockquote summary (Amsterdam interior design studio, what we do) → short prose section → H2 "file lists" of markdown links `[name](url): description`:
  - Services (8 real slugs), Projects (18), Blog (6), Team (8), Testimonials/FAQ/Contact/About
  - `## Optional` section for secondary links (per spec convention)
- Keep it small enough to fit an LLM context window (a few KB)
- Note: full `.md` mirrors of every page (`page.md`) are a spec best practice but heavy (50+ pages) — recorded as future enhancement, SKIP for now; llms.txt links to the real server-rendered pages

### 4. Favicon
- Create gold serif "W" SVG monogram matching the header W mark (`public/favicon.svg`)
- Point `root.tsx` links to it; drop old-brand Sanity favicon link

### 5. Structured data (JSON-LD, minimal + accurate, no spam)
- `root.tsx` site-wide: `Organization` + `LocalBusiness` (Whitefire Interior, 101 Prinsengracht Amsterdam, geo, openingHours, priceRange)
- `blog.$slug`: `Article` (headline, datePublished, dateModified, image, author)
- `team.$slug`: `Person` (name, jobTitle, image, worksFor)
- `projects.$projectid`: `BreadcrumbList` + `ImageObject` (real hero image)
- `services.$slug`: `Service` (name, description, provider)
- Manifest: SKIP (marketing site, not a PWA)

### 6. Home service-link fix
- Home links to /services/interior-design etc. 302 → /services; point them at the 8 real service slugs (bedrooms-retreats, boutique-transitional, compact-micro-spaces, hospitality-retail, kitchens-dining, living-spaces, minimalist-scandinavian, workspaces)

### 7. Verify
- `npm run build` passes
- /robots.txt, /sitemap.xml and /llms.txt return 200; sitemap contains all 49 URLs; llms.txt follows the spec format
- canonical link present on every page; JSON-LD present and parses (JSON.parse check)
- No duplicate titles across pages
- Report to owner, then commit

## Open decisions
- (none — all defaults confirmed by owner)