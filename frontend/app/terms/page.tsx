import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions | Basobas",
  description: "Terms for using the Basobas rental discovery platform.",
};

const sections = [
  {
    title: "1. About Basobas",
    paragraphs: [
      "Basobas is an online platform that helps people in Nepal discover rental properties and connect with prospective tenants or landlords. Basobas is not a landlord, tenant, broker, or party to any rental agreement made between users.",
      "These Terms & Conditions apply when you access or use the Basobas website and services. By using Basobas or creating an account, you agree to these terms.",
    ],
  },
  {
    title: "2. Eligibility and your account",
    paragraphs: [
      "You must be legally able to enter into a binding agreement to create an account. If you use Basobas on behalf of another person or an organization, you confirm that you are authorized to do so.",
      "Provide accurate, current information and keep your sign-in details secure. You are responsible for activity on your account and should promptly contact us if you believe it has been accessed without permission.",
    ],
  },
  {
    title: "3. Listings and user responsibilities",
    paragraphs: [
      "Landlords are responsible for having the right to advertise a property and for keeping listing details, photographs, availability, rent, fees, and property rules accurate and up to date. Do not post misleading, unlawful, discriminatory, or unauthorized content.",
      "Tenants are responsible for providing truthful information and making their own enquiries about a property, its owner or representative, rental terms, and suitability before making a decision.",
      "You may not use Basobas to harass, defraud, impersonate, discriminate against, or threaten another person, or to violate another person's rights or applicable law.",
    ],
  },
  {
    title: "4. Contact, visits, and rental agreements",
    paragraphs: [
      "Basobas helps users connect; it does not negotiate or guarantee a rental, conduct property inspections, or verify every claim made by a user. Any verification indicator, if provided, is limited in scope and is not a guarantee of identity, ownership, property condition, or safety.",
      "Users are responsible for independently checking information, arranging visits safely, agreeing on rental terms directly, and documenting any rental agreement. Basobas is not a party to disputes or agreements between users.",
    ],
  },
  {
    title: "5. Payments and fees",
    paragraphs: [
      "Unless Basobas expressly states otherwise for a specific service, rent, deposits, and other payments are arranged directly between users. Basobas does not hold or transfer those payments and is not responsible for payment disputes or losses. Confirm payment instructions and terms with the other party before sending money.",
    ],
  },
  {
    title: "6. Content and platform use",
    paragraphs: [
      "You retain ownership of content you submit. You give Basobas permission to host, display, and use that content as needed to operate, maintain, and promote the service. You confirm that you have the rights needed to submit it.",
      "Do not interfere with the service, attempt unauthorized access, upload malicious code, or copy or misuse other users' content. We may remove content that we reasonably believe violates these terms or creates risk for users or the service.",
    ],
  },
  {
    title: "7. Availability and account restrictions",
    paragraphs: [
      "We aim to keep Basobas available and useful, but the service may change or be interrupted. We may restrict or suspend access where reasonably necessary to protect users, investigate misuse, comply with law, or maintain the service.",
    ],
  },
  {
    title: "8. Disclaimers and liability",
    paragraphs: [
      "Basobas is provided on an available basis. To the extent permitted by applicable law, Basobas does not guarantee that listings are accurate, properties are available, users are trustworthy, or that a rental will result from using the service.",
      "To the extent permitted by applicable law, Basobas is not liable for indirect or consequential loss, or for disputes, conduct, payments, property conditions, or agreements between users. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    title: "9. Changes and governing law",
    paragraphs: [
      "We may update these terms as the service changes. Updated terms will be posted on this page, and continued use of Basobas after they take effect means you accept them.",
      "These terms are governed by the laws of Nepal, subject to any mandatory protections that apply to you. Any dispute will be handled by the competent courts of Nepal.",
    ],
  },
  {
    title: "10. Contact",
    paragraphs: [
      "Questions about these terms? Contact us at hello@basobas.com.np.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200/80 bg-[#fbfbff]">
        <SiteHeader />
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Basobas
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: November 12, 2026
        </p>
        <p className="mt-6 text-base leading-7 text-slate-600">
          Please read these terms before using Basobas. They explain the basic
          rules for using our rental discovery platform and connecting with
          other users.
        </p>

        <div className="mt-10 space-y-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-slate-900">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
