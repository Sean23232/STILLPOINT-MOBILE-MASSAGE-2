import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialImage } from "@/components/EditorialImage";
import { BookingStepper } from "@/components/BookingStepper";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import type { FAQItem } from "@/lib/brand-data";
import { getEditableBusinessProfile } from "@/lib/server-reference";

export const metadata: Metadata = {
  title: "In-Home Massage Services",
  description:
    "Request a professional in-home mobile massage session arranged around your residential space, schedule, and personal comfort preferences.",
  alternates: { canonical: "/services/in-home-massage" },
  openGraph: {
    title: "In-Home Massage Services | Stillpoint Mobile Massage",
    description:
      "Relax without leaving home. Convenient mobile massage sessions arranged around your space and preferred timing.",
    url: "/services/in-home-massage",
    images: ["/images/service-in-home.jpg"],
  },
};

const IN_HOME_FAQS: FAQItem[] = [
  {
    id: "inhome-space",
    question: "How much space is needed for an in-home appointment?",
    answer:
      "Specific space and setup guidance will be shared when reviewing your request so you can confirm a comfortable area in your home before confirming the appointment.",
  },
  {
    id: "inhome-prepare",
    question: "Do I need to supply anything before my appointment?",
    answer:
      "Any preparation details—such as clearing floor space, parking access, or household preferences—are communicated directly when confirming your session.",
  },
  {
    id: "inhome-pricing",
    question: "How are session lengths and pricing determined?",
    answer:
      "Available session options and pricing depend on your requested arrangement, duration, and travel location, and are provided in full before you confirm.",
  },
  {
    id: "inhome-lastminute",
    question: "Can I request a same-week or last-minute in-home session?",
    answer:
      "Yes, short-notice requests can be submitted for review. Availability is never guaranteed until directly confirmed by the business.",
  },
];

export default async function InHomeMassagePage() {
  const profile = await getEditableBusinessProfile();

  return (
    <>
      {/* Dedicated Hero */}
      <section className="bg-[#F8F6F0] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                SERVICE 01 • IN-HOME MOBILE MASSAGE
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292D29]">
                Relax Without Leaving Home.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#292D29]/85">
                Enjoy a calm, convenient massage experience in the familiarity
                of your own residence—without traffic before your appointment or
                a hurried drive afterward.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#in-home-booking"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
                >
                  <span>Request an In-Home Session</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#service-area-inquiry"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#292D29]/20 bg-white px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32]"
                >
                  Check Service Area Info
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                src="/images/service-in-home.jpg"
                alt="A serene contemporary residential living area prepared with a wooden mobile massage table and neutral organic linens."
                priority={true}
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience + Editable Session Options */}
      <section className="border-t border-[#292D29]/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
                THE IN-HOME EXPERIENCE
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#292D29]">
                Unhurried Care, Designed Around Your Space.
              </h2>
              <p className="text-base leading-relaxed text-[#292D29]/85">
                In-home mobile massage allows you to set the pace before and
                after your session. From quiet solo appointments to back-to-back
                sessions for members of the same household, arrangements are
                discussed in advance so every detail feels comfortable and
                predictable.
              </p>
              <p className="text-sm leading-relaxed text-[#525852]">
                Note: Stillpoint provides non-clinical relaxation and general
                wellness massage services and does not diagnose or treat medical
                conditions.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-[12px] border border-[#292D29]/12 bg-[#F8F6F0] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292D29]/10 pb-4">
                  <h3 className="font-serif text-2xl text-[#292D29]">
                    Available Session Options
                  </h3>
                  <span className="rounded-full bg-[#E9E1D4] px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#292D29]">
                    Editable Menu Placeholders
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#525852]">
                  Specific modalities, approved session durations, equipment
                  specifications, and rates are intentionally marked as editable
                  placeholders until finalized by the practitioner:
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      tag: "Option Placeholder 01",
                      title: "[Editable — Signature Relaxation Session]",
                      desc: "[Session focus, approved duration options, and rate structure to be inserted once confirmed.]",
                    },
                    {
                      tag: "Option Placeholder 02",
                      title: "[Editable — Targeted Tension & Unwind]",
                      desc: "[Preferred pressure communication, focus areas, and session length options to be confirmed.]",
                    },
                    {
                      tag: "Option Placeholder 03",
                      title: "[Editable — Back-to-Back Household Sessions]",
                      desc: "[Consecutive appointments at a single residential address — scheduling details to be added.]",
                    },
                    {
                      tag: "Option Placeholder 04",
                      title: "[Editable — Recurring Personal Wellness]",
                      desc: "[Periodic in-home scheduling options to be defined upon business launch.]",
                    },
                  ].map((item) => (
                    <div
                      key={item.tag}
                      className="rounded-[10px] border border-[#292D29]/10 bg-white p-4"
                    >
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#233C32]">
                        {item.tag}
                      </span>
                      <h4 className="mt-1 font-medium text-sm text-[#292D29]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#525852]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Prepare + Service Area Inquiry */}
      <section
        id="service-area-inquiry"
        className="bg-[#E6EBE2]/55 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-7 sm:p-9 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
                HOW TO PREPARE
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#292D29]">
                Simple Preparation Once Confirmed.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#292D29]/85">
                Any preparation requirements will be communicated directly once
                your appointment details are confirmed. Typical considerations
                discussed during review include:
              </p>
              <ul className="space-y-2.5 pt-1 text-sm text-[#292D29]/85">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#233C32]" />
                  <span>
                    Selecting a quiet, comfortable room with adequate space to
                    move around the setup.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#233C32]" />
                  <span>
                    Sharing entry, elevator/stairs, pet, or parking notes ahead
                    of arrival.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#233C32]" />
                  <span>
                    Discussing room temperature, music, or quiet preferences
                    before the session begins.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-7 sm:p-9 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
                SERVICE AREA INQUIRY
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#292D29]">
                Do We Travel to Your Neighborhood?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#292D29]/85">
                Current configured service area placeholder:
              </p>
              <div className="rounded-[9px] bg-[#F8F6F0] px-4 py-3 text-xs sm:text-sm font-medium text-[#233C32]">
                {profile.serviceArea}
              </div>
              <p className="text-sm leading-relaxed text-[#525852]">
                Include your neighborhood, city, or ZIP/postal code in the
                booking request below (or reach out via our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[#233C32] underline underline-offset-4"
                >
                  general contact page
                </Link>
                ) so travel distance and scheduling options can be reviewed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Preselected Booking Request Form */}
      <section id="in-home-booking" className="bg-[#F8F6F0] py-20 sm:py-24 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <BookingStepper initialService="in-home" />
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-[#292D29]/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              IN-HOME FAQS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292D29]">
              Questions About In-Home Sessions.
            </h2>
          </div>
          <FAQAccordion items={IN_HOME_FAQS} />
        </div>
      </section>

      <CTASection
        primaryLabel="Request an In-Home Appointment"
        primaryHref="/book?service=in-home"
      />
    </>
  );
}
