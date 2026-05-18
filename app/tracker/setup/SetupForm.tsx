"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, GraduationCap, ChevronDown } from "lucide-react";

const UNIVERSITY_OPTIONS = [
  "Seoul National University",
  "Yonsei University",
  "Korea University",
  "KAIST",
  "Hanyang University",
  "Sogang University",
  "Ewha Womans University",
  "Sungkyunkwan University",
  "Kyung Hee University",
  "Other",
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-ink outline-none placeholder:text-ink-soft focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:opacity-60 transition";

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function SetupForm() {
  const router = useRouter();

  const today = new Date();
  const minDate = isoDate(today);
  const maxDate = isoDate(
    new Date(today.getFullYear(), today.getMonth() + 18, today.getDate())
  );

  const [name, setName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [dateUnknown, setDateUnknown] = useState(false);
  const [universitySelect, setUniversitySelect] = useState("");
  const [universityOther, setUniversityOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const university =
      universitySelect === "Other" ? universityOther.trim() : universitySelect;
    const arrival_date = dateUnknown || !arrivalDate ? null : arrivalDate;

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!universitySelect) {
      setError("Please choose your university.");
      return;
    }
    if (universitySelect === "Other" && !university) {
      setError("Please type your university's name.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/tracker/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), arrival_date, university }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitting(false);
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.replace("/tracker");
      router.refresh();
    } catch {
      setSubmitting(false);
      setError("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="flex items-center gap-2 text-sm font-medium text-ink"
        >
          <User size={18} className="text-ink-muted" />
          Your name
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should we call you?"
          disabled={submitting}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      {/* Arrival date */}
      <div>
        <label
          htmlFor="arrival"
          className="flex items-center gap-2 text-sm font-medium text-ink"
        >
          <Calendar size={18} className="text-ink-muted" />
          Arrival date in Korea
        </label>
        {!dateUnknown && (
          <input
            id="arrival"
            type="date"
            min={minDate}
            max={maxDate}
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            disabled={submitting}
            className={`mt-1.5 ${inputClass}`}
          />
        )}
        <label className="mt-2.5 flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={dateUnknown}
            onChange={(e) => {
              setDateUnknown(e.target.checked);
              if (e.target.checked) setArrivalDate("");
            }}
            disabled={submitting}
            className="h-4 w-4 accent-brand-500"
          />
          I don&apos;t know my arrival date yet
        </label>
      </div>

      {/* University */}
      <div>
        <label
          htmlFor="university"
          className="flex items-center gap-2 text-sm font-medium text-ink"
        >
          <GraduationCap size={18} className="text-ink-muted" />
          University
        </label>
        <div className="relative mt-1.5">
          <select
            id="university"
            required
            value={universitySelect}
            onChange={(e) => setUniversitySelect(e.target.value)}
            disabled={submitting}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="" disabled>
              Select your university
            </option>
            {UNIVERSITY_OPTIONS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft"
          />
        </div>
        {universitySelect === "Other" && (
          <input
            type="text"
            required
            value={universityOther}
            onChange={(e) => setUniversityOther(e.target.value)}
            placeholder="Type your university's name"
            disabled={submitting}
            className={`mt-2.5 ${inputClass}`}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand-500 px-4 py-3.5 text-base font-semibold text-white shadow-cta hover:bg-brand-600 active:translate-y-px disabled:opacity-60 transition"
      >
        {submitting ? "Setting up…" : "Start my tracker"}
      </button>
    </form>
  );
}
