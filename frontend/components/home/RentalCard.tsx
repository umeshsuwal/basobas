import Image from "next/image";
import Link from "next/link";
import type { Rental } from "@/types/rental";

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function RentalCard({ rental }: { rental: Rental }) {
  return (
    <Link
      href={`/listing/${rental.id}`}
      className="block overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <Image
        src={rental.image}
        alt={rental.alt}
        width={900}
        height={500}
        className="h-56 w-full object-cover"
      />
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xl font-bold text-brand-700">
            रु{rental.price}
            <span className="ml-1 font-medium text-slate-500">/mo</span>
          </p>
          <span className="text-right text-sm font-medium text-brand-700">
            {rental.type}
          </span>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-600">
          <PinIcon />
          {rental.location}
        </p>
      </div>
    </Link>
  );
}
