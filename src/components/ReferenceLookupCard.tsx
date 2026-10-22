"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";

interface ReferenceLookupCardProps {
  initialRef?: string;
}

interface LookupResult {
  workflow: string;
  note: string;
  record: {
    referenceCode: string;
    status: string;
    createdAt: string;
    serviceType?: string;
    preferredDate?: string;
    preferredTimeWindow?: string;
    arrangementType?: string;
    collaborationType?: string;
    inquiryTopic?: string;
  };
}

export function ReferenceLookupCard({
  initialRef = "",
}: ReferenceLookupCardProps) {
  const [refInput, setRefInput] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);

  const runLookup = async (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) {
      setError("Please enter a reference number such as SP-REQ-XXXXXX.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `/api/lookup?ref=${encodeURIComponent(cleaned)}`
      );
      const data = await res.json();
      if (!res.ok || !data.found) {
        setError(data.error || "No inquiry found for that reference code.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not verify reference code right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef.trim()) {
      setRefInput(initialRef.trim().toUpperCase());
      void runLookup(initialRef);
    }
  }, [initialRef]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void runLookup(refInput);
  };

  return (
    <div
      id="lookup"
      className="rounded-[12px] border border-[#292D29]/12 bg-[#E6EBE2]/50 p-6 sm:p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#233C32]">
        Inquiry Verification
      </p>
      <h3 className="mt-1 font-serif text-2xl font-normal text-[#292D29]">
        Check a Submitted Request Reference
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#525852]">
        Enter a reference code generated during this prototype session (e.g.,{" "}
        <code className="font-mono text-[#233C32]">SP-REQ-...</code>) to verify
        its recorded status in the database.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="ref-lookup-input" className="sr-only">
          Reference Code
        </label>
        <input
          id="ref-lookup-input"
          type="text"
          placeholder="SP-REQ-XXXXXX"
          value={refInput}
          onChange={(e) => setRefInput(e.target.value.toUpperCase())}
          className="flex-1 rounded-[9px] border border-[#292D29]/20 bg-white px-3.5 py-2.5 font-mono text-sm uppercase tracking-wider text-[#292D29] focus:border-[#233C32]"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#233C32] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1b2f27] disabled:opacity-65"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
          <span>Check Status</span>
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-xs font-medium text-[#8C3A32]">
          {error}
        </p>
      )}

      {result && (
        <div
          role="status"
          className="mt-4 rounded-[10px] border border-[#233C32]/20 bg-white p-4 text-xs sm:text-sm text-[#292D29]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292D29]/10 pb-2.5">
            <span className="font-mono font-semibold text-[#233C32]">
              {result.record.referenceCode}
            </span>
            <span className="rounded-full bg-[#E9E1D4] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#292D29]">
              {result.record.status.replace("_", " ")}
            </span>
          </div>
          <p className="mt-2.5 font-medium text-[#292D29]">{result.workflow}</p>
          {result.record.preferredDate && (
            <p className="mt-1 text-xs text-[#525852]">
              Requested Date: {result.record.preferredDate} (
              {result.record.preferredTimeWindow})
            </p>
          )}
          <p className="mt-2 text-xs text-[#525852]">{result.note}</p>
        </div>
      )}
    </div>
  );
}
