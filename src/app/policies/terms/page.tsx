import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service governing the use of the Stillpoint Mobile Massage website and inquiry workflows.",
  alternates: { canonical: "/policies/terms" },
};

export default function TermsOfServicePage() {
  return (
    <section className="bg-[#F8F6F0] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-8">
        <div className="border-b border-[#292D29]/12 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
            POLICY PLACEHOLDER • TERMS
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-normal text-[#292D29]">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-[#525852]">
            Concept template — final governing jurisdiction and entity details
            to be finalized prior to launch.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#292D29]/85">
          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              1. Nature of Services
            </h2>
            <p className="mt-2">
              Stillpoint Mobile Massage provides professional, non-clinical
              relaxation and wellness massage services delivered to approved
              residential, workplace, hotel, and event settings. Nothing on this
              website constitutes medical advice, diagnosis, or clinical
              treatment.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              2. Inquiries Are Not Instant Confirmations
            </h2>
            <p className="mt-2">
              Submitting any form on this website initiates a review of
              availability, location, space suitability, and pricing. An
              appointment or event booking exists only once explicitly confirmed
              in writing by the business.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              3. Safe &amp; Respectful Environment
            </h2>
            <p className="mt-2">
              Every mobile session requires a safe, clean, respectful
              environment for both client and practitioner. Stillpoint reserves
              the right to decline or discontinue any appointment where safety,
              property permission, or professional conduct standards are not
              met.
            </p>
          </div>

          <p className="pt-2 text-xs text-[#525852]">
            See also our{" "}
            <Link
              href="/policies/booking-cancellation"
              className="font-medium text-[#233C32] underline underline-offset-4"
            >
              Booking &amp; Cancellation Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
