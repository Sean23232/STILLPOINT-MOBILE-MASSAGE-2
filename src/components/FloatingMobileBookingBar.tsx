"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingMobileBookingBar() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 460);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book" || !visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Quick booking actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#292D29]/12 bg-[#F8F6F0]/95 px-4 py-2.5 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link
          href="/book"
          className="flex-1 rounded-[9px] bg-[#233C32] px-4 py-2.5 text-center text-xs font-medium tracking-[0.02em] text-white transition hover:bg-[#1b2f27]"
        >
          Book a Massage
        </Link>
        <Link
          href="/corporate-wellness#corporate-proposal"
          className="rounded-[9px] border border-[#233C32]/30 bg-white px-3.5 py-2.5 text-center text-xs font-medium text-[#233C32] transition hover:bg-[#E6EBE2]/60"
        >
          Corporate
        </Link>
      </div>
    </div>
  );
}
