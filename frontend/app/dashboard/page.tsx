import { SiteHeader } from "@/components/SiteHeader";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <SiteHeader action={false} />
      </header>
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
        <button
          type="button"
          className="mt-8 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Add a room
        </button>
      </section>
    </main>
  );
}
