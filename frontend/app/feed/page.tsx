"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { RentalCard } from "@/components/home/RentalCard";
import { rentals } from "@/lib/rentals";
import { RoleGate } from "@/components/RoleGate";

const locations = ["All areas", "Kathmandu", "Lalitpur", "Pokhara"];
const types = ["All types", "Single Room", "Studio Flat", "1 BHK Flat", "2 BHK Flat"];

export default function TenantFeedPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All areas");
  const [type, setType] = useState("All types");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const filteredRentals = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();
    return rentals.filter((rental) => {
      const matchesQuery = !normalizedQuery || `${rental.location} ${rental.type}`.toLowerCase().includes(normalizedQuery);
      const matchesLocation = location === "All areas" || rental.location.includes(location);
      const matchesType = type === "All types" || rental.type === type;
      return matchesQuery && matchesLocation && matchesType;
    });
  }, [location, submittedQuery, type]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
  }

  return (
    <RoleGate role="tenant"><main className="min-h-screen bg-[#f8f9ff]">
      <AccountHeader role="Tenant Account" title="Kathmandu Valley" />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Tenant home</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Find your next home</h1>
            <p className="mt-3 text-slate-600">Verified rooms and flats that match the way you want to live.</p>
          </div>
          <a href="#rentals" className="text-sm font-semibold text-brand-700">View all rentals ↓</a>
        </div>

        <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:flex-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by area, city, or room type" className="min-w-0 flex-1 rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" />
          <button type="submit" className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-900">Search</button>
        </form>

        <div className="mt-4 flex flex-wrap gap-3">
          <select value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">{locations.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">{types.map((item) => <option key={item}>{item}</option>)}</select>
          <span className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">{filteredRentals.length} homes available</span>
        </div>

        <section id="rentals" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Recommended for you</h2>
          {filteredRentals.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filteredRentals.map((rental) => <RentalCard key={rental.id} rental={rental} />)}</div>
          ) : (
            <div className="mt-6 rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-100"><p className="font-semibold text-slate-900">No matching rentals found.</p><p className="mt-2 text-sm text-slate-500">Try a different area or room type.</p></div>
          )}
        </section>
        <section className="mt-12 rounded-2xl bg-brand-50 p-6"><h2 className="font-semibold text-slate-900">Stay safe while renting</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Visit every property in person, never send token money before viewing, and use verified Basobas listings whenever possible.</p></section>
      </section>
    </main></RoleGate>
  );
}
