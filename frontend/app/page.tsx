"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { RentalCard } from "@/components/home/RentalCard";
import { SearchBar } from "@/components/home/SearchBar";
import { SiteFooter } from "@/components/home/SiteFooter";
import type { Rental } from "@/types/rental";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ApiListing {
  id: string;
  title: string;
  description: string;
  roomType: string;
  monthlyRent: number;
  location: string;
  features: { name: string }[];
  images: { url: string }[];
}

function toRental(listing: ApiListing): Rental {
  return {
    id: listing.id,
    image: listing.images[0]?.url ?? "/rentals/sunny-baneshwor.jpg",
    price: listing.monthlyRent.toLocaleString("en-IN"),
    type: listing.roomType,
    location: listing.location,
    alt: listing.title,
    features: listing.features.map((feature) => feature.name),
  };
}

export default function Home() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadListings() {
      try {
        const response = await fetch(`${API_URL}/listings`);
        const body = (await response.json()) as
          | ApiListing[]
          | { message: string | string[] };

        if (!response.ok || !Array.isArray(body)) {
          throw new Error(
            "message" in body
              ? Array.isArray(body.message)
                ? body.message.join(", ")
                : body.message
              : "Unable to load listings",
          );
        }

        if (!cancelled) {
          setRentals(body.map(toRental));
          setError("");
        }
      } catch (requestError: unknown) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load listings",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadListings();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleRentals = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return rentals;
    }

    return rentals.filter((rental) =>
      `${rental.location} ${rental.type}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [rentals, submittedQuery]);

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

          {submittedQuery && !loading && !error && (
            <p className="text-sm text-slate-500">
              {visibleRentals.length} result
              {visibleRentals.length === 1 ? "" : "s"} found
            </p>
          )}
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">Loading rentals...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-100">
            <p className="font-semibold text-red-700">
              Unable to load rentals.
            </p>
            <p className="mt-2 text-sm text-slate-500">{error}</p>
          </div>
        ) : visibleRentals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              {rentals.length === 0
                ? "No rentals available right now."
                : "No rentals found in that area."}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {rentals.length === 0
                ? "Check back later for new listings."
                : "Try searching for Kathmandu, Lalitpur, or Pokhara."}
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
