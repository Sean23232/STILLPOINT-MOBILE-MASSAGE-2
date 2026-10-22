import type { Metadata } from "next";
import { COLLABORATION_CATEGORIES } from "@/lib/brand-data";
import { PartnershipForm } from "@/components/PartnershipForm";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Professional Partnerships & Collaborations",
  description:
    "Explore professional wellness collaborations with Stillpoint Mobile Massage—welcoming inquiries from chiropractors, physicians, hotels, therapists, and event organizers.",
  alternates: { canonical: "/partnerships" },
  openGraph: {
    title: "Professional Partnerships | Stillpoint Mobile Massage",
    description:
      "Better Connected. Thoughtfully Delivered. Start a collaboration conversation with Stillpoint Mobile Massage.",
    url: "/partnerships",
    images: ["/images/service-events.jpg"],
  },
};

export default function PartnershipsPage() {
  return (
    <>
      <section className="bg-[#F8F6F0] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              INVITATION TO COLLABORATE
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#292D29]">
              Better Connected. Thoughtfully Delivered.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#292D29]/85">
              Stillpoint welcomes conversations with professionals and
              organizations interested in exploring complementary wellness
              services, multi-practitioner events, and coordinated client or
              guest experiences.
            </p>
            <p className="text-xs sm:text-sm text-[#525852]">
              Transparency note: Categories below represent open invitations for
              professional dialogue and do not imply existing endorsements or
              established affiliations unless separately verified.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COLLABORATION_CATEGORIES.map((category, idx) => (
              <div
                key={category.title}
                className="rounded-[12px] border border-[#292D29]/12 bg-white p-6 sm:p-7"
              >
                <span className="font-mono text-xs text-[#233C32]">
                  0{idx + 1}
                </span>
                <h2 className="mt-3 font-serif text-2xl font-normal text-[#292D29]">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#292D29]/80">
                  {category.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="partnership-form"
        className="border-t border-[#292D29]/10 bg-[#E9E1D4]/55 py-20 sm:py-28 scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <PartnershipForm />
        </div>
      </section>

      <CTASection
        eyebrow="CORPORATE & EVENT INQUIRIES"
        headline="Planning a Specific Team Day or Event Instead?"
        supportingText="Explore our dedicated corporate proposal form or event massage request workflow."
        primaryLabel="Request Corporate Proposal"
        primaryHref="/corporate-wellness#corporate-proposal"
        secondaryLabel="Plan an Event Pop-Up"
        secondaryHref="/services/events-pop-ups"
      />
    </>
  );
}
