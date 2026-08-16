# SANITY PLAN

Goal: EVERYTHING in Sanity except the favicon. No images or content data files in the site repo. Sanity becomes the single source of truth, fully editable from the Studio.

Two repos involved:
- `interior-deco` — the site (code only after this; only image file kept = `public/favicon.svg`)
- `interior-deco-cms` — the Sanity Studio (editor app)

## Current state (verified)

- Dataset `production` (projectId `pzhistba`): 609 docs = 416 images + 193 non-image
- USED types (queried live): `projectPage`(18), `testimonial`(18), `faqPage`(1), `faqCategory`(5), `faqItem`(50), `hero`(1), `stylish`(1), `client`(8)
- UNUSED/legacy types (24, ~84 docs, zero docs reference them, no drafts): blogCard(12), blogDetail(13), article(4), author(6), tag(10), category(5), aiAnswer(2), project(6), service(3), serviceCard(6), latestNews(1), blogPage(1), homePage(1), aboutPage(1), join(1), siteSettings(1), contactInfo(1), successStats(1), testimonials(1), banner(1), howWeWork(1), comment(1), session(4)
- Legacy docs hold OLD-brand content (Interior Decorators Inc., Lagos) — not reusable
- Local content files: `app/data/projects.json` (18, parity with projectPage), `app/data/services/*.json` (8), `app/data/team/staff.json` (8, parity with `staff` docs in Sanity), `app/data/teamMock.ts` (page copy + fixtures), `app/data/blogMock.ts` (6 articles), `app/data/blogs/*.json`, `app/data/sitepages.json` (image-pool picks)
- Local images: 15 in `app/assets/images/` (8 service heroes, 4 about, 3 home)
- `public/`: favicon.svg (KEEP), favicon.ico (delete), screenshots/homepage.png (delete), build/ (gitignored)
- CMS Studio (`interior-deco-cms`) exposes 31 schema types — ALL legacy; the used types (projectPage, staff, faqPage, faqItem, faqCategory) have NO schemas (created via API, uneditable in Studio)
- Write token: provided by owner → stored in `.env` as `SANITY_API_WRITE_TOKEN` (gitignored)

## New Sanity document types (schema + docs)

| Type | Docs | Content from |
|---|---|---|
| `servicePage` | 8 | services/*.json + 8 uploaded hero images |
| `blogArticle` | 6 | blogMock.ts + blogs/*.json (images already Sanity) |
| `blogCategory` | ~5 | blogMock categories |
| `homePage` | 1 | home copy (hero, studio, stats, newsletter, showreel) + 3 uploaded images |
| `aboutPage` | 1 | about copy + 4 uploaded images |
| `contactPage` | 1 | contact copy (Whitefire Amsterdam data) |
| `teamPage` | 1 | team intro/values/CTAs/fixtures (teamMock copy) |
| `testimonialsPage` | 1 | testimonials hero/CTA images (sitepages picks) |
| `siteConfig` | 1 | newsletter copy, page image manifest (sitepages.json role) |

Kept existing: `projectPage`, `testimonial`, `faqPage`, `faqCategory`, `faqItem`, `hero`, `stylish`, `client`, `staff` (docs already exist; staff gains schemas)

## Steps

### Repo A: `interior-deco` (site)

1. Create `.env` with `SANITY_API_WRITE_TOKEN` (gitignored)
2. `scripts/migrate-to-sanity.cjs` (idempotent):
   - Upload 15 local images to Sanity
   - Create the ~20 docs above (all copy from current sources)
   - Delete ~84 legacy docs (all 416 images untouched)
3. `app/lib/content.ts` — typed GROQ query module per content type; consolidate the 5 scattered sanity clients into `sanity.client.ts`; standardize image transforms (urlFor/withParams)
4. Rewrite loaders to query Sanity: `_index`, `about`, `services._index`, `services.$slug`, `projects._index`, `blog._index`, `blog.$slug`, `team._index`, `team.$slug`, `contact`, `llms[.]txt`, `sitemap[.]xml` (testimonials/faq/projects detail already live)
5. Delete from repo: `app/assets/images/` (15 files), `app/data/` (all), `public/favicon.ico`, `public/screenshots/`
6. Build + verify: 8 services, 6 articles, 8 team, 18 projects, 18 testimonials, 13 FAQ, home/about/contact copy identical to current; all pages 200; screenshots; commit to main

### Repo B: `interior-deco-cms` (studio)

7. `schemaTypes/`: add `servicePage`, `blogArticle`, `blogCategory`, `homePage`, `aboutPage`, `contactPage`, `teamPage`, `testimonialsPage`, `siteConfig`, `faqPage`, `faqItem`, `faqCategory`, `projectPage`, `staff`; keep `hero`, `stylish`, `client`, `testimonial`
8. Remove legacy schemas: blogCard, blogDetail, article, author, tag, category, aiAnswer, latestNews, blogPage, comment, session, serviceCard, service, project, join, siteSettings, successStats, howWeWork, teamMember, blogPost (+ unused rich-text blocks pullQuote/heading/paragraph/button/image if not needed)
9. Commit directly to `main` (owner's choice — same style as site repo)

## Open items
- (none — all decisions confirmed; token rotation recommended after migration completes)