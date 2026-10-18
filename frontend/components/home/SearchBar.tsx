import type { FormEvent } from "react";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" strokeLinecap="round" />
    </svg>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 flex max-w-4xl items-center gap-3 rounded-2xl border border-blue-100 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
    >
      <label className="flex min-w-0 flex-1 items-center gap-3 px-3 text-slate-400">
        <SearchIcon />
        <span className="sr-only">Search by area, city, or room type</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by area, city, or room type (e.g. Kathmandu, studio...)"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>
      <button
        type="submit"
        className="rounded-xl bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-900"
      >
        Search
      </button>
    </form>
  );
}
