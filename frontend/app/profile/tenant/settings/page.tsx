"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountHeader } from "@/components/AccountHeader";
import { useAuth } from "@/providers/AuthProvider";
import { RoleGate } from "@/components/RoleGate";
import { getMyProfile, updateMyProfile } from "@/lib/profiles";

export default function TenantSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locations, setLocations] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getMyProfile()
      .then(({ user, profile }) => {
        setName(user.name);
        setPhone(user.phone);
        setBio(profile?.bio ?? "");
        setOccupation(profile?.occupation ?? "");
        setLocations(profile?.preferredLocations?.join(", ") ?? "");
      })
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load profile",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaved(false);
    try {
      await updateMyProfile({
        name,
        phone,
        bio,
        occupation,
        preferredLocations: locations,
      });
      setSaved(true);
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save profile",
      );
    }
  }

  return (
    <RoleGate role="tenant"><main className="min-h-screen bg-[#f8f9ff]">
      <AccountHeader role="Tenant Account" title="Settings" />
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <p className="text-sm text-slate-600"><Link href="/profile/tenant" className="hover:text-brand-700">My Profile</Link> <span className="mx-2">/</span> <strong className="text-brand-700">Settings</strong></p>
        <div className="mt-3"><h1 className="text-3xl font-bold text-slate-900">Tenant Profile &amp; Settings</h1><p className="mt-2 text-slate-600">Manage your rental preferences, contact details, and account security.</p></div>
        <form onSubmit={saveSettings} className="mt-8 space-y-8">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"><h2 className="text-xl font-bold text-slate-900">Personal details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Full name<input defaultValue="Umesh Suwal" className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="text-sm font-medium">Phone number<input defaultValue="+977 9813-456789" className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="text-sm font-medium sm:col-span-2">Preferred locations<input defaultValue="Baneshwor, Jhamsikhel, Patan" className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label></div></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"><h2 className="text-xl font-bold text-slate-900">Personal details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Full name<input value={name} onChange={(event) => setName(event.target.value)} disabled={loading} className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="text-sm font-medium">Phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} disabled={loading} className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="text-sm font-medium sm:col-span-2">Preferred locations<input value={locations} onChange={(event) => setLocations(event.target.value)} disabled={loading} className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="text-sm font-medium">Occupation<input value={occupation} onChange={(event) => setOccupation(event.target.value)} disabled={loading} className="mt-2 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="text-sm font-medium sm:col-span-2">Bio<textarea value={bio} onChange={(event) => setBio(event.target.value)} disabled={loading} className="mt-2 min-h-24 w-full rounded-xl bg-brand-50 p-3 outline-none focus:ring-2 focus:ring-brand-100" /></label></div></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"><h2 className="text-xl font-bold text-slate-900">Notifications</h2><label className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-700"><span><strong className="block text-slate-900">New rental alerts</strong>Get notified when a matching home is listed.</span><input type="checkbox" defaultChecked className="h-5 w-5 accent-teal-600" /></label><label className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-700"><span><strong className="block text-slate-900">Landlord messages</strong>Receive replies to your inquiries.</span><input type="checkbox" defaultChecked className="h-5 w-5 accent-teal-600" /></label></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"><h2 className="text-xl font-bold text-slate-900">Account security</h2><p className="mt-2 text-sm text-slate-600">Your account is protected by your Basobas login.</p><button type="button" onClick={() => { logout(); router.push("/"); }} className="mt-5 rounded-xl bg-red-50 px-5 py-3 font-semibold text-red-700">⇥ Log out of Basobas</button></section>
          <button type="submit" disabled={loading} className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-900 disabled:opacity-50">Save settings</button>
          {saved && <p role="status" className="inline-block pl-3 text-sm text-emerald-600">Profile saved to MongoDB.</p>}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </form>
      </section>
    </main></RoleGate>
  );
}
