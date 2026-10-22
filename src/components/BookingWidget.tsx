"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  PREFERRED_TIME_WINDOWS,
  type ServiceSlug,
} from "@/lib/brand-data";
import {
  getLocalTomorrowISO,
  isFutureDate,
} from "@/lib/validation";

export function BookingWidget() {
  const router = useRouter();
  const minDate = getLocalTomorrowISO();

  const [serviceType, setServiceType] = useState<ServiceSlug>("in-home");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("afternoon");
  const [locationPostal, setLocationPostal] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [navigating, setNavigating] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!serviceType) {
      nextErrors.serviceType = "Select a service.";
    }
    if (!preferredDate) {
      nextErrors.preferredDate = "Choose a preferred date.";
    } else if (!isFutureDate(preferredDate)) {
      nextErrors.preferredDate = "Date must be in the future.";
    }
    if (!preferredTime) {
      nextErrors.preferredTime = "Select a preferred time window.";
    }
    if (!locationPostal.trim() || locationPostal.trim().length < 2) {
      nextErrors.locationPostal = "Enter your area or ZIP/postal code.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setNavigating(true);
    const params = new URLSearchParams({
      service: serviceType,
      date: preferredDate,
      time: preferredTime,
      location: locationPostal.trim(),
    });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="rounded-[12px] border border-[#292D29]/12 bg-white/95 p-5 sm:p-6 shadow-[0_14px_40px_-24px_rgba(35,60,50,0.28)] backdrop-blur">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#292D29]/10 pb-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#233C32]">
            Start a Booking Inquiry
          </p>
          <p className="mt-0.5 text-xs text-[#525852]">
            Share your preferred timing and location to begin your request.
          </p>
        </div>
        <span className="text-[11px] text-[#525852]">
          Subject to review &amp; availability
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
          {/* Service Type */}
          <div>
            <label
              htmlFor="hero-service"
              className="block text-xs font-medium text-[#292D29]"
            >
              Service Type <span className="text-[#8C3A32]">*</span>
            </label>
            <select
              id="hero-service"
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value as ServiceSlug);
                setErrors((prev) => ({ ...prev, serviceType: "" }));
              }}
              aria-invalid={Boolean(errors.serviceType)}
              aria-describedby={
                errors.serviceType ? "hero-service-error" : undefined
              }
              className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2.5 text-sm text-[#292D29] transition focus:border-[#233C32] focus:bg-white"
            >
              <option value="in-home">In-Home Massage</option>
              <option value="corporate">Corporate Massage</option>
              <option value="hotel">Hotel &amp; Travel Massage</option>
              <option value="events">Pop-Ups &amp; Events</option>
              <option value="other">Other Inquiry</option>
            </select>
            {errors.serviceType && (
              <p
                id="hero-service-error"
                role="alert"
                className="mt-1 text-xs text-[#8C3A32]"
              >
                {errors.serviceType}
              </p>
            )}
          </div>

          {/* Preferred Date */}
          <div>
            <label
              htmlFor="hero-date"
              className="block text-xs font-medium text-[#292D29]"
            >
              Preferred Date <span className="text-[#8C3A32]">*</span>
            </label>
            <input
              id="hero-date"
              type="date"
              min={minDate}
              value={preferredDate}
              onChange={(e) => {
                setPreferredDate(e.target.value);
                setErrors((prev) => ({ ...prev, preferredDate: "" }));
              }}
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={
                errors.preferredDate ? "hero-date-error" : undefined
              }
              className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2.5 text-sm text-[#292D29] transition focus:border-[#233C32] focus:bg-white"
            />
            {errors.preferredDate && (
              <p
                id="hero-date-error"
                role="alert"
                className="mt-1 text-xs text-[#8C3A32]"
              >
                {errors.preferredDate}
              </p>
            )}
          </div>

          {/* Preferred Time */}
          <div>
            <label
              htmlFor="hero-time"
              className="block text-xs font-medium text-[#292D29]"
            >
              Preferred Time <span className="text-[#8C3A32]">*</span>
            </label>
            <select
              id="hero-time"
              value={preferredTime}
              onChange={(e) => {
                setPreferredTime(e.target.value);
                setErrors((prev) => ({ ...prev, preferredTime: "" }));
              }}
              aria-invalid={Boolean(errors.preferredTime)}
              aria-describedby={
                errors.preferredTime ? "hero-time-error" : undefined
              }
              className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2.5 text-sm text-[#292D29] transition focus:border-[#233C32] focus:bg-white"
            >
              {PREFERRED_TIME_WINDOWS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p
                id="hero-time-error"
                role="alert"
                className="mt-1 text-xs text-[#8C3A32]"
              >
                {errors.preferredTime}
              </p>
            )}
          </div>

          {/* Location or ZIP */}
          <div>
            <label
              htmlFor="hero-location"
              className="block text-xs font-medium text-[#292D29]"
            >
              Location or ZIP/Postal <span className="text-[#8C3A32]">*</span>
            </label>
            <input
              id="hero-location"
              type="text"
              placeholder="Neighborhood or ZIP"
              value={locationPostal}
              onChange={(e) => {
                setLocationPostal(e.target.value);
                setErrors((prev) => ({ ...prev, locationPostal: "" }));
              }}
              aria-invalid={Boolean(errors.locationPostal)}
              aria-describedby={
                errors.locationPostal ? "hero-location-error" : undefined
              }
              className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2.5 text-sm text-[#292D29] placeholder:text-[#525852]/65 transition focus:border-[#233C32] focus:bg-white"
            />
            {errors.locationPostal && (
              <p
                id="hero-location-error"
                role="alert"
                className="mt-1 text-xs text-[#8C3A32]"
              >
                {errors.locationPostal}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pt-[22px]">
            <button
              type="submit"
              disabled={navigating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#233C32] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1b2f27] disabled:opacity-60"
            >
              <span>{navigating ? "Opening..." : "Continue to Booking"}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
