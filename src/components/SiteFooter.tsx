import Link from "next/link";
import type { EditableBusinessProfile } from "@/lib/brand-data";

interface SiteFooterProps {
  profile: EditableBusinessProfile;
}

export function SiteFooter({ profile }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#292D29]/12 bg-[#233C32] pb-20 pt-16 text-[#F8F6F0] md:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-[0.18em] text-[#F8F6F0]">
                STILLPOINT
              </span>
              <span className="mt-1.5 text-[10px] tracking-[0.28em] text-[#B8C3B0]">
                MOBILE MASSAGE
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-[#F8F6F0]/80">
              A mobile massage therapy service bringing calm, professional
              relaxation directly to homes, workplaces, hotels, and selected
              events—arranged around your space and schedule.
            </p>

            <div className="pt-1">
              <p className="text-xs uppercase tracking-[0.16em] text-[#B8C3B0]">
                Your Space. Your Time. Your Moment of Calm.
              </p>
            </div>
          </div>

          {/* Navigation & Services */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#B8C3B0]">
                Navigation
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F8F6F0]/85">
                <li>
                  <Link href="/" className="hover:text-white hover:underline underline-offset-4">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white hover:underline underline-offset-4">
                    Services Overview
                  </Link>
                </li>
                <li>
                  <Link href="/corporate-wellness" className="hover:text-white hover:underline underline-offset-4">
                    Corporate Wellness
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white hover:underline underline-offset-4">
                    About Stillpoint
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships" className="hover:text-white hover:underline underline-offset-4">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline underline-offset-4">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#B8C3B0]">
                Services
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F8F6F0]/85">
                <li>
                  <Link
                    href="/services/in-home-massage"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    In-Home Massage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/corporate-wellness"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Workplace Wellness
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/hotel-massage"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Hotel & Travel Massage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/events-pop-ups"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Pop-Ups & Events
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#B8C3B0]">
                Inquiries
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F8F6F0]/85">
                <li>
                  <Link
                    href="/book"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Book a Massage Request
                  </Link>
                </li>
                <li>
                  <Link
                    href="/corporate-wellness#corporate-proposal"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Corporate Wellness Proposal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partnerships#partnership-form"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Partnership Inquiry
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact#lookup"
                    className="hover:text-white hover:underline underline-offset-4"
                  >
                    Verify Request Reference
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Editable Business Details Column */}
          <div className="lg:col-span-3 space-y-4 rounded-[12px] border border-white/12 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#B8C3B0]">
                Service Details
              </h2>
              <Link
                href="/about#profile-placeholders"
                className="text-[11px] text-[#E9E1D4] underline underline-offset-4 hover:text-white"
              >
                Edit Placeholders
              </Link>
            </div>

            <dl className="space-y-3 text-xs leading-relaxed text-[#F8F6F0]/80">
              <div>
                <dt className="font-semibold text-[#F8F6F0]">Service Area</dt>
                <dd className="mt-0.5">{profile.serviceArea}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#F8F6F0]">Hours</dt>
                <dd className="mt-0.5">{profile.businessHours}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#F8F6F0]">Direct Contact</dt>
                <dd className="mt-0.5">{profile.contactEmail}</dd>
                <dd className="mt-0.5">{profile.contactPhone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#F8F6F0]">Social Profiles</dt>
                <dd className="mt-0.5 text-[#F8F6F0]/65">
                  Official social links will be displayed once verified business
                  profiles are provided.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Legal & Policy Bar */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/12 pt-8 text-xs text-[#F8F6F0]/70 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} Stillpoint Mobile Massage. Concept website —
            appointments subject to direct review and confirmation.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/policies/privacy"
              className="hover:text-white hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/terms"
              className="hover:text-white hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="/policies/booking-cancellation"
              className="hover:text-white hover:underline underline-offset-4"
            >
              Booking &amp; Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
