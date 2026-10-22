import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialImage } from "./EditorialImage";

interface CTASectionProps {
  eyebrow?: string;
  headline?: string;
  supportingText?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  eyebrow = "YOUR SPACE • YOUR SCHEDULE",
  headline = "Make Space for a Better Kind of Pause.",
  supportingText = "Tell us where you need your massage experience, and let's explore an appointment that works for you.",
  primaryLabel = "Request a Massage",
  primaryHref = "/book",
  secondaryLabel = "Discuss Corporate Wellness",
  secondaryHref = "/corporate-wellness#corporate-proposal",
}: CTASectionProps) {
  return (
    <section className="bg-[#E9E1D4]/65 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[14px] bg-[#233C32] text-[#F8F6F0]">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8C3B0]">
                {eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#F8F6F0]">
                {headline}
              </h2>
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#F8F6F0]/85">
                {supportingText}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={primaryHref}
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#F8F6F0] px-6 py-3.5 text-sm font-medium text-[#233C32] transition hover:bg-white"
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#F8F6F0]/35 px-6 py-3.5 text-sm font-medium text-[#F8F6F0] transition hover:bg-white/10"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-full">
              <EditorialImage
                src="/images/service-intro-prep.jpg"
                alt="Hands of a professional massage therapist smoothing warm ivory linen and preparing neutral cotton towels on a mobile massage table."
                aspectClassName="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[380px]"
                containerClassName="rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
