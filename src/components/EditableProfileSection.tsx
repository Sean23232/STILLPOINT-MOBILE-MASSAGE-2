"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, RotateCcw, Check, Loader2, ArrowRight } from "lucide-react";
import type { EditableBusinessProfile } from "@/lib/brand-data";
import { EditorialImage } from "./EditorialImage";

interface EditableProfileSectionProps {
  initialProfile: EditableBusinessProfile;
  showFullEditorByDefault?: boolean;
  isStandalonePage?: boolean;
}

export function EditableProfileSection({
  initialProfile,
  showFullEditorByDefault = false,
  isStandalonePage = false,
}: EditableProfileSectionProps) {
  const router = useRouter();
  const [profile, setProfile] =
    useState<EditableBusinessProfile>(initialProfile);
  const [editing, setEditing] = useState(showFullEditorByDefault);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setSavedNotice("");
    try {
      const res = await fetch("/api/profile-placeholders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok && data.profile) {
        setProfile(data.profile);
        setSavedNotice("Concept profile fields updated in database.");
        setEditing(false);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    setSavedNotice("");
    try {
      const res = await fetch("/api/profile-placeholders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToDefaults: true }),
      });
      const data = await res.json();
      if (res.ok && data.profile) {
        setProfile(data.profile);
        setSavedNotice("Restored default editable placeholders.");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="profile-placeholders"
      aria-labelledby="about-stillpoint-heading"
      className="bg-[#F8F6F0] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait / Therapist-at-work Photograph */}
          <div className="lg:col-span-5">
            <EditorialImage
              src="/images/about-therapist.jpg"
              alt="A poised professional mobile massage practitioner standing beside a prepared wooden massage table with folded warm ivory cotton towels in natural light."
              aspectClassName="aspect-[4/5]"
            />
            <p className="mt-3 text-xs text-[#525852]">
              Editorial concept photography — practitioner portrait &amp;
              credentials below are structured as editable placeholders until
              verified details are supplied.
            </p>
          </div>

          {/* Copy + Editable Profile Fields */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#233C32]">
              ABOUT STILLPOINT
            </p>

            <h2
              id="about-stillpoint-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292D29]"
            >
              A More Personal Approach to Mobile Massage.
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-[#292D29]/85">
              <p>
                Stillpoint was envisioned around a simple idea: professional
                massage should fit more naturally into everyday life. By
                bringing services into homes, workplaces, hotels, and selected
                events, the goal is to make the experience more convenient and
                personal.
              </p>
              <p>
                The service is built around clear communication, thoughtful
                preparation, and arrangements that work for each client and
                setting.
              </p>
            </div>

            {/* Editable Profile Card */}
            <div className="rounded-[12px] border border-[#292D29]/12 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D29]/10 pb-4">
                <div>
                  <span className="inline-block rounded-full bg-[#E9E1D4] px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#292D29]">
                    Editable Practitioner Profile
                  </span>
                  <h3 className="mt-1.5 font-serif text-2xl text-[#292D29]">
                    Practitioner &amp; Service Profile
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setEditing((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#233C32]/25 px-3.5 py-2 text-xs font-medium text-[#233C32] transition hover:bg-[#E6EBE2]/60"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{editing ? "Close Editor" : "Customize Placeholders"}</span>
                </button>
              </div>

              {savedNotice && (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2 rounded-[8px] bg-[#E6EBE2]/75 px-3.5 py-2 text-xs font-medium text-[#233C32]"
                >
                  <Check className="h-3.5 w-3.5" />
                  {savedNotice}
                </p>
              )}

              {!editing ? (
                <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#525852]">
                      Therapist Name
                    </dt>
                    <dd className="mt-1 text-[#292D29]">
                      {profile.therapistName}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#525852]">
                      Service Area
                    </dt>
                    <dd className="mt-1 text-[#292D29]">
                      {profile.serviceArea}
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#525852]">
                      Professional Biography
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[#292D29]/85">
                      {profile.biography}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#525852]">
                      Relevant Credentials
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[#292D29]/85">
                      {profile.credentials}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#525852]">
                      Professional Training
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[#292D29]/85">
                      {profile.training}
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#525852]">
                      Business Philosophy
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[#292D29]/85">
                      {profile.philosophy}
                    </dd>
                  </div>
                </dl>
              ) : (
                <form onSubmit={handleSave} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="edit-therapist-name"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Therapist Name
                      </label>
                      <input
                        id="edit-therapist-name"
                        type="text"
                        value={profile.therapistName}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            therapistName: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-service-area"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Service Area
                      </label>
                      <input
                        id="edit-service-area"
                        type="text"
                        value={profile.serviceArea}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            serviceArea: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="edit-bio"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Professional Biography
                      </label>
                      <textarea
                        id="edit-bio"
                        rows={3}
                        value={profile.biography}
                        onChange={(e) =>
                          setProfile({ ...profile, biography: e.target.value })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-credentials"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Relevant Credentials
                      </label>
                      <textarea
                        id="edit-credentials"
                        rows={2}
                        value={profile.credentials}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            credentials: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-training"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Professional Training
                      </label>
                      <textarea
                        id="edit-training"
                        rows={2}
                        value={profile.training}
                        onChange={(e) =>
                          setProfile({ ...profile, training: e.target.value })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="edit-philosophy"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Business Philosophy
                      </label>
                      <textarea
                        id="edit-philosophy"
                        rows={2}
                        value={profile.philosophy}
                        onChange={(e) =>
                          setProfile({ ...profile, philosophy: e.target.value })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-email"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Contact Email Placeholder
                      </label>
                      <input
                        id="edit-email"
                        type="text"
                        value={profile.contactEmail}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            contactEmail: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-phone"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Contact Phone Placeholder
                      </label>
                      <input
                        id="edit-phone"
                        type="text"
                        value={profile.contactPhone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            contactPhone: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="edit-hours"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#292D29]"
                      >
                        Business Hours Placeholder
                      </label>
                      <input
                        id="edit-hours"
                        type="text"
                        value={profile.businessHours}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            businessHours: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-[8px] border border-[#292D29]/20 bg-[#F8F6F0]/60 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525852] underline underline-offset-4 hover:text-[#292D29]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset to Default Placeholders
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-[9px] bg-[#233C32] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#1b2f27] disabled:opacity-65"
                    >
                      {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      <span>Save Concept Profile</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {!isStandalonePage && (
              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#233C32]/30 bg-white px-5 py-3 text-sm font-medium text-[#233C32] transition hover:bg-[#E6EBE2]/60"
                >
                  <span>Get to Know the Service</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
