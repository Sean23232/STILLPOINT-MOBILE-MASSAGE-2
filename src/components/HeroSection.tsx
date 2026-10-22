import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialImage } from "./EditorialImage";
import { BookingWidget } from "./BookingWidget";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#F8F6F0] pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 space-y-6 animate-editorial-in">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
              MOBILE MASSAGE • PERSONAL &amp; CORPORATE WELLNESS
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-4xl leading-[1.08] font-normal text-[#292D29] sm:text-5xl lg:text-[58px]"
            >
              Professional Massage.{" "}
              <span className="italic text-[#233C32]">Delivered to You.</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#292D29]/85">
              From the comfort of your home to your workplace or hotel, enjoy a
              more convenient massage experience designed around your schedule
              and your space.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium tracking-[0.02em] text-white transition hover:bg-[#1b2f27]"
              >
                <span>Book a Massage</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#services-overview"
                className="inline-flex items-center justify-center rounded-[10px] border border-[#292D29]/20 bg-white/80 px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32] hover:text-[#233C32]"
              >
                Explore Our Services
              </Link>
            </div>

            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#292D29]/12 pt-4 text-xs font-medium tracking-[0.14em] uppercase text-[#525852]">
                <span>In-Home</span>
                <span aria-hidden="true" className="text-[#233C32]">
                  •
                </span>
                <span>Workplace</span>
                <span aria-hidden="true" className="text-[#233C32]">
                  •
                </span>
                <span>Hotel</span>
                <span aria-hidden="true" className="text-[#233C32]">
                  •
                </span>
                <span>Events</span>
              </div>
            </div>
          </div>

          {/* Editorial Photograph (~50% Hero) */}
          <div className="lg:col-span-6">
            <div className="relative">
              <EditorialImage
                src="/images/hero-in-home.jpg"
                alt="A serene sunlit residential room prepared with a wooden mobile massage table, warm ivory linen, and muted sage cotton towels."
                priority={true}
                sizes="(max-width: 1024px) 100vw, 50vw"
                aspectClassName="aspect-[5/4] sm:aspect-[4/3] lg:aspect-[11/10]"
                containerClassName="shadow-[0_20px_50px_-28px_rgba(35,60,50,0.35)]"
              />
              <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#525852]">
                <span>Your Space. Your Time. Your Moment of Calm.</span>
                <span className="hidden sm:inline">
                  Thoughtfully prepared mobile care
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Booking Inquiry Panel */}
        <div className="mt-10 lg:mt-12">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
