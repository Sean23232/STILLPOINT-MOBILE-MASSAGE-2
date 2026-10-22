"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  matchPrefix?: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  items: NavItem[];
}

export function MobileNavigation({
  isOpen,
  onClose,
  pathname,
  items,
}: MobileNavigationProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (item.matchPrefix) return pathname.startsWith(item.matchPrefix);
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile site navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292D29]/45 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col justify-between bg-[#F8F6F0] px-6 py-6 shadow-xl"
      >
        <div>
          <div className="flex items-center justify-between border-b border-[#292D29]/10 pb-5">
            <Link
              href="/"
              onClick={onClose}
              className="group inline-flex flex-col"
            >
              <span className="font-serif text-xl font-medium tracking-[0.18em] text-[#233C32]">
                STILLPOINT
              </span>
              <span className="text-[10px] font-medium tracking-[0.26em] text-[#525852]">
                MOBILE MASSAGE
              </span>
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#292D29]/15 text-[#292D29] transition hover:bg-[#E9E1D4]/60"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile primary" className="mt-6">
            <ul className="space-y-1">
              {items.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-[10px] px-3.5 py-3 text-base transition ${
                        active
                          ? "bg-[#E6EBE2] font-semibold text-[#233C32]"
                          : "font-medium text-[#292D29] hover:bg-[#E9E1D4]/55"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#233C32]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 border-t border-[#292D29]/10 pt-5">
            <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#525852]">
              Dedicated Service Guides
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/services/in-home-massage"
                onClick={onClose}
                className="rounded-[8px] border border-[#292D29]/10 bg-white/75 px-3 py-2.5 font-medium text-[#292D29] hover:border-[#233C32]/40"
              >
                In-Home Massage
              </Link>
              <Link
                href="/corporate-wellness"
                onClick={onClose}
                className="rounded-[8px] border border-[#292D29]/10 bg-white/75 px-3 py-2.5 font-medium text-[#292D29] hover:border-[#233C32]/40"
              >
                Corporate Wellness
              </Link>
              <Link
                href="/services/hotel-massage"
                onClick={onClose}
                className="rounded-[8px] border border-[#292D29]/10 bg-white/75 px-3 py-2.5 font-medium text-[#292D29] hover:border-[#233C32]/40"
              >
                Hotel & Travel
              </Link>
              <Link
                href="/services/events-pop-ups"
                onClick={onClose}
                className="rounded-[8px] border border-[#292D29]/10 bg-white/75 px-3 py-2.5 font-medium text-[#292D29] hover:border-[#233C32]/40"
              >
                Events & Pop-Ups
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 border-t border-[#292D29]/10 pt-5">
          <Link
            href="/book"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#233C32] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
          >
            <span>Book a Massage</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/corporate-wellness#corporate-proposal"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-[10px] border border-[#233C32]/30 bg-white px-5 py-3 text-sm font-medium text-[#233C32] transition hover:bg-[#E6EBE2]/60"
          >
            Request Corporate Wellness
          </Link>
        </div>
      </div>
    </div>
  );
}
