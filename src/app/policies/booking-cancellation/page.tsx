import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking & Cancellation Policy",
  description:
    "How booking requests, appointment confirmations, hotel permissions, and rescheduling work at Stillpoint Mobile Massage.",
  alternates: { canonical: "/policies/booking-cancellation" },
};

export default function BookingCancellationPolicyPage() {
  return (
    <section className="bg-[#F8F6F0] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-8">
        <div className="border-b border-[#292D29]/12 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
            POLICY PLACEHOLDER • BOOKING &amp; CANCELLATIONS
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-normal text-[#292D29]">
            Booking &amp; Cancellation Policy
          </h1>
          <p className="mt-2 text-xs text-[#525852]">
            Concept framework — exact notice windows, deposit terms, and fee
            structures are marked as editable placeholders until approved by the
            business.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#292D29]/85">
          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              1. Appointment Confirmation
            </h2>
            <p className="mt-2">
              Submitting a booking request through the website does not reserve
              a time slot. Appointments are confirmed only after Stillpoint
              reviews travel distance, schedule availability, and space needs,
              and both parties agree to the confirmed time, location, duration,
              and rate.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              2. Last-Minute &amp; Short-Notice Requests
            </h2>
            <p className="mt-2">
              Short-notice inquiries may be submitted and will be accommodated
              only when practitioner routing and schedule permit.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              3. Rescheduling &amp; Cancellations
            </h2>
            <p className="mt-2">
              [Editable Placeholder — Advance notice window for individual
              rescheduling/cancellations and separate corporate/event contract
              cancellation terms to be inserted once approved by the business.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              4. Hotel &amp; Venue Permissions
            </h2>
            <p className="mt-2">
              Clients requesting hotel, residential building, or event venue
              sessions are responsible for confirming property visitor access
              rules prior to practitioner arrival.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/book"
              className="inline-flex items-center rounded-[10px] bg-[#233C32] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
            >
              Return to Booking Request
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
