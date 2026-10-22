"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import {
  validateContactPayload,
  type ContactMessagePayload,
} from "@/lib/validation";
import { FormStatusMessage } from "./FormStatusMessage";

const INITIAL_CONTACT: ContactMessagePayload = {
  fullName: "",
  email: "",
  phone: "",
  inquiryTopic: "Service Area & Availability Question",
  locationPostal: "",
  preferredContactMethod: "email",
  message: "",
  honeypot: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactMessagePayload>(INITIAL_CONTACT);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  const updateField = <K extends keyof ContactMessagePayload>(
    key: K,
    value: ContactMessagePayload[K]
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

    const errors = validateContactPayload(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Please review the highlighted contact fields below.");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
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
            "Unable to send message right now. Your text is still preserved."
        );
        return;
      }

      setReferenceCode(data.referenceCode || "");
      setStatusMessage(data.message);
      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(
        "A network error prevented submission. Your message has been kept—please retry."
      );
    }
  };

  if (status === "success") {
    return (
      <FormStatusMessage
        status="success"
        title="Message Received"
        message={statusMessage}
        referenceCode={referenceCode}
        onReset={() => {
          setForm(INITIAL_CONTACT);
          setReferenceCode("");
          setStatus("idle");
        }}
        resetLabel="Send another message"
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
          General Contact
        </p>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-[#292D29]">
          Ask a Question Before Requesting an Appointment
        </h2>
        <p className="mt-1.5 text-sm text-[#525852]">
          Ready to request a specific date? Use our{" "}
          <Link
            href="/book"
            className="font-medium text-[#233C32] underline underline-offset-4"
          >
            Booking Request Flow
          </Link>{" "}
          or{" "}
          <Link
            href="/corporate-wellness#corporate-proposal"
            className="font-medium text-[#233C32] underline underline-offset-4"
          >
            Corporate Proposal Form
          </Link>{" "}
          for tailored scheduling fields.
        </p>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-url">Website</label>
        <input
          id="contact-url"
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
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Full Name <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Your name"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={
              fieldErrors.fullName ? "err-contact-name" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.fullName && (
            <p id="err-contact-name" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Email <span className="text-[#8C3A32]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "err-contact-email" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.email && (
            <p id="err-contact-email" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Phone{" "}
            <span className="font-normal normal-case text-[#525852]">
              (Optional)
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={form.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={
              fieldErrors.phone ? "err-contact-phone" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.phone && (
            <p id="err-contact-phone" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-location"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Location or ZIP/Postal{" "}
            <span className="font-normal normal-case text-[#525852]">
              (Optional)
            </span>
          </label>
          <input
            id="contact-location"
            type="text"
            placeholder="Neighborhood, city, or ZIP"
            value={form.locationPostal || ""}
            onChange={(e) => updateField("locationPostal", e.target.value)}
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="contact-topic"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Topic <span className="text-[#8C3A32]">*</span>
          </label>
          <select
            id="contact-topic"
            value={form.inquiryTopic}
            onChange={(e) => updateField("inquiryTopic", e.target.value)}
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          >
            <option value="Service Area & Availability Question">
              Service Area &amp; Availability Question
            </option>
            <option value="In-Home Session Preparation">
              In-Home Session Preparation
            </option>
            <option value="Hotel / Travel Policy Question">
              Hotel / Travel Policy Question
            </option>
            <option value="Recurring Sessions Question">
              Recurring Sessions Question
            </option>
            <option value="General Question">General Question</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-method"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Preferred Contact Method <span className="text-[#8C3A32]">*</span>
          </label>
          <select
            id="contact-method"
            value={form.preferredContactMethod}
            onChange={(e) =>
              updateField(
                "preferredContactMethod",
                e.target.value as ContactMessagePayload["preferredContactMethod"]
              )
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="either">Either Email or Phone</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
          >
            Message <span className="text-[#8C3A32]">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            placeholder="How can Stillpoint help? Share any questions about locations, scheduling, or space preparation."
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? "err-contact-message" : undefined
            }
            className="mt-1.5 w-full rounded-[9px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3.5 py-2.5 text-sm focus:border-[#233C32] focus:bg-white"
          />
          {fieldErrors.message && (
            <p id="err-contact-message" className="mt-1 text-xs text-[#8C3A32]">
              {fieldErrors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#292D29]/10 pt-5 sm:flex-row sm:items-center">
        <p className="max-w-md text-xs leading-relaxed text-[#525852]">
          Protected under our{" "}
          <Link
            href="/policies/privacy"
            className="underline underline-offset-2 hover:text-[#233C32]"
          >
            Privacy Policy
          </Link>
          . Please do not include sensitive medical records in this general
          form.
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#233C32] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#1b2f27] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
