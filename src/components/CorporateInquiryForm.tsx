"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import {
  validateCorporatePayload,
  type CorporateInquiryPayload,
} from "@/lib/validation";
import { FormStatusMessage } from "./FormStatusMessage";

interface CorporateInquiryFormProps {
  defaultFormat?: string;
}

const INITIAL_STATE: CorporateInquiryPayload = {
  contactName: "",
  companyName: "",
  workEmail: "",
  phone: "",
  companyLocation: "",
  estimatedParticipants: "",
  preferredDates: "",
  arrangementType: "one-time",
  preferredSessionFormat: "",
  additionalRequirements: "",
  honeypot: "",
};

export function CorporateInquiryForm({
  defaultFormat = "",
}: CorporateInquiryFormProps) {
  const [form, setForm] = useState<CorporateInquiryPayload>({
    ...INITIAL_STATE,
    preferredSessionFormat: defaultFormat,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  const updateField = <K extends keyof CorporateInquiryPayload>(
    key: K,
    value: CorporateInquiryPayload[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;

    const errors = validateCorporatePayload(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage(
        "Please complete all required corporate inquiry fields highlighted below."
      );
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/corporate-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setStatus("error");
        setStatusMessage(
          data.error ||
            "Unable to submit corporate inquiry right now. Your entered information is preserved."
        );
        return;
      }

      setReferenceCode(data.referenceCode || "");
      setStatusMessage(data.message);
      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(
        "A network error prevented submission. Your entered details have been kept—please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <FormStatusMessage
        status="success"
        title="Corporate Wellness Inquiry Submitted"
        message={statusMessage}
        referenceCode={referenceCode}
        onReset={() => {
          setForm({ ...INITIAL_STATE, preferredSessionFormat: defaultFormat });
          setReferenceCode("");
          setStatus("idle");
        }}
        resetLabel="Submit another corporate proposal request"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[12px] border border-[#292D29]/12 bg-white p-6 sm:p-8 lg:p-10 text-[#292D29]"
    >
      <div className="mb-6 border-b border-[#292D29]/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#233C32]">
          Corporate Proposal &amp; Event Inquiry
        </p>
        <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-[#292D29]">
          Tell Us About Your Workplace or Team Event
        </h3>
        <p className="mt-1.5 text-sm text-[#525852]">
          Share your approximate headcount, setting, and preferred schedule.
          Custom proposals and pricing are prepared after reviewing your space
          and requirements.
        </p>
      </div>

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="corp-company-website">Company Website</label>
        <input
          id="corp-company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot || ""}
          onChange={(e) => updateField("honeypot", e.target.value)}
        />
      </div>

      {status === "error" && (
        <div className="mb-6">
          <FormStatusMessage status="error" message={statusMessage} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="corp-contact-name"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Contact Name <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="corp-contact-name"
            type="text"
            required
            placeholder="Alex Morgan"
            value={form.contactName}
            onChange={(e) => updateField("contactName", e.target.value)}
            aria-invalid={Boolean(fieldErrors.contactName)}
            aria-describedby={
              fieldErrors.contactName ? "err-corp-contact-name" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.contactName && (
            <p id="err-corp-contact-name" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.contactName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-company-name"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Company or Organization <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="corp-company-name"
            type="text"
            required
            placeholder="Organization name"
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            aria-invalid={Boolean(fieldErrors.companyName)}
            aria-describedby={
              fieldErrors.companyName ? "err-corp-company-name" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.companyName && (
            <p id="err-corp-company-name" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.companyName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-work-email"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Work Email <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="corp-work-email"
            type="email"
            required
            placeholder="name@organization.com"
            value={form.workEmail}
            onChange={(e) => updateField("workEmail", e.target.value)}
            aria-invalid={Boolean(fieldErrors.workEmail)}
            aria-describedby={
              fieldErrors.workEmail ? "err-corp-work-email" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.workEmail && (
            <p id="err-corp-work-email" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.workEmail}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-phone"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Phone Number{" "}
            <span className="font-normal normal-case text-[#525852]">
              (Optional)
            </span>
          </label>
          <input
            id="corp-phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={form.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "err-corp-phone" : undefined}
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.phone && (
            <p id="err-corp-phone" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-location"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Company / Event Location <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="corp-location"
            type="text"
            required
            placeholder="City, neighborhood, or postal code"
            value={form.companyLocation}
            onChange={(e) => updateField("companyLocation", e.target.value)}
            aria-invalid={Boolean(fieldErrors.companyLocation)}
            aria-describedby={
              fieldErrors.companyLocation ? "err-corp-location" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.companyLocation && (
            <p id="err-corp-location" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.companyLocation}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-participants"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Estimated Participants <span className="text-[#8C3A32]">*</span>
          </label>
          <select
            id="corp-participants"
            required
            value={form.estimatedParticipants}
            onChange={(e) =>
              updateField("estimatedParticipants", e.target.value)
            }
            aria-invalid={Boolean(fieldErrors.estimatedParticipants)}
            aria-describedby={
              fieldErrors.estimatedParticipants
                ? "err-corp-participants"
                : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          >
            <option value="">Select approximate group size</option>
            <option value="5–12 participants">5–12 participants</option>
            <option value="13–25 participants">13–25 participants</option>
            <option value="26–50 participants">26–50 participants</option>
            <option value="50+ participants (multi-session / event)">
              50+ participants (multi-session or event)
            </option>
            <option value="Not sure yet — exploring options">
              Not sure yet — exploring options
            </option>
          </select>
          {fieldErrors.estimatedParticipants && (
            <p
              id="err-corp-participants"
              className="mt-1 text-xs text-[#8C3A32]"
            >
              {fieldErrors.estimatedParticipants}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-dates"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Preferred Date or Date Range{" "}
            <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="corp-dates"
            type="text"
            required
            placeholder="e.g., Next month Thursdays, or Oct 14–16"
            value={form.preferredDates}
            onChange={(e) => updateField("preferredDates", e.target.value)}
            aria-invalid={Boolean(fieldErrors.preferredDates)}
            aria-describedby={
              fieldErrors.preferredDates ? "err-corp-dates" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.preferredDates && (
            <p id="err-corp-dates" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.preferredDates}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="corp-arrangement"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            One-Time or Recurring Arrangement{" "}
            <span className="text-[#8C3A32]">*</span>
          </label>
          <select
            id="corp-arrangement"
            required
            value={form.arrangementType}
            onChange={(e) =>
              updateField(
                "arrangementType",
                e.target.value as CorporateInquiryPayload["arrangementType"]
              )
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          >
            <option value="one-time">One-Time Event or Wellness Day</option>
            <option value="recurring">
              Recurring Workplace Arrangement (Weekly / Monthly / Quarterly)
            </option>
            <option value="exploring-both">
              Exploring Both One-Time &amp; Recurring Options
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="corp-format"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Preferred Session Format <span className="text-[#8C3A32]">*</span>
          </label>
          <select
            id="corp-format"
            required
            value={form.preferredSessionFormat}
            onChange={(e) =>
              updateField("preferredSessionFormat", e.target.value)
            }
            aria-invalid={Boolean(fieldErrors.preferredSessionFormat)}
            aria-describedby={
              fieldErrors.preferredSessionFormat ? "err-corp-format" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          >
            <option value="">Choose a workplace session format</option>
            <option value="Seated workplace sessions (conference room / wellness lounge)">
              Seated workplace sessions (conference room or quiet lounge)
            </option>
            <option value="Table massage setup in dedicated private office room">
              Table massage setup in a dedicated private room
            </option>
            <option value="Employee appreciation pop-up activation">
              Employee appreciation day or office pop-up
            </option>
            <option value="Open to guidance based on our office space">
              Open to guidance based on our available space
            </option>
          </select>
          {fieldErrors.preferredSessionFormat && (
            <p id="err-corp-format" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.preferredSessionFormat}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="corp-requirements"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Additional Requirements{" "}
            <span className="font-normal normal-case text-[#525852]">
              (Optional)
            </span>
          </label>
          <textarea
            id="corp-requirements"
            rows={4}
            placeholder="Share building access notes, available rooms, preferred hours, or event goals."
            value={form.additionalRequirements || ""}
            onChange={(e) =>
              updateField("additionalRequirements", e.target.value)
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm text-[#292D29] focus:border-[#233C32] focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#292D29]/10 pt-5 sm:flex-row sm:items-center">
        <p className="max-w-md text-xs leading-relaxed text-[#525852]">
          By submitting this inquiry, you agree to our{" "}
          <Link
            href="/policies/privacy"
            className="underline underline-offset-2 hover:text-[#233C32]"
          >
            Privacy Policy
          </Link>
          . Proposals and availability are confirmed only after direct business
          review.
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Submitting Proposal Request...</span>
            </>
          ) : (
            <>
              <span>Request a Corporate Proposal</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
