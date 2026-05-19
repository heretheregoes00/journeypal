import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { CHECKLIST_PHASES } from "@/lib/checklist-items";
import CheckoutBanner from "./CheckoutBanner";
import TrackerView from "./TrackerView";

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

  if (!tracker || !tracker.name || !tracker.university) {
    redirect("/tracker/setup");
  }

  const checkout = searchParams.checkout;
  const checkoutStatus =
    checkout === "success" || checkout === "cancelled" ? checkout : null;

  const arrivalLabel = tracker.arrival_date
    ? `Arriving on ${formatArrivalDate(tracker.arrival_date)}`
    : "Arrival date not set yet";

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:py-10">
        {checkoutStatus && <CheckoutBanner status={checkoutStatus} />}
        <TrackerView
          name={tracker.name}
          arrivalLabel={arrivalLabel}
          university={tracker.university}
          hasTracker={!!tracker.has_tracker}
          daysToGo={DAYS_TO_GO}
          completedItems={COMPLETED_ITEMS}
          totalItems={TOTAL_ITEMS}
        />
      </div>
    </main>
  );
}
