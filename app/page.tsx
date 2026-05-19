import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Briefcase, Plane, Check, ChevronDown } from "lucide-react";
import Logo from "./components/Logo";
import HeroVisual from "./components/HeroVisual";

export const metadata: Metadata = {
  title: "JourneyPal — Your relocation tracker for moving to Korea",
  description:
    "Stay on top of every step of your move to Korea. Visa, housing, banking, ARC, settling in. Built by someone who moved from NZ to Korea.",
};

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Personas />
        <HowItWorks />
        <Pricing />
        <FounderNote />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="JourneyPal home" className="inline-flex">
          <Logo height={24} />
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/login"
            className="text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Start your tracker
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-ink-muted">
            Built by someone who moved from 🇳🇿 to 🇰🇷
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Your relocation tracker for moving to Korea
          </h1>
          <p className="mt-5 text-balance text-lg text-ink-muted">
            Every step of moving to Korea in one place — visa, housing,
            banking, ARC, settling in. Start free; unlock all 30 steps for a
            one-time $19.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-600"
            >
              Start your tracker — free
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-ink-muted transition hover:text-ink"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            Free to start · No credit card required
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

const PERSONAS = [
  {
    icon: GraduationCap,
    label: "Undergraduate exchange students",
    description: "Spending a semester or year at SNU, Yonsei, Korea U or KAIST",
  },
  {
    icon: Briefcase,
    label: "Full-degree international students",
    description: "Starting a 2-4 year program on a D-2 visa",
  },
  {
    icon: Plane,
    label: "KGSP scholars",
    description:
      "Government-sponsored students navigating Korean academic life",
  },
];

function Personas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Built for
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{p.label}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{p.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: 1,
    title: "Sign up with email or Google",
    description: "Free, takes 30 seconds. No credit card.",
  },
  {
    n: 2,
    title: "Get your personalized tracker",
    description:
      "30 items across 4 phases of your move, tailored to your university.",
  },
  {
    n: 3,
    title: "Unlock the full tracker",
    description:
      "Unlock the full 30-item tracker for $19 — yours forever.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-24"
    >
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        How it works
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-base font-semibold text-white">
              {s.n}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-ink-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FREE_FEATURES = [
  "Sign up free with magic link or Google",
  "5 essential pre-arrival items",
  "Save your progress",
];

const TRACKER_FEATURES = [
  "Everything in Free",
  "All 30 items across 4 phases",
  "Days-to-arrival countdown",
  "On-track progress tracking",
  "Personalized links per university",
  "1 month free Discord access",
];

const COMMUNITY_FEATURES = [
  "Continued Discord access where JourneyPal answers your questions",
  "Ongoing relocation support beyond the checklist",
  "Cancel anytime",
];

function FeatureRow({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check
        size={18}
        strokeWidth={2.5}
        className="mt-0.5 flex-none text-brand-500"
      />
      <span className="text-sm text-ink-muted">{children}</span>
    </li>
  );
}

function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Pricing
      </h2>
      <p className="mt-3 text-lg text-ink-muted">
        Start free. Pay once for the full tracker. Add Community if you want it.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {/* Free */}
        <div className="flex flex-col rounded-2xl border border-slate-200 p-7">
          <h3 className="text-lg font-semibold text-ink">Free</h3>
          <div className="mt-3">
            <span className="text-4xl font-bold text-ink">$0</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">Try the tracker</p>
          <ul className="mb-8 mt-6 space-y-3">
            {FREE_FEATURES.map((f) => (
              <FeatureRow key={f}>{f}</FeatureRow>
            ))}
          </ul>
          <Link
            href="/login"
            className="mt-auto inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700"
          >
            Start free
          </Link>
        </div>

        {/* Full Tracker — highlighted */}
        <div className="relative flex flex-col rounded-2xl border-2 border-brand-500 p-7">
          <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
            Most popular
          </span>
          <h3 className="text-lg font-semibold text-ink">Full Tracker</h3>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-ink">$19</span>
            <span className="text-sm font-medium text-ink-muted">one-time</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            Everything you need to move
          </p>
          <ul className="mb-8 mt-6 space-y-3">
            {TRACKER_FEATURES.map((f) => (
              <FeatureRow key={f}>{f}</FeatureRow>
            ))}
          </ul>
          <Link
            href="/login"
            className="mt-auto inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Get the full tracker
          </Link>
        </div>

        {/* Community */}
        <div className="flex flex-col rounded-2xl border border-slate-200 p-7">
          <h3 className="text-lg font-semibold text-ink">Community</h3>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-ink">$7</span>
            <span className="text-sm font-medium text-ink-muted">/ month</span>
            <span className="text-xs text-ink-soft">
              after a 1-month free trial
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            Stay connected after you arrive
          </p>
          <ul className="mb-8 mt-6 space-y-3">
            {COMMUNITY_FEATURES.map((f) => (
              <FeatureRow key={f}>{f}</FeatureRow>
            ))}
          </ul>
          <p className="mt-auto text-center text-xs text-ink-soft">
            Requires the Full Tracker purchase first.
          </p>
          <Link
            href="/login"
            className="mt-3 inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700"
          >
            Add Community
          </Link>
        </div>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Why JourneyPal exists
      </h2>
      <p className="mt-8 text-lg leading-relaxed text-ink-muted">
        JourneyPal started with one chaotic move from New Zealand to Seoul.
        Relocating to Korea is full of moving parts — ARC deadlines, bank
        account headaches, neighborhood research, finding a goshiwon at the
        last minute — and there was no single place that organized all of it.
        So we built the tool we wished we had.
        <span className="mt-4 block font-semibold text-ink">
          — JourneyPal Team
        </span>
      </p>
    </section>
  );
}

const FAQS = [
  {
    q: "Do I need to pay to use JourneyPal?",
    a: "No. The free tier covers 5 essential items. The full 30-item tracker is a one-time $19 purchase.",
  },
  {
    q: "Can I cancel anytime?",
    a: "The full tracker is a one-time purchase, so there's nothing to cancel. The optional Community subscription can be cancelled anytime.",
  },
  {
    q: "Why is the tracker one-time but Community is monthly?",
    a: "The tracker is a one-and-done tool for your move. The Community gives you ongoing access to JourneyPal and other students who are moving — that's a continuing value, so it's a small monthly fee after your free first month.",
  },
  {
    q: "Is this only for students?",
    a: "Right now, JourneyPal is built specifically for international students moving to Korea on D-2, D-4, exchange, or KGSP visas. We may expand to other categories later.",
  },
  {
    q: "What if my university isn't in the list?",
    a: "You can select 'Other' during setup and add your university manually. You'll still get the full tracker, just with generic Seoul-area links instead of campus-specific ones.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes — if you're not satisfied with the tracker, email us within 7 days of purchase and we'll refund you in full. For the Community subscription, you can cancel anytime and won't be charged again.",
  },
];

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Frequently asked questions
      </h2>
      <div className="mt-8 border-t border-slate-200">
        {FAQS.map((item) => (
          <details key={item.q} className="group border-b border-slate-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                size={18}
                className="flex-none text-ink-soft transition group-open:rotate-180"
              />
            </summary>
            <p className="pb-5 text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
      <h2 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Start your move today.
      </h2>
      <p className="mt-3 text-lg text-ink-muted">
        Free to try. No credit card required.
      </p>
      <Link
        href="/login"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-500 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-brand-600"
      >
        Start your tracker
      </Link>
    </section>
  );
}

const FOOTER_LINKS = [
  { label: "About", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "mailto:hello@journeypal.co" },
];

function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo height={22} />
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-ink-muted transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-ink-soft">
          Built in Seoul. © {new Date().getFullYear()} JourneyPal.
        </p>
      </div>
    </footer>
  );
}
