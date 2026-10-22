import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { EditorialImage } from "@/components/EditorialImage";
import { CorporateInquiryForm } from "@/components/CorporateInquiryForm";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Corporate Massage & Workplace Wellness Services",
  description:
    "Bring professional mobile massage to your workplace, employee appreciation days, office pop-ups, and recurring corporate wellness programs.",
  alternates: { canonical: "/corporate-wellness" },
  openGraph: {
    title: "Corporate Massage & Workplace Wellness | Stillpoint Mobile Massage",
    description:
      "Flexible workplace massage sessions, appreciation events, and recurring corporate wellness arrangements tailored to your team and environment.",
    url: "/corporate-wellness",
    images: ["/images/service-corporate.jpg"],
  },
};

export default function CorporateWellnessPage() {
  return (
    <>
      {/* Corporate Hero */}
      <section className="bg-[#233C32] pb-16 pt-12 text-[#F8F6F0] sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8C3B0]">
                CORPORATE MASSAGE &amp; WORKPLACE WELLNESS
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#F8F6F0]">
                A More Thoughtful Workplace.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#F8F6F0]/85">
                Support employee wellbeing, team milestones, and calmer workdays
                with mobile massage sessions planned around your office space,
                schedule, and headcount.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#corporate-proposal"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#F8F6F0] px-6 py-3.5 text-sm font-medium text-[#233C32] transition hover:bg-white"
                >
                  <span>Request a Corporate Proposal</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#planning-logistics"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#F8F6F0]/35 px-6 py-3.5 text-sm font-medium text-[#F8F6F0] transition hover:bg-white/10"
                >
                  Planning &amp; Logistics
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                src="/images/service-corporate.jpg"
                alt="A discreet, sunlit modern office wellness lounge featuring an ergonomic seated massage setup."
                priority={true}
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Massage Overview + Four Organizational Formats */}
      <section className="bg-[#F8F6F0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              WORKPLACE OVERVIEW
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]">
              Flexible Arrangements for Teams and Organizations.
            </h2>
            <p className="text-base leading-relaxed text-[#292D29]/85">
              Every workplace operates differently. Rather than forcing rigid
              packages, Stillpoint reviews your office layout, break schedules,
              and group size before proposing a tailored session format and rate
              structure.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                label: "01 / APPRECIATION",
                title: "Employee Appreciation Events",
                body: "Mark team milestones, end-of-quarter celebrations, or staff recognition days with discreet, restorative workplace massage sessions.",
              },
              {
                label: "02 / CADENCE",
                title: "Recurring Wellness Arrangements",
                body: "Explore periodic schedules—such as monthly, bi-weekly, or quarterly visits—so employees can build restorative pauses into their routine.",
              },
              {
                label: "03 / ACTIVATIONS",
                title: "Office Pop-Ups & Special Events",
                body: "Create a calm wellness corner during company offsites, leadership summits, tenant appreciation days, or workplace wellness weeks.",
              },
              {
                label: "04 / COLLABORATION",
                title: "Multi-Session Team Scheduling",
                body: "Discuss sign-up flow, quiet conference room allocation, and practitioner coordination for larger headcounts.",
              },
            ].map((block) => (
              <div
                key={block.label}
                className="rounded-[12px] border border-[#292D29]/12 bg-white p-7 sm:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#233C32]">
                  {block.label}
                </p>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#292D29]">
                  {block.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#292D29]/80">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning & Logistics */}
      <section
        id="planning-logistics"
        className="border-y border-[#292D29]/10 bg-white py-20 sm:py-24 scroll-mt-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                PLANNING &amp; LOGISTICS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#292D29]">
                Simple Coordination From Inquiry to Setup.
              </h2>
              <p className="text-base leading-relaxed text-[#292D29]/80">
                Clear advance planning keeps the workday disruption-free for HR
                coordinators, office managers, and building security teams.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {[
                  {
                    title: "Space Selection",
                    detail:
                      "A quiet conference room, wellness room, or semi-private lounge area is reviewed in advance based on whether seated or table sessions are requested.",
                  },
                  {
                    title: "Building Access & Arrival",
                    detail:
                      "Loading dock, elevator, visitor badge, and parking procedures are coordinated ahead of the scheduled date.",
                  },
                  {
                    title: "Clear Scope & Transparent Proposals",
                    detail:
                      "No unapproved rates or rigid packages are assumed—pricing, session intervals, and total hours are proposed in writing after reviewing your inquiry.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-4 rounded-[11px] border border-[#292D29]/10 bg-[#F8F6F0] p-5"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#233C32] text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-medium text-base text-[#292D29]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#525852]">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Proposal Form */}
      <section
        id="corporate-proposal"
        className="bg-[#E6EBE2]/55 py-20 sm:py-28 scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <CorporateInquiryForm />
          <p className="mt-5 text-center text-xs text-[#525852]">
            Looking to coordinate ongoing wellness referrals or multi-provider
            events? Visit our{" "}
            <Link
              href="/partnerships"
              className="font-medium text-[#233C32] underline underline-offset-4"
            >
              Professional Partnerships page
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="WORKPLACE WELLNESS"
        headline="Ready to Explore a Session for Your Team?"
        supportingText="Share your approximate headcount, location, and preferred dates to request a tailored corporate proposal."
        primaryLabel="Request a Proposal"
        primaryHref="#corporate-proposal"
        secondaryLabel="Explore Event Pop-Ups"
        secondaryHref="/services/events-pop-ups"
      />
    </>
  );
}
