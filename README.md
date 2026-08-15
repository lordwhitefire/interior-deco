# Interior Decorators — Interior Design Agency

A full interior design agency website (services, portfolio, blog, team, testimonials, FAQ, contact). Live at **[interior-deco-kappa.vercel.app](https://interior-deco-kappa.vercel.app/)**.

## Features

- **Home** — hero, services overview, client testimonials slider, stats, portfolio showcase, latest blog posts
- **Services** — detailed service pages (Kitchen Remodeling, Living Room Design, Office Interiors, Custom Furniture, Outdoor & Patio)
- **Portfolio & Projects** — project listings with filters by category (Kitchen, Living Room, Bedroom, Bathroom, Office) and a details view
- **Blog** — article listing, category/tag pages, and blog detail pages with comments
- **AI Search & Q&A** — search across content with an AI-powered answer route (Gemini)
- **Team & Testimonials** — team member pages, verified client reviews
- **Newsletter** — Mailchimp subscription via API route
- **FAQ & Contact** — contact form, map section, details page
- **SEO** — per-page meta/og:url handling, unique OG/Twitter tags, favicon, preloader

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | Remix 2 |
| Language | TypeScript |
| Styling | Tailwind CSS 3, Swiper (carousels) |
| CMS | Sanity (client + GROQ queries) |
| AI search | Google Gemini API |
| Email | Mailchimp API |
| Extras | react-intersection-observer, lucide-react, isbot |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |