import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client for auth flows (magic link, OAuth).
// Stores the session — and the PKCE code verifier — in cookies, so the
// server-side /auth/callback route can complete the exchange.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
