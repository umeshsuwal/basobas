"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";
import {
  getReceivedApplications,
  ReceivedApplication,
  updateApplicationStatus,
} from "@/lib/applications";
import { getMyListings, ManagedListing } from "@/lib/listings";

const statusStyles: Record<ReceivedApplication["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

function formatStatus(status: ReceivedApplication["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ApplicantCard({
  application,
  onStatusChange,
  updating,
}: {
  application: ReceivedApplication;
  onStatusChange: (
    id: string,
    status: ReceivedApplication["status"],
  ) => void;
  updating: boolean;
}) {
  const occupation = application.tenant.tenantProfile?.occupation || "Not provided";

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
            {application.tenant.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900">{application.tenant.name}</h3>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[application.status]}`}>
                {formatStatus(application.status)}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{occupation}</p>
            <p className="mt-2 text-xs text-slate-500">
              Applied for <strong className="text-slate-700">{application.listing.title}</strong>
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Applied {new Date(application.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-5 grid gap-3 rounded-xl bg-brand-50 p-4 text-sm sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-500">Contact</p>
          <p className="mt-1 font-medium text-slate-900">{application.tenant.phone}</p>
          <p className="truncate text-xs text-slate-500">{application.tenant.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Applicant message</p>
          <p className="mt-1 line-clamp-2 text-slate-700">{application.message}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <a href={`mailto:${application.tenant.email}`} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">✉ Email applicant</a>
        <a href={`tel:${application.tenant.phone.replace(/\s/g, "")}`} className="rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100">☎ Call</a>
        {application.status !== "approved" && (
          <button type="button" disabled={updating} onClick={() => onStatusChange(application.id, "approved")} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">✓ Approve</button>
        )}
        {application.status !== "rejected" && (
          <button type="button" disabled={updating} onClick={() => onStatusChange(application.id, "rejected")} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50">Reject</button>
        )}
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<ReceivedApplication[]>([]);
  const [listings, setListings] = useState<ManagedListing[]>([]);
  const [filter, setFilter] = useState("All listings");
  const [statusFilter, setStatusFilter] = useState<ReceivedApplication["status"] | "All">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getReceivedApplications(), getMyListings()])
      .then(([receivedApplications, ownedListings]) => {
        setApplications(receivedApplications);
        setListings(ownedListings);
      })
      .catch((requestError: unknown) => {
        setError(requestError instanceof Error ? requestError.message : "Unable to load dashboard");
      })
      .finally(() => setLoading(false));
  }, []);

  const listingNames = useMemo(
    () => [...new Set(applications.map((application) => application.listing.title))],
    [applications],
  );
  const pendingCount = applications.filter((application) => application.status === "pending").length;
  const approvedCount = applications.filter((application) => application.status === "approved").length;
  const visibleApplications = applications.filter((application) =>
    (filter === "All listings" || application.listing.title === filter) &&
    (statusFilter === "All" || application.status === statusFilter),
  );

  async function changeStatus(id: string, status: ReceivedApplication["status"]) {
    setUpdatingId(id);
    setError("");
    try {
      const updated = await updateApplicationStatus(id, status);
      setApplications((current) => current.map((application) => application.id === id ? { ...application, status: updated.status } : application));
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update application");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <RoleGate role="landlord">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Landlord Account" title="Dashboard" />
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Landlord dashboard</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Welcome back.</h1>
              <p className="mt-3 max-w-xl text-slate-600">Review applicants, respond to inquiries, and keep your rental listings up to date.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/post-listing" className="rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900">＋ Add listing</Link>
              <Link href="/my-listings" className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:text-brand-700">Manage listings</Link>
            </div>
          </div>

          {error && <p role="alert" className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          {loading ? (
            <p className="mt-10 text-sm text-slate-500">Loading your applications...</p>
          ) : (
            <>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Total applications", applications.length.toString(), "Across your active listings"],
                  ["Needs your review", pendingCount.toString(), "Applicants waiting for a response"],
                  ["Approved tenants", approvedCount.toString(), "Ready for the next step"],
                  ["Active listings", listings.filter((listing) => listing.status === "active").length.toString(), "Currently accepting applications"],
                ].map(([label, value, detail]) => (
                  <div key={label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>
                ))}
              </div>

              <section className="mt-12">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div><h2 className="text-2xl font-bold text-slate-900">Applicant inquiries</h2><p className="mt-1 text-slate-600">See who applied for each room and decide what happens next.</p></div>
                  <span className="text-sm text-slate-500">{visibleApplications.length} shown</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100"><option>All listings</option>{listingNames.map((name) => <option key={name}>{name}</option>)}</select>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ReceivedApplication["status"] | "All")} className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100"><option value="All">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
                </div>
                <div className="mt-5 space-y-4">
                  {visibleApplications.map((application) => <ApplicantCard key={application.id} application={application} onStatusChange={changeStatus} updating={updatingId === application.id} />)}
                  {visibleApplications.length === 0 && <div className="rounded-2xl bg-white px-6 py-16 text-center text-sm text-slate-500">No applications match these filters.</div>}
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </RoleGate>
  );
}
