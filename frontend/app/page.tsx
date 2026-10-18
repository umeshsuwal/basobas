"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { RentalCard } from "@/components/home/RentalCard";
import { SearchBar } from "@/components/home/SearchBar";
import { SiteFooter } from "@/components/home/SiteFooter";
import { rentals } from "@/lib/rentals";

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const visibleRentals = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return rentals;
    }

    return rentals.filter((rental) =>
      `${rental.location} ${rental.type}`.toLowerCase().includes(normalizedQuery),
    );
  }, [submittedQuery]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
  }

  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200/80 bg-[#fbfbff]">
        <SiteHeader />
      </header>

      <section className="px-6 pb-16 pt-14 text-center sm:pt-20">
        <p className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Rent rooms &amp; flats in Nepal
          <span className="block text-brand-700">without the hassle</span>
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Direct from verified owners in Kathmandu, Lalitpur, Pokhara, and
          beyond. No middleman charges.
        </p>
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Available Rentals
          </h1>
          {submittedQuery && (
            <p className="text-sm text-slate-500">
              {visibleRentals.length} result
              {visibleRentals.length === 1 ? "" : "s"} found
            </p>
          )}
        </div>

        {visibleRentals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              No rentals found in that area.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try searching for Kathmandu, Lalitpur, or Pokhara.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
