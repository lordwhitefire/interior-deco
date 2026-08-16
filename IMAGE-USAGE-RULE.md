# IMAGE USAGE RULE — REMINDER

**Rule (owner: Lordwhitefire):**

> **No image is reused until every available image has been used at least once.**

## What this means

- When assigning images to slots (service pages, project cards, inclusions, gallery, blog, etc.):
  1. First use every unique image we already own (Sanity CDN assets, `app/assets/images/`, user-provided photos).
  2. Only after all available images have been used once may an image be repeated.
- Exceptions that are explicitly allowed:
  - The **shared CTA image** (`about_closing_dark_banner_table_vase.jpg`) is a constant brand element used on every page.
  - A service's **hero banner** is that service's identity image (one per service) — it is also the card image on the services index.
  - A project's **thumbnail** is its identity image on the portfolio index and the service gallery.

## Status

- [ ] All 18 Sanity projects (216 gallery images + 18 heroes + 18 thumbnails) catalogued in `app/data/projects.json`
- [ ] Services gallery uses each project's thumbnail once
- [ ] Inclusions images drawn from a project's own gallery (never the same photo as its thumbnail)
- [ ] No Pollinations-generated images remain in use (deleted)
- [ ] Before reusing any image in a new slot, confirm every unused image has been exhausted

## Decision log

- 2026-08-16 — Stopped using Pollinations.ai entirely. All imagery now comes from real Sanity project data or user-provided photos. 40 Pollinations images deleted.
- 2026-08-16 — Services curated around the 18 real projects: 8 services × 4 projects (14 repeats allowed only because 32 slots > 18 unique projects; repeats are the same project's thumbnail only when the pool is exhausted).