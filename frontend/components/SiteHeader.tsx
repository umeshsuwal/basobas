"use client";

import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";

export function SiteHeader({ action = true }: { action?: boolean }) {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-800">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-sm text-white">⌂</span>
        Basobas<span className="text-xs text-brand-600">•</span>
      </Link>
      <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        <Link href="/" className="text-brand-700">Browse Rentals</Link>
        <Link href="#how-it-works" className="transition hover:text-brand-700">How it Works</Link>
        <Link href="#areas" className="transition hover:text-brand-700">Explore Areas</Link>
      </div>
      {action ? <UserMenu /> : null}
    </nav>
  );
}
