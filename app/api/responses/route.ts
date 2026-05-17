import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "name",
  "email",
  "from_country",
  "university",
  "visa_type",
  "arrival_month",
  "stay_length",
  "budget",
  "korean_level",
] as const;

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return NextResponse.json(
        { error: `Missing or empty field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const worries =
    typeof body.worries === "string" && body.worries.trim() !== ""
      ? body.worries.trim().slice(0, 1000)
      : null;

  const row = {
    name: (body.name as string).trim(),
    email: (body.email as string).trim().toLowerCase(),
    from_country: (body.from_country as string).trim(),
    university: (body.university as string).trim(),
    visa_type: (body.visa_type as string).trim(),
    arrival_month: (body.arrival_month as string).trim(),
    stay_length: (body.stay_length as string).trim(),
    budget: (body.budget as string).trim(),
    korean_level: (body.korean_level as string).trim(),
    worries,
  };

  const { error } = await supabaseAdmin.from("responses").insert(row);

  if (error) {
    console.error("Supabase responses insert failed:", error.message);
    return NextResponse.json(
      { error: "Something went wrong saving your answers. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
