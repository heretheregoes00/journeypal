import { Check } from "lucide-react";

const PHASE_2_ITEMS = [
  { label: "Pick up SIM card", done: true },
  { label: "Open bank account", done: true },
  { label: "Visit campus", done: false },
  { label: "Get T-money", done: false },
];

export default function HeroVisual() {
  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-none">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div>
          <p className="text-lg font-bold text-ink">Hi, MJ 👋</p>
          <p className="mt-0.5 text-sm text-ink-muted">
            Arriving in Seoul on March 15, 2026
          </p>
        </div>

        {/* Stats */}
        <div className="mt-5 rounded-xl bg-mist p-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-ink">87</span>
            <span className="text-sm font-medium text-ink-muted">
              days to go
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            14 of 30 complete <span className="text-ink-soft">·</span>{" "}
            <span className="font-semibold text-emerald-500">On Track</span>
          </p>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: "47%" }}
            />
          </div>
        </div>

        {/* Phase items */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-ink">Phase 2: First Week</p>
          <ul className="mt-3 space-y-2.5">
            {PHASE_2_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5">
                <span
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
                    item.done
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {item.done && <Check size={12} strokeWidth={3} />}
                </span>
                <span
                  className={`text-sm ${
                    item.done ? "text-slate-400 line-through" : "text-ink"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
