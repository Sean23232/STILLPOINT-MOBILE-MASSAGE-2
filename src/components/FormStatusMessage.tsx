"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Copy, Check } from "lucide-react";

interface FormStatusMessageProps {
  status: "idle" | "submitting" | "success" | "error";
  title?: string;
  message?: string;
  referenceCode?: string;
  isLastMinute?: boolean;
  onReset?: () => void;
  resetLabel?: string;
}

export function FormStatusMessage({
  status,
  title,
  message,
  referenceCode,
  isLastMinute,
  onReset,
  resetLabel = "Submit another inquiry",
}: FormStatusMessageProps) {
  const [copied, setCopied] = useState(false);

  if (status === "idle" || status === "submitting") {
    return null;
  }

  const handleCopy = async () => {
    if (!referenceCode) return;
    try {
      await navigator.clipboard.writeText(referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API optional fallback
    }
  };

  if (status === "error") {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="rounded-[10px] border border-[#8C3A32]/30 bg-[#FDF6F5] p-5 text-[#292D29]"
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-[#8C3A32]"
            aria-hidden="true"
          />
          <div>
            <p className="font-medium text-[#6E2922]">
              {title || "Unable to complete submission"}
            </p>
            <p className="mt-1 text-sm text-[#292D29]/85">
              {message ||
                "Please review the highlighted fields and try again. Your entered details have been preserved."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-[12px] border border-[#233C32]/20 bg-[#F8F6F0] p-6 sm:p-8 text-[#292D29]"
    >
      <div className="flex items-start gap-3.5">
        <CheckCircle2
          className="mt-1 h-6 w-6 shrink-0 text-[#233C32]"
          aria-hidden="true"
        />
        <div className="w-full space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#233C32]">
              Request Recorded — Pending Review
            </p>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#292D29]">
              {title || "Thank you for your inquiry."}
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#292D29]/90">
              {message}
            </p>
          </div>

          {isLastMinute && (
            <div className="rounded-[8px] border border-[#233C32]/15 bg-[#E9E1D4]/60 px-4 py-3 text-xs sm:text-sm text-[#292D29]">
              <strong>Short-Notice Request Note:</strong> Because your requested
              date is within the next 72 hours, availability is reviewed on an
              on-demand basis and is never guaranteed until directly confirmed.
            </div>
          )}

          {referenceCode && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[#292D29]/12 bg-white px-4 py-3.5">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#525852]">
                  Inquiry Reference Number
                </span>
                <span className="font-mono text-base font-semibold tracking-wider text-[#233C32]">
                  {referenceCode}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#292D29]/15 px-3 py-1.5 text-xs font-medium text-[#292D29] transition hover:bg-[#F8F6F0]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#233C32]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Reference
                    </>
                  )}
                </button>
                <Link
                  href={`/contact?ref=${encodeURIComponent(referenceCode)}#lookup`}
                  className="text-xs font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
                >
                  Verify Status
                </Link>
              </div>
            </div>
          )}

          <div className="rounded-[8px] bg-[#E6EBE2]/65 px-4 py-3 text-xs leading-relaxed text-[#292D29]/85">
            <strong>Prototype Transparency Notice:</strong> Your inquiry has
            been genuinely saved to this website&apos;s PostgreSQL database
            under the reference number above. Live email notifications and
            external calendar synchronization are not yet connected in this
            concept build.
          </div>

          {onReset && (
            <div className="pt-1">
              <button
                type="button"
                onClick={onReset}
                className="text-sm font-medium text-[#233C32] underline underline-offset-4 hover:text-[#1b2f27]"
              >
                {resetLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
