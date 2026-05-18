import Link from "next/link";
import Logo from "../../components/Logo";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function CheckEmailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const email =
    typeof searchParams.email === "string" ? searchParams.email.trim() : "";

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50/50 to-white">
      <header className="w-full">
        <div className="mx-auto max-w-md px-5 py-5">
          <Link href="/" aria-label="JourneyPal home" className="inline-flex">
            <Logo height={24} />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 pb-20 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
        </span>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">
          Check your email
        </h1>
        <p className="mt-4 text-lg text-ink-muted text-balance">
          {email ? (
            <>
              We sent a magic link to{" "}
              <span className="font-semibold text-ink">{email}</span>. Click the
              link in that email to finish signing in.
            </>
          ) : (
            "We sent you a magic link. Click the link in that email to finish signing in."
          )}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-card text-sm text-ink-muted">
          The link logs you straight into JourneyPal — no password needed. If
          it&apos;s not in your inbox within a minute or two, check your spam
          folder.
        </div>

        <Link
          href="/login"
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-ink hover:border-brand-300 hover:text-brand-700 transition"
        >
          Use a different email
        </Link>
      </div>
    </main>
  );
}
