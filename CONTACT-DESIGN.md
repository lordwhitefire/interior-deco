# Contact Page (PAGE_09) — Implementation Plan

**Source of truth:** `/home/lordwhitefire/Downloads/whitefire_contact_page_09.md`.
**Status:** Approved — building.

---

## 1. What this page is

Whitefire Interior Contact at `/contact`:

- cinematic hero (pool image, left overlay, eyebrow `LET'S CREATE SOMETHING EXTRAORDINARY`, serif h1 `We'd Love to Hear From You`, description);
- ivory two-column section: **form** (`GET IN TOUCH` / `Send Us a Message`) and **contact information** (`CONTACT INFORMATION` / `Let's Connect`), thin vertical divider on desktop;
- **studio map section** — real Google Maps embed showing **Amsterdam** (owner: "use the Amsterdam and location too", embed reused, NOT stylized) with dark `Visit Our Studio` panel: `101 Prinsengracht, Suite 3A, 1016 EA Amsterdam, Netherlands` + `BOOK APPOINTMENT` button + teardrop `W` marker;
- work-with-us CTA band (ivory right panel, outlined `SCHEDULE A CONSULTATION →`);
- shared `SiteHeader` (CONTACT active) + **original tiny `SiteFooter`**.

## 2. Contact details (owner-approved: Amsterdam)

| Item | Value |
|---|---|
| Studio Address | 101 Prinsengracht, Suite 3A / 1016 EA Amsterdam, Netherlands |
| Phone | +31 20 8765 4321 |
| Email | hello@whitefireinterior.com |
| Studio Hours | Monday – Friday: 9:00 AM – 6:00 PM / Saturday: By Appointment / Sunday: Closed |

Socials: Instagram / Pinterest / LinkedIn (dark 34px circles, `href="#"` — no real studio socials exist in the Whitefire data; flagged as constants).

## 3. Map embed

`https://www.google.com/maps?q=101+Prinsengracht,+Amsterdam,+Netherlands&z=15&output=embed` — official Google Maps embed format (same reusable embed mechanism as the existing real `contactInfo.googleMapsEmbedUrl`, no API key, no invented provider). Rendered in an `<iframe>` with the dark overlay panel + `W` marker on top. Note in code: swap in the pb-format embed if the owner prefers the control-free variant later.

## 4. Form behavior (owner-approved, simple)

- Fields: Full Name*, Email*, Phone, Subject*, Message* (42px inputs, 96px textarea, `#f7f5f1` on `#d8d4cc` borders).
- Client-side validation (name/email/subject/message required, email regex), `aria-invalid` + `aria-describedby` errors, `aria-live` status.
- Submits to the route **action** (Remix `Form`) which **logs the submission** (existing project behavior — nothing is sent) and returns success; UI shows `Thank you. Your message has been received.` and resets.
- Privacy note with `LockKeyhole` below the button.
- Icons: MapPin/Phone/Mail/Clock3 in 42px circular outlines.

## 5. Images

| Slot | Source |
|---|---|
| Hero | Unused pool (1) — `w=1920&h=1080` |
| Consultation CTA | Unused pool (1) — `w=1280&h=720` |

Pool accounting: **2 used → ~90 remain**.

## 6. Verification

- `npm run build` passes.
- `/contact` 200; hero + two columns + 4 info rows + socials render; form validates (submit empty → errors, fill → success via action log); map iframe points to Amsterdam embed; overlay panel shows the Amsterdam address; no legacy chrome.
- Screenshots desktop 1920 + mobile 390 → `interior-deoc-screenshot/contact-*.png`.
- Stop for owner review.