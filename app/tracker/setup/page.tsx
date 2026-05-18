import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Logo from "../../components/Logo";
import SetupForm from "./SetupForm";

export const metadata: Metadata = {
  title: "Set up your tracker — JourneyPal",
};

export default async function SetupPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <header className="w-full">
        <div className="mx-auto max-w-md px-5 py-5">
          <Link href="/" aria-label="JourneyPal home" className="inline-flex">
            <Logo height={24} />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 pb-16">
        <div className="rounded-2xl border border-slate-100 bg-white px-7 py-6 shadow-card sm:px-8 sm:py-7">
          <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Let&apos;s personalize your tracker
          </h1>
          <p className="mt-2 text-ink-muted">
            Three quick questions so we can tailor your journey.
          </p>
          <SetupForm />
        </div>
      </div>
    </main>
  );
}
