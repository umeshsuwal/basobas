"use client";

import { FormEvent, useState } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { useAuth } from "@/providers/AuthProvider";
import { RoleGate } from "@/components/RoleGate";

export default function ProfileSettingsPage() {
  const [saved, setSaved] = useState(false);
  const { logout } = useAuth();
  function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }
  return (
    <RoleGate role="landlord"><main className="min-h-screen bg-[#f8f9ff]">
      <AccountHeader role="Landlord Account" title="Profile & Settings" />
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <p className="text-sm text-slate-600">Dashboard <span className="mx-2">/</span> <strong className="text-brand-700">Profile &amp; Settings</strong></p>
        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-bold text-slate-900">Landlord Profile &amp; Settings</h1><p className="mt-2 text-slate-600">Manage your contact details, verified status, and account security.</p></div><span className="w-fit rounded-full bg-brand-50 px-4 py-2 text-xs text-brand-700">● Basobas Host ID: #BSB-8842</span></div>
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><div className="flex items-center gap-3"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-100 text-2xl">🐈</div><div><h2 className="text-2xl font-bold text-slate-900">Saroj Thapa</h2><p className="text-sm text-slate-600">⌖ Jhamsikhel &amp; Sanepa Properties • Lalitpur / Kathmandu, Nepal</p></div></div></div><button type="button" className="rounded-xl bg-brand-50 px-5 py-3 text-center font-semibold text-brand-700">✎ Edit Profile</button></div><div className="mt-8 grid gap-4 rounded-xl bg-brand-50 p-5 sm:grid-cols-4"><div><p className="text-xs text-slate-500">Primary Phone</p><strong>+977 9841-382910</strong></div><div><p className="text-xs text-slate-500">Official Email</p><strong>sarojthapa@gmail.com</strong></div><div><p className="text-xs text-slate-500">Primary Location</p><strong>Kathmandu, Nepal</strong></div><div><p className="text-xs text-slate-500">Hosting Since</p><strong>Baisakh 2080</strong></div></div></section>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_0.8fr]"><form onSubmit={updatePassword} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100"><h2 className="text-xl font-bold text-slate-900">◉ Security &amp; Password</h2><p className="mt-2 text-sm text-slate-600">Update your password to keep your Basobas listings, inquiries, and rental agreements completely secure.</p><label className="mt-7 block text-sm font-medium">Current Password<input type="password" required className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">New Password<input type="password" required minLength={8} placeholder="At least 8 characters" className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label><label className="text-sm font-medium">Confirm New Password<input type="password" required minLength={8} placeholder="Repeat new password" className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label></div><button type="submit" className="mt-7 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white">✓ Update Password</button>{saved && <p className="mt-3 text-sm text-emerald-600">Password update is ready for backend integration.</p>}</form><aside className="space-y-6"><div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"><h2 className="font-bold text-slate-900">Ownership &amp; Verification</h2><p className="mt-2 text-sm leading-6 text-slate-600">Need to update your citizenship, Lalpurja, or bank payment details?</p><a href="mailto:support@basobas.com.np" className="mt-5 inline-block text-sm font-semibold text-brand-700">Contact Verification Desk →</a></div><div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"><h2 className="font-bold text-slate-900">Account Session</h2><p className="mt-2 text-sm text-slate-600">Current active session on this device.</p><button type="button" onClick={logout} className="mt-5 w-full rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-700">⇥ Log Out of Basobas</button></div></aside></div>
      </section>
    </main></RoleGate>
  );
}
