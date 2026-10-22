"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Building2,
  Home,
  Hotel,
  Sparkles,
  HelpCircle,
  Clock,
} from "lucide-react";
import {
  APPROVED_DURATION_OPTIONS,
  PREFERRED_TIME_WINDOWS,
  type ServiceSlug,
} from "@/lib/brand-data";
import {
  getLocalTomorrowISO,
  isFutureDate,
  isLastMinuteDate,
  isValidEmail,
  isValidPhone,
  validateBookingPayload,
  type BookingFormPayload,
} from "@/lib/validation";
import { FormStatusMessage } from "./FormStatusMessage";

interface BookingStepperProps {
  initialService?: ServiceSlug;
  initialDate?: string;
  initialTime?: string;
  initialLocation?: string;
  compactHeader?: boolean;
}

const SERVICE_CHOICES: {
  value: ServiceSlug;
  title: string;
  subtitle: string;
  icon: typeof Home;
}[] = [
  {
    value: "in-home",
    title: "In-Home Massage",
    subtitle: "Private residential sessions brought directly to your space.",
    icon: Home,
  },
  {
    value: "corporate",
    title: "Corporate Massage",
    subtitle: "Workplace wellness days, appreciation events, and recurring care.",
    icon: Building2,
  },
  {
    value: "hotel",
    title: "Hotel Massage",
    subtitle:
      "In-room appointments for travelers, subject to property policies.",
    icon: Hotel,
  },
  {
    value: "events",
    title: "Event or Pop-Up",
    subtitle: "Selected gatherings, retreats, conferences, and activations.",
    icon: Sparkles,
  },
  {
    value: "other",
    title: "Other Inquiry",
    subtitle: "Custom mobile massage arrangements or recurring discussions.",
    icon: HelpCircle,
  },
];

const STEP_LABELS = [
  { num: 1, title: "Service" },
  { num: 2, title: "Preferences" },
  { num: 3, title: "Contact" },
  { num: 4, title: "Review" },
  { num: 5, title: "Submitted" },
];

export function BookingStepper({
  initialService = "in-home",
  initialDate = "",
  initialTime = "afternoon",
  initialLocation = "",
  compactHeader = false,
}: BookingStepperProps) {
  const minDate = getLocalTomorrowISO();
  const hasPrefilledStep1 = Boolean(
    initialDate && isFutureDate(initialDate) && initialLocation.trim()
  );

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(
    hasPrefilledStep1 ? 2 : 1
  );

  const [form, setForm] = useState<BookingFormPayload>({
    serviceType: initialService,
    preferredDate: initialDate && isFutureDate(initialDate) ? initialDate : "",
    preferredTimeWindow: initialTime || "afternoon",
    durationOption: APPROVED_DURATION_OPTIONS[0].value,
    participantsCount:
      initialService === "corporate" || initialService === "events" ? 10 : 1,
    locationPostal: initialLocation || "",
    addressDetails: "",
    hotelName: "",
    hotelPolicyAcknowledged: false,
    additionalRequests: "",
    fullName: "",
    email: "",
    phone: "",
    preferredContactMethod: "email",
    additionalNotes: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitErrorMsg, setSubmitErrorMsg] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  const isLastMinute = isLastMinuteDate(form.preferredDate);

  const updateField = <K extends keyof BookingFormPayload>(
    key: K,
    value: BookingFormPayload[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    if (!form.serviceType) {
      setErrors({ serviceType: "Please select a service option." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!form.preferredDate) {
      nextErrors.preferredDate = "Please select a preferred future date.";
    } else if (!isFutureDate(form.preferredDate)) {
      nextErrors.preferredDate = "Preferred date must be in the future.";
    }

    if (!form.preferredTimeWindow) {
      nextErrors.preferredTimeWindow = "Please select a preferred time window.";
    }

    if (!form.durationOption) {
      nextErrors.durationOption = "Please select a session option.";
    }

    if (!form.locationPostal.trim() || form.locationPostal.trim().length < 2) {
      nextErrors.locationPostal =
        "Please enter your neighborhood, city, or ZIP/postal code.";
    }

    if (form.serviceType === "hotel") {
      if (!form.hotelName?.trim()) {
        nextErrors.hotelName =
          "Please share the hotel or accommodation name.";
      }
      if (!form.hotelPolicyAcknowledged) {
        nextErrors.hotelPolicyAcknowledged =
          "Please confirm that you understand hotel appointments depend on property policies.";
      }
    }

    if (
      (form.serviceType === "corporate" || form.serviceType === "events") &&
      (!form.participantsCount || form.participantsCount < 1)
    ) {
      nextErrors.participantsCount =
        "Please enter an estimated participant count.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!isValidEmail(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isValidPhone(form.phone)) {
      nextErrors.phone =
        "Please enter a valid phone number (7–15 digits, country code optional).";
    }
    if (!form.preferredContactMethod) {
      nextErrors.preferredContactMethod =
        "Please choose a preferred contact method.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  };

  const handleFinalSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitState === "submitting") return;

    const allErrors = validateBookingPayload(form);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setSubmitState("error");
      setSubmitErrorMsg(
        "Some required fields need attention. Please review your details."
      );
      return;
    }

    setSubmitState("submitting");
    setSubmitErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setSubmitState("error");
        setSubmitErrorMsg(
          data.error ||
            "Could not submit your booking request right now. All entered details remain saved in this form."
        );
        return;
      }

      setReferenceCode(data.referenceCode || "");
      setSubmitState("success");
      setStep(5);
    } catch {
      setSubmitState("error");
      setSubmitErrorMsg(
        "A connection error occurred while submitting. Your details have been preserved—please try again."
      );
    }
  };

  const serviceLabel =
    SERVICE_CHOICES.find((c) => c.value === form.serviceType)?.title ||
    form.serviceType;
  const timeWindowLabel =
    PREFERRED_TIME_WINDOWS.find((t) => t.value === form.preferredTimeWindow)
      ?.label || form.preferredTimeWindow;
  const durationLabel =
    APPROVED_DURATION_OPTIONS.find((d) => d.value === form.durationOption)
      ?.label || form.durationOption;

  return (
    <div className="rounded-[14px] border border-[#292D29]/12 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_18px_48px_-28px_rgba(35,60,50,0.22)]">
      {!compactHeader && (
        <div className="mb-8 border-b border-[#292D29]/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
            Booking Request Prototype
          </p>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-[#292D29]">
            Request a Mobile Massage Appointment
          </h2>
          <p className="mt-1.5 text-sm text-[#525852]">
            Submitting a request starts an availability and location review—no
            payment is collected and appointments are confirmed only after
            direct review.
          </p>
        </div>
      )}

      {/* Progress Stepper */}
      <nav aria-label="Booking request progress" className="mb-8">
        <ol className="grid grid-cols-5 gap-2">
          {STEP_LABELS.map((item) => {
            const completed = step > item.num;
            const current = step === item.num;
            return (
              <li key={item.num} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    aria-current={current ? "step" : undefined}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                      completed
                        ? "bg-[#233C32] text-white"
                        : current
                        ? "border-2 border-[#233C32] bg-[#E6EBE2] text-[#233C32]"
                        : "border border-[#292D29]/20 bg-[#F8F6F0] text-[#525852]"
                    }`}
                  >
                    {completed ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      item.num
                    )}
                  </span>
                  <span
                    className={`hidden sm:inline text-xs font-medium ${
                      current
                        ? "font-semibold text-[#233C32]"
                        : completed
                        ? "text-[#292D29]"
                        : "text-[#525852]"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <div
                  className={`mt-2 h-1 rounded-full ${
                    completed || current ? "bg-[#233C32]" : "bg-[#292D29]/10"
                  }`}
                />
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="booking-hp">Leave blank</label>
        <input
          id="booking-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot || ""}
          onChange={(e) => updateField("honeypot", e.target.value)}
        />
      </div>

      {/* STEP 1: Choose Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl text-[#292D29]">
              Step 1 — Choose Your Service
            </h3>
            <p className="mt-1 text-sm text-[#525852]">
              Select the setting that best matches your massage inquiry.
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Service category"
            className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
          >
            {SERVICE_CHOICES.map((choice) => {
              const Icon = choice.icon;
              const selected = form.serviceType === choice.value;
              return (
                <button
                  key={choice.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    updateField("serviceType", choice.value);
                    if (
                      (choice.value === "corporate" ||
                        choice.value === "events") &&
                      (!form.participantsCount || form.participantsCount < 2)
                    ) {
                      updateField("participantsCount", 10);
                    }
                  }}
                  className={`flex items-start gap-4 rounded-[11px] border p-4 text-left transition ${
                    selected
                      ? "border-[#233C32] bg-[#E6EBE2]/55 ring-1 ring-[#233C32]"
                      : "border-[#292D29]/15 bg-[#F8F6F0]/45 hover:border-[#233C32]/45 hover:bg-[#F8F6F0]"
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] ${
                      selected
                        ? "bg-[#233C32] text-white"
                        : "bg-white text-[#233C32] border border-[#292D29]/12"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block font-medium text-[#292D29]">
                      {choice.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#525852]">
                      {choice.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {form.serviceType === "corporate" && (
            <div className="rounded-[10px] border border-[#233C32]/25 bg-[#E6EBE2]/65 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#233C32]">
                Corporate Wellness Routing
              </p>
              <p className="mt-1 text-sm text-[#292D29]/90">
                Planning an employee appreciation day, recurring workplace
                program, or multi-person office event? You can switch directly
                to our dedicated Corporate Proposal form or continue this quick
                date request.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/corporate-wellness#corporate-proposal"
                  className="inline-flex items-center gap-2 rounded-[9px] bg-[#233C32] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#1b2f27]"
                >
                  <span>Go to Corporate Proposal Workflow</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-[#525852]">
                  or click &ldquo;Continue to Preferences&rdquo; below
                </span>
              </div>
            </div>
          )}

          {errors.serviceType && (
            <p role="alert" className="text-xs text-[#8C3A32]">
              {errors.serviceType}
            </p>
          )}

          <div className="flex justify-end border-t border-[#292D29]/10 pt-5">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
            >
              <span>Continue to Preferences</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Preferences */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#233C32]">
              Selected: {serviceLabel}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-[#292D29]">
              Step 2 — Select Scheduling &amp; Space Preferences
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="step-date"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Preferred Date <span className="text-[#8C3A32]">*</span>
              </label>
              <input
                id="step-date"
                type="date"
                min={minDate}
                required
                value={form.preferredDate}
                onChange={(e) => updateField("preferredDate", e.target.value)}
                aria-invalid={Boolean(errors.preferredDate)}
                aria-describedby={
                  errors.preferredDate ? "err-step-date" : undefined
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
              {errors.preferredDate && (
                <p id="err-step-date" className="mt-1 text-xs text-[#8C3A32]">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="step-time"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Preferred Time Window <span className="text-[#8C3A32]">*</span>
              </label>
              <select
                id="step-time"
                value={form.preferredTimeWindow}
                onChange={(e) =>
                  updateField("preferredTimeWindow", e.target.value)
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              >
                {PREFERRED_TIME_WINDOWS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {isLastMinute && (
              <div className="sm:col-span-2 flex items-start gap-3 rounded-[10px] border border-[#233C32]/20 bg-[#E9E1D4]/65 px-4 py-3 text-xs sm:text-sm text-[#292D29]">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#233C32]"
                  aria-hidden="true"
                />
                <p>
                  <strong>Last-Minute / Short-Notice Request:</strong> Dates
                  within the next 72 hours are availability-dependent and
                  reviewed against current travel schedules before any
                  appointment is confirmed.
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <label
                htmlFor="step-duration"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Session Arrangement Option{" "}
                <span className="text-[#8C3A32]">*</span>
              </label>
              <select
                id="step-duration"
                value={form.durationOption}
                onChange={(e) => updateField("durationOption", e.target.value)}
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              >
                {APPROVED_DURATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-[#525852]">
                Exact session durations and applicable pricing are shared
                directly once your request details are reviewed.
              </p>
            </div>

            <div>
              <label
                htmlFor="step-location"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Location or ZIP/Postal Code{" "}
                <span className="text-[#8C3A32]">*</span>
              </label>
              <input
                id="step-location"
                type="text"
                required
                placeholder="Neighborhood, city, or ZIP/postal code"
                value={form.locationPostal}
                onChange={(e) => updateField("locationPostal", e.target.value)}
                aria-invalid={Boolean(errors.locationPostal)}
                aria-describedby={
                  errors.locationPostal ? "err-step-location" : undefined
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
              {errors.locationPostal && (
                <p
                  id="err-step-location"
                  className="mt-1 text-xs text-[#8C3A32]"
                >
                  {errors.locationPostal}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="step-participants"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Number of Participants{" "}
                {form.serviceType === "corporate" ||
                form.serviceType === "events" ? (
                  <span className="text-[#8C3A32]">*</span>
                ) : (
                  <span className="font-normal normal-case text-[#525852]">
                    (Optional)
                  </span>
                )}
              </label>
              <input
                id="step-participants"
                type="number"
                min={1}
                max={500}
                value={form.participantsCount ?? ""}
                onChange={(e) =>
                  updateField(
                    "participantsCount",
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                aria-invalid={Boolean(errors.participantsCount)}
                aria-describedby={
                  errors.participantsCount ? "err-step-participants" : undefined
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
              {errors.participantsCount && (
                <p
                  id="err-step-participants"
                  className="mt-1 text-xs text-[#8C3A32]"
                >
                  {errors.participantsCount}
                </p>
              )}
            </div>

            {form.serviceType === "hotel" && (
              <div className="sm:col-span-2 space-y-4 rounded-[10px] border border-[#292D29]/15 bg-[#F8F6F0]/80 p-4">
                <div>
                  <label
                    htmlFor="step-hotel-name"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                  >
                    Hotel or Accommodation Name{" "}
                    <span className="text-[#8C3A32]">*</span>
                  </label>
                  <input
                    id="step-hotel-name"
                    type="text"
                    required
                    placeholder="Property name and general area"
                    value={form.hotelName || ""}
                    onChange={(e) => updateField("hotelName", e.target.value)}
                    aria-invalid={Boolean(errors.hotelName)}
                    aria-describedby={
                      errors.hotelName ? "err-step-hotel" : undefined
                    }
                    className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-white px-3.5 py-2.5 text-sm focus:border-[#233C32]"
                  />
                  {errors.hotelName && (
                    <p
                      id="err-step-hotel"
                      className="mt-1 text-xs text-[#8C3A32]"
                    >
                      {errors.hotelName}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    id="step-hotel-ack"
                    type="checkbox"
                    checked={Boolean(form.hotelPolicyAcknowledged)}
                    onChange={(e) =>
                      updateField("hotelPolicyAcknowledged", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-[#292D29]/30 text-[#233C32] focus:ring-[#233C32]"
                  />
                  <label
                    htmlFor="step-hotel-ack"
                    className="text-xs leading-relaxed text-[#292D29]/90"
                  >
                    I understand that hotel and travel massage sessions are
                    subject to location, availability, room space, and the
                    property&apos;s visitor policies.{" "}
                    <span className="text-[#8C3A32]">*</span>
                  </label>
                </div>
                {errors.hotelPolicyAcknowledged && (
                  <p className="text-xs text-[#8C3A32]">
                    {errors.hotelPolicyAcknowledged}
                  </p>
                )}
              </div>
            )}

            <div className="sm:col-span-2">
              <label
                htmlFor="step-address"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Address, Parking, or Access Notes{" "}
                <span className="font-normal normal-case text-[#525852]">
                  (Optional at inquiry stage)
                </span>
              </label>
              <input
                id="step-address"
                type="text"
                placeholder="Stairs/elevator access, parking notes, or venue room details"
                value={form.addressDetails || ""}
                onChange={(e) => updateField("addressDetails", e.target.value)}
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="step-requests"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Session Preferences or Goals{" "}
                <span className="font-normal normal-case text-[#525852]">
                  (Optional)
                </span>
              </label>
              <textarea
                id="step-requests"
                rows={3}
                placeholder="Share general relaxation goals, scheduling flexibility, or questions you would like discussed before confirmation."
                value={form.additionalRequests || ""}
                onChange={(e) =>
                  updateField("additionalRequests", e.target.value)
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#292D29]/10 pt-5">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#292D29]/20 px-5 py-3 text-sm font-medium text-[#292D29] transition hover:bg-[#F8F6F0]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
            >
              <span>Continue to Contact Details</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Contact Details */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl text-[#292D29]">
              Step 3 — Your Contact Information
            </h3>
            <p className="mt-1 text-sm text-[#525852]">
              Used strictly to follow up regarding availability, service
              options, and appointment details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="step-fullname"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Full Name <span className="text-[#8C3A32]">*</span>
              </label>
              <input
                id="step-fullname"
                type="text"
                required
                placeholder="Your full name"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "err-step-fullname" : undefined
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
              {errors.fullName && (
                <p id="err-step-fullname" className="mt-1 text-xs text-[#8C3A32]">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="step-email"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Email Address <span className="text-[#8C3A32]">*</span>
              </label>
              <input
                id="step-email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "err-step-email" : undefined}
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
              {errors.email && (
                <p id="err-step-email" className="mt-1 text-xs text-[#8C3A32]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="step-phone"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Phone Number <span className="text-[#8C3A32]">*</span>
              </label>
              <input
                id="step-phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "err-step-phone" : undefined}
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
              {errors.phone && (
                <p id="err-step-phone" className="mt-1 text-xs text-[#8C3A32]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="step-contact-method"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Preferred Contact Method <span className="text-[#8C3A32]">*</span>
              </label>
              <select
                id="step-contact-method"
                value={form.preferredContactMethod}
                onChange={(e) =>
                  updateField(
                    "preferredContactMethod",
                    e.target.value as BookingFormPayload["preferredContactMethod"]
                  )
                }
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              >
                <option value="email">Email</option>
                <option value="phone">Phone Call / Text</option>
                <option value="either">Either Email or Phone</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="step-notes"
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
              >
                Additional Notes{" "}
                <span className="font-normal normal-case text-[#525852]">
                  (Optional)
                </span>
              </label>
              <textarea
                id="step-notes"
                rows={3}
                placeholder="Best times to reach you or any additional context."
                value={form.additionalNotes || ""}
                onChange={(e) => updateField("additionalNotes", e.target.value)}
                className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#292D29]/10 pt-5">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#292D29]/20 px-5 py-3 text-sm font-medium text-[#292D29] transition hover:bg-[#F8F6F0]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1b2f27]"
            >
              <span>Review Request</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review */}
      {step === 4 && (
        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <div>
            <h3 className="font-serif text-2xl text-[#292D29]">
              Step 4 — Review Your Booking Request
            </h3>
            <p className="mt-1 text-sm text-[#525852]">
              Confirm your details below. You can jump back to edit any section
              without losing entered information.
            </p>
          </div>

          {submitState === "error" && (
            <FormStatusMessage status="error" message={submitErrorMsg} />
          )}

          <div className="divide-y divide-[#292D29]/10 rounded-[12px] border border-[#292D29]/12 bg-[#F8F6F0]/75 p-5 sm:p-6">
            {/* Summary Block 1 */}
            <div className="flex items-start justify-between gap-4 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#525852]">
                  Service Category
                </p>
                <p className="mt-1 font-serif text-xl text-[#292D29]">
                  {serviceLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
              >
                Edit Service
              </button>
            </div>

            {/* Summary Block 2 */}
            <div className="py-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#525852]">
                  Preferences &amp; Location
                </p>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
                >
                  Edit Preferences
                </button>
              </div>

              <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-[#525852]">Preferred Date</dt>
                  <dd className="font-medium text-[#292D29]">
                    {form.preferredDate}
                    {isLastMinute && (
                      <span className="ml-2 inline-block rounded bg-[#E9E1D4] px-2 py-0.5 text-[11px] font-normal text-[#292D29]">
                        Short-Notice (Availability-Dependent)
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">Time Window</dt>
                  <dd className="font-medium text-[#292D29]">
                    {timeWindowLabel}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[#525852]">Session Option</dt>
                  <dd className="font-medium text-[#292D29]">
                    {durationLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">Location / Postal</dt>
                  <dd className="font-medium text-[#292D29]">
                    {form.locationPostal}
                  </dd>
                </div>
                {form.participantsCount && (
                  <div>
                    <dt className="text-xs text-[#525852]">Participants</dt>
                    <dd className="font-medium text-[#292D29]">
                      {form.participantsCount}
                    </dd>
                  </div>
                )}
                {form.hotelName && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#525852]">
                      Hotel / Property Name
                    </dt>
                    <dd className="font-medium text-[#292D29]">
                      {form.hotelName} (Property policy acknowledged)
                    </dd>
                  </div>
                )}
                {form.addressDetails && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#525852]">
                      Access / Location Notes
                    </dt>
                    <dd className="text-[#292D29]">{form.addressDetails}</dd>
                  </div>
                )}
                {form.additionalRequests && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#525852]">
                      Preferences &amp; Goals
                    </dt>
                    <dd className="text-[#292D29]">{form.additionalRequests}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Summary Block 3 */}
            <div className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#525852]">
                  Contact Information
                </p>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
                >
                  Edit Contact
                </button>
              </div>
              <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-[#525852]">Name</dt>
                  <dd className="font-medium text-[#292D29]">
                    {form.fullName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">
                    Preferred Contact Method
                  </dt>
                  <dd className="font-medium capitalize text-[#292D29]">
                    {form.preferredContactMethod}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">Email</dt>
                  <dd className="font-medium text-[#292D29]">{form.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#525852]">Phone</dt>
                  <dd className="font-medium text-[#292D29]">{form.phone}</dd>
                </div>
                {form.additionalNotes && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#525852]">Additional Notes</dt>
                    <dd className="text-[#292D29]">{form.additionalNotes}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#292D29]/12 bg-[#E6EBE2]/50 px-4 py-3 text-xs leading-relaxed text-[#292D29]/85">
            <strong>Important Notice:</strong> Submitting this request does not
            create a confirmed reservation. Availability, travel logistics,
            service options, and pricing are reviewed first before direct
            confirmation. View our{" "}
            <Link
              href="/policies/booking-cancellation"
              className="underline underline-offset-2 hover:text-[#233C32]"
            >
              Booking &amp; Cancellation Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/policies/privacy"
              className="underline underline-offset-2 hover:text-[#233C32]"
            >
              Privacy Policy
            </Link>
            .
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#292D29]/10 pt-5">
            <button
              type="button"
              onClick={handleBack}
              disabled={submitState === "submitting"}
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#292D29]/20 px-5 py-3 text-sm font-medium text-[#292D29] transition hover:bg-[#F8F6F0] disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Contact</span>
            </button>

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#233C32] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {submitState === "submitting" ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <span>Submit Booking Request</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Submission Confirmation */}
      {step === 5 && (
        <FormStatusMessage
          status="success"
          title="Booking Request Submitted"
          message="Your request has been submitted. Your appointment is not confirmed until availability and details have been reviewed by the business."
          referenceCode={referenceCode}
          isLastMinute={isLastMinute}
          onReset={() => {
            setSubmitState("idle");
            setReferenceCode("");
            setStep(1);
          }}
          resetLabel="Start another booking request"
        />
      )}
    </div>
  );
}
