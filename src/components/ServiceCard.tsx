import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceOffering } from "@/lib/brand-data";
import { EditorialImage } from "./EditorialImage";

interface ServiceCardProps {
  service: ServiceOffering;
  reversed?: boolean;
}

export function ServiceCard({ service, reversed = false }: ServiceCardProps) {
  const primaryBookingHref =
    service.slug === "corporate"
      ? "/corporate-wellness#corporate-proposal"
      : `/book?service=${service.bookingServiceValue}`;

  return (
    <article className="grid grid-cols-1 items-center gap-8 border-t border-[#292D29]/12 pt-12 lg:grid-cols-12 lg:gap-14 lg:pt-16">
      <div
        className={`lg:col-span-6 ${
          reversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Link
          href={service.route}
          aria-label={`${service.title} — ${service.headline}`}
          className="group block"
        >
          <EditorialImage
            src={service.imageSrc}
            alt={service.imageAlt}
            aspectClassName="aspect-[16/11]"
            className="group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      <div
        className={`lg:col-span-6 space-y-5 ${
          reversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
          SERVICE {service.number} — {service.title}
        </p>

        <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#292D29]">
          {service.headline}
        </h3>

        <p className="max-w-lg text-base leading-relaxed text-[#292D29]/85">
          {service.shortDescription}
        </p>

        <ul className="space-y-2 pt-1 text-sm text-[#525852]">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#233C32]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4 pt-3">
          <Link
            href={primaryBookingHref}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
          >
            <span>{service.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href={service.route}
            className="text-sm font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
          >
            Service Details
          </Link>
        </div>
      </div>
    </article>
  );
}
