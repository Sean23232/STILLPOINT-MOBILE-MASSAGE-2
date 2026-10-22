import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EDITORIAL_BRAND_COMMITMENTS } from "@/lib/brand-data";
import { getEditableBusinessProfile } from "@/lib/server-reference";
import { EditableProfileSection } from "@/components/EditableProfileSection";
import { CTASection } from "@/components/CTASection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Stillpoint Mobile Massage",
  description:
    "Learn about Stillpoint Mobile Massage—a personal, convenient approach to bringing professional massage services into homes, workplaces, hotels, and events.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Stillpoint Mobile Massage",
    description:
      "Your Space. Your Time. Your Moment of Calm. Discover our philosophy and customizable practitioner profile.",
    url: "/about",
    images: ["/images/about-therapist.jpg"],
  },
};

export default async function AboutPage() {
  const profile = await getEditableBusinessProfile();

  return (
    <>
      <section className="border-b border-[#292D29]/10 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
            OUR PERSPECTIVE
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.08] text-[#292D29]">
            Making Professional Relaxation Fit More Naturally Into Real Life.
          </h1>
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-[#292D29]/85">
            Traditional spa visits often begin and end with parking, waiting
            rooms, and commuting back through busy streets. Stillpoint Mobile
            Massage reimagines that rhythm—bringing attentive preparation, calm
            presence, and clear communication directly to the setting where you
            feel most at ease.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
            >
              <span>Request a Session</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-[10px] border border-[#292D29]/20 bg-[#F8F6F0] px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32]"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <EditableProfileSection
        initialProfile={profile}
        isStandalonePage={true}
      />

      <section className="border-t border-[#292D29]/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              GUIDING PRINCIPLES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292D29]">
              What Guides Every Mobile Appointment.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {EDITORIAL_BRAND_COMMITMENTS.map((item) => (
              <div
                key={item.label}
                className="rounded-[12px] border border-[#292D29]/12 bg-[#F8F6F0] p-7"
              >
                <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#233C32]">
                  {item.label}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-normal text-[#292D29]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#292D29]/80">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
