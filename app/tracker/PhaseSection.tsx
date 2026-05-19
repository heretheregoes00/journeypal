"use client";

import { useState } from "react";
import {
  Stamp,
  FileText,
  Plane,
  Hotel,
  Search,
  MapPin,
  ListChecks,
  Banknote,
  Smartphone,
  Landmark,
  Home,
  GraduationCap,
  UserCog,
  CreditCard,
  Building2,
  MessageCircle,
  FileSignature,
  IdCard,
  Link2,
  Stethoscope,
  BriefcaseBusiness,
  Briefcase,
  Repeat,
  Coffee,
  Users,
  Train,
  RotateCw,
  PiggyBank,
  Circle,
  ArrowUpRight,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { CHECKLIST_PHASES } from "@/lib/checklist-items";
import { getUniversityLinks } from "@/lib/university-links";

// Only the icons referenced by the checklist data — keyed by name so the
// data's `iconName` strings resolve without bundling the full Lucide set.
const ICON_MAP: Record<string, LucideIcon> = {
  Stamp,
  FileText,
  Plane,
  Hotel,
  Search,
  MapPin,
  ListChecks,
  Banknote,
  Smartphone,
  Landmark,
  Home,
  GraduationCap,
  UserCog,
  CreditCard,
  Building2,
  MessageCircle,
  FileSignature,
  IdCard,
  Link2,
  Stethoscope,
  BriefcaseBusiness,
  Briefcase,
  Repeat,
  Coffee,
  Users,
  Train,
  RotateCw,
  PiggyBank,
};

// Items numbered above this are gated behind the $19 tracker purchase.
const FREE_ITEM_LIMIT = 5;

function CtaLink({
  label,
  url,
  sponsored,
}: {
  label: string;
  url: string;
  sponsored?: boolean;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel={sponsored ? "noopener sponsored" : "noopener"}
      className="mt-1.5 flex w-fit items-center gap-1 text-sm font-medium text-brand-500 underline-offset-2 hover:underline"
    >
      <ArrowUpRight size={14} className="shrink-0" />
      {label}
    </a>
  );
}

export default function PhaseSection({
  university,
  hasTracker,
}: {
  university: string;
  hasTracker: boolean;
}) {
  const [activePhase, setActivePhase] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const phase =
    CHECKLIST_PHASES.find((p) => p.number === activePhase) ??
    CHECKLIST_PHASES[0];
  const uniLinks = getUniversityLinks(university);

  async function handleCheckout() {
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setCheckoutLoading(false);
        setCheckoutError(
          data.error === "already_purchased"
            ? "You already have the full tracker — refresh the page."
            : "Couldn't start checkout. Please try again."
        );
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutLoading(false);
      setCheckoutError("Network error. Please try again.");
    }
  }

  return (
    <div>
      {/* Phase navigation — 2x2 on mobile, 4-in-a-row on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CHECKLIST_PHASES.map((p) => {
          const current = p.number === activePhase;
          return (
            <button
              key={p.number}
              type="button"
              onClick={() => setActivePhase(p.number)}
              aria-current={current ? "true" : undefined}
              className={`rounded-xl border-2 p-3 text-left transition ${
                current
                  ? "border-brand-500 bg-brand-50/70"
                  : "border-slate-200 bg-white hover:border-brand-300"
              }`}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                Phase {p.number}
              </div>
              <div className="mt-1 text-sm font-semibold leading-tight text-ink">
                {p.name}
              </div>
              <div
                className={`mt-2 text-xs font-medium ${
                  current ? "text-brand-700" : "text-ink-soft"
                }`}
              >
                0/{p.items.length}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active phase content */}
      <div className="mt-7">
        <h2 className="text-xl font-bold tracking-tight text-ink">
          Phase {phase.number}: {phase.name}
        </h2>
        <ul className="mt-4 space-y-3">
          {phase.items.map((item) => {
            // Gated items render as locked rows until the tracker is purchased.
            if (!hasTracker && item.number > FREE_ITEM_LIMIT) {
              return (
                <li
                  key={item.number}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <Lock
                    size={18}
                    className="shrink-0 text-slate-400"
                    aria-hidden
                  />
                  <span className="text-[15px] font-medium text-slate-400">
                    {item.title}
                  </span>
                </li>
              );
            }

            const Icon = ICON_MAP[item.iconName] ?? Circle;
            const universityUrl = item.universityResource
              ? uniLinks[item.universityResource.link]
              : null;
            return (
              <li
                key={item.number}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
              >
                <Icon
                  size={20}
                  className="mt-0.5 shrink-0 text-ink-muted"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                  {item.cta && (
                    <CtaLink
                      label={item.cta.label}
                      url={item.cta.url}
                      sponsored
                    />
                  )}
                  {item.resource && (
                    <CtaLink
                      label={item.resource.label}
                      url={item.resource.url}
                    />
                  )}
                  {item.universityResource && universityUrl && (
                    <CtaLink
                      label={item.universityResource.label}
                      url={universityUrl}
                    />
                  )}
                </div>
                <button
                  type="button"
                  aria-label={`Mark "${item.title}" complete`}
                  className="-my-1 -mr-1 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-lg transition hover:bg-slate-50"
                >
                  <span className="h-6 w-6 rounded-full border-2 border-slate-300" />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Paywall CTA — shown until the tracker is purchased. */}
        {!hasTracker && (
          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 text-center">
            <h3 className="text-lg font-bold tracking-tight text-ink">
              Unlock all 30 items
            </h3>
            <p className="mt-1.5 text-sm text-ink-muted">
              Get the full tracker — $19 one-time. Includes 1 month free
              community access.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px disabled:opacity-60 transition"
            >
              {checkoutLoading ? "Redirecting…" : "Get the full tracker"}
            </button>
            {checkoutError && (
              <p className="mt-2 text-sm text-red-600">{checkoutError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
