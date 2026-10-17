import Link from "next/link";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";

export default function ApplicationsPage() {
  return (
    <RoleGate role="tenant">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Tenant Account" title="Applications" />
        <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <p className="text-sm text-slate-600">
            <Link href="/feed" className="hover:text-brand-700">Browse rentals</Link>
            <span className="mx-2">/</span>
            <strong className="text-brand-700">Applications</strong>
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">My rental applications</h1>
          <p className="mt-2 text-slate-600">Track the rentals you have applied for and see when a landlord responds.</p>

          <article className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Pending review</span>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Sunny 1 BHK in Baneshwor</h2>
                <p className="mt-1 text-sm text-slate-600">Shantinagar, New Baneshwor, Kathmandu</p>
              </div>
              <p className="text-lg font-bold text-brand-700">रु16,500<span className="text-sm font-normal text-slate-500">/month</span></p>
            </div>
            <div className="mt-7 grid gap-3 border-t border-slate-100 pt-5 text-sm sm:grid-cols-3">
              <div><p className="text-xs text-slate-500">Applied on</p><p className="mt-1 font-medium text-slate-900">16 October 2026</p></div>
              <div><p className="text-xs text-slate-500">Landlord</p><p className="mt-1 font-medium text-slate-900">Saroj Thapa</p></div>
              <div><p className="text-xs text-slate-500">Next step</p><p className="mt-1 font-medium text-slate-900">Awaiting response</p></div>
            </div>
            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-slate-600">
              The landlord has not reviewed this application yet. Basobas will notify you when the status changes.
            </div>
          </article>
        </section>
      </main>
    </RoleGate>
  );
}
