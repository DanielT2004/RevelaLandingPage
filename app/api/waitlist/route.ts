import { NextResponse, type NextRequest } from "next/server";
import { emailSchema, waitlistBodySchema } from "@/lib/validation";
import { storeEmail } from "@/lib/waitlist";
import { rateLimit } from "@/lib/rate-limit";
import { FORM_COPY } from "@/lib/site";

// Service-role Supabase insert must run on Node (never Edge — keeps the key off the edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  // 1) Best-effort rate limit.
  const limit = rateLimit(`waitlist:${clientIp(req)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: FORM_COPY.rateLimited },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }

  // 2) Parse body defensively.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: FORM_COPY.serverError },
      { status: 400 }
    );
  }

  const parsed = waitlistBodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: FORM_COPY.invalidEmail },
      { status: 400 }
    );
  }
  const { email: rawEmail, company, source } = parsed.data;

  // 3) Honeypot: bots fill the hidden `company` field. Pretend success, store nothing.
  if (company.trim().length > 0) {
    return NextResponse.json({ ok: true, alreadyJoined: false }, { status: 200 });
  }

  // 4) Validate + normalize the email.
  const emailCheck = emailSchema.safeParse(rawEmail);
  if (!emailCheck.success) {
    return NextResponse.json(
      { ok: false, message: FORM_COPY.invalidEmail },
      { status: 400 }
    );
  }

  // 5) Persist via the single integration point.
  const result = await storeEmail(emailCheck.data, {
    source,
    referrer: req.headers.get("referer"),
    userAgent: req.headers.get("user-agent"),
  });

  switch (result.status) {
    case "ok":
      return NextResponse.json({ ok: true, alreadyJoined: false }, { status: 200 });
    case "duplicate":
      return NextResponse.json({ ok: true, alreadyJoined: true }, { status: 200 });
    case "unconfigured":
      return NextResponse.json(
        { ok: false, code: "unconfigured", message: FORM_COPY.unconfigured },
        { status: 503 }
      );
    default:
      return NextResponse.json(
        { ok: false, message: FORM_COPY.serverError },
        { status: 500 }
      );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
