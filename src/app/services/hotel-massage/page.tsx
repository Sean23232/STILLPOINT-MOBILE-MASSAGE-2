import type { Metadata } from "next";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { EditorialImage } from "@/components/EditorialImage";
import { BookingStepper } from "@/components/BookingStepper";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Hotel & Travel Massage Appointments",
  description:
    "Request a mobile massage session at your hotel or travel accommodation, subject to location, appointment availability, and property visitor policies.",
  alternates: { canonical: "/services/hotel-massage" },
  openGraph: {
    title: "Hotel & Travel Massage Appointments | Stillpoint Mobile Massage",
    description:
      "Comfort, wherever you stay. Request an in-room hotel massage session subject to location, scheduling, and property guidelines.",
    url: "/services/hotel-massage",
    images: ["/images/service-hotel.jpg"],
  },
};

export default function HotelMassagePage() {
  return (
    <>
      {/* Hotel Hero */}
      <section className="bg-[#F8F6F0] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                SERVICE 03 • HOTEL &amp; TRAVEL MASSAGE
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292D29]">
                Comfort, Wherever You Stay.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#292D29]/85">
                Whether recovering from long travel days, preparing for a
                conference keynote, or unwinding during an extended stay,
                inquire about a mobile massage session brought to your
                accommodation.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#hotel-booking-request"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
                >
                  <span>Check Service Availability</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#property-policy-notice"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#292D29]/20 bg-white px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32]"
                >
                  Property Policy Guidelines
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                src="/images/service-hotel.jpg"
                alt="An upscale boutique hotel suite sitting area with a neatly prepared portable massage table near sheer curtains."
                priority={true}
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location & Scheduling Considerations + Property Policy Disclaimer */}
      <section
        id="property-policy-notice"
        className="border-t border-[#292D29]/10 bg-white py-20 sm:py-24 scroll-mt-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {[
              {
                title: "Location & Travel Review",
                body: "Share your hotel name and neighborhood or ZIP/postal code so travel distance, parking, and arrival timing can be evaluated before confirming.",
              },
              {
                title: "Suite & Room Space",
                body: "During review, we discuss whether your guest room or suite sitting area accommodates a portable massage setup comfortably.",
              },
              {
                title: "Flexible Traveler Timing",
                body: "Request morning, afternoon, or evening windows around flight arrivals, meetings, or event schedules—including short-notice inquiries subject to availability.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[12px] border border-[#292D29]/12 bg-[#F8F6F0] p-7"
              >
                <h2 className="font-serif text-2xl font-normal text-[#292D29]">
                  {card.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#292D29]/80">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* Property Policy Disclaimer */}
          <div className="rounded-[12px] border border-[#233C32]/25 bg-[#E6EBE2]/65 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <ShieldAlert
                className="mt-1 h-6 w-6 shrink-0 text-[#233C32]"
                aria-hidden="true"
              />
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#233C32]">
                  Property Policy Disclaimer
                </p>
                <h3 className="font-serif text-2xl font-normal text-[#292D29]">
                  Subject to Hotel &amp; Accommodation Guidelines
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#292D29]/85">
                  Stillpoint is an independent mobile massage service and does
                  not claim affiliation with any hotel or hospitality brand
                  unless formally established. All hotel and short-term
                  accommodation appointments are strictly subject to location,
                  practitioner availability, guest registration rules, elevator
                  access, and the individual property&apos;s visitor and
                  external service policies. Guests are encouraged to verify any
                  front-desk or concierge visitor requirements prior to
                  confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Booking Request Form */}
      <section
        id="hotel-booking-request"
        className="bg-[#F8F6F0] py-20 sm:py-24 scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <BookingStepper initialService="hotel" />
        </div>
      </section>

      <CTASection
        eyebrow="HOSPITALITY & CONCIERGE TEAMS"
        headline="Coordinating Wellness for Hotel Guests?"
        supportingText="Hospitality teams and concierges are welcome to reach out to discuss respectful, coordinated guest request workflows."
        primaryLabel="Check Guest Availability"
        primaryHref="#hotel-booking-request"
        secondaryLabel="Explore Hospitality Partnerships"
        secondaryHref="/partnerships"
      />
    </>
  );
}
