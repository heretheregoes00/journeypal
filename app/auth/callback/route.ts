import { NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
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

function redirectToApp(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = POST_LOGIN_REDIRECT;
  url.search = "";
  return NextResponse.redirect(url);
}

// Handles the redirect after sign-in:
// - Magic link (token-hash flow): ?token_hash=...&type=... -> verifyOtp.
//   No PKCE verifier cookie is needed, so it survives the email round-trip.
// - Google OAuth (PKCE flow): ?code=... -> exchangeCodeForSession.
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const tokenHash = params.get("token_hash");
  const type = params.get("type");
  const code = params.get("code");
  const authError = params.get("error");

  // Supabase reports expired/used links via an `error` query param.
  if (authError) {
    return redirectToLogin(req, "link");
  }

  const supabase = createClient();

  // Magic link — token-hash flow.
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash: tokenHash,
    });
    if (error) {
      console.error(
        "verifyOtp failed —",
        "message:",
        error.message,
        "| status:",
        error.status,
        "| code:",
        error.code
      );
      return redirectToLogin(req, "exchange");
    }
    return redirectToApp(req);
  }

  // Google OAuth — PKCE code exchange.
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error(
        "exchangeCodeForSession failed —",
        "message:",
        error.message,
        "| status:",
        error.status,
        "| code:",
        error.code
      );
      return redirectToLogin(req, "exchange");
    }
    return redirectToApp(req);
  }

  // Neither set — malformed callback.
  return redirectToLogin(req, "missing");
}
