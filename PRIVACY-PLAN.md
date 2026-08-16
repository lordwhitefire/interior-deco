# PRIVACY-PLAN.md

- Source-of-truth: this file + `PLAN-WORKFLOW.md` rules.
- Goal: be transparent about the minimal data the site collects, in a demo-appropriate way — no corporate theater.

## Audit summary (done)

- Newsletter consent checkbox + CMS privacy note ("We respect your privacy. Unsubscribe anytime.") — exists.
- No analytics, no third-party scripts, no cookies set (`app/sessions.ts` is dead code — nothing imports it).
- Data collected: `newsletterSubscriber` (email, source, consent, submittedAt), `contactSubmission` (name, email, phone, subject, message) — stored in Sanity project `pzhistba`.
- Gaps: no privacy page, contact form has no disclosure, footer has no legal links.

## User decisions (confirmed)

1. New `/privacy` page — branded, plain-language: what we collect, why, where it's stored (Sanity), what we don't do (no cookies/analytics/tracking/sharing), contact email for requests.
2. Footer: add a subtle "Privacy Policy" link.
3. Contact form: disclosure line above submit — "By submitting, you agree to our Privacy Policy." + link (no consent checkbox on contact).
4. Newsletter privacy note (CMS): extend to "We respect your privacy. Read our Privacy Policy. Unsubscribe anytime."
5. Delete unused `app/sessions.ts`.
6. Add `/privacy` to sitemap paths. No terms page (privacy only).

## Files to change

| File | Change |
|---|---|
| `app/routes/privacy.tsx` | New route: branded policy page (seo meta, canonical via `seo()`), content per decisions |
| `app/components/whitefire/SiteFooter.tsx` | Add Privacy Policy link (subtle) |
| `app/routes/contact.tsx` | Disclosure line + link above submit button |
| `app/lib/sanity.ts` / CMS | `siteConfig.newsletterPrivacyNote` updated via writeClient patch |
| `app/routes/sitemap[.]xml.tsx` | Add `/privacy` to paths |
| `app/sessions.ts` | Delete (dead code) |

## Verification

1. `npx tsc --noEmit` + `npm run build` — clean.
2. Restart server; curl: `/privacy` → 200 + contains policy headings + canonical; footer link present on all pages; contact page contains disclosure + link.
3. Sitemap now has 50 URLs, all 200.
4. Newsletter note verified via Sanity query.

## Status

- [ ] Implementation (waiting for "go")