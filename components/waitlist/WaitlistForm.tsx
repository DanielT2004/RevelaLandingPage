"use client";

import { useEffect, useId, useRef, useState } from "react";
import { emailSchema } from "@/lib/validation";
import { FORM_COPY } from "@/lib/site";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import type { Status, WaitlistResponse } from "./waitlist-states";

type Variant = "light" | "dark";

export function WaitlistForm({
  variant = "light",
  source = "hero",
  placeholder = "Enter your email for early access",
  buttonLabel = "Join the waitlist",
  reassurance,
  className,
}: {
  variant?: Variant;
  source?: string;
  placeholder?: string;
  buttonLabel?: string;
  reassurance?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const inputId = useId();
  const feedbackId = useId();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const dark = variant === "dark";

  // Move focus to the confirmation when the form is replaced, so keyboard/SR
  // users aren't dropped to <body>.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const check = emailSchema.safeParse(email);
    if (!check.success) {
      setStatus("error");
      setMessage(FORM_COPY.invalidEmail);
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: check.data,
          company: honeypotRef.current?.value ?? "",
          source,
        }),
      });
      const data: WaitlistResponse = await res.json().catch(() => ({ ok: false }));

      if (res.ok && data.ok) {
        setAlreadyJoined(Boolean(data.alreadyJoined));
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.message || FORM_COPY.serverError);
      }
    } catch {
      setStatus("error");
      setMessage(FORM_COPY.serverError);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={cn("success-pop w-full max-w-xl outline-none", className)}
        role="status"
        aria-live="polite"
      >
        <div
          className={cn(
            "flex items-center gap-3.5 rounded-2xl border px-5 py-4",
            dark
              ? "border-sage-400/30 bg-sage/15"
              : "border-sage/25 bg-sage-50"
          )}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-cream"
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                className="check-draw"
                d="M5 12.5l4.2 4.2L19 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p
              className={cn(
                "font-display text-lg font-semibold",
                dark ? "text-cream" : "text-charcoal"
              )}
            >
              {alreadyJoined ? FORM_COPY.duplicate : FORM_COPY.successTitle}
            </p>
            <p
              className={cn(
                "text-sm",
                dark ? "text-cream/70" : "text-warmgray"
              )}
            >
              {FORM_COPY.successBody}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isError = status === "error";
  const busy = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("w-full max-w-xl", className)}
      aria-describedby={isError ? feedbackId : undefined}
    >
      {/* Honeypot — off-screen, not display:none, so bots fill it and get filtered. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        <label htmlFor={`${inputId}-company`}>Company (leave empty)</label>
        <input
          ref={honeypotRef}
          id={`${inputId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="go"
          placeholder={placeholder}
          value={email}
          disabled={busy}
          aria-invalid={isError}
          aria-describedby={isError ? feedbackId : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (isError) setStatus("idle");
          }}
          className={cn(
            "h-[3.4rem] flex-1 rounded-2xl px-5 text-[1rem] outline-none transition-colors sm:rounded-full",
            dark
              ? "border border-cream/15 bg-charcoal-800 text-cream placeholder:text-cream/45 focus:border-terracotta-400"
              : "border border-charcoal/12 bg-cream-50 text-charcoal placeholder:text-warmgray/70 focus:border-terracotta",
            isError && "border-terracotta ring-1 ring-terracotta/40"
          )}
        />
        <button
          type="submit"
          disabled={busy}
          className={cn(buttonClasses("primary", "lg"), "shrink-0")}
        >
          {busy ? (
            <>
              <svg
                className="spin"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="2.5"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              {FORM_COPY.submitting}
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </div>

      {/* Feedback line: reassurance by default, error message when invalid. */}
      <p
        id={feedbackId}
        role={isError ? "alert" : undefined}
        aria-live={isError ? "assertive" : "polite"}
        className={cn(
          "mt-2.5 min-h-[1.25rem] px-1 text-sm",
          isError
            ? dark
              ? "font-medium text-terracotta-400"
              : "font-medium text-terracotta-600"
            : dark
              ? "text-cream/60"
              : "text-warmgray"
        )}
      >
        {isError ? message : reassurance}
      </p>
    </form>
  );
}
