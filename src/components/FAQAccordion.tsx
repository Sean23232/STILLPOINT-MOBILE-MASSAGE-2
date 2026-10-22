"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQItem } from "@/lib/brand-data";

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenId?: string;
}

export function FAQAccordion({ items, defaultOpenId }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    defaultOpenId ? { [defaultOpenId]: true } : { [items[0]?.id || ""]: true }
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="divide-y divide-[#292D29]/12 border-y border-[#292D29]/12">
      {items.map((item) => {
        const isOpen = Boolean(openIds[item.id]);
        const buttonId = `faq-trigger-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id} className="py-5 sm:py-6">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start justify-between gap-6 text-left group"
              >
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#292D29] transition group-hover:text-[#233C32]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#292D29]/20 text-[#233C32] transition group-hover:border-[#233C32]"
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="mt-3 pr-10 text-sm sm:text-base leading-relaxed text-[#292D29]/85"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
