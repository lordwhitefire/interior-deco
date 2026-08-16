# ERROR-HANDLING-PLAN.md

- Source-of-truth: this file + `PLAN-WORKFLOW.md` rules.
- Goal: every failure mode shows a correct, branded response — real 404s, an understandable 500, working form errors, and no blank pages on empty data.

## Audit summary (done)

| Check | Current behavior | Verdict |
|---|---|---|
| Project doesn't exist | `projects.$projectid.tsx` throws `Response 404` | ✅ proper 404 |
| Blog post doesn't exist | `blog.$slug.tsx` throws `Response 404` | ✅ proper 404 |
| Team member doesn't exist | `team.$slug.tsx` throws `Response 404` | ✅ proper 404 |
| Service doesn't exist | `services.$slug.tsx` **redirects** to `/services` | ⚠️ should be 404 (hides broken links from crawlers; inconsistent with all other detail routes) |
| Unknown URL (`/nonsense`) | Remix 404 → root ErrorBoundary | ⚠️ shows "Oops, something went wrong" — misleading; should say "Page not found" |
| Sanity unavailable (loaders) | fetch rejects → root ErrorBoundary "Something went wrong" + RETURN TO HOME | ✅ branded fallback |
| Form fails (newsletter/contact) | validation 400, rate-limit 429, write-failure 500, all with user-facing messages; honeypot + dedup | ✅ solid |
| Empty blog category/search | "No articles found — try another search or category" | ✅ good |
| Empty projects filter | `PortfolioEmptyState` with reset | ✅ good |
| Empty team / services lists | no empty state (blank sections if Sanity has zero docs) | ⚠️ minor; same pattern as blog grid |
| JS fails | SSR HTML always renders; forms work without JS (Remix native actions); swiper/tabs degrade to static first state | ✅ acceptable, no change |

## User decisions (confirmed)

1. `services.$slug`: missing service → `throw new Response("Service not found", { status: 404 })` (keep `redirect("/services")` only for missing `slug` param).
2. Root `ErrorBoundary`: differentiate 404 vs 500 via `useRouteError()` — 404 gets a real "Page not found" view (message + RETURN TO HOME), 500 keeps "Oops, something went wrong" + "Please try again later" + home link.
3. Add minimal empty states to `/team` and `/services` grids ("No team members yet" / "No services available yet") when Sanity returns zero docs.
4. No other changes — no per-route error boundaries, no cache fallbacks, no color/copy redesign beyond the above.

## Files to change

| File | Change |
|---|---|
| `app/routes/services.$slug.tsx` | Loader: `if (!data) throw new Response("Service not found", { status: 404 })` |
| `app/root.tsx` | `ErrorBoundary`: import `useRouteError`; if `status === 404` render "Page not found" view; 500 keeps current copy |
| `app/routes/team._index.tsx` | Empty-state block when `members.length === 0` (blog-grid style) |
| `app/routes/services._index.tsx` | Empty-state block when services list is empty |

## Verification

1. `npx tsc --noEmit` + `npm run build` — clean.
2. Restart server; curl checks:
   - `GET /nonsense` → HTTP 404 + HTML contains "Page not found"
   - `GET /services/not-a-real-service` → 404 (not 302)
   - `GET /blog/not-a-real-post`, `GET /projects/not-a-real-project`, `GET /team/not-a-real-member` → 404
   - `GET /blog?category=zzz` and `?q=zzz` → "No articles found"
   - `/`, `/services`, `/blog`, `/team`, `/contact` → 200
3. 49/49 sitemap URLs still 200.
4. Sanity-down simulation (optional): invalid token in `.env`, restart, `/` renders 500 ErrorBoundary; restore token.

## Status

- [x] All implementation done; tsc/build clean; curl checks pass; 49/49 URLs 200