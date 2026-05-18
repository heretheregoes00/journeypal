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

export default function PhaseSection({ university }: { university: string }) {
  const [activePhase, setActivePhase] = useState(1);
  const phase =
    CHECKLIST_PHASES.find((p) => p.number === activePhase) ??
    CHECKLIST_PHASES[0];
  const uniLinks = getUniversityLinks(university);

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
      </div>
    </div>
  );
}
