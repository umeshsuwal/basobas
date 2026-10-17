import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";

export function AccountHeader({
  role,
  title,
}: {
  role: "Tenant Account" | "Landlord Account";
  title: string;
}) {
  const isLandlord = role === "Landlord Account";

  return (
    <header className="border-b border-slate-200/80 bg-[#fbfbff]">
      <div
        aria-label={`${role} ${title}`}
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-sm text-white">⌂</span>
          Basobas<span className="text-xs text-brand-600">•</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
          {isLandlord ? (
            <>
              <Link href="/dashboard" className="hover:text-brand-700">Dashboard</Link>
              <Link href="/my-listings" className="hover:text-brand-700">My Listings</Link>
              <Link href="/profile/settings" className="hover:text-brand-700">Profile &amp; Settings</Link>
            </>
          ) : (
            <>
              <Link href="/feed" className="hover:text-brand-700">Browse Rentals</Link>
              <Link href="/profile/tenant" className="hover:text-brand-700">My Profile</Link>
              <Link href="/profile/tenant/settings" className="hover:text-brand-700">Settings</Link>
            </>
          )}
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
