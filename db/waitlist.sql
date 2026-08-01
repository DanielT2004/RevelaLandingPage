-- Revela waitlist table.
-- Matches the insert in lib/waitlist.ts: email (unique), source, referrer, user_agent.
-- Run in Supabase → SQL Editor, or via the Supabase MCP once its tools are loaded.

create table if not exists public.waitlist (
  id          bigint generated always as identity primary key,
  email       text not null unique,          -- unique → duplicate signups return "already joined"
  source      text,                           -- which form: "hero" | "final-cta"
  referrer    text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- RLS on with zero policies = anon/public key can neither read nor write.
-- The app uses the SERVICE-ROLE key (lib/supabaseAdmin.ts), which bypasses RLS,
-- so server-side inserts still succeed. This keeps the list private by default.
alter table public.waitlist enable row level security;
