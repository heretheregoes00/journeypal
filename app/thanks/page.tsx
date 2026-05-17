import Link from "next/link";
import Logo from "../components/Logo";
import { STRIPE_PAYMENT_LINK } from "@/lib/config";

type SearchParams = { [key: string]: string | string[] | undefined };

function firstString(value: string | string[] | undefined): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return (value[0] ?? "").trim();
  return "";
}

export default function ThanksPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const name = firstString(searchParams.name);
  const email = firstString(searchParams.email);

  const heading = name ? `One last step, ${name}` : "One last step";
  const fineText = email
    ? `Secure checkout via Stripe. We'll send your guide to ${email} within 24 hours of payment.`
    : "Secure checkout via Stripe. We'll send your guide within 24 hours of payment.";

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50/50 to-white">
      <header className="w-full">
        <div className="mx-auto max-w-xl px-5 py-5">
          <Link href="/" aria-label="JourneyPal home" className="inline-flex">
            <Logo height={24} />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 pb-20 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-cta">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>

        <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-ink text-balance">
          {heading}
        </h1>
        <p className="mt-4 text-lg text-ink-muted text-balance">
          Your personalized Korea relocation guide is ready to be prepared. To
          receive it within 24 hours, complete payment below.
        </p>

        <a
          href={STRIPE_PAYMENT_LINK}
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px transition sm:w-auto"
        >
          Pay $15 and get my guide →
        </a>

        <p className="mt-4 max-w-md text-sm text-ink-soft text-balance">
          {fineText}
        </p>
      </div>
    </main>
  );
}
