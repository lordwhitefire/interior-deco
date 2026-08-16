# Cleanup Plan — Remove All Unrelated (Legacy) Pages

Status: **Written down, waiting for go.** The 13 Whitefire pages are complete and committed (f1f4684). Everything legacy that is not part of them gets deleted.

## The 13 pages (keep, untouched)

`/` · `/about` · `/services` + `/services/:slug` · `/projects` + `/projects/:slug` · `/blog` + `/blog/:slug` · `/team` + `/team/:slug` · `/testimonials` · `/faq` · `/contact`

All already use only `app/components/whitefire/*`.

## A. Home page — CLIENTS LOVE US testimonial swiper (new work)

`app/routes/_index.tsx` → `TestimonialsTrustSection` (currently line 527):

- The section already exists with the exact owner-approved design: left column `CLIENTS LOVE US` eyebrow / `What Our Clients Are Saying` serif heading / big quote mark / quote / `— Name` / location / prev+next arrow buttons; right column `TRUSTED BY LEADING BRANDS` logo grid.
- **Problem:** it holds only one mock testimonial (`mockTestimonial` = Priya Sharma, Mumbai, India) and the arrows cycle one item.
- **Fix:** loader fetches real Sanity testimonials (`*[_type == "testimonial"] | order(date desc)`, first 6 — same source as `/testimonials`), passed into the section; replace the single-mock state with a **Swiper carousel** — loop, autoplay (~6s), drag/swipe, arrows wired to the swiper instance; each slide renders the real quote + `— Name` + location in the current design.
- `mockTestimonial` (Priya Sharma) stays **only** as a fallback when Sanity returns nothing.
- Right-side logos column untouched.
- **swiper package + its CSS link stay installed** (owner decision).

## B. Cleanup (everything else)

### 1. Delete 15 legacy routes
`teams.tsx` · `teams.$slug.tsx` · `blogs.tsx` · `blogs.$slug.tsx` · `service.tsx` · `project.tsx` · `search.tsx` · `tag.$slug.tsx` · `category.$slug.tsx` · `ai-answers.$slug.tsx` · `api.ai-search.tsx` · `test-gemini.tsx` · `dash.tsx` · `dash._index.tsx` · `dash.$id.tsx`

### 2. Strip legacy chrome from `app/root.tsx`
- Remove `NavigationBar` + `Footer` imports and header/footer blocks
- Remove `footerData` Sanity loader, `fallbackFooterData`, `hideGlobalHeader` logic
- Remove groq/sanity/imageUrlBuilder imports (root no longer needs them)
- Replace old-brand meta (`Interior Decorators Inc.` og tags, legacy description) with Whitefire meta
- Remove `lqip.png` blurred background div and the blue `GlobalLoading` spinner
- Keep the swiper stylesheet link (only home uses swiper)
- Rebuild `ErrorBoundary` as a minimal Whitefire page (SiteHeader/SiteFooter + message)

### 3. Delete orphan legacy components
Every file in `app/components/` (excluding `whitefire/`) not imported by remaining code — verified by grep after deletions, then removed. Expected: `NavigationBar`, `Footer`, `ClientShowcase`, `logo1`, `Services`, `Stylish`, `Hero`, `CommentForm`, `CommentThread`, `Article`, `SocialShare`, `SearchResults`, `SearchBanner`, `AboutCtaForm`, `AboutTeam`, `AboutHero`, `AboutQuote`, `BannerComponent`, `BlogCard`, `Carousel`, `ContactDetails`, `ContactForm`, `DescriptionSection`, `dgd`, `ExperienceSection`, `FeaturedProjectsA/B`, `HowWeWorkSection`, `InteriorSection`, `Join`, `Logo`, `LogoSection`, `LoveDesignSection`, `MapSection`, `OtherProjectsSection`, `Preloader`, `ProjectBannerSection`, `ProjectSection`, `ProjectsDetails`, `projectPagePagination`, `ServiceSingleBanner`, `SetTheTrendSection`, `SuccessStats`, `TeamSection`, `TeamSingleSection`, `trs`, `BlogSection`, `Testimonials` (each confirmed unused first).

### 4. Delete orphan data/assets
- `app/data/popularQuestions.ts`, `app/data/testimonials.ts` (no importers)
- `public/lqip.png`
- Home's duplicate swiper stylesheet link (line ~946) — root's single copy stays
- Orphan images in `app/assets/images/` (verified by grep)

### 5. Uninstall dead npm packages (verified first)
- `react-router-dom`, `@portabletext/react`, `@mailchimp/mailchimp_marketing`, `react-intersection-observer` — only if no remaining file imports them
- **`swiper` and `groq` stay** (home uses both)

### 6. Verify
- `npm run build` passes
- All 13 pages return 200, Whitefire brand only
- Deleted URLs (`/teams`, `/blogs`, `/search`, `/dash`, `/tag/*`, `/category/*`, `/ai-answers/*`, `/project/*`, `/service/*`) return 404
- No "Interior Decorators Inc.", `NavigationBar`, `footerData`, or swiper-only legacy markup anywhere
- Screenshots refreshed (home swiper section especially) → stop for owner review

## Open confirmations (defaults in use unless changed)
- Swiper autoplay on (~6s, loop, draggable) — default yes
- Whitefire 404 page — default yes (simple, consistent with the 13 pages)

## Rule check
- IMAGE-USAGE-RULE.md still applies; home swiper uses no new images (text testimonials only)
- Do not touch the 13 pages' markup beyond the swiper section described in A