import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] items-center bg-[#F8F6F0] py-20">
      <div className="mx-auto max-w-2xl px-5 text-center space-y-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#233C32]">
          404 • PAGE NOT FOUND
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#292D29]">
          This Space Seems Quiet—Perhaps Too Quiet.
        </h1>
        <p className="text-base leading-relaxed text-[#525852]">
          The page you were looking for could not be found or may have moved.
          Return to the Stillpoint homepage or start a booking inquiry below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#292D29]/20 bg-white px-6 py-3.5 text-sm font-medium text-[#292D29] transition hover:border-[#233C32]"
          >
            <span>Book a Massage</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
