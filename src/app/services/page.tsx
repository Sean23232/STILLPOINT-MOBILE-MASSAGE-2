import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOMEPAGE_FAQS, SERVICES_OVERVIEW } from "@/lib/brand-data";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Mobile Massage Services — In-Home, Corporate, Hotel & Events",
  description:
    "Explore Stillpoint Mobile Massage service categories: private in-home massage, corporate workplace wellness, hotel appointments, and special event pop-ups.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Mobile Massage Services | Stillpoint Mobile Massage",
    description:
      "In-home massage services, workplace wellness massage, hotel massage appointments, and event pop-ups delivered directly to your setting.",
    url: "/services",
    images: ["/images/service-in-home.jpg"],
  },
};

export default function ServicesOverviewPage() {
  return (
    <>
      <section className="bg-[#F8F6F0] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              STILLPOINT SERVICES
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.08] text-[#292D29]">
              Professional Massage, Wherever You Need It.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#292D29]/85">
              Rather than asking you to commute across town, Stillpoint brings a
              calm, thoughtfully prepared massage experience to residential
              spaces, offices, hotels, and selected events.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
              >
                <span>Start a Booking Request</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/corporate-wellness#corporate-proposal"
                className="inline-flex items-center justify-center rounded-[10px] border border-[#292D29]/20 bg-white px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32]"
              >
                Request Corporate Proposal
              </Link>
            </div>
          </div>

          <div className="mt-16 space-y-16 lg:space-y-20">
            {SERVICES_OVERVIEW.map((service, idx) => (
              <ServiceCard
                key={service.slug}
                service={service}
                reversed={idx % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#292D29]/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              SERVICE QUESTIONS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292D29]">
              What to Know Before Requesting a Session.
            </h2>
          </div>
          <FAQAccordion items={HOMEPAGE_FAQS.slice(0, 6)} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
