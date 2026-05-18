import Link from "next/link";
import Logo from "../components/Logo";
import LoginForm from "./LoginForm";

type SearchParams = { [key: string]: string | string[] | undefined };

const ERROR_MESSAGES: Record<string, string> = {
  link: "That sign-in link has expired or was already used. Request a fresh one below.",
  missing: "Something went wrong with that sign-in link. Please try again.",
  exchange: "We couldn't finish signing you in. Please request a new link.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const errorKey =
    typeof searchParams.error === "string" ? searchParams.error : "";
  const initialError = ERROR_MESSAGES[errorKey] ?? "";

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50/50 to-white">
      <header className="w-full">
        <div className="mx-auto max-w-md px-5 py-5">
          <Link href="/" aria-label="JourneyPal home" className="inline-flex">
            <Logo height={24} />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 pb-20">
        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-card sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Log in to JourneyPal
          </h1>
          <p className="mt-2 text-ink-muted">
            New here? Entering your email creates your account automatically —
            no separate sign-up needed.
          </p>
          <LoginForm initialError={initialError} />
        </div>
      </div>
    </main>
  );
}
