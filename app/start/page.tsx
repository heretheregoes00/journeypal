"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../components/Logo";

const STORAGE_KEY = "journeypal_questionnaire_v1";
const TOTAL = 10;

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3.5 text-base text-ink outline-none placeholder:text-ink-soft focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition";

type AnswerKey =
  | "name"
  | "email"
  | "from_country"
  | "university"
  | "university_other"
  | "visa_type"
  | "arrival_month"
  | "stay_length"
  | "budget"
  | "korean_level"
  | "worries";

type Answers = Record<AnswerKey, string>;

const EMPTY_ANSWERS: Answers = {
  name: "",
  email: "",
  from_country: "",
  university: "",
  university_other: "",
  visa_type: "",
  arrival_month: "",
  stay_length: "",
  budget: "",
  korean_level: "",
  worries: "",
};

type Question = {
  id: AnswerKey;
  type:
    | "text"
    | "email"
    | "autocomplete"
    | "radio"
    | "radio-other"
    | "month"
    | "textarea";
  title: string;
  subtitle?: string;
  placeholder?: string;
  options?: string[];
  suggestions?: string[];
  optional?: boolean;
};

const QUESTIONS: Question[] = [
  {
    id: "name",
    type: "text",
    title: "What's your name?",
    placeholder: "Your name",
  },
  {
    id: "email",
    type: "email",
    title: "What's your email?",
    subtitle: "This is how we'll send your guide.",
    placeholder: "you@school.edu",
  },
  {
    id: "from_country",
    type: "autocomplete",
    title: "Which country are you moving from?",
    placeholder: "Start typing your country…",
    suggestions: [
      "United States",
      "Canada",
      "United Kingdom",
      "Australia",
      "New Zealand",
      "Singapore",
      "Vietnam",
      "Indonesia",
      "Philippines",
      "Other",
    ],
  },
  {
    id: "university",
    type: "radio-other",
    title: "Which university in Korea?",
    options: [
      "Seoul National University",
      "Yonsei",
      "Korea University",
      "KAIST",
      "Hanyang",
      "Sogang",
      "Ewha",
      "Sungkyunkwan",
      "Other",
    ],
  },
  {
    id: "visa_type",
    type: "radio",
    title: "What's your visa type?",
    options: [
      "D-2 degree-seeking student",
      "D-4 language school",
      "Exchange student",
      "KGSP / government scholarship",
      "Other / not sure",
    ],
  },
  {
    id: "arrival_month",
    type: "month",
    title: "When are you arriving in Korea?",
    subtitle: "Pick the month you expect to land.",
  },
  {
    id: "stay_length",
    type: "radio",
    title: "How long are you staying?",
    options: ["Less than 6 months", "6–12 months", "1–2 years", "2+ years"],
  },
  {
    id: "budget",
    type: "radio",
    title: "What's your monthly budget for living expenses?",
    subtitle: "In Korean won.",
    options: ["Under ₩800k", "₩800k–1.2M", "₩1.2M–1.8M", "₩1.8M+"],
  },
  {
    id: "korean_level",
    type: "radio",
    title: "How much Korean do you speak?",
    options: ["None", "Basic phrases", "Conversational", "Fluent"],
  },
  {
    id: "worries",
    type: "textarea",
    title: "What are you most worried about?",
    subtitle: "Optional — but it helps us tailor your guide.",
    placeholder:
      "ARC application, finding housing, opening a bank account, finding community…",
    optional: true,
  },
];

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function validateStep(q: Question, answers: Answers): string | null {
  if (q.optional) return null;

  if (q.id === "university") {
    if (!answers.university) return "Please choose an option.";
    if (answers.university === "Other" && !answers.university_other.trim()) {
      return "Please type your university's name.";
    }
    return null;
  }

  const value = answers[q.id].trim();

  if (q.type === "email") {
    if (!value) return "Please enter your email.";
    if (!isValidEmail(value)) return "That doesn't look like a valid email.";
    return null;
  }

  if (!value) {
    return q.type === "radio" || q.type === "month"
      ? "Please choose an option."
      : "Please fill this in.";
  }
  return null;
}

function buildMonthOptions(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < 18; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push(
      d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    );
  }
  return out;
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
        selected
          ? "border-brand-500 bg-brand-50 ring-2 ring-brand-100"
          : "border-slate-200 bg-white hover:border-brand-300"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
          selected ? "border-brand-500 bg-brand-500" : "border-slate-300"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <span className="text-ink">{label}</span>
    </button>
  );
}

function QuestionField({
  q,
  answers,
  setAnswer,
  months,
  onEnter,
}: {
  q: Question;
  answers: Answers;
  setAnswer: (id: AnswerKey, value: string) => void;
  months: string[];
  onEnter: () => void;
}) {
  if (q.type === "text" || q.type === "email") {
    return (
      <input
        type={q.type === "email" ? "email" : "text"}
        autoFocus
        value={answers[q.id]}
        onChange={(e) => setAnswer(q.id, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
          }
        }}
        placeholder={q.placeholder}
        className={inputClass}
      />
    );
  }

  if (q.type === "autocomplete") {
    return (
      <>
        <input
          type="text"
          autoFocus
          list="jp-country-suggestions"
          value={answers[q.id]}
          onChange={(e) => setAnswer(q.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          placeholder={q.placeholder}
          className={inputClass}
        />
        <datalist id="jp-country-suggestions">
          {q.suggestions?.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </>
    );
  }

  if (q.type === "textarea") {
    return (
      <textarea
        autoFocus
        rows={5}
        maxLength={1000}
        value={answers[q.id]}
        onChange={(e) => setAnswer(q.id, e.target.value)}
        placeholder={q.placeholder}
        className={`${inputClass} resize-none`}
      />
    );
  }

  if (q.type === "month") {
    return (
      <select
        value={answers[q.id]}
        onChange={(e) => setAnswer(q.id, e.target.value)}
        className={`${inputClass} bg-white`}
      >
        <option value="" disabled>
          Select a month…
        </option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    );
  }

  if (q.type === "radio") {
    return (
      <div className="space-y-2.5">
        {q.options?.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={answers[q.id] === opt}
            onClick={() => setAnswer(q.id, opt)}
          />
        ))}
      </div>
    );
  }

  if (q.type === "radio-other") {
    return (
      <div className="space-y-2.5">
        {q.options?.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={answers.university === opt}
            onClick={() => setAnswer("university", opt)}
          />
        ))}
        {answers.university === "Other" && (
          <input
            type="text"
            autoFocus
            value={answers.university_other}
            onChange={(e) => setAnswer("university_other", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onEnter();
              }
            }}
            placeholder="Type your university's name"
            className={inputClass}
          />
        )}
      </div>
    );
  }

  return null;
}

export default function StartPage() {
  const router = useRouter();
  const months = useMemo(buildMonthOptions, []);

  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Restore saved progress on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === "object") {
          if (saved.answers) {
            setAnswers({ ...EMPTY_ANSWERS, ...saved.answers });
          }
          if (typeof saved.step === "number") {
            setStep(Math.min(Math.max(Math.floor(saved.step), 0), TOTAL - 1));
          }
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  // Persist progress on every change.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {
      // ignore storage write failures (private mode, quota)
    }
  }, [step, answers, loaded]);

  const q = QUESTIONS[step];

  function setAnswer(id: AnswerKey, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError(null);
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  function goNext() {
    const err = validateStep(q, answers);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step < TOTAL - 1) {
      setStep((s) => s + 1);
    } else {
      void submit();
    }
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: answers.name.trim(),
      email: answers.email.trim().toLowerCase(),
      from_country: answers.from_country.trim(),
      university:
        answers.university === "Other"
          ? answers.university_other.trim()
          : answers.university,
      visa_type: answers.visa_type,
      arrival_month: answers.arrival_month,
      stay_length: answers.stay_length,
      budget: answers.budget,
      korean_level: answers.korean_level,
      worries: answers.worries.trim(),
    };

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitting(false);
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      router.push(
        `/thanks?name=${encodeURIComponent(
          payload.name
        )}&email=${encodeURIComponent(payload.email)}`
      );
    } catch {
      setSubmitting(false);
      setSubmitError("Network error. Please check your connection and retry.");
    }
  }

  const progress = ((step + 1) / TOTAL) * 100;

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50/50 to-white">
      <header className="w-full">
        <div className="mx-auto max-w-xl px-5 py-5">
          <Link href="/" aria-label="JourneyPal home" className="inline-flex">
            <Logo height={24} />
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-xl flex-1 px-5 pb-16">
        {!loaded ? (
          <p className="mt-10 text-ink-soft">Loading your progress…</p>
        ) : (
          <>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm font-medium text-ink-soft">
                <span>
                  Question {step + 1} of {TOTAL}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div key={step} className="mt-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">
                {q.title}
              </h1>
              {q.subtitle && (
                <p className="mt-2 text-ink-muted">{q.subtitle}</p>
              )}
              <div className="mt-6">
                <QuestionField
                  q={q}
                  answers={answers}
                  setAnswer={setAnswer}
                  months={months}
                  onEnter={goNext}
                />
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={submitting}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-ink hover:border-brand-300 disabled:opacity-50 transition"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={submitting}
                className="flex-1 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px disabled:opacity-60 transition"
              >
                {step < TOTAL - 1
                  ? "Next"
                  : submitting
                    ? "Submitting…"
                    : "Submit"}
              </button>
            </div>
            {submitError && (
              <p className="mt-3 text-sm text-red-600">{submitError}</p>
            )}

            <p className="mt-6 text-xs text-ink-soft">
              Your progress is saved on this device automatically.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
