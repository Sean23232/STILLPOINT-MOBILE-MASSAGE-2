import type { ServiceSlug } from "./brand-data";

export interface BookingFormPayload {
  serviceType: ServiceSlug;
  preferredDate: string;
  preferredTimeWindow: string;
  durationOption: string;
  participantsCount?: number | null;
  locationPostal: string;
  addressDetails?: string;
  hotelName?: string;
  hotelPolicyAcknowledged?: boolean;
  additionalRequests?: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: "email" | "phone" | "either";
  additionalNotes?: string;
  honeypot?: string;
}

export interface CorporateInquiryPayload {
  contactName: string;
  companyName: string;
  workEmail: string;
  phone?: string;
  companyLocation: string;
  estimatedParticipants: string;
  preferredDates: string;
  arrangementType: "one-time" | "recurring" | "exploring-both";
  preferredSessionFormat: string;
  additionalRequirements?: string;
  honeypot?: string;
}

export interface PartnershipInquiryPayload {
  name: string;
  organization: string;
  professionalRole: string;
  email: string;
  phone?: string;
  collaborationType: string;
  location: string;
  message: string;
  honeypot?: string;
}

export interface ContactMessagePayload {
  fullName: string;
  email: string;
  phone?: string;
  inquiryTopic: string;
  locationPostal?: string;
  preferredContactMethod: "email" | "phone" | "either";
  message: string;
  honeypot?: string;
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

/**
 * Accommodates North American and international telephone formats:
 * Requires 7 to 15 digits total and only standard phone punctuation.
 */
export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed || trimmed.length > 26) return false;
  if (!/^[+\d()\s.-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Checks that a YYYY-MM-DD date string is strictly in the future (or later today
 * when flagged as a same-day/last-minute inquiry; per specification, date must be
 * today or future, or strictly future—let's enforce strictly >= tomorrow OR allow
 * tomorrow+ as standard and note within 72 hours as last-minute! Wait: prompt says
 * "Date must be in the future." AND "Last-minute requests must be identified as
 * availability-dependent." Enforcing date > today (tomorrow onward) satisfies
 * "Date must be in the future", while dates 1–2 days out are flagged as Last-Minute!).
 */
export function getLocalTomorrowISO(): string {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function isFutureDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split("-").map(Number);
  const candidate = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(candidate.getTime())) return false;

  const now = new Date();
  // Compare against local/UTC start of today so tomorrow+ is always valid across timezones
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  return candidate.getTime() > todayUTC.getTime();
}

export function isLastMinuteDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split("-").map(Number);
  const candidate = new Date(Date.UTC(y, m - 1, d));
  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const diffDays =
    (candidate.getTime() - todayUTC.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 1 && diffDays <= 3;
}

export function validateBookingPayload(
  payload: BookingFormPayload
): Record<string, string> {
  const errors: Record<string, string> = {};

  const validServices: ServiceSlug[] = [
    "in-home",
    "corporate",
    "hotel",
    "events",
    "other",
  ];
  if (!validServices.includes(payload.serviceType)) {
    errors.serviceType = "Please select a service category.";
  }

  if (!payload.preferredDate) {
    errors.preferredDate = "Please choose a preferred future date.";
  } else if (!isFutureDate(payload.preferredDate)) {
    errors.preferredDate = "Preferred date must be in the future.";
  }

  if (!payload.preferredTimeWindow?.trim()) {
    errors.preferredTimeWindow = "Please select a preferred time window.";
  }

  if (!payload.durationOption?.trim()) {
    errors.durationOption = "Please select a session arrangement preference.";
  }

  if (!payload.locationPostal?.trim() || payload.locationPostal.trim().length < 2) {
    errors.locationPostal =
      "Please enter your neighborhood, city, or ZIP/postal code.";
  }

  if (payload.serviceType === "hotel") {
    if (!payload.hotelName?.trim()) {
      errors.hotelName =
        "Please provide the hotel or accommodation name for location review.";
    }
    if (!payload.hotelPolicyAcknowledged) {
      errors.hotelPolicyAcknowledged =
        "Please acknowledge that hotel sessions depend on property visitor policies.";
    }
  }

  if (
    (payload.serviceType === "corporate" || payload.serviceType === "events") &&
    (!payload.participantsCount || payload.participantsCount < 1)
  ) {
    errors.participantsCount =
      "Please provide an estimated number of participants.";
  }

  if (!payload.fullName?.trim() || payload.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!isValidEmail(payload.email || "")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isValidPhone(payload.phone || "")) {
    errors.phone =
      "Please enter a valid phone number (7–15 digits, country code optional).";
  }

  if (
    !["email", "phone", "either"].includes(payload.preferredContactMethod || "")
  ) {
    errors.preferredContactMethod = "Please choose a preferred contact method.";
  }

  return errors;
}

export function validateCorporatePayload(
  payload: CorporateInquiryPayload
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!payload.contactName?.trim() || payload.contactName.trim().length < 2) {
    errors.contactName = "Please provide a contact name.";
  }
  if (!payload.companyName?.trim() || payload.companyName.trim().length < 2) {
    errors.companyName = "Please provide your company or organization name.";
  }
  if (!isValidEmail(payload.workEmail || "")) {
    errors.workEmail = "Please provide a valid work email address.";
  }
  if (payload.phone?.trim() && !isValidPhone(payload.phone)) {
    errors.phone = "Please provide a valid phone number or leave optional field blank.";
  }
  if (!payload.companyLocation?.trim()) {
    errors.companyLocation = "Please share the office or event location.";
  }
  if (!payload.estimatedParticipants?.trim()) {
    errors.estimatedParticipants =
      "Please indicate the estimated number of participants.";
  }
  if (!payload.preferredDates?.trim()) {
    errors.preferredDates = "Please enter a preferred date or date range.";
  }
  if (
    !["one-time", "recurring", "exploring-both"].includes(
      payload.arrangementType
    )
  ) {
    errors.arrangementType = "Please select one-time or recurring arrangement.";
  }
  if (!payload.preferredSessionFormat?.trim()) {
    errors.preferredSessionFormat = "Please select a preferred session format.";
  }
  return errors;
}

export function validatePartnershipPayload(
  payload: PartnershipInquiryPayload
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!payload.name?.trim() || payload.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!payload.organization?.trim()) {
    errors.organization = "Please enter your practice, hotel, or organization.";
  }
  if (!payload.professionalRole?.trim()) {
    errors.professionalRole = "Please share your professional role.";
  }
  if (!isValidEmail(payload.email || "")) {
    errors.email = "Please enter a valid email address.";
  }
  if (payload.phone?.trim() && !isValidPhone(payload.phone)) {
    errors.phone = "Please enter a valid phone number or leave blank.";
  }
  if (!payload.collaborationType?.trim()) {
    errors.collaborationType = "Please choose a collaboration category.";
  }
  if (!payload.location?.trim()) {
    errors.location = "Please provide your city or location.";
  }
  if (!payload.message?.trim() || payload.message.trim().length < 10) {
    errors.message =
      "Please share a brief note (at least 10 characters) about your collaboration idea.";
  }
  return errors;
}

export function validateContactPayload(
  payload: ContactMessagePayload
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!payload.fullName?.trim() || payload.fullName.trim().length < 2) {
    errors.fullName = "Please enter your name.";
  }
  if (!isValidEmail(payload.email || "")) {
    errors.email = "Please enter a valid email address.";
  }
  if (payload.phone?.trim() && !isValidPhone(payload.phone)) {
    errors.phone = "Please enter a valid phone number or leave blank.";
  }
  if (!payload.inquiryTopic?.trim()) {
    errors.inquiryTopic = "Please select an inquiry topic.";
  }
  if (
    !["email", "phone", "either"].includes(payload.preferredContactMethod || "")
  ) {
    errors.preferredContactMethod = "Please choose a preferred contact method.";
  }
  if (!payload.message?.trim() || payload.message.trim().length < 10) {
    errors.message = "Please enter a message of at least 10 characters.";
  }
  return errors;
}
