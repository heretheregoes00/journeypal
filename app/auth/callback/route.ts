import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Where users land after a successful sign-in.
const POST_LOGIN_REDIRECT = "/tracker";

function redirectToLogin(req: NextRequest, errorKey: string) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?error=${errorKey}`;
  return NextResponse.redirect(url);
}

// Handles the redirect from a magic link or Google OAuth. Supabase
// sends the user here with a `?code=...` to exchange for a session.
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const authError = req.nextUrl.searchParams.get("error");

  // Supabase reports expired/used links via an `error` query param.
  if (authError) {
    return redirectToLogin(req, "link");
  }
  if (!code) {
    return redirectToLogin(req, "missing");
  }

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return redirectToLogin(req, "exchange");
  }

  const url = req.nextUrl.clone();
  url.pathname = POST_LOGIN_REDIRECT;
  url.search = "";
  return NextResponse.redirect(url);
}
