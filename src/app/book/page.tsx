import type { Metadata } from "next";
import Link from "next/link";
import { BookingStepper } from "@/components/BookingStepper";
import type { ServiceSlug } from "@/lib/brand-data";

export const metadata: Metadata = {
  title: "Book a Mobile Massage Request",
  description:
    "Submit a mobile massage booking request for in-home, corporate workplace, hotel, or event sessions. Availability and details are reviewed before confirmation.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Request a Mobile Massage | Stillpoint Mobile Massage",
    description:
      "Share your preferred service, date, location, and preferences to start a Stillpoint booking inquiry.",
    url: "/book",
    images: ["/images/hero-in-home.jpg"],
  },
};

const VALID_SERVICES: ServiceSlug[] = [
  "in-home",
  "corporate",
  "hotel",
  "events",
  "other",
];

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawService =
    typeof params.service === "string" ? params.service : "in-home";
  const initialService: ServiceSlug = VALID_SERVICES.includes(
    rawService as ServiceSlug
  )
    ? (rawService as ServiceSlug)
    : "in-home";
  const initialDate = typeof params.date === "string" ? params.date : "";
  const initialTime = typeof params.time === "string" ? params.time : "afternoon";
  const initialLocation =
    typeof params.location === "string" ? params.location : "";

  return (
    <section className="bg-[#F8F6F0] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Context Rail */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                BOOKING REQUEST
              </p>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-[#292D29]">
                Your Space. Your Time. Your Moment of Calm.
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#292D29]/80">
                Complete the steps alongside to request an in-home, workplace,
                hotel, or event massage session. Every request is personally
                reviewed before any appointment is confirmed.
              </p>
            </div>

            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-5 space-y-3.5 text-xs leading-relaxed text-[#292D29]/85">
              <p className="font-semibold uppercase tracking-[0.14em] text-[#233C32]">
                What Happens Next
              </p>
              <ol className="space-y-2.5 list-decimal pl-4">
                <li>
                  Your request details are recorded with a unique reference
                  code.
                </li>
                <li>
                  Location, travel requirements, and schedule availability are
                  reviewed.
                </li>
                <li>
                  Applicable session lengths, preparation notes, and pricing are
                  shared directly before finalizing.
                </li>
              </ol>
            </div>

            <div className="rounded-[12px] border border-[#292D29]/12 bg-[#E6EBE2]/55 p-5 text-xs leading-relaxed text-[#292D29]">
              <p className="font-semibold text-[#233C32]">
                Planning for an organization or partnership?
              </p>
              <p className="mt-1 text-[#525852]">
                Use our dedicated forms for multi-person workplace proposals or
                professional collaborations:
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/corporate-wellness#corporate-proposal"
                  className="font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
                >
                  Corporate Wellness Proposal Form &rarr;
                </Link>
                <Link
                  href="/partnerships#partnership-form"
                  className="font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
                >
                  Professional Partnership Inquiry &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right 5-Step Stepper */}
          <div className="lg:col-span-8">
            <BookingStepper
              initialService={initialService}
              initialDate={initialDate}
              initialTime={initialTime}
              initialLocation={initialLocation}
              compactHeader={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
