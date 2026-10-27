"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { submitApplication } from "@/lib/applications";

export function ApplyButton({ listingId }: { listingId: string }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitApplication(listingId, message);
      setSubmitted(true);
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "Unable to apply");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <Link href="/login" className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white">Log in to apply</Link>;
  if (user.role !== "tenant") return null;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-900">Apply for this rental</button>
      {open && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-6">
        <form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-xl">
          <h2 className="text-xl font-bold text-slate-900">{submitted ? "Application submitted" : "Apply for this rental"}</h2>
          {submitted ? <><p className="mt-3 text-slate-600">Your application was sent to the landlord.</p><button type="button" onClick={() => setOpen(false)} className="mt-6 rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white">Close</button></> : <><label className="mt-5 block text-sm font-medium">Message<textarea required minLength={10} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell the landlord about yourself and your move-in plans" className="mt-2 min-h-32 w-full rounded-xl border border-slate-200 p-3" /></label>{error && <p className="mt-3 text-sm text-red-600">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700">Cancel</button><button type="submit" disabled={loading} className="rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{loading ? "Sending..." : "Submit application"}</button></div></>}
        </form>
      </div>}
    </>
  );
}
