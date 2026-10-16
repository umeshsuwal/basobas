"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";

export default function PostListingPage() {
  const [roomType, setRoomType] = useState("Single Room");
  const [published, setPublished] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPublished(true);
  }

  return (
    <RoleGate role="landlord"><main className="min-h-screen bg-[#f8f9ff]">
      <AccountHeader role="Landlord Account" title="Post a listing" />
      <section className="mx-auto max-w-2xl px-6 py-14">
        <div className="mb-8 text-center"><h1 className="text-3xl font-bold text-slate-900">Post a Listing</h1><p className="mt-2 text-slate-600">List your room or flat in under 2 minutes. Free forever for direct owners.</p></div>
        <form onSubmit={submit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
          <div><label className="font-semibold text-slate-900">Photos</label><div className="mt-3 grid place-items-center rounded-xl border-2 border-dashed border-blue-100 bg-brand-50 px-5 py-12 text-center"><p className="text-3xl">▣</p><p className="mt-2 font-semibold text-brand-700">Drag &amp; drop or browse photos</p><p className="text-sm text-slate-500">Add clear photos of the room, kitchen, and bathroom</p></div></div>
          <label className="block font-semibold text-slate-900">Listing Title<input required placeholder="e.g., Sunny room with balcony near Baneshwor Chowk" className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none ring-1 ring-transparent focus:ring-brand-200" /></label>
          <fieldset><legend className="font-semibold text-slate-900">Room Type</legend><div className="mt-2 grid grid-cols-3 gap-2">{["Single Room", "1 BHK / Flat", "Shared Room"].map((option) => <button type="button" key={option} onClick={() => setRoomType(option)} className={`rounded-xl p-3 text-sm ${roomType === option ? "bg-brand-600 text-white" : "bg-brand-50 text-slate-700"}`}>{option}</button>)}</div></fieldset>
          <div className="grid gap-4 sm:grid-cols-2"><label className="font-semibold text-slate-900">Monthly Rent (NPR)<input required type="number" placeholder="15,000" className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="font-semibold text-slate-900">Area / Location<input required placeholder="Shantinagar, Kathmandu" className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100" /></label></div>
          <label className="block font-semibold text-slate-900">Short Description<textarea required rows={4} placeholder="Describe the space, sunlight, water facility, or house rules briefly..." className="mt-2 w-full resize-none rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100" /></label>
          <button type="submit" className="w-full rounded-xl bg-brand-600 p-3 font-semibold text-white hover:bg-brand-700">↑ Publish Listing</button>
          {published && <p role="status" className="text-center text-sm font-medium text-emerald-600">Listing saved as a draft for backend publishing.</p>}
          <Link href="/my-listings" className="block text-center text-sm text-brand-700 hover:underline">View my listings →</Link>
        </form>
      </section>
    </main></RoleGate>
  );
}
