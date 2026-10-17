"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export function UserMenu() {
  const { user, isHydrated, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!isHydrated) {
    return null;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
      >
        Log in
      </Link>
    );
  }

  const isLandlord = user.role === "landlord";
  const settingsHref = isLandlord ? "/profile/settings" : "/profile/tenant/settings";
  const profileHref = isLandlord ? "/profile/settings" : "/profile/tenant";
  const homeHref = isLandlord ? "/dashboard" : "/feed";

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full bg-brand-50 py-1.5 pl-2 pr-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-700 text-xs text-white">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
        <span aria-hidden="true" className="text-xs">⌄</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
        >
          <div className="border-b border-slate-100 px-3 py-3">
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="mt-1 truncate text-xs text-slate-500">{user.email}</p>
          </div>

          {!isLandlord && (
            <Link
              href="/applications"
              onClick={() => setIsOpen(false)}
              className="my-2 block rounded-xl bg-brand-50 px-3 py-3 hover:bg-brand-100"
              role="menuitem"
            >
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span className="block text-sm font-semibold text-slate-900">Applied rental</span>
                  <span className="mt-1 block text-xs text-slate-600">Sunny 1 BHK in Baneshwor</span>
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">Pending</span>
              </span>
            </Link>
          )}

          <Link href={homeHref} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50" role="menuitem">
            {isLandlord ? "Go to dashboard" : "Browse rentals"}
          </Link>
          <Link href={profileHref} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50" role="menuitem">
            {isLandlord ? "Profile" : "My profile"}
          </Link>
          <Link href={settingsHref} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50" role="menuitem">
            Settings
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              logout();
              router.push("/");
            }}
            className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-700 hover:bg-red-50"
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
