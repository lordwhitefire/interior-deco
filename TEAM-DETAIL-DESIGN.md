# Team Member Detail Page (PAGE_12) — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/page-12-team-member-detail-aisha-patel.md` (UI spec).
**Status:** Plan — waiting for "go" before coding.

---

## 1. What this page is

The Whitefire Interior **team member detail** page at `/team/:slug`:

- dark cinematic hero (breadcrumbs `Home > Team > <Name>`, serif name, bronze uppercase role, short intro, social links);
- profile section 43/57 (portrait + `ABOUT <NAME>` eyebrow, serif headline, 2 paragraphs, 4 fact rows);
- featured projects (header row + 3 real project cards);
- approach section (intro column 31% + 4 process steps);
- dark consultation CTA strip (134px);
- prev/next team-member pager (loops);
- shared `SiteHeader` (TEAM active) + **original `SiteFooter` (unchanged)**.

**Data:** identity (name/role/bio/photo/social/SEO) from **real staff.json**; the profile fixture (facts, approach, About copy) is the package's representative content shared across members; **featured projects are REAL projects from `projects.json`**.

---

## 2. Decisions already made (owner-confirmed)

| Question | Decision |
|---|---|
| Routes | New `app/routes/team.$slug.tsx` → `/team/:slug`; renders for all 5 shown members (identity differs, fixture content shared, like blog placeholder body) |
| Unknown slug | 404 |
| Identity | Real Sanity staff: name, role (real titles — Aisha = "Sustainability Director"), bio, photo, social URLs, metaTitle/metaDescription |
| Featured projects | **Real projects already in `projects.json`** — real title/location/slug; card links to `/projects/:slug` |
| Which projects per member | Rotate the 18 real projects: member i → projects `i`, `i+6`, `i+12` (3 unique real projects per member, no repeats within a member) |
| Project card image | That project's **own unused gallery image** (real photo of that project; serves the no-reuse rule), served at **16:8** (`w=1280&h=720`) per md spec |
| VIEW ALL PROJECTS | Link → `/projects` |
| Facts (Education/Expertise/Experience/Location) | Package representative content (Aisha's facts) — static fixture shared by all members; staff schema has no such fields and we do not invent one |
| Approach section | Package verbatim: `AISHA'S APPROACH`-style eyebrow per member, headline, description, 4 steps (Listen/Design/Refine/Deliver; `UsersRound` `Pencil` `Armchair` `Sprout`, 28px bronze) |
| CTA | Dark 134px strip, right-aligned content, `LET'S CREATE SOMETHING BEAUTIFUL`, `Have a project in mind?`, bronze `SCHEDULE A CONSULTATION` button → `/contact`; image from unused pool |
| Prev/next pager | Real staff **order-based**; **loops** (last member's next = first) consistent with blog; placed after approach, before CTA (md: optional placement before CTA) |
| Hero image | Per-member from unused pool (distinct per member) |
| Breadcrumbs | Dark variant (existing `Breadcrumbs` component): Home → Team → name |
| Socials | Real staff social URLs (LinkedIn/Instagram); Pinterest shows the `P` glyph fallback (no icon in lucide) |
| Portraits | Staff photos 1600×896 landscape → 4:5 crop; verified via screenshots |
| Meta | From real `metaTitle`/`metaDescription`; title pattern `Aisha Patel | Whitefire Interior`; 404 fallback |
| Legacy chrome | `/team/` already covered by the `hideGlobalHeader` `/team/*` addition |

---

## 3. Page structure (top to bottom)

```
<div framed stage>
  SiteHeader (activePath="/team")
  <main>
    TeamMemberHero      — min-h 286px (mobile ~390px), 16:5 image, left dark gradient,
                          breadcrumbs, name serif 42→48px, role bronze uppercase,
                          description 2 lines, social icons row
    ProfileSection      — bg #F7F4EF, max-w 1320px, grid 43%/57% gap 45px:
        portrait (aspect-[0.88], 4:5 crop)
        right: eyebrow (ABOUT <NAME>), serif headline (whitespace-pre-line),
               bronze hairline, 2 paragraphs, facts list
    ProfileFactRow × 4  — 46px icon cell (circular bronze-outline icon) + label/value;
                          Education=GraduationCap, Expertise=Medal,
                          Experience=Star, Location=MapPin; thin bottom borders
    FeaturedProjects    — header row (FEATURED PROJECTS + VIEW ALL PROJECTS →),
                          3 columns (md), cards: image 16:8, serif title,
                          uppercase bronze location; hover: scale 1.025 / title warms
    ApproachSection     — bg #EEEAE4, grid 31%/69%: intro (eyebrow, serif headline,
                          description) + 4 process columns separated by thin left rules,
                          icon above title above description
    TeamMemberPager     — prev/next by staff order (loops), serif names, ChevronLeft/Right
    ConsultationCTA     — dark strip, background image + heavy overlay, right-aligned
                          content, bronze button + arrow → /contact
  </main>
  SiteFooter (original)
```

---

## 4. Data

- `app/data/team/staff.json` — identity + social + SEO (shared with the index page).
- `app/data/teamMock.ts` — detail fixture: `profileFixture` (About eyebrow, headline, paragraphs, 4 facts), `approachFixture` (headline, description, 4 steps), `consultationCta` (eyebrow/headline/description/button).
- `app/data/projects.json` — featured projects: real `title`, `location`, `slug`; card image = unused gallery URL of that project (from a small extension of the staff/team snapshot script or the existing pool logic).

---

## 5. Images / pool accounting

Unused pool after team index: **95**.

| Slot | Images |
|---|---|
| 5 member hero images (one per member) | 5 |
| Featured cards: 3 per member × 5 members (rotated, real projects' own unused gallery shots) | 15 |
| CTA background | 1 |
| **Total** | **21** → **74 remain** in reserve |

Portraits: real staff photos (5). Project card images: unused gallery image of that specific project (unique, real).

---

## 6. Interaction / a11y / SEO

- Breadcrumbs: Home + Team bronze links, current name warm white; `aria-label="Breadcrumb"`.
- Social links: `aria-label="<Name> on LinkedIn"` etc.; CTA background image `alt=""` + `aria-hidden` (decorative).
- Hero image `fetchPriority="high"`; portrait + cards + CTA lazy.
- Heading order: h1 name → h2 About headline / Featured Projects / Approach headline / CTA headline → h3 project names + step titles.
- Pager: `nav aria-label="Team member navigation"`; links keyboard accessible.
- Meta per member from real `metaTitle`/`metaDescription`; 404 returns default title/description.
- JSON-LD `Person` skipped (no site-wide SEO helper to plug into).

---

## 7. Verification & acceptance

- `npm run build` passes.
- `/team/aisha-patel` → 200: breadcrumbs, real name/role/bio/socials, 4 facts, 3 REAL project cards (titles/locations/images + `/projects/:slug` links), approach 4 steps, pager (loops), CTA, no legacy chrome.
- Every other member slug → 200 with that member's identity.
- Unknown slug → 404.
- Screenshots desktop 1920 + mobile 390 (index + one detail) → `/home/lordwhitefire/interior-deoc-screenshot/team-*.png`.
- Then stop and wait for owner's review.