import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialImage } from "@/components/EditorialImage";
import { BookingStepper } from "@/components/BookingStepper";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Event & Pop-Up Massage Services",
  description:
    "Explore mobile massage pop-up experiences for selected gatherings, retreats, hospitality activations, and special events.",
  alternates: { canonical: "/services/events-pop-ups" },
  openGraph: {
    title: "Pop-Up & Event Massage Services | Stillpoint Mobile Massage",
    description:
      "Wellness that brings people together. Tell us about your gathering, pop-up, or retreat to explore a tailored massage arrangement.",
    url: "/services/events-pop-ups",
    images: ["/images/service-events.jpg"],
  },
};

export default function EventsPopUpsPage() {
  return (
    <>
      {/* Events Hero */}
      <section className="bg-[#F8F6F0] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                SERVICE 04 • POP-UPS &amp; SPECIAL EVENTS
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292D29]">
                Wellness That Brings People Together.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#292D29]/85">
                Add a calm, restorative pause to selected private gatherings,
                wellness pop-ups, retreats, and brand or workplace activations.
                Share your event concept to explore an arrangement suited to
                your guests and venue.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#event-inquiry-form"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
                >
                  <span>Discuss an Event</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/corporate-wellness#corporate-proposal"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#292D29]/20 bg-white px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32]"
                >
                  Corporate Event Proposal
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                src="/images/service-events.jpg"
                alt="A sunlit modern studio loft arranged with linen screens and seated massage stations for a special event pop-up."
                priority={true}
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Potential Formats (Presented Strictly as Examples) */}
      <section className="border-t border-[#292D29]/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              ILLUSTRATIVE CONCEPTS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#292D29]">
              Potential Pop-Up &amp; Event Formats.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#525852]">
              The settings below are shared as illustrative examples rather than
              pre-packaged or guaranteed offerings. Every event inquiry is
              evaluated individually based on date, venue suitability, and
              practitioner availability.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Wellness & Lifestyle Pop-Ups",
                desc: "Example: Short seated reset sessions integrated into boutique studio events, community wellness mornings, or curated pop-ups.",
              },
              {
                title: "Retreats & Small Gatherings",
                desc: "Example: Scheduled individual sessions arranged across an afternoon or weekend retreat itinerary.",
              },
              {
                title: "Conference & Summit Lounges",
                desc: "Example: A quiet recovery corner allowing attendees to pause between sessions during multi-hour programs.",
              },
              {
                title: "Hospitality & Resident Days",
                desc: "Example: Invited pop-up hours hosted in residential amenity lounges or boutique hospitality spaces.",
              },
            ].map((example) => (
              <div
                key={example.title}
                className="rounded-[12px] border border-[#292D29]/12 bg-[#F8F6F0] p-6"
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#233C32]">
                  Format Example
                </span>
                <h3 className="mt-2 font-serif text-2xl font-normal text-[#292D29]">
                  {example.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#292D29]/80">
                  {example.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Size, Scheduling & Setup Requirements */}
      <section className="bg-[#E9E1D4]/55 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-7 sm:p-9 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
                SIZE &amp; SCHEDULING CONSIDERATIONS
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#292D29]">
                Right-Sizing for Your Guest Flow.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#292D29]/85">
                Event pacing depends on total guest count, overall event
                duration, and whether guests book time slots in advance or drop
                by organically. Larger events may require advance lead time to
                explore whether collaborating licensed practitioners are
                available.
              </p>
            </div>

            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-7 sm:p-9 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
                LOCATION &amp; SETUP REQUIREMENTS
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#292D29]">
                Preparing the Venue Space.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#292D29]/85">
                During inquiry review, we confirm indoor or sheltered placement,
                level flooring, ambient noise levels, load-in/parking access,
                and venue permission requirements before confirming any event
                arrangement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Inquiry Form */}
      <section
        id="event-inquiry-form"
        className="bg-[#F8F6F0] py-20 sm:py-24 scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <BookingStepper initialService="events" />
        </div>
      </section>

      <CTASection
        eyebrow="SPECIAL EVENTS & POP-UPS"
        headline="Have an Event Concept in Mind?"
        supportingText="Share your tentative date, venue location, and expected attendance so we can explore what works best."
        primaryLabel="Discuss Your Event"
        primaryHref="#event-inquiry-form"
        secondaryLabel="Event Organizer Partnerships"
        secondaryHref="/partnerships"
      />
    </>
  );
}
