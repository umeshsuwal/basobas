import Link from "next/link";

export function AccountHeader({
  role,
  title,
}: {
  role: "Tenant Account" | "Landlord Account";
  title: string;
}) {
  return (
    <header className="border-b border-slate-200/80 bg-[#fbfbff]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-sm text-white">⌂</span>
          Basobas<span className="text-xs text-brand-600">•</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
          <Link href="/" className="hover:text-brand-700">Browse Rentals</Link>
          <Link href="/my-listings" className="hover:text-brand-700">My Listings</Link>
          <Link href="/profile/tenant" className="hover:text-brand-700">Profile</Link>
        </div>
        <span className="rounded-full bg-brand-50 px-4 py-2 text-xs font-medium text-brand-700">
          {role} <span className="hidden sm:inline">• {title}</span>
        </span>
      </div>
    </header>
  );
}
