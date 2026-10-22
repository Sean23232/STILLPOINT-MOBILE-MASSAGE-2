"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import {
  COLLABORATION_CATEGORIES,
} from "@/lib/brand-data";
import {
  validatePartnershipPayload,
  type PartnershipInquiryPayload,
} from "@/lib/validation";
import { FormStatusMessage } from "./FormStatusMessage";

const INITIAL_PARTNERSHIP: PartnershipInquiryPayload = {
  name: "",
  organization: "",
  professionalRole: "",
  email: "",
  phone: "",
  collaborationType: "",
  location: "",
  message: "",
  honeypot: "",
};

export function PartnershipForm() {
  const [form, setForm] =
    useState<PartnershipInquiryPayload>(INITIAL_PARTNERSHIP);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  const updateField = <K extends keyof PartnershipInquiryPayload>(
    key: K,
    value: PartnershipInquiryPayload[K]
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

    const errors = validatePartnershipPayload(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Please review the required partnership fields below.");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/partnership-inquiries", {
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
            "Unable to save partnership inquiry right now. Your entered information is preserved."
        );
        return;
      }

      setReferenceCode(data.referenceCode || "");
      setStatusMessage(data.message);
      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(
        "A connection issue occurred. Your message has been kept—please retry shortly."
      );
    }
  };

  if (status === "success") {
    return (
      <FormStatusMessage
        status="success"
        title="Partnership Inquiry Recorded"
        message={statusMessage}
        referenceCode={referenceCode}
        onReset={() => {
          setForm(INITIAL_PARTNERSHIP);
          setReferenceCode("");
          setStatus("idle");
        }}
        resetLabel="Send another collaboration inquiry"
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
          Invitation to Collaborate
        </p>
        <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-[#292D29]">
          Start a Partnership Conversation
        </h3>
        <p className="mt-1.5 text-sm text-[#525852]">
          Introduce your practice, hospitality team, or organization to explore
          complementary wellness arrangements.
        </p>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="part-website">Website</label>
        <input
          id="part-website"
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
            htmlFor="part-name"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Your Name <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="part-name"
            type="text"
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "err-part-name" : undefined}
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.name && (
            <p id="err-part-name" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="part-org"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Organization / Practice <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="part-org"
            type="text"
            required
            placeholder="Clinic, hotel, studio, or company"
            value={form.organization}
            onChange={(e) => updateField("organization", e.target.value)}
            aria-invalid={Boolean(fieldErrors.organization)}
            aria-describedby={
              fieldErrors.organization ? "err-part-org" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.organization && (
            <p id="err-part-org" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.organization}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="part-role"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Professional Role <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="part-role"
            type="text"
            required
            placeholder="e.g., Chiropractor, Concierge Director, LMT"
            value={form.professionalRole}
            onChange={(e) => updateField("professionalRole", e.target.value)}
            aria-invalid={Boolean(fieldErrors.professionalRole)}
            aria-describedby={
              fieldErrors.professionalRole ? "err-part-role" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.professionalRole && (
            <p id="err-part-role" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.professionalRole}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="part-type"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Type of Collaboration <span className="text-[#8C3A32]">*</span>
          </label>
          <select
            id="part-type"
            required
            value={form.collaborationType}
            onChange={(e) => updateField("collaborationType", e.target.value)}
            aria-invalid={Boolean(fieldErrors.collaborationType)}
            aria-describedby={
              fieldErrors.collaborationType ? "err-part-type" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          >
            <option value="">Select collaboration category</option>
            {COLLABORATION_CATEGORIES.map((cat) => (
              <option key={cat.title} value={cat.title}>
                {cat.title}
              </option>
            ))}
            <option value="Other Professional Collaboration">
              Other Professional Collaboration
            </option>
          </select>
          {fieldErrors.collaborationType && (
            <p id="err-part-type" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.collaborationType}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="part-email"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Email <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="part-email"
            type="email"
            required
            placeholder="you@domain.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "err-part-email" : undefined}
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.email && (
            <p id="err-part-email" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="part-phone"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Phone{" "}
            <span className="font-normal normal-case text-[#525852]">
              (Optional)
            </span>
          </label>
          <input
            id="part-phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={form.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "err-part-phone" : undefined}
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.phone && (
            <p id="err-part-phone" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="part-location"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Location <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="part-location"
            type="text"
            required
            placeholder="City, neighborhood, or region"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            aria-invalid={Boolean(fieldErrors.location)}
            aria-describedby={
              fieldErrors.location ? "err-part-location" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.location && (
            <p id="err-part-location" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.location}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="part-message"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Message <span className="text-[#8C3A32]">*</span>
          </label>
          <textarea
            id="part-message"
            rows={4}
            required
            placeholder="Share how you envision collaborating—such as guest wellness inquiries, referral communication, or multi-therapist events."
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? "err-part-message" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.message && (
            <p id="err-part-message" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#292D29]/10 pt-5 sm:flex-row sm:items-center">
        <p className="max-w-md text-xs leading-relaxed text-[#525852]">
          Submitted information is handled in accordance with our{" "}
          <Link
            href="/policies/privacy"
            className="underline underline-offset-2 hover:text-[#233C32]"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Explore a Partnership</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
