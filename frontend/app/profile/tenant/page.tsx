import Image from "next/image";
import Link from "next/link";
import { AccountHeader } from "@/components/AccountHeader";

export default function TenantProfilePage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <AccountHeader role="Tenant Account" title="Kathmandu Valley" />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <p className="text-sm text-slate-600">⌂ Home <span className="mx-2">/</span> <strong className="text-slate-900">My Profile</strong></p>
        <div className="mt-8 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 sm:p-12"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div className="flex items-center gap-5"><Image src="/profiles/umesh-suwal.jpg" alt="Umesh Suwal" width={112} height={112} className="h-24 w-24 rounded-2xl object-cover" /><div><h1 className="text-2xl font-bold text-slate-900">Umesh Suwal <span className="ml-2 rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">♢ Verified Tenant</span></h1><p className="mt-2 text-slate-600">▣ UI/UX Designer • Seeking peaceful urban rental</p><p className="mt-2 text-xs text-slate-500">▣ Joined Mangsir 2080 • Nagarikta &amp; Employment Verified</p></div></div><Link href="/profile/settings" className="rounded-xl bg-brand-50 px-5 py-3 text-center font-semibold text-brand-700">✎ Edit Profile</Link></div><div className="mt-10 grid gap-4 rounded-xl bg-brand-50 p-5 md:grid-cols-3"><div><p className="text-xs text-slate-500">Phone Contact</p><strong>+977 9813-456789</strong><p className="text-xs text-slate-500">Direct contact provided on inquiry</p></div><div><p className="text-xs text-slate-500">Verified Email</p><strong>umeshsuwal65@gmail.com</strong><p className="text-xs text-brand-700">Instant digital receipts enabled</p></div><div><p className="text-xs text-slate-500">Preferred Localities</p><strong>Baneshwor, Jhamsikhel, Patan</strong><p className="text-xs text-slate-500">Ring Road radius &lt; 2km</p></div></div><p className="mt-6 text-sm text-slate-600">Active Preferences: <span className="ml-2 rounded bg-brand-50 px-3 py-1">Quiet Neighborhood</span> <span className="ml-1 rounded bg-brand-50 px-3 py-1">No curfew</span> <span className="ml-1 rounded bg-brand-50 px-3 py-1">24/7 Water supply</span></p></div>
        <h2 className="mt-12 text-2xl font-bold text-slate-900">Saved &amp; Inquired Listings <span className="rounded-full bg-brand-100 px-3 py-1 text-xs text-brand-700">3 listings</span></h2>
        <p className="mt-2 text-slate-600">Rentals you have bookmarked or reached out to across Kathmandu Valley.</p>
        <div className="mt-6 rounded-2xl bg-brand-50 p-6"><h3 className="font-semibold text-slate-900">Basobas Tenant Protection Checklist</h3><p className="mt-2 text-sm text-slate-600">Never pay token advance money before visiting the property in person. Verified Basobas listings include metered electricity and clear water source checks.</p></div>
      </section>
    </main>
  );
}
