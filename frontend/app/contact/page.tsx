import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Support | Basobas",
  description: "Get in touch with the Basobas support team.",
};

const supportContacts = [
  {
    name: "Umesh Suwal",
    phone: "+977 9861488885",
    email: "umeshsuwal65@gmail.com",
  },
  {
    name: "Rohit Maharjan",
    phone: "+977 9840122254",
    email: "rohitmaharjan7714@gmail.com",
  },
  {
    name: "Saroj Kumar Thapa",
    phone: "+977 9818055108",
    email: "sarojthapa199@gmail.com",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200/80 bg-[#fbfbff]">
        <SiteHeader />
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          We&apos;re here to help
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Contact Support
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Have a question about Basobas, a listing, or your account? Reach out
          to our support team by phone or email.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {supportContacts.map((contact) => (
            <article
              key={contact.email}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {contact.name}
              </h2>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="block text-slate-700 hover:text-brand-700"
                >
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="block break-all text-slate-700 hover:text-brand-700"
                >
                  {contact.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
