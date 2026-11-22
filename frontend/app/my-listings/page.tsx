"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";
import {
  getMyListings,
  type ManagedListing,
} from "@/lib/listings";

type ListingStatus = "Active" | "Rented";

function getDisplayStatus(status: string): ListingStatus {
  return status.toLowerCase() === "rented" ? "Rented" : "Active";
}

export default function MyListingsPage() {
  const [filter, setFilter] = useState("All");
  const [listings, setListings] = useState<ManagedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadListings() {
      try {
        setLoading(true);
        setError("");

        const data = await getMyListings();

        if (!cancelled) {
          setListings(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your listings",
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

  const visibleListings = useMemo(
    () =>
      filter === "All"
        ? listings
        : listings.filter(
            (listing) => getDisplayStatus(listing.status) === filter,
          ),
    [filter, listings],
  );

  return (
    <RoleGate role="landlord">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Landlord Account" title="My Listings" />

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                Overview / Properties
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                My Listings
              </h1>

              <p className="mt-2 max-w-xl text-slate-600">
                Manage your rooms and flats across Kathmandu and Nepal.
              </p>
            </div>

            <Link
              href="/post-listing"
              className="rounded-xl bg-brand-700 px-5 py-3 text-center font-semibold text-white hover:bg-brand-900"
            >
              + Post New Listing
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 rounded-xl bg-brand-50 p-1">
            {["All", "Active", "Rented"].map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setFilter(option)}
                className={`rounded-lg px-5 py-2 text-sm ${
                  filter === option
                    ? "bg-white font-semibold text-brand-700 shadow-sm"
                    : "text-slate-600"
                }`}
              >
                {option} Properties
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            {loading && (
              <div className="rounded-2xl bg-white px-6 py-16 text-center text-sm text-slate-500">
                Loading your listings...
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl bg-white px-6 py-12 text-center">
                <p className="text-red-600">{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-brand-700 px-5 py-2 text-sm font-semibold text-white"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && visibleListings.map((listing) => {
              const status = getDisplayStatus(listing.status);

              return (
                <article
                  key={listing.id}
                  className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {status}
                      </span>

                      <h2 className="mt-4 text-xl font-bold text-slate-900">
                        {listing.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-600">
                        {listing.roomType} · {listing.location}
                      </p>
                    </div>

                    <p className="text-xl font-bold text-brand-700">
                      रु. {listing.monthlyRent.toLocaleString("en-IN")}
                      <span className="text-sm font-normal text-slate-500">
                        /mo
                      </span>
                    </p>
                  </div>
                </article>
              );
            })}

            {!loading && !error && visibleListings.length === 0 && (
              <div className="rounded-2xl bg-white px-6 py-16 text-center">
                <h2 className="font-semibold text-slate-800">
                  {listings.length === 0
                    ? "You haven't posted any listings yet."
                    : "No listings in this category."}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {listings.length === 0
                    ? "Start by posting your first property."
                    : "Try selecting another filter."}
                </p>

                {listings.length === 0 && (
                  <Link
                    href="/post-listing"
                    className="mt-5 inline-block rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                  >
                    Post a Listing
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </RoleGate>
  );
}
