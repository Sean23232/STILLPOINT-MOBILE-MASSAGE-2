import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy notice for Stillpoint Mobile Massage booking requests, corporate wellness proposals, and general inquiries.",
  alternates: { canonical: "/policies/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-[#F8F6F0] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-8">
        <div className="border-b border-[#292D29]/12 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#233C32]">
            POLICY PLACEHOLDER • PRIVACY
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-normal text-[#292D29]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-[#525852]">
            Concept template — final legal terms and business contact details to
            be confirmed prior to commercial launch.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#292D29]/85">
          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              1. Information You Provide
            </h2>
            <p className="mt-2">
              When you submit a booking request, corporate wellness inquiry,
              partnership inquiry, or contact message, we collect only the
              information you voluntarily enter—such as your name, email,
              telephone number, general location or ZIP/postal code, and
              scheduling preferences.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              2. How Information Is Used
            </h2>
            <p className="mt-2">
              Submitted details are used strictly to review service area
              feasibility, discuss appointment availability, prepare corporate
              or event proposals, and communicate directly regarding your
              request. Please do not submit confidential medical records through
              general website inquiry forms.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              3. Concept Prototype Storage Notice
            </h2>
            <p className="mt-2">
              In this website prototype, submitted inquiries are recorded in the
              application database with a reference code for demonstration and
              review purposes. Third-party marketing trackers, ad networks, and
              automated outbound email services are not enabled by default.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#292D29]">
              4. Contact for Privacy Questions
            </h2>
            <p className="mt-2">
              [Editable Placeholder — Official business privacy contact email
              and mailing details to be inserted once finalized.] You may also
              reach out through our{" "}
              <Link
                href="/contact"
                className="font-medium text-[#233C32] underline underline-offset-4"
              >
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
