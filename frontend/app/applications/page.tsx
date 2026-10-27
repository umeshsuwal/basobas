"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";
import { getMyApplications, TenantApplication } from "@/lib/applications";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<TenantApplication[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyApplications()
      .then(setApplications)
      .catch((requestError: unknown) => {
        setError(requestError instanceof Error ? requestError.message : "Unable to load applications");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <RoleGate role="tenant">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Tenant Account" title="Applications" />
        <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <p className="text-sm text-slate-600"><Link href="/feed" className="hover:text-brand-700">Browse rentals</Link><span className="mx-2">/</span><strong className="text-brand-700">Applications</strong></p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">My rental applications</h1>
          <p className="mt-2 text-slate-600">Track the rentals you have applied for and see when a landlord responds.</p>
          {loading && <p className="mt-8 text-sm text-slate-500">Loading applications...</p>}
          {error && <p role="alert" className="mt-8 text-sm text-red-600">{error}</p>}
          {!loading && !error && applications.length === 0 && <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100"><p className="text-slate-600">You have not submitted any applications yet.</p><Link href="/feed" className="mt-4 inline-block rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white">Browse rentals</Link></div>}
          <div className="mt-8 space-y-5">
            {applications.map((application) => (
              <article key={application.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}>{application.status.replace(/^\w/, (letter) => letter.toUpperCase())}</span><h2 className="mt-4 text-xl font-bold text-slate-900">{application.listing.title}</h2><p className="mt-1 text-sm text-slate-600">{application.listing.location}</p></div>
                  <p className="text-lg font-bold text-brand-700">रु{application.listing.monthlyRent.toLocaleString("en-IN")}<span className="text-sm font-normal text-slate-500">/month</span></p>
                </div>
                <div className="mt-7 grid gap-3 border-t border-slate-100 pt-5 text-sm sm:grid-cols-2"><div><p className="text-xs text-slate-500">Applied on</p><p className="mt-1 font-medium text-slate-900">{new Date(application.createdAt).toLocaleDateString()}</p></div><div><p className="text-xs text-slate-500">Message</p><p className="mt-1 font-medium text-slate-900">{application.message}</p></div></div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </RoleGate>
  );
}
