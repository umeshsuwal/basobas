"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";

type ManagedListing = {
  id: number;
  title: string;
  type: string;
  location: string;
  price: string;
  status: "Active" | "Rented";
  image: string;
};

const initialListings: ManagedListing[] = [
  { id: 1, title: "Sunny 1 BHK in Baneshwor", type: "1 BHK Flat", location: "Shantinagar, Kathmandu", price: "16,500", status: "Active", image: "/rentals/sunny-baneshwor.jpg" },
  { id: 2, title: "Cozy Studio Flat with Balcony", type: "Studio", location: "Jhamsikhel, Lalitpur", price: "14,000", status: "Active", image: "/rentals/jhamsikhel-studio.jpg" },
  { id: 3, title: "Single Room for Student / Professional", type: "Single Room", location: "Koteshwor, Kathmandu", price: "8,500", status: "Rented", image: "/rentals/koteshwor-room.jpg" },
];

export default function MyListingsPage() {
  const [filter, setFilter] = useState("All");
  const [listings, setListings] = useState(initialListings);
  const visibleListings = useMemo(
    () => filter === "All" ? listings : listings.filter((listing) => listing.status === filter),
    [filter, listings],
  );

  function toggleStatus(id: number) {
    setListings((current) => current.map((listing) => listing.id === id
      ? { ...listing, status: listing.status === "Active" ? "Rented" : "Active" }
      : listing));
  }

  function removeListing(id: number) {
    setListings((current) => current.filter((listing) => listing.id !== id));
  }

  return (
    <RoleGate role="landlord">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Landlord Account" title="My Listings" />
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">Overview / Properties</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">My Listings</h1>
              <p className="mt-2 max-w-xl text-slate-600">Manage your rooms and flats across Kathmandu &amp; Nepal with complete clarity and direct tenant communication.</p>
            </div>
            <Link href="/post-listing" className="rounded-xl bg-brand-700 px-5 py-3 text-center font-semibold text-white hover:bg-brand-900">＋ Post New Listing</Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 rounded-xl bg-brand-50 p-1">
            {["All", "Active", "Rented"].map((option) => (
              <button type="button" key={option} onClick={() => setFilter(option)} className={`rounded-lg px-5 py-2 text-sm ${filter === option ? "bg-white font-semibold text-brand-700 shadow-sm" : "text-slate-600"}`}>
                {option} Properties
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            {visibleListings.map((listing) => (
              <article key={listing.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:flex">
                <Image src={listing.image} alt={listing.title} width={420} height={270} className="h-56 w-full object-cover sm:h-auto sm:w-80" />
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${listing.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>● {listing.status}</span>
                      <h2 className="mt-4 text-xl font-bold text-slate-900">{listing.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">⌖ {listing.type} • {listing.location}</p>
                    </div>
                    <p className="text-xl font-bold text-brand-700">रु{listing.price}<span className="text-sm font-normal text-slate-500">/mo</span></p>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
                    <span className="text-slate-600">▣ {listing.status === "Active" ? "4 tenant inquiries" : "Tenant contract active"}</span>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/post-listing" className="rounded-lg bg-brand-50 px-4 py-2 font-medium text-slate-700">✎ Edit</Link>
                      <button type="button" onClick={() => toggleStatus(listing.id)} className="rounded-lg bg-amber-50 px-4 py-2 font-medium text-amber-700">{listing.status === "Active" ? "◉ Mark as Rented" : "↻ Mark as Active"}</button>
                      <button type="button" onClick={() => removeListing(listing.id)} className="rounded-lg bg-red-50 px-4 py-2 font-medium text-red-700">× Remove</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {visibleListings.length === 0 && <div className="rounded-2xl bg-white px-6 py-16 text-center text-sm text-slate-500">No listings in this category.</div>}
          </div>
          <div className="mt-10 rounded-2xl bg-brand-50 p-6"><h2 className="font-semibold text-slate-900">Need assistance verifying a tenant?</h2><p className="mt-1 text-sm text-slate-600">Basobas provides official citizenship verification and standard bilingual rent agreements.</p></div>
        </section>
      </main>
    </RoleGate>
  );
}
