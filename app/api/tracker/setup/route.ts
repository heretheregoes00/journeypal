import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function isValidArrivalDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return false;
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const max = new Date(now.getFullYear(), now.getMonth() + 18, now.getDate());
  return date >= today && date <= max;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const university =
    typeof body.university === "string" ? body.university.trim() : "";
  const rawArrivalDate =
    typeof body.arrival_date === "string" ? body.arrival_date.trim() : "";

  if (!name) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 }
    );
  }
  if (!university) {
    return NextResponse.json(
      { error: "Please choose your university." },
      { status: 400 }
    );
  }

  // Arrival date is optional — validate only if one was provided.
  let arrivalDate: string | null = null;
  if (rawArrivalDate) {
    if (!isValidArrivalDate(rawArrivalDate)) {
      return NextResponse.json(
        { error: "Please choose an arrival date within the next 18 months." },
        { status: 400 }
      );
    }
    arrivalDate = rawArrivalDate;
  }

  const fields = {
    name: name.slice(0, 120),
    arrival_date: arrivalDate,
    university: university.slice(0, 160),
  };

  // Authenticated users can't INSERT into trackers (RLS), so writes go
  // through the service-role client. Update an existing row if present,
  // otherwise create one.
  const { data: existing, error: selectError } = await supabaseAdmin
    .from("trackers")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (selectError) {
    console.error("trackers select failed:", selectError.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  let writeError = null;
  if (existing) {
    const { error } = await supabaseAdmin
      .from("trackers")
      .update(fields)
      .eq("user_id", user.id);
    writeError = error;
  } else {
    const { error } = await supabaseAdmin
      .from("trackers")
      .insert({ user_id: user.id, ...fields });
    writeError = error;
  }

  if (writeError) {
    console.error("trackers write failed:", writeError.message);
    return NextResponse.json(
      { error: "Couldn't save your details. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
