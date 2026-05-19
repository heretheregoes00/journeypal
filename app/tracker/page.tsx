import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { CHECKLIST_PHASES } from "@/lib/checklist-items";
import AccountMenu from "./AccountMenu";
import CheckoutBanner from "./CheckoutBanner";
import PhaseSection from "./PhaseSection";

export const metadata: Metadata = {
  title: "Your tracker — JourneyPal",
};

const TOTAL_ITEMS = CHECKLIST_PHASES.reduce((n, p) => n + p.items.length, 0);
const COMPLETED_ITEMS = 0;
// Hardcoded — real countdown lands in Week 3.
const DAYS_TO_GO = 87;

function formatArrivalDate(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function TrackerPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: tracker } = await supabase
    .from("trackers")
    .select("name, arrival_date, university, has_tracker")
    .eq("user_id", user.id)
    .maybeSingle();

  // Arrival date is optional, so setup is "complete" with just name + university.
  if (!tracker || !tracker.name || !tracker.university) {
    redirect("/tracker/setup");
  }

  const checkout = searchParams.checkout;
  const checkoutStatus =
    checkout === "success" || checkout === "cancelled" ? checkout : null;

  const progress = TOTAL_ITEMS > 0 ? (COMPLETED_ITEMS / TOTAL_ITEMS) * 100 : 0;

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-5 py-6 sm:py-10">
        {checkoutStatus && <CheckoutBanner status={checkoutStatus} />}

        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Hi, {tracker.name} 👋
            </h1>
            <p className="mt-1 text-ink-muted">
              {tracker.arrival_date
                ? `Arriving on ${formatArrivalDate(tracker.arrival_date)}`
                : "Arrival date not set yet"}
            </p>
          </div>
          <AccountMenu initial={tracker.name.charAt(0).toUpperCase()} />
        </header>

        {/* Stats card */}
        <section className="mt-6 rounded-xl bg-mist p-5 shadow-sm sm:p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-ink sm:text-5xl">
              {DAYS_TO_GO}
            </span>
            <span className="text-lg font-medium text-ink-muted">
              days to go
            </span>
          </div>
          <p className="mt-1.5 text-sm text-ink-muted">
            {COMPLETED_ITEMS} of {TOTAL_ITEMS} complete{" "}
            <span className="text-ink-soft">·</span>{" "}
            <span className="font-semibold text-emerald-500">On Track</span>
          </p>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Phase navigation + active phase */}
        <div className="mt-6">
          <PhaseSection
            university={tracker.university}
            hasTracker={!!tracker.has_tracker}
          />
        </div>

        <footer className="mt-10">
          <p className="text-xs text-ink-soft">
            Some links are affiliate links — they help support JourneyPal at no
            extra cost to you.
          </p>
        </footer>
      </div>
    </main>
  );
}
