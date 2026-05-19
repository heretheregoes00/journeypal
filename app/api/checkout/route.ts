import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { stripe } from "@/lib/stripe-server";

export const runtime = "nodejs";

// Creates a Stripe Checkout Session for the $19 one-time tracker purchase.
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Block double purchases.
  const { data: tracker } = await supabase
    .from("trackers")
    .select("has_tracker")
    .eq("user_id", user.id)
    .maybeSingle();

  if (tracker?.has_tracker) {
    return NextResponse.json({ error: "already_purchased" }, { status: 400 });
  }

  const priceId = process.env.STRIPE_TRACKER_PRICE_ID;
  if (!priceId) {
    console.error("Missing STRIPE_TRACKER_PRICE_ID");
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }

  // Derive redirect URLs from the request origin so checkout works on
  // localhost and production without depending on a fixed env var.
  const origin = req.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/tracker?checkout=success`,
      cancel_url: `${origin}/tracker?checkout=cancelled`,
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: { user_id: user.id, product: "tracker" },
    });

    if (!session.url) {
      console.error("Stripe checkout session returned no url");
      return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err);
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }
}
