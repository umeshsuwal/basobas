"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";
import { useAuth } from "@/providers/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const featureOptions = [
  "24/7 Water Supply",
  "Electricity Sub-meter",
  "Parking",
  "Furnished",
  "Private Balcony",
  "Solar Backup",
  "Wi-Fi Ready",
  "Pet Friendly",
];

export default function PostListingPage() {
  const [roomType, setRoomType] = useState("Single Room");
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { user } = useAuth();

  function toggleFeature(feature: string) {
    setFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
  }

  function addCustomFeature() {
    const feature = customFeature.trim();
    if (feature && !features.includes(feature)) {
      setFeatures((current) => [...current, feature]);
    }
    setCustomFeature("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPublished(false);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const token = window.localStorage.getItem("token");
    if (!token) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      return;
    }
    formData.set("roomType", roomType);
    formData.set("features", JSON.stringify(features));
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const body = (await response.json()) as
        | { id: string }
        | { message: string | string[] };
      if (!response.ok || !("id" in body)) {
        throw new Error(
          "message" in body
            ? Array.isArray(body.message)
              ? body.message.join(", ")
              : body.message
            : "Unable to create listing",
        );
      }
      setPublished(true);
      setImages([]);
      event.currentTarget.reset();
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create listing",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <RoleGate role="landlord"><main className="min-h-screen bg-[#f8f9ff]">
      <AccountHeader role="Landlord Account" title="Post a listing" />
      <section className="mx-auto max-w-2xl px-6 py-14">
        <div className="mb-8 text-center"><h1 className="text-3xl font-bold text-slate-900">Post a Listing</h1><p className="mt-2 text-slate-600">List your room or flat in under 2 minutes. Free forever for direct owners.</p></div>
        <form onSubmit={submit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
          <div><label htmlFor="images" className="font-semibold text-slate-900">Photos</label><div className="mt-3 rounded-xl border-2 border-dashed border-blue-100 bg-brand-50 px-5 py-8 text-center"><p className="text-3xl">▣</p><p className="mt-2 font-semibold text-brand-700">Choose listing photos</p><p className="text-sm text-slate-500">PNG, JPG, or WEBP up to 5 MB each. Maximum 8 photos.</p><input id="images" name="images" type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={(event) => setImages(Array.from(event.target.files ?? []))} className="mx-auto mt-4 block max-w-full text-sm text-slate-600" />{images.length > 0 && <p className="mt-3 text-sm text-brand-700">{images.length} photo{images.length === 1 ? "" : "s"} selected</p>}</div></div>
          <label className="block font-semibold text-slate-900">Listing Title<input name="title" required placeholder="e.g., Sunny room with balcony near Baneshwor Chowk" className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none ring-1 ring-transparent focus:ring-brand-200" /></label>
          <fieldset><legend className="font-semibold text-slate-900">Room Type</legend><div className="mt-2 grid grid-cols-3 gap-2">{["Single Room", "1 BHK / Flat", "Shared Room"].map((option) => <button type="button" key={option} onClick={() => setRoomType(option)} className={`rounded-xl p-3 text-sm ${roomType === option ? "bg-brand-600 text-white" : "bg-brand-50 text-slate-700"}`}>{option}</button>)}</div></fieldset>
          <div className="grid gap-4 sm:grid-cols-2"><label className="font-semibold text-slate-900">Monthly Rent (NPR)<input name="monthlyRent" required min="1" type="number" placeholder="15,000" className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100" /></label><label className="font-semibold text-slate-900">Area / Location<input name="location" required placeholder="Shantinagar, Kathmandu" className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100" /></label></div>
          <fieldset>
            <legend className="font-semibold text-slate-900">Features &amp; Amenities</legend>
            <p className="mt-1 text-sm font-normal text-slate-500">Select what is available at the property.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featureOptions.map((feature) => (
                <button
                  type="button"
                  key={feature}
                  aria-pressed={features.includes(feature)}
                  onClick={() => toggleFeature(feature)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    features.includes(feature)
                      ? "bg-brand-700 text-white"
                      : "bg-brand-50 text-slate-700 hover:bg-brand-100"
                  }`}
                >
                  {features.includes(feature) ? "✓ " : ""}
                  {feature}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={customFeature}
                onChange={(event) => setCustomFeature(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustomFeature();
                  }
                }}
                placeholder="Add another feature"
                className="min-w-0 flex-1 rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                onClick={addCustomFeature}
                className="rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100"
              >
                Add
              </button>
            </div>
          </fieldset>
          <label className="block font-semibold text-slate-900">Short Description<textarea name="description" required rows={4} placeholder="Describe the space, sunlight, water facility, or house rules briefly..." className="mt-2 w-full resize-none rounded-xl bg-brand-50 p-3 font-normal outline-none focus:ring-2 focus:ring-brand-100" /></label>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading || !user} className="w-full rounded-xl bg-brand-600 p-3 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Publishing..." : "↑ Publish Listing"}</button>
          {published && <p role="status" className="text-center text-sm font-medium text-emerald-600">Listing published successfully.</p>}
          <Link href="/my-listings" className="block text-center text-sm text-brand-700 hover:underline">View my listings →</Link>
        </form>
      </section>
    </main></RoleGate>
  );
}
