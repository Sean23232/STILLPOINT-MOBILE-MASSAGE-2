import Link from "next/link";
import { eq } from "drizzle-orm";
import { ArrowRight, Check } from "lucide-react";
import { db } from "@/db";
import { verifiedTestimonials } from "@/db/schema";
import {
  COLLABORATION_CATEGORIES,
  EDITORIAL_BRAND_COMMITMENTS,
  HOMEPAGE_FAQS,
  HOW_IT_WORKS_STEPS,
  SERVICES_OVERVIEW,
  STILLPOINT_DIFFERENCE,
} from "@/lib/brand-data";
import { getEditableBusinessProfile } from "@/lib/server-reference";
import { HeroSection } from "@/components/HeroSection";
import { EditorialImage } from "@/components/EditorialImage";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceFeature } from "@/components/ServiceFeature";
import { CorporateInquiryForm } from "@/components/CorporateInquiryForm";
import { PartnershipForm } from "@/components/PartnershipForm";
import { EditableProfileSection } from "@/components/EditableProfileSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const profile = await getEditableBusinessProfile();

  let approvedFeedback: {
    id: number;
    clientIdentifier: string;
    contextLabel: string;
    quote: string;
  }[] = [];

  try {
    approvedFeedback = await db
      .select({
        id: verifiedTestimonials.id,
        clientIdentifier: verifiedTestimonials.clientIdentifier,
        contextLabel: verifiedTestimonials.contextLabel,
        quote: verifiedTestimonials.quote,
      })
      .from(verifiedTestimonials)
      .where(eq(verifiedTestimonials.isVerified, true))
      .limit(3);
  } catch {
    approvedFeedback = [];
  }

  return (
    <>
      {/* SECTION 1: Premium Hero */}
      <HeroSection />

      {/* SECTION 2: Service Introduction (Asymmetric Editorial Composition) */}
      <section
        aria-labelledby="service-intro-heading"
        className="border-t border-[#292D29]/10 bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <EditorialImage
                src="/images/service-intro-prep.jpg"
                alt="A massage therapist's hands carefully smoothing crisp warm ivory linen and placing neutral folded cotton towels on a portable massage table."
                aspectClassName="aspect-[4/5]"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-8 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                WELLNESS THAT MEETS YOU WHERE YOU ARE
              </p>

              <h2
                id="service-intro-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
              >
                Your Space. Your Schedule. Your Moment.
              </h2>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#292D29]/85">
                Life moves quickly. Stillpoint brings professional massage
                services closer to where you live, work, stay, and connect.
                Whether you are planning a personal session, supporting employee
                wellness, or arranging an event, the experience begins with
                making care more convenient.
              </p>

              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-[#233C32] underline underline-offset-8 hover:text-[#1b2f27]"
                >
                  <span>Discover Our Services</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Services Overview */}
      <section
        id="services-overview"
        aria-labelledby="services-overview-heading"
        className="bg-[#F8F6F0] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              MOBILE MASSAGE SERVICES
            </p>
            <h2
              id="services-overview-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
            >
              Designed Around Four Distinct Settings.
            </h2>
            <p className="text-base leading-relaxed text-[#292D29]/80">
              Every appointment is mobile—bringing prepared equipment, calm
              presence, and clear communication directly to your chosen setting.
            </p>
          </div>

          <div className="mt-12 space-y-16 lg:space-y-20">
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

      {/* SECTION 4: The Stillpoint Difference */}
      <section
        aria-labelledby="stillpoint-difference-heading"
        className="bg-[#E6EBE2]/55 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                THE STILLPOINT DIFFERENCE
              </p>
              <h2
                id="stillpoint-difference-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
              >
                Professional Service. Thoughtfully Delivered.
              </h2>
            </div>
            <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#292D29]/80">
              Built for individuals who value ease at home and organizations
              seeking a dependable, respectful wellness experience for their
              people.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STILLPOINT_DIFFERENCE.map((item, idx) => (
              <ServiceFeature
                key={item.title}
                title={item.title}
                description={item.description}
                iconName={item.iconName}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section
        aria-labelledby="how-it-works-heading"
        className="bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              HOW IT WORKS
            </p>
            <h2
              id="how-it-works-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
            >
              A Simpler Way to Make Time for Yourself.
            </h2>
          </div>

          {/* Horizontal Timeline on Desktop / Vertical Timeline on Mobile */}
          <ol className="relative mt-14 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <li
                key={item.step}
                className="relative pl-12 lg:pl-0 lg:pt-10"
              >
                {/* Vertical connector line on mobile */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-9 bottom-[-32px] w-px bg-[#292D29]/15 lg:hidden"
                  />
                )}

                {/* Horizontal connector line on desktop */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute left-9 right-[-32px] top-[15px] h-px bg-[#292D29]/15"
                  />
                )}

                {/* Step marker */}
                <span className="absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#233C32] bg-[#F8F6F0] font-mono text-xs font-semibold text-[#233C32]">
                  {item.step}
                </span>

                <h3 className="font-serif text-2xl font-normal text-[#292D29]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#292D29]/80">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
            >
              <span>Start Your Booking Request</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: Corporate Wellness Feature */}
      <section
        id="corporate-wellness"
        aria-labelledby="corporate-feature-heading"
        className="bg-[#233C32] py-20 text-[#F8F6F0] sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8C3B0]">
                FOR TEAMS &amp; ORGANIZATIONS
              </p>

              <h2
                id="corporate-feature-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#F8F6F0]"
              >
                Bring a Moment of Calm Into the Workday.
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-[#F8F6F0]/85">
                From employee appreciation days to recurring workplace wellness
                sessions, Stillpoint helps organizations explore massage
                experiences that fit their environment, schedule, and team size.
              </p>

              <ul className="grid grid-cols-1 gap-3 pt-1 text-sm sm:grid-cols-2 text-[#F8F6F0]/90">
                {[
                  "Employee appreciation events",
                  "Workplace wellness days",
                  "Office pop-ups",
                  "Recurring corporate arrangements",
                  "Custom event inquiries",
                ].map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B8C3B0]/20 text-[#B8C3B0]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#home-corporate-proposal"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#F8F6F0] px-6 py-3.5 text-sm font-medium text-[#233C32] transition hover:bg-white"
                >
                  <span>Request a Corporate Proposal</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/corporate-wellness"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#F8F6F0]/35 px-6 py-3.5 text-sm font-medium text-[#F8F6F0] transition hover:bg-white/10"
                >
                  Discuss Your Event
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                src="/images/service-corporate.jpg"
                alt="A discreet, sunlit modern office wellness lounge prepared with an ergonomic seated massage setup."
                aspectClassName="aspect-[16/11]"
              />
            </div>
          </div>

          <div id="home-corporate-proposal" className="mt-16 scroll-mt-28">
            <CorporateInquiryForm />
          </div>
        </div>
      </section>

      {/* SECTION 7: Professional Partnerships */}
      <section
        id="partnerships"
        aria-labelledby="partnerships-heading"
        className="bg-[#E9E1D4]/55 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                PROFESSIONAL COLLABORATIONS
              </p>

              <h2
                id="partnerships-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
              >
                Better Connected. Thoughtfully Delivered.
              </h2>

              <p className="text-base leading-relaxed text-[#292D29]/85">
                Stillpoint welcomes conversations with professionals and
                organizations interested in exploring complementary wellness
                services and coordinated client experiences.
              </p>

              <div className="space-y-3 border-t border-[#292D29]/12 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#525852]">
                  Potential Collaboration Categories
                </p>
                <ul className="space-y-2.5 text-sm text-[#292D29]">
                  {COLLABORATION_CATEGORIES.map((category) => (
                    <li
                      key={category.title}
                      className="rounded-[9px] border border-[#292D29]/10 bg-white/75 px-4 py-3"
                    >
                      <span className="block font-medium text-[#233C32]">
                        {category.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#525852]">
                        {category.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/partnerships"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
                >
                  <span>Explore a Partnership</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <PartnershipForm />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: About Stillpoint (With Editable Profile Placeholders) */}
      <EditableProfileSection initialProfile={profile} />

      {/* SECTION 9: Testimonials or Brand Values Editorial Panel */}
      <section
        aria-labelledby="values-feedback-heading"
        className="border-y border-[#292D29]/10 bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {approvedFeedback.length > 0 ? (
            <div className="space-y-10">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                  VERIFIED CLIENT FEEDBACK
                </p>
                <h2
                  id="values-feedback-heading"
                  className="font-serif text-3xl sm:text-4xl font-normal text-[#292D29]"
                >
                  Reflections From Recent Sessions.
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {approvedFeedback.map((fb) => (
                  <blockquote
                    key={fb.id}
                    className="rounded-[12px] border border-[#292D29]/12 bg-[#F8F6F0] p-6"
                  >
                    <p className="font-serif text-xl italic leading-relaxed text-[#292D29]">
                      &ldquo;{fb.quote}&rdquo;
                    </p>
                    <footer className="mt-4 text-xs uppercase tracking-[0.12em] text-[#525852]">
                      {fb.clientIdentifier} — {fb.contextLabel}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
                    OUR SERVICE STANDARDS
                  </p>
                  <h2
                    id="values-feedback-heading"
                    className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
                  >
                    Thoughtful Service Starts With You.
                  </h2>
                </div>
                <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#525852]">
                  Rather than displaying placeholder quotes, Stillpoint reserves
                  this space for verified client feedback once genuine sessions
                  are completed—grounded in three core service commitments.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
          )}
        </div>
      </section>

      {/* SECTION 10: Frequently Asked Questions */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-[#F8F6F0] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              COMMON QUESTIONS
            </p>
            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
            >
              Frequently Asked Questions.
            </h2>
            <p className="text-base leading-relaxed text-[#292D29]/80">
              Clear answers about how mobile appointments, travel review,
              pricing inquiries, and confirmations work.
            </p>
          </div>

          <FAQAccordion items={HOMEPAGE_FAQS} defaultOpenId="appointment-types" />
        </div>
      </section>

      {/* SECTION 11: Final Call to Action */}
      <CTASection />
    </>
  );
}
