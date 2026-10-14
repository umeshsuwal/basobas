import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#eef2ff] px-6 py-14 text-slate-600 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <Link href="/" className="text-2xl font-bold text-brand-700">
            Basobas
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6">
            Finding peace and home across Nepal. Calm, transparent rentals in
            Kathmandu, Lalitpur, Pokhara, and beyond.
          </p>
          <a
            href="mailto:hello@basobas.com.np"
            className="mt-5 inline-block text-sm text-slate-700 hover:text-brand-700"
          >
            hello@basobas.com.np
          </a>
        </div>

        <div className="grid grid-cols-3 gap-10 text-sm">
          <div>
            <h2 className="font-semibold text-slate-900">Locations</h2>
            <p className="mt-3 leading-6">
              Kathmandu
              <br />
              Lalitpur
              <br />
              Pokhara
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Platform</h2>
            <p className="mt-3 leading-6">
              How it Works
              <br />
              Safety Guidelines
              <br />
              List Property
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Support</h2>
            <p className="mt-3 leading-6">
              Contact Support
              <br />
              Terms &amp; Privacy
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-blue-100 pt-6 text-xs sm:flex-row">
        <p>© 2024 Basobas Nepal. All rights reserved.</p>
        <p>Kathmandu • Lalitpur • Pokhara</p>
      </div>
    </footer>
  );
}
