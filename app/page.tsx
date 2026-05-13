"use client";

import { useState } from "react";
import Image from "next/image";
import EmailCapture from "./components/EmailCapture";

const LOGO_ASPECT = 642 / 113;

export default function Home() {
  const [open, setOpen] = useState(false);
  const openCapture = () => setOpen(true);

  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader onCta={openCapture} />
      <Hero onCta={openCapture} />
      <HowItWorks />
      <WhatsIncluded />
      <SocialProof />
      <FinalCta onCta={openCapture} />
      <Footer />
      <EmailCapture open={open} onClose={() => setOpen(false)} />
    </main>
  );
}

function SiteHeader({ onCta }: { onCta: () => void }) {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex items-center justify-between">
        <a href="#" aria-label="JourneyPal home" className="inline-flex">
          <Logo height={36} />
        </a>
        <button
          onClick={onCta}
          className="hidden sm:inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px transition"
        >
          Get notified
        </button>
      </div>
    </header>
  );
}

function Logo({ height = 36 }: { height?: number }) {
  const imgHeight = Math.round(height * 0.48);
  const imgWidth = Math.round(imgHeight * LOGO_ASPECT);
  const padX = Math.round(height * 0.5);
  return (
    <span
      className="inline-flex items-center rounded-lg bg-ink"
      style={{ height, paddingLeft: padX, paddingRight: padX }}
    >
      <Image
        src="/journeypal_logo.svg"
        alt="JourneyPal"
        width={imgWidth}
        height={imgHeight}
        priority
      />
    </span>
  );
}

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
      <div className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 -z-10 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 sm:pt-16 pb-14 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-medium text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Built for international students moving to Korea
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink text-balance">
              Your personalized guide to studying in Korea
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-ink-muted text-balance">
              Get a custom PDF guide tailored to your{" "}
              <span className="text-ink font-medium">university</span>,{" "}
              <span className="text-ink font-medium">visa type</span>, and{" "}
              <span className="text-ink font-medium">arrival date</span> — for
              just <span className="text-ink font-semibold">$15</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onCta}
                className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px transition"
              >
                Get notified at launch
                <svg
                  className="ml-2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-ink hover:border-brand-300 hover:text-brand-700 transition"
              >
                How it works
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
              <div className="flex items-center gap-1.5">
                <CheckDot /> Delivered as PDF
              </div>
              <div className="flex items-center gap-1.5">
                <CheckDot /> Ready in minutes
              </div>
              <div className="flex items-center gap-1.5">
                <CheckDot /> One flat price
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function CheckDot() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white">
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-md lg:max-w-none">
        <div className="rounded-2xl bg-white p-5 shadow-card border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-500 text-white grid place-items-center text-sm font-bold">
                J
              </div>
              <div>
                <div className="text-sm font-semibold">Your JourneyPal guide</div>
                <div className="text-xs text-ink-soft">Personalized PDF · 28 pages</div>
              </div>
            </div>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
              Ready
            </span>
          </div>

          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              { label: "Yonsei University · Sinchon campus", tag: "Custom" },
              { label: "D-2 student visa walkthrough", tag: "Visa" },
              { label: "Arrival: March 2 — week-by-week plan", tag: "Timeline" },
              { label: "Goshiwon near campus · ₩450k/mo", tag: "Housing" },
              { label: "T-money, KB Bank, ARC office hours", tag: "Setup" },
            ].map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
              >
                <span className="text-ink">{row.label}</span>
                <span className="text-xs text-brand-700 bg-white border border-brand-100 rounded-full px-2 py-0.5">
                  {row.tag}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between text-xs text-ink-soft">
            <span>journeypal.co</span>
            <span>v1 · sample preview</span>
          </div>
        </div>

        <div className="absolute -bottom-5 -right-4 rotate-3 rounded-xl bg-white px-3 py-2 text-xs shadow-card border border-slate-100">
          <div className="font-semibold text-ink">$15 · one-time</div>
          <div className="text-ink-soft">No subscription</div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Answer 10 questions",
      desc: "Tell us your university, visa type, arrival date, budget, and a few preferences. Takes ~3 minutes.",
    },
    {
      n: "02",
      title: "Pay $15",
      desc: "One flat price, no subscription. Secure checkout with card or Apple Pay.",
    },
    {
      n: "03",
      title: "Get your personalized PDF in minutes",
      desc: "We generate a guide built around your situation — delivered straight to your inbox.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From confused to settled, in three steps"
          subtitle="No generic checklists. Just the answers that actually apply to you."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl bg-white border border-slate-100 shadow-card p-6"
            >
              <div className="inline-flex h-9 items-center justify-center rounded-full bg-brand-50 px-3 text-sm font-semibold text-brand-700">
                Step {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhatsIncluded() {
  const items = [
    {
      title: "D-2 / D-4 visa walkthrough",
      desc: "Documents, embassy steps, common rejection reasons, and timing.",
    },
    {
      title: "ARC (Alien Registration Card) registration",
      desc: "Where to go in your district, what to bring, fees, and waiting times.",
    },
    {
      title: "Dorm vs goshiwon vs one-room",
      desc: "Honest pros and cons with realistic monthly budgets in ₩.",
    },
    {
      title: "Phone plan setup",
      desc: "Prepaid vs postpaid, the best carriers for foreigners, and how to sign up.",
    },
    {
      title: "Banking",
      desc: "Which banks open accounts for international students, and what you need.",
    },
    {
      title: "T-money & transit",
      desc: "Subway, bus, and KTX basics — and the cheapest way to top up.",
    },
    {
      title: "NHIS healthcare",
      desc: "How national health insurance works for students, and what it costs.",
    },
    {
      title: "Groceries from your home country",
      desc: "Where to find familiar foods near you — by country and by city.",
    },
    {
      title: "Emergency Korean phrases",
      desc: "What to say at the hospital, police station, and pharmacy.",
    },
    {
      title: "University-specific notes",
      desc: "SNU, Yonsei, Korea U, KAIST, Hanyang, Sogang, Ewha, and more.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/60 border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What's included"
          title="Every section, tailored to your situation"
          subtitle="No filler. Just the things you actually need in your first weeks."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <li
              key={it.title}
              className="flex items-start gap-3 rounded-2xl bg-white border border-slate-100 p-5"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-500 text-white">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-ink">{it.title}</h3>
                <p className="text-ink-muted text-sm mt-0.5">{it.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="From students who've done it"
          title="Stories coming soon"
          subtitle="We'll feature the first JourneyPal students here right after launch."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-slate-200 bg-white p-6"
              aria-hidden
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-50" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-slate-100" />
                  <div className="h-2.5 w-16 rounded bg-slate-100" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-2.5 w-full rounded bg-slate-100" />
                <div className="h-2.5 w-11/12 rounded bg-slate-100" />
                <div className="h-2.5 w-9/12 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-brand-500 px-6 py-12 sm:px-12 sm:py-16 text-white shadow-cta">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance max-w-2xl">
              Be the first to land in Korea with a guide that&apos;s actually yours.
            </h2>
            <p className="mt-4 text-brand-50/90 max-w-xl">
              We&apos;ll email you the moment JourneyPal opens. No spam — just one
              short note.
            </p>
            <button
              onClick={onCta}
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-50 active:translate-y-px transition"
            >
              Get notified at launch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo height={28} />
          <span className="text-sm text-ink-muted">
            © {new Date().getFullYear()} JourneyPal
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-brand-700 transition"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-brand-700 transition"
          >
            TikTok
          </a>
          <a
            href="mailto:hello@journeypal.co"
            className="text-ink-muted hover:text-brand-700 transition"
          >
            hello@journeypal.co
          </a>
        </nav>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-sm font-semibold uppercase tracking-wider text-brand-700">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-ink-muted text-balance">{subtitle}</p>
      )}
    </div>
  );
}
