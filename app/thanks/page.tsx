import Link from "next/link";
import Logo from "../components/Logo";

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

  const heading = name ? `Thanks, ${name}!` : "Thanks!";
  const delivery = email
    ? `You'll get it at ${email} within 24 hours.`
    : "You'll receive it within 24 hours.";

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
          We&apos;re putting together your personalized Korea relocation guide.{" "}
          {delivery}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-card text-sm text-ink-muted">
          Keep an eye on your inbox (and your spam folder, just in case).
          Questions? Email us at{" "}
          <a
            href="mailto:hello@journeypal.co"
            className="font-medium text-brand-700 hover:underline"
          >
            hello@journeypal.co
          </a>
          .
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-ink hover:border-brand-300 hover:text-brand-700 transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
