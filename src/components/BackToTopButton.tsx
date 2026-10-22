"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 950);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top of page"
      className="fixed bottom-16 right-5 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#292D29]/15 bg-white/90 text-[#233C32] shadow-sm backdrop-blur transition hover:bg-[#233C32] hover:text-white md:bottom-7 md:right-7"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
