import Link from "next/link";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";

export default function DashboardPage() {
  return (
    <RoleGate role="landlord"><main className="min-h-screen bg-slate-50">
      <AccountHeader role="Landlord Account" title="Dashboard" />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Welcome to Basobas.
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          Your landlord tools are ready. Add a room to start connecting with tenants.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/post-listing"
            className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Add a room
          </Link>
          <Link
            href="/my-listings"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            View my listings
          </Link>
        </div>
      </section>
    </main></RoleGate>
  );
}
