# SECURITY-PLAN.md

Audit + hardening plan for the Whitefire site (public, so security matters).

Status: **plan — awaiting go**

---

## 1. Audit results (all verified read-only, 2026-08-16)

### Verified good — no action needed

| Area | Finding |
|---|---|
| Sanity tokens | Write token was deleted; **new token verified working** (authenticated read OK). Token lives only in `.env`, never in code or bundles |
| Exposed API keys | **None in client bundles.** `grep` of `public/build` for the token literal, `SANITY_API_WRITE_TOKEN`, and `writeClient` → 0 hits. `sk…` matches were false positives (`skipTransition`). Sanity client is fully tree-shaken out of the client |
| Environment variables | `.env` is git-ignored (`git check-ignore` confirms); no `.env.example`; `process.env` referenced only in `app/lib/sanity.ts:19` (server-side) |
| Server/client boundaries | `forms.ts` + `writeClient` never ship to the browser (verified absent from all client chunks) |
| CORS | No CORS config anywhere; all Sanity API calls are server-side; browser only hits `cdn.sanity.io` images. No client-side API surface |
| Request validation | Both forms validate fields (400 + message), honeypot present, field length caps, GDPR consent checkbox on newsletter |
| Injection risks | GROQ fully parameterized (`$slug`, `$email`) — zero string-interpolated queries in `content.ts`/`forms.ts` |
| XSS through content | No `dangerouslySetInnerHTML` except JSON-LD in `seo.tsx:55` (`JSON.stringify` of our own data — safe, standard). Blog/rich content renders as plain React text |
| Unsafe HTML | None. No inline event handlers, no `<embed>`/`<object>` |
| CSRF | Negligible risk: stateless public POSTs, no cookies/sessions (`sessions.ts` deleted), no auth actions |

### Gaps found

| # | Gap | Severity |
|---|---|---|
| G1 | **No security headers at all** — `curl -I` shows only `content-type`. Missing: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | High |
| G2 | **Rate limiter counts every attempt** — spamming *invalid* submissions exhausts the 5/10-min budget and locks out real users (observed: 6 failed POSTs → 429) | Low |
| G3 | **Map iframe src is CMS-controlled** — `mapEmbedUrl` on the `contactPage` doc (not `siteConfig` — initial audit queried the wrong doc). Verified present: `https://www.google.com/maps?q=101+Prinsengracht,...&output=embed` — a working interactive Google Map, lazy-loaded, `referrerPolicy="no-referrer-when-downgrade"`. Residual risk: if the CMS were compromised, arbitrary embeds become possible → defensive guard + CSP `frame-src` | Low |
| G4 | **Running server holds dead token** — process started before token swap; in-memory `writeClient` still has the old token → real submissions 401 until restart | Ops |

---

## 2. Changes

### C1 — Security headers (`app/root.tsx`)

Add a `headers()` export (applies to all document responses, works on remix-serve and Vercel):

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Strict-Transport-Security: max-age=63072000; includeSubDomains
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';        # Remix __remixContext + JSON-LD inline scripts
  style-src 'self' 'unsafe-inline';          # inline style attributes
  img-src 'self' data: https://cdn.sanity.io;
  font-src 'self';
  connect-src 'self';
  frame-src https://www.google.com https://maps.google.com;   # map embed (G3)
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self'
```

Note: `'unsafe-inline'` for scripts is required by Remix's inline loader-data script; upgrade path (nonce/hash) documented, not done now.

### C2 — Rate limiter order fix (`app/lib/forms.ts`)

Reorder checks in both handlers: honeypot → field validation → rate limit → write. Bots spamming invalid input no longer exhaust the budget; only valid submissions count toward the 5/10-min limit.

### C3 — Map iframe defensive guard (`app/routes/contact.tsx`)

Render the map section only when `mapEmbedUrl` is non-empty (it currently points to the working Google Maps embed; the guard is defensive against a future empty CMS value, not a fix for a blank map).

CSP `frame-src` must allow the embed host: `https://www.google.com https://maps.google.com` (iframe src is `https://www.google.com/maps?...`).

### C4 — Form verification workflow (proves newsletter + contact end-to-end)

1. Restart local server → loads new token, resets in-memory rate limiter
2. POST tests (no-write): empty email → 400; invalid email → 400; honeypot filled → fake-ok, **no Sanity doc** (verify by read-only query)
3. One real submission `verifytest@example.com` → 200/ok
4. Read-only Sanity query: doc exists
5. Delete the test doc (cleanup write)
6. Same flow for contact form (`name`+`email`+`subject`+`message`)
7. `curl -I` on `/`, `/contact`, `/blog` → all 9 headers present; 50/50 URLs still 200

### C5 — Optional (only if requested)

- Origin/Host check on POSTs (reject mismatched `Origin` header) — cheap CSRF hardening, ~10 lines in `forms.ts`
- `.env.example` template documenting the two vars

---

## 3. Non-goals / accepted

- No auth, no sessions, no private data — CSRF beyond Origin-check not warranted
- No nonce-based CSP for now (documented upgrade path)
- HSTS harmless on local http (browsers ignore), takes effect on Vercel HTTPS
- Static assets under `/build`/`/vendor` served without the headers by remix-serve (HTML documents are the meaningful surface)

---

## 4. Verification checklist

- `npx tsc --noEmit` clean, `npm run build` clean
- `curl -sI localhost:3000/` shows: `content-security-policy`, `strict-transport-security`, `x-frame-options`, `x-content-type-options`, `referrer-policy`, `permissions-policy`
- 50/50 sitemap URLs 200
- Newsletter: validation 400s, honeypot no-write, real submission lands in Sanity (then deleted)
- Contact: validation 400s, real submission lands in Sanity (then deleted)
- No console errors on `/` and `/contact` (CSP didn't break inline scripts/images)
- Commit `SECURITY-PLAN.md` + code changes