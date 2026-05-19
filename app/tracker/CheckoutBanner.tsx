"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function CheckoutBanner({
  status,
}: {
  status: "success" | "cancelled";
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (status !== "success") return;
    // The checkout.session.completed webhook writes has_tracker shortly
    // after this redirect — refresh once to pick it up — then auto-dismiss.
    const refresh = setTimeout(() => router.refresh(), 2000);
    const dismiss = setTimeout(() => setVisible(false), 5000);
    return () => {
      clearTimeout(refresh);
      clearTimeout(dismiss);
    };
  }, [status, router]);

  if (!visible) return null;

  const isSuccess = status === "success";

  return (
    <div
      className={`mb-5 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p
        className={`text-sm ${
          isSuccess ? "font-medium text-emerald-800" : "text-ink-muted"
        }`}
      >
        {isSuccess
          ? "Welcome to the full tracker! All 30 items unlocked."
          : "Checkout cancelled. You can try again anytime."}
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className={`-m-1 shrink-0 rounded p-1 transition ${
          isSuccess
            ? "text-emerald-700 hover:bg-emerald-100"
            : "text-ink-soft hover:bg-slate-200"
        }`}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
