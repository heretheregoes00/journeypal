import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const TRIAL_DAYS = 30;

export async function POST(req: NextRequest) {
  // Raw body is required for signature verification.
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error(
      "Stripe webhook: missing stripe-signature header or STRIPE_WEBHOOK_SECRET"
    );
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;

      if (!userId) {
        console.error(
          "checkout.session.completed: missing client_reference_id",
          session.id
        );
      } else {
        const trialEndsAt = new Date(
          Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000
        ).toISOString();

        // Scoped to has_tracker=false so a re-delivered event is a no-op
        // (Stripe retries / duplicate deliveries won't reset the trial).
        const { error } = await supabaseAdmin
          .from("trackers")
          .update({
            has_tracker: true,
            discord_status: "trial",
            discord_trial_ends_at: trialEndsAt,
          })
          .eq("user_id", userId)
          .eq("has_tracker", false);

        if (error) {
          console.error("Webhook trackers update failed:", error.message);
        }
      }
    } else {
      console.log("Stripe webhook: ignoring event type", event.type);
    }
  } catch (err) {
    // Per design: log internal errors but still return 200 so Stripe
    // stops retrying — retries handled manually via the Stripe dashboard.
    console.error("Stripe webhook handler error:", err);
  }

  return NextResponse.json({ received: true });
}
