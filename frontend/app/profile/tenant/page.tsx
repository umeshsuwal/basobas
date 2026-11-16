"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { JobLinkIcon, Tick01Icon } from "@hugeicons/core-free-icons";
import { AccountHeader } from "@/components/AccountHeader";
import { RoleGate } from "@/components/RoleGate";
import { getMyProfile } from "@/lib/profiles";
import type { ProfileResponse } from "@/types/auth";

export default function TenantProfilePage() {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProfile()
      .then(setProfileData)
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load profile",
        );
      });
  }, []);

  const user = profileData?.user;
  const profile = profileData?.profile;
  const preferredLocations = profile?.preferredLocations ?? [];
  const preferences = profile?.preferences ?? [];

  return (
    <RoleGate role="tenant">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Tenant Account" title="Kathmandu Valley" />
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-sm text-slate-600">
            Home{" "}
            <span className="mx-2">/</span>{" "}
            <strong className="text-slate-900">My Profile</strong>
          </p>
          {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
          <div className="mt-8 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 sm:p-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-5">
                <Image
                  src={profile?.avatarUrl || "/profiles/umesh-suwal.jpg"}
                  alt={user?.name ?? "Tenant profile"}
                  width={112}
                  height={112}
                  unoptimized
                  className="h-24 w-24 rounded-2xl object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {user?.name ?? "Loading profile"}
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">
                      <HugeiconsIcon
                        icon={Tick01Icon}
                        size={14}
                        strokeWidth={1.8}
                      />
                      Verified Tenant
                    </span>
                  </h1>
                  <p className="mt-2 flex items-center gap-1.5 text-slate-600">
                    <HugeiconsIcon
                      icon={JobLinkIcon}
                      size={16}
                      strokeWidth={1.8}
                    />
                    {profile?.occupation || "Occupation not provided"}
                  </p>
                  {profile?.bio && (
                    <p className="mt-2 text-xs text-slate-500">{profile.bio}</p>
                  )}
                </div>
              </div>
              <Link
                href="/profile/tenant/settings"
                className="rounded-xl bg-brand-50 px-5 py-3 text-center font-semibold text-brand-700"
              >
                ✎ Edit Profile
              </Link>
            </div>
            <div className="mt-10 grid gap-4 rounded-xl bg-brand-50 p-5 md:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">Phone Contact</p>
                <strong>{user?.phone ?? "Not provided"}</strong>
              </div>
              <div>
                <p className="text-xs text-slate-500">Verified Email</p>
                <strong>{user?.email ?? "Not provided"}</strong>
              </div>
              <div>
                <p className="text-xs text-slate-500">Preferred Localities</p>
                <strong>
                  {preferredLocations.length
                    ? preferredLocations.join(", ")
                    : "Not provided"}
                </strong>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Active Preferences:{" "}
              {preferences.length ? (
                preferences.map((preference) => (
                  <span
                    key={preference}
                    className="ml-2 rounded bg-brand-50 px-3 py-1"
                  >
                    {preference}
                  </span>
                ))
              ) : (
                <span className="ml-2">None saved</span>
              )}
            </p>
          </div>
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Saved &amp; Inquired Listings{" "}
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs text-brand-700">
              3 listings
            </span>
          </h2>
          <p className="mt-2 text-slate-600">
            Rentals you have bookmarked or reached out to across Kathmandu
            Valley.
          </p>
          <div className="mt-6 rounded-2xl bg-brand-50 p-6">
            <h3 className="font-semibold text-slate-900">
              Basobas Tenant Protection Checklist
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Never pay token advance money before visiting the property in
              person. Verified Basobas listings include metered electricity and
              clear water source checks.
            </p>
          </div>
        </section>
      </main>
    </RoleGate>
  );
}
