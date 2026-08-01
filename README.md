# Revela — Waitlist Landing Page

A fast, modern, single-page landing site for **Revela**, an iOS AI video editor that turns a food creator's raw footage into a post-ready TikTok in ~10 minutes. The page has one job: **capture waitlist emails** (pre-wired to Supabase, with real success/error states).

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion**. All visuals are rendered in CSS/SVG/DOM — there are **no external images** to host or break.

---

## Quick start (run locally)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
#    (the site runs without Supabase — the form will just report an honest
#     "not connected yet" state until you add the keys in step 4)

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

Scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next.js lint |

---

## Environment variables

Set these in `.env.local` (local) and in your Vercel Project Settings (production). See `.env.example`.

| Variable | Required | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | to store signups | Your project URL, e.g. `https://abcd.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | to store signups | **Server-only. Never prefix with `NEXT_PUBLIC_`.** Bypasses RLS — treat like a root password. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical/OG/sitemap URL. Local: `http://localhost:3000`. Prod: `https://your-domain.com` |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | optional | Only if you upgrade to durable rate limiting (see [Rate limiting](#rate-limiting)) |

> The service-role key is read **only** in server code (`lib/supabaseAdmin.ts`, imported with `server-only`) and never reaches the browser bundle. After deploying you can verify with:
> `grep -r "$SUPABASE_SERVICE_ROLE_KEY" .next/static` → should return nothing.

---

## Connect the waitlist to Supabase

### 1. Create the table

In your Supabase project → **SQL Editor**, run:

```sql
create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id          uuid        primary key default gen_random_uuid(),
  email       text        not null unique,
  source      text,                       -- 'hero' | 'final-cta'
  referrer    text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create unique index if not exists waitlist_email_lower_idx on public.waitlist (lower(email));

-- Closed by default: RLS on, NO anon/authenticated policies.
-- Only the service-role key (server-side) can write; the anon key can't read or write.
alter table public.waitlist enable row level security;
```

### 2. Add the keys

Supabase → **Project Settings → API**. Copy the **Project URL** into `SUPABASE_URL` and the **`service_role`** key into `SUPABASE_SERVICE_ROLE_KEY`. Restart `npm run dev`.

That's it — submissions now insert into `public.waitlist`. Duplicate emails are handled gracefully (the user sees a friendly "you're already on the list", not an error).

### How submissions flow

```
WaitlistForm (client)  →  POST /api/waitlist  →  lib/waitlist.ts: storeEmail()  →  Supabase
   client zod check        server zod + honeypot        the single swap point
```

- `app/api/waitlist/route.ts` — validates, checks the honeypot, rate-limits, returns real status codes (200 / 400 / 503 / 429 / 405).
- `lib/waitlist.ts` → **`storeEmail()` is the one and only integration point.**

---

## Swap Supabase for another backend

Everything the app needs is behind **one function**: `storeEmail(email, meta)` in [`lib/waitlist.ts`](lib/waitlist.ts). Replace its body and keep the return contract — nothing else changes.

Return contract:

| Return | Meaning | HTTP response |
| --- | --- | --- |
| `{ status: "ok" }` | stored | 200 success |
| `{ status: "duplicate" }` | already on the list | 200 friendly success |
| `{ status: "unconfigured" }` | no backend env set | 503 honest error |
| `{ status: "error" }` | unexpected failure | 500 |

Example — forward to Airtable / Resend / a webhook instead of Supabase:

```ts
export async function storeEmail(email, meta) {
  const res = await fetch(process.env.WAITLIST_WEBHOOK_URL!, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, ...meta }),
  });
  if (res.status === 409) return { status: "duplicate" };
  return res.ok ? { status: "ok" } : { status: "error" };
}
```

The form always shows **real** states — it never fakes a success.

---

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com/new), **Import** the repo (it auto-detects Next.js — no config needed).
3. Add Environment Variables (Production **and** Preview):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`  ← **not** `NEXT_PUBLIC_`
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-domain>`
4. **Deploy.**
5. After deploy, submit a test email and confirm the row lands in your Supabase table.

The waitlist API runs on the **Node** runtime (keeps the service key off the edge); the OG image runs on the **Edge** runtime.

---

## Customize

Almost everything lives in two files:

- **Copy** → [`lib/site.ts`](lib/site.ts). Every headline, step, feature, and the SEO metadata is here. Edit text without touching components.
- **Colors / fonts / motion** → the `@theme` block in [`app/globals.css`](app/globals.css). Change the palette in one place.

### Testimonials

The social-proof section ships with **clearly-marked placeholder** cards (dashed border, "Placeholder" chip, outline stars, bracketed text). Replace them with real, permissioned creator quotes in `SOCIAL_PROOF.placeholders` in `lib/site.ts` — and remove the placeholder styling once they're real. **Don't ship the brackets.**

### App name

The name **"Revela"** appears in `lib/site.ts` (and a couple of components: `Nav`, `Footer`, `TransformationPhone`, the OG/icon routes). To rebrand, search the repo for `Revela` and replace.

### Rate limiting

`lib/rate-limit.ts` is an in-memory, best-effort limiter (per serverless instance — resets on cold start). The honeypot is the real first line of defense. For durable, cross-instance limiting, wire up Upstash Redis (`@upstash/ratelimit`) using the `UPSTASH_*` env vars.

---

## What's inside

```
app/            layout (SEO/OG/JSON-LD), page, globals.css, api/waitlist, robots, sitemap, icons, opengraph-image
components/
  sections/     Hero, ProblemSection, HowItWorks, Features, TimeSaved, SocialProof, FinalCTA
  waitlist/     WaitlistForm (client) + state types
  motion/       useInView, Reveal, RevealGroup  (CSS-driven scroll reveals, 0 KB)
  visuals/      TransformationPhone (hero), PhoneFrame, ClipCard, Timeline, SwipeCard,
                VoiceoverBlock, CountUp, TimeCollapseBar, StepCard, FeatureCard, icons/
  ui/           Container, Section, Button, Logomark
  Nav, Footer
lib/            site (copy), waitlist (swap point), supabaseAdmin, validation, rate-limit, cn
```

### Craft notes

- **Responsive & mobile-first** — the hero form sits above the fold on phones.
- **Accessible** — one `<h1>`, labelled sections, skip link, keyboard focus rings, `aria-live` form feedback, honeypot spam trap.
- **Motion respects `prefers-reduced-motion`** — reveals, the marquee, the hero sequence, and counters all collapse to their finished state instantly.
- **SEO** — full metadata, Open Graph + Twitter cards, a dynamic OG image, `sitemap.xml`, `robots.txt`, and Organization/SoftwareApplication JSON-LD.
- **Fast** — server components by default; Framer Motion loads only in the few animated leaves; fonts self-hosted via `next/font` (no CLS).
```
