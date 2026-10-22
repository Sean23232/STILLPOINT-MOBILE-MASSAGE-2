"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileNavigation, type NavItem } from "./MobileNavigation";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", matchPrefix: "/services" },
  { label: "Corporate Wellness", href: "/corporate-wellness" },
  { label: "About", href: "/about" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (item.matchPrefix) return pathname.startsWith(item.matchPrefix);
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
          scrolled
            ? "border-b border-[#292D29]/10 bg-[#F8F6F0]/95 backdrop-blur-md"
            : "border-b border-[#292D29]/5 bg-[#F8F6F0]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          {/* Brand Mark */}
          <Link
            href="/"
            aria-label="Stillpoint Mobile Massage — Home"
            className="group inline-flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#233C32]/30 bg-white/70 transition group-hover:border-[#233C32]"
            >
              <span className="h-2 w-2 rounded-full bg-[#233C32]" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl sm:text-[22px] font-medium tracking-[0.18em] text-[#233C32]">
                STILLPOINT
              </span>
              <span className="mt-1 text-[9.5px] font-medium tracking-[0.28em] text-[#525852]">
                MOBILE MASSAGE
              </span>
            </span>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex lg:items-center lg:gap-7 xl:gap-8"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 text-[13.5px] tracking-[0.02em] transition ${
                    active
                      ? "font-semibold text-[#233C32]"
                      : "font-medium text-[#292D29]/85 hover:text-[#233C32]"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#233C32] transition-transform duration-200 origin-left ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="/corporate-wellness#corporate-proposal"
              className="text-xs font-medium tracking-[0.03em] text-[#233C32] underline-offset-4 hover:underline"
            >
              Request Corporate Wellness
            </Link>
            <Link
              href="/book"
              className={`inline-flex items-center justify-center rounded-[10px] px-5 py-2.5 text-[13.5px] font-medium tracking-[0.02em] transition ${
                pathname === "/book"
                  ? "bg-[#1b2f27] text-white ring-2 ring-[#233C32]/25"
                  : "bg-[#233C32] text-white hover:bg-[#1b2f27]"
              }`}
            >
              Book a Massage
            </Link>
          </div>

          {/* Mobile Booking Button + Hamburger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[9px] bg-[#233C32] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[#1b2f27]"
            >
              Book a Massage
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#292D29]/15 bg-white/75 text-[#292D29] transition hover:bg-[#E9E1D4]/60"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        items={NAV_ITEMS}
      />
    </>
  );
}
