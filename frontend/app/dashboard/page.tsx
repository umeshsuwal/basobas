"use client";

import Link from "next/link";
import { useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";
import { initialInquiries } from "@/lib/inquiries";
import type { InquiryStatus, RentalInquiry } from "@/types/inquiry";

const statusStyles: Record<InquiryStatus, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

function ApplicantCard({
  inquiry,
  onStatusChange,
}: {
  inquiry: RentalInquiry;
  onStatusChange: (id: number, status: InquiryStatus) => void;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
            {inquiry.applicantName.charAt(0)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900">{inquiry.applicantName}</h3>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[inquiry.status]}`}>
                {inquiry.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{inquiry.occupation}</p>
            <p className="mt-2 text-xs text-slate-500">Applied for <strong className="text-slate-700">{inquiry.listingTitle}</strong></p>
          </div>
        </div>
        <p className="text-xs text-slate-500">Applied {inquiry.appliedOn}</p>
      </div>

      <div className="mt-5 grid gap-3 rounded-xl bg-brand-50 p-4 text-sm sm:grid-cols-3">
        <div><p className="text-xs text-slate-500">Contact</p><p className="mt-1 font-medium text-slate-900">{inquiry.applicantPhone}</p><p className="truncate text-xs text-slate-500">{inquiry.applicantEmail}</p></div>
        <div><p className="text-xs text-slate-500">Expected move-in</p><p className="mt-1 font-medium text-slate-900">{inquiry.moveInDate}</p></div>
        <div><p className="text-xs text-slate-500">Applicant message</p><p className="mt-1 line-clamp-2 text-slate-700">{inquiry.message}</p></div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <a href={`mailto:${inquiry.applicantEmail}`} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">✉ Email applicant</a>
        <a href={`tel:${inquiry.applicantPhone.replace(/\s/g, "")}`} className="rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100">☎ Call</a>
        {inquiry.status !== "Approved" && <button type="button" onClick={() => onStatusChange(inquiry.id, "Approved")} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">✓ Approve</button>}
        {inquiry.status !== "Rejected" && <button type="button" onClick={() => onStatusChange(inquiry.id, "Rejected")} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100">Reject</button>}
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [filter, setFilter] = useState("All listings");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "All">("All");

  const listingNames = [...new Set(inquiries.map((inquiry) => inquiry.listingTitle))];
  const pendingCount = inquiries.filter((inquiry) => inquiry.status === "Pending").length;
  const approvedCount = inquiries.filter((inquiry) => inquiry.status === "Approved").length;
  const visibleInquiries = inquiries.filter((inquiry) =>
    (filter === "All listings" || inquiry.listingTitle === filter) &&
    (statusFilter === "All" || inquiry.status === statusFilter),
  );

  function changeStatus(id: number, status: InquiryStatus) {
    setInquiries((current) => current.map((inquiry) => inquiry.id === id ? { ...inquiry, status } : inquiry));
  }

  return (
    <RoleGate role="landlord">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Landlord Account" title="Dashboard" />
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Landlord dashboard</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Welcome back, Saroj.</h1>
              <p className="mt-3 max-w-xl text-slate-600">Review applicants, respond to inquiries, and keep your rental listings up to date.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/post-listing" className="rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900">＋ Add listing</Link>
              <Link href="/my-listings" className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:text-brand-700">Manage listings</Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Total applications", inquiries.length.toString(), "Across your active listings"],
              ["Needs your review", pendingCount.toString(), "Applicants waiting for a response"],
              ["Approved tenants", approvedCount.toString(), "Ready for the next step"],
              ["Active listings", "2", "Currently accepting inquiries"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>
            ))}
          </div>

          <section className="mt-12">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><h2 className="text-2xl font-bold text-slate-900">Applicant inquiries</h2><p className="mt-1 text-slate-600">See who applied for each room and decide what happens next.</p></div>
              <span className="text-sm text-slate-500">{visibleInquiries.length} shown</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100"><option>All listings</option>{listingNames.map((name) => <option key={name}>{name}</option>)}</select>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as InquiryStatus | "All")} className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100"><option value="All">All statuses</option><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option></select>
            </div>
            <div className="mt-5 space-y-4">
              {visibleInquiries.map((inquiry) => <ApplicantCard key={inquiry.id} inquiry={inquiry} onStatusChange={changeStatus} />)}
              {visibleInquiries.length === 0 && <div className="rounded-2xl bg-white px-6 py-16 text-center text-sm text-slate-500">No applications match these filters.</div>}
            </div>
          </section>

          <div className="mt-10 rounded-2xl bg-brand-50 p-6"><h2 className="font-semibold text-slate-900">Before approving an applicant</h2><p className="mt-1 text-sm leading-6 text-slate-600">Meet the tenant in person, verify identity documents, and agree on rent terms before collecting a deposit.</p></div>
        </section>
      </main>
    </RoleGate>
  );
}
