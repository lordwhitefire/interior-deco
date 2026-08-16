# FORMS PLAN — Newsletter + Contact submissions into Sanity

Decision (owner-confirmed): remove Mailchimp entirely. Forms submit to Remix server
actions; validated; stored in Sanity via the server-side write client. The write
token stays server-only — never in the browser bundle.

```
Visitor → Newsletter / Contact Form → Remix action → validate/honeypot/rate-limit
         → duplicate check → Sanity doc (newsletterSubscriber | contactSubmission)
```

## Current state (verified)

- Newsletter form exists on **THREE pages** — all fake (setTimeout → success, sends
  nothing): home (`_index.tsx` NewsletterCTA), blog index (`blog._index.tsx` sidebar),
  blog detail (`blog.$slug.tsx` sidebar)
- `api.newsletter.ts`: real Mailchimp, unused by UI; module-scope env throw blocks
  server boot without MAILCHIMP vars (why `/tmp/opencode/serve.sh` exported dummies)
- `contact.tsx`: server action exists but only console.logs the submission
  (fields: fullName, email, phone, subject, message)
- Sanity: no submission types/docs; `writeClient` ready in `app/lib/sanity.ts`
  (server-only). No unique index in Sanity — dedupe by GROQ check before insert.
  `remix-serve` does NOT load `.env` → serve.sh must source it for write token
- Remix 2.4.1; no zod (hand-rolled validation); `@mailchimp/mailchimp_marketing` dep
- Remix index-route gotcha: actions on index routes are addressed as `/?index`
  (browser `<Form>` adds it automatically; raw curl must too — POST to `/` without
  `?index` targets the root route's action → 405)

## Data models

### newsletterSubscriber (Sanity document)
- email: string, required (normalized lowercase)
- submittedAt: datetime (ISO now, server-side)
- source: string — "home-newsletter"
- status: string — "subscribed"
- consent: boolean — from visible checkbox (required to submit)

### contactSubmission (Sanity document)
- fullName: string, required (≤100)
- email: string, required (≤254)
- phone: string, optional (≤30)
- subject: string, required (≤200)
- message: string, required (≤5000)
- submittedAt: datetime
- source: string — "contact-form"
- status: string — "new" (owner triages in Studio: new/contacted/archived)

## Implementation

### 1. `app/lib/forms.ts` (new, shared)
- `EMAIL_PATTERN` + length caps (above)
- `parseForm(request)` — formData → trimmed object
- honeypot: hidden `website` input; if filled → fake success, never persist
- `rateLimit(ip)` — in-memory Map per IP (x-forwarded-for || remoteAddress),
  max 5 requests / 10 min, returns allowed/retryAfter; never stored
- `createDoc(type, fields)` — writeClient.create wrapper
- Duplicate detection: `*[_type=="newsletterSubscriber" && email==$email][0]._id`
  before insert (email normalized lowercase on write + query → exact match).
  **Must use the NON-CDN client (`writeClient.fetch`)** — CDN reads can serve stale
  results for a just-created doc and let duplicates through (bug found in testing).
  Race window between check and insert is accepted for demo (no unique index).

### 2. Newsletter — all three forms, one shared implementation
- `app/lib/forms.ts` gains `handleNewsletterAction(request, source)` — the full
  chain (honeypot → rate limit → validate → consent → dup check → create).
  `source`: "home-newsletter" | "blog-newsletter"
- New shared component `app/components/whitefire/NewsletterForm.tsx` with
  `variant: "home" | "sidebar"` (sidebar = blog index + blog detail widgets):
  `<Form method="post">`, hidden honeypot, required consent checkbox, statuses
  driven by `useActionData` (passed as prop, typed via shared
  `NewsletterActionData`), success/error messages per variant
- Routes `_index.tsx`, `blog._index.tsx`, `blog.$slug.tsx` each export an
  `action` delegating to `handleNewsletterAction(request, source)` and render
  the shared component with their own `useActionData`; each page keeps its own
  section styling/copy/privacy note

### 3. Contact — `contact.tsx`
- Replace action body: honeypot → validate (name/email/subject/message required,
  email pattern, lengths) → rate limit → create `contactSubmission`
- Return field errors so the existing inline error UI works; reset form on success
  (already wired via `actionData?.ok`)

### 4. Remove Mailchimp
- Delete `app/routes/api.newsletter.ts`
- `npm rm @mailchimp/mailchimp_marketing`
- Strip MAILCHIMP exports from `/tmp/opencode/serve.sh` (server must boot clean)
- grep repo for zero remaining references

### 5. CMS schemas (`interior-deco-cms`)
- Add `newsletterSubscriber` + `contactSubmission` schemas (fields above; status
  as options list), register in `schemaTypes/index.ts`
- `tsc --noEmit` + `npm run build` pass; commit; push; `npm run deploy`
  (appId pinned — no prompt)

### 6. Verify
- typecheck + lint + build (site repo)
- restart prod server WITHOUT dummy env vars; serve.sh sources `.env`
  (write token needed for Sanity creates)
- curl tests (`?index` on index routes): valid newsletter → doc; duplicate email
  → "already subscribed", no second doc; honeypot-filled → success, no doc;
  bad email → 400; missing consent → 400; 6th real request from same IP → 429;
  contact valid → doc; missing name → field error
- Blog pages: same battery against `/blog` + `/blog/<slug>`
- GROQ confirm docs landed; re-run 51-URL parity sweep; clean up test docs

## Decisions confirmed with owner
- Visible consent checkbox on newsletter form: YES (all three forms)
- IP addresses: NOT stored (rate limit in-memory only)
- Duplicate newsletter email: success message "already subscribed"

## Status
- [x] forms.ts helpers + `handleNewsletterAction`, shared `NewsletterForm` component
      (home + sidebar variants), all three routes wired, Mailchimp removal,
      CMS schemas deployed
- [x] Verified live: valid/dup/dedup (writeClient, no CDN staleness)/bad-email/
      consent/honeypot(no slot, no doc)/rate-limit 429 on 6th real request,
      blog index + blog detail forms, contact doc status "new", 49/49 sitemap
      URLs 200, test docs cleaned (one real subscriber kept)
- [ ] Committed to main (pending)