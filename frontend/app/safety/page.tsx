import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

export const metadata: Metadata = {
  title: "Safety Guidelines | Basobas",
  description: "Practical safety tips for finding and listing rentals on Basobas.",
};

const guidelines = [
  {
    title: "Before arranging a viewing",
    points: [
      "Review the listing carefully and ask questions about rent, deposit, utilities, availability, and house rules.",
      "Confirm who you are speaking with and ask for evidence that the person is authorized to show or rent the property.",
      "Be cautious if details keep changing, the offer seems unusually good, or you are pressured to act immediately.",
    ],
  },
  {
    title: "When meeting in person",
    points: [
      "Arrange to view the actual property before making a decision or sending money.",
      "Tell someone you trust where you are going and when you expect to return. Consider bringing someone with you.",
      "Meet during daylight where possible, and leave if you feel uncomfortable or pressured.",
    ],
  },
  {
    title: "Protect your money and information",
    points: [
      "Do not send rent, deposits, or fees before verifying the property, the recipient, and the agreed terms.",
      "Get payment instructions and rental terms in writing, and keep receipts for any payment.",
      "Never share passwords, one-time codes, banking credentials, or identity documents unless you have a clear, legitimate reason and trust the recipient.",
    ],
  },
  {
    title: "For landlords",
    points: [
      "Keep listing details accurate and communicate rent, deposits, fees, and house rules clearly.",
      "Meet prospective tenants safely and use a consistent, lawful process when discussing applications.",
      "Keep personal documents, account credentials, and payment details private.",
    ],
  },
  {
    title: "Report concerns",
    points: [
      "Stop communicating if someone asks for unusual payments, requests sensitive information, or threatens or harasses you.",
      "Keep relevant messages and payment records. Contact your bank or payment provider promptly if you suspect fraud.",
      "Let the Basobas support team know about suspicious listings or behavior so we can review it.",
    ],
  },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200/80 bg-[#fbfbff]">
        <SiteHeader />
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Find and rent with care
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Safety Guidelines
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Use these practical tips when contacting other users, viewing a
          property, or arranging a rental. Basobas helps people connect, but
          cannot guarantee listings, users, or transactions.
        </p>

        <div className="mt-10 space-y-5">
          {guidelines.map((guideline) => (
            <section
              key={guideline.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {guideline.title}
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-600 marker:text-brand-700">
                {guideline.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-slate-600">
          Need help or want to report a concern?{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-700 hover:underline"
          >
            Contact Basobas Support
          </Link>
          .
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
