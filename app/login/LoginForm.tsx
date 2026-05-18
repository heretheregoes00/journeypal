"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

type Status = "idle" | "sending-link" | "google";

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

// Base URL for auth redirects. Prefers NEXT_PUBLIC_SITE_URL (set in
// production) so magic links and OAuth always return to the canonical
// domain; falls back to the current origin for local dev.
function authRedirectURL(): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    window.location.origin;
  return `${base}/auth/callback`;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

export default function LoginForm({ initialError }: { initialError: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(initialError);

  const busy = status !== "idle";

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending-link");
    setError("");

    const normalized = email.trim().toLowerCase();
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: { emailRedirectTo: authRedirectURL() },
    });

    if (otpError) {
      setStatus("idle");
      setError(otpError.message || "Couldn't send the link. Please try again.");
      return;
    }

    router.push(`/login/check-email?email=${encodeURIComponent(normalized)}`);
  }

  async function signInWithGoogle() {
    setStatus("google");
    setError("");

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: authRedirectURL() },
    });

    // On success the browser is already navigating to Google.
    if (oauthError) {
      setStatus("idle");
      setError(
        oauthError.message || "Couldn't start Google sign-in. Please try again."
      );
    }
  }

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={sendMagicLink} className="space-y-3">
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          disabled={busy}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base text-ink outline-none placeholder:text-ink-soft focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:opacity-60 transition"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-brand-500 px-4 py-3 text-base font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px disabled:opacity-60 transition"
        >
          {status === "sending-link" ? "Sending…" : "Email me a magic link"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
          or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-ink hover:border-brand-300 hover:bg-slate-50 active:translate-y-px disabled:opacity-60 transition"
      >
        <GoogleIcon />
        {status === "google" ? "Redirecting…" : "Continue with Google"}
      </button>

      <p className="mt-5 text-xs text-ink-soft">
        The magic link signs you in without a password. By continuing you agree
        to receive a one-time sign-in email from JourneyPal.
      </p>
    </div>
  );
}
