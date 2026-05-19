"use client";

import { useEffect, useState } from "react";
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
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { CHECKLIST_PHASES } from "@/lib/checklist-items";
import { getUniversityLinks } from "@/lib/university-links";
import AccountMenu from "./AccountMenu";

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

export default function TrackerView({
  name,
  arrivalLabel,
  university,
  hasTracker,
  daysToGo,
  completedItems,
  totalItems,
}: {
  name: string;
  arrivalLabel: string;
  university: string;
  hasTracker: boolean;
  daysToGo: number;
  completedItems: number;
  totalItems: number;
}) {
  const [activePhase, setActivePhase] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const phase =
    CHECKLIST_PHASES.find((p) => p.number === activePhase) ??
    CHECKLIST_PHASES[0];
  const uniLinks = getUniversityLinks(university);
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function selectPhase(n: number) {
    setActivePhase(n);
    setDrawerOpen(false);
  }

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
    <div className="lg:flex lg:gap-8">
      {/* Drawer backdrop — medium width only */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-30 hidden bg-ink/40 md:block lg:hidden"
          aria-hidden
        />
      )}

      {/* Sidebar — stacked on mobile, drawer at md, sticky column at lg */}
      <aside
        className={`mb-8 w-full transition-transform md:fixed md:inset-y-0 md:left-0 md:z-40 md:mb-0 md:w-[300px] md:overflow-y-auto md:bg-cream md:p-6 md:shadow-2xl lg:sticky lg:top-6 lg:z-auto lg:w-[280px] lg:shrink-0 lg:translate-x-0 lg:self-start lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none ${
          drawerOpen ? "md:translate-x-0" : "md:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <AccountMenu initial={name.charAt(0).toUpperCase()} />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="hidden rounded-lg p-1.5 text-ink-soft transition hover:bg-slate-100 md:block lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5">
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Hi, {name} 👋
          </h1>
          <p className="mt-0.5 text-sm text-ink-muted">{arrivalLabel}</p>
        </div>

        <div className="mt-5 rounded-xl bg-mist p-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-ink">{daysToGo}</span>
            <span className="text-sm font-medium text-ink-muted">
              days to go
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            {completedItems} of {totalItems} complete{" "}
            <span className="text-ink-soft">·</span>{" "}
            <span className="font-semibold text-emerald-500">On Track</span>
          </p>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <nav className="mt-6 space-y-1">
          {CHECKLIST_PHASES.map((p) => {
            const current = p.number === activePhase;
            return (
              <button
                key={p.number}
                type="button"
                onClick={() => selectPhase(p.number)}
                aria-current={current ? "true" : undefined}
                className={`block w-full border-l-2 px-3 py-2 text-left text-sm transition ${
                  current
                    ? "border-brand-500 bg-brand-50/60 font-semibold text-brand-700"
                    : "border-transparent text-ink-muted hover:bg-slate-50 hover:text-ink"
                }`}
              >
                Phase {p.number} · {p.name} · 0/{p.items.length}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="mb-4 hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink transition hover:border-brand-300 md:flex lg:hidden"
        >
          <Menu size={18} />
          Phases
        </button>

        <h2 className="text-xl font-bold tracking-tight text-ink">
          Phase {phase.number}: {phase.name}
        </h2>

        <ul className="mt-4 space-y-3">
          {phase.items.map((item) => {
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
