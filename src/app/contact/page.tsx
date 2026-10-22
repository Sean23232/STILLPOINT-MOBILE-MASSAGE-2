import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEditableBusinessProfile } from "@/lib/server-reference";
import { ContactForm } from "@/components/ContactForm";
import { ReferenceLookupCard } from "@/components/ReferenceLookupCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Stillpoint Mobile Massage",
  description:
    "Reach out with questions about mobile massage service areas, scheduling, corporate proposals, or verify an inquiry reference number.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Stillpoint Mobile Massage",
    description:
      "Have a question about in-home, workplace, hotel, or event massage? Send a message or check a request reference.",
    url: "/contact",
    images: ["/images/hero-in-home.jpg"],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialRef = typeof params.ref === "string" ? params.ref : "";
  const profile = await getEditableBusinessProfile();

  return (
    <section className="bg-[#F8F6F0] py-14 sm:py-22">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
            CONTACT &amp; INQUIRIES
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.1] text-[#292D29]">
            Clear Communication From the First Conversation.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#292D29]/85">
            Choose a dedicated inquiry path below or send a general message if
            you have questions before requesting a date.
          </p>
        </div>

        {/* Distinct Workflow Selector Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/book"
            className="group rounded-[12px] border border-[#292D29]/12 bg-white p-5 transition hover:border-[#233C32]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#233C32]">
              Workflow 01
            </p>
            <h2 className="mt-1.5 font-serif text-2xl text-[#292D29] group-hover:text-[#233C32]">
              Individual, Hotel &amp; Event Booking
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#525852]">
              Share your preferred service, date, time window, and location.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#233C32]">
              Open Booking Flow <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link
            href="/corporate-wellness#corporate-proposal"
            className="group rounded-[12px] border border-[#292D29]/12 bg-white p-5 transition hover:border-[#233C32]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#233C32]">
              Workflow 02
            </p>
            <h2 className="mt-1.5 font-serif text-2xl text-[#292D29] group-hover:text-[#233C32]">
              Corporate Wellness Proposals
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#525852]">
              Request workplace sessions, appreciation days, or recurring care.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#233C32]">
              Request Proposal <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link
            href="/partnerships#partnership-form"
            className="group rounded-[12px] border border-[#292D29]/12 bg-white p-5 transition hover:border-[#233C32]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#233C32]">
              Workflow 03
            </p>
            <h2 className="mt-1.5 font-serif text-2xl text-[#292D29] group-hover:text-[#233C32]">
              Professional Collaborations
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#525852]">
              Connect as a chiropractor, physician, hotel concierge, or peer.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#233C32]">
              Explore Partnership <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* General Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Reference Lookup + Editable Business Details */}
          <div className="lg:col-span-5 space-y-6">
            <ReferenceLookupCard initialRef={initialRef} />

            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-[#292D29]/10 pb-3">
                <h3 className="font-serif text-2xl font-normal text-[#292D29]">
                  Business Contact Details
                </h3>
                <Link
                  href="/about#profile-placeholders"
                  className="text-xs font-medium text-[#233C32] underline underline-offset-4"
                >
                  Edit Placeholders
                </Link>
              </div>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div>
                  <dt className="font-semibold text-[#233C32]">Service Area</dt>
                  <dd className="mt-0.5 text-[#525852]">
                    {profile.serviceArea}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#233C32]">
                    Business Hours
                  </dt>
                  <dd className="mt-0.5 text-[#525852]">
                    {profile.businessHours}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#233C32]">Email</dt>
                  <dd className="mt-0.5 text-[#525852]">
                    {profile.contactEmail}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#233C32]">Telephone</dt>
                  <dd className="mt-0.5 text-[#525852]">
                    {profile.contactPhone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
