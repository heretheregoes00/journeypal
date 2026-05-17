import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment."
  );
}

// Browser-safe client: uses the public anon key and is subject to RLS.
export const supabaseClient = createClient(supabaseUrl, anonKey);

// Server-only client: uses the service role key and BYPASSES RLS.
// Never import this into a client component — the service key must
// never reach the browser bundle.
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey ?? "", {
  auth: { persistSession: false, autoRefreshToken: false },
});
