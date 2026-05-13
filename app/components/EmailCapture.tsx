"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setMessage("");
      setEmail("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll email you the moment we launch.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-capture-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-card p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              id="email-capture-title"
              className="text-xl sm:text-2xl font-semibold text-ink"
            >
              Get notified at launch
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              We&apos;ll email you when JourneyPal opens. No spam, ever.
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-1 text-ink-soft hover:bg-brand-50 hover:text-ink transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6 rounded-xl bg-brand-50 p-4 text-brand-800">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              ref={inputRef}
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none placeholder:text-ink-soft focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-brand-500 px-4 py-3 text-base font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px disabled:opacity-60 transition"
            >
              {status === "loading" ? "Adding you…" : "Notify me"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600">{message}</p>
            )}
            <p className="text-xs text-ink-soft pt-1">
              We only use your email to tell you when we launch.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
