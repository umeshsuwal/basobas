import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const listing = {
  title: "Sunny 1 BHK in Baneshwor",
  image: "/rentals/sunny-baneshwor.jpg",
  price: "16,500",
  location: "Shantinagar, New Baneshwor, Kathmandu (5 min walk to Civil Hospital)",
  description: "Namaste! We are renting out a bright, clean second-floor 1 BHK unit located in a peaceful residential neighborhood in Shantinagar, New Baneshwor. The flat catches natural afternoon sunshine through wide sliding doors leading out to your private balcony, offering clear open air and mountain views on crisp mornings.",
};

const details = [
  ["Room type", "1 BHK Flat"],
  ["Furnishing", "Semi-Furnished"],
  ["Security deposit", "1 Month (रु16.5k)"],
  ["Available from", "Immediate"],
];

export default function ListingDetailPage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200/80 bg-[#fbfbff]"><SiteHeader /></header>
      <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between text-sm text-slate-600">
          <p><Link href="/" className="hover:text-brand-700">Rentals</Link> <span className="mx-2">›</span> Kathmandu <span className="mx-2">›</span> {listing.title}</p>
          <button type="button" className="rounded-full bg-brand-50 px-4 py-2 font-medium text-brand-700">♡ Save</button>
        </div>
        <Image src={listing.image} alt="Bright furnished 1 BHK flat" width={1400} height={800} className="h-[310px] w-full rounded-2xl object-cover sm:h-[460px]" />
        <section className="border-b border-slate-200 py-8">
          <p className="text-sm font-semibold text-brand-700">◉ Basobas Verified Property • Direct Homeowner</p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">{listing.title}</h1>
              <p className="mt-2 text-slate-600">⌖ {listing.location}</p>
            </div>
            <p className="text-2xl font-bold text-brand-700">रु{listing.price}<span className="text-sm font-medium text-slate-500">/month</span></p>
          </div>
        </section>
        <div className="grid gap-3 py-8 sm:grid-cols-4">
          {details.map(([label, value]) => <div key={label} className="rounded-xl bg-brand-50 p-4"><p className="text-xs uppercase text-slate-500">{label}</p><p className="mt-2 font-semibold text-slate-900">{value}</p></div>)}
        </div>
        <div className="flex flex-wrap gap-3">
          {["24/7 Water Supply", "Electricity Sub-meter", "Private Sunlit Balcony", "Gated Bike Parking"].map((item) => <span key={item} className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm text-slate-700">◉ {item}</span>)}
        </div>
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">About this Flat</h2>
          <p className="mt-4 leading-7 text-slate-600">{listing.description}</p>
          <p className="mt-4 leading-7 text-slate-600">Reliable uninterrupted deep-boring water supplemented by tanker supply is included directly in the monthly rent. The room features clean tiled floors, a neat kitchenette space with granite tops, independent sub-meter billing, and nighttime secured parking.</p>
        </section>
        <section className="mt-12">
          <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-slate-900">Location &amp; Neighborhood</h2><span className="text-sm text-slate-600">⌖ New Baneshwor, Kathmandu</span></div>
          <div className="mt-5 grid h-64 place-items-center rounded-2xl border border-blue-100 bg-[#e7edf3] text-center text-slate-500"><p className="text-4xl">⌖</p><p className="mt-2 font-medium">Map preview</p><p className="text-sm">Shantinagar, New Baneshwor</p></div>
        </section>
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-brand-50 p-6 sm:flex-row">
          <div><p className="font-semibold text-slate-900">Saroj Thapa</p><p className="text-sm text-slate-600">◉ Verified Homeowner • Resides on ground floor</p></div>
          <button type="button" className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-900">☎ Show Contact Number</button>
        </div>
      </div>
    </main>
  );
}
