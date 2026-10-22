import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const bookingRequests = pgTable("booking_requests", {
  id: serial("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  serviceType: text("service_type").notNull(), // in-home | corporate | hotel | events | other
  preferredDate: text("preferred_date").notNull(),
  preferredTimeWindow: text("preferred_time_window").notNull(),
  isLastMinute: boolean("is_last_minute").notNull().default(false),
  durationOption: text("duration_option").notNull(),
  participantsCount: integer("participants_count"),
  locationPostal: text("location_postal").notNull(),
  addressDetails: text("address_details"),
  hotelName: text("hotel_name"),
  hotelPolicyAcknowledged: boolean("hotel_policy_acknowledged")
    .notNull()
    .default(false),
  additionalRequests: text("additional_requests"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  additionalNotes: text("additional_notes"),
  status: text("status").notNull().default("pending_review"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const corporateInquiries = pgTable("corporate_inquiries", {
  id: serial("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  contactName: text("contact_name").notNull(),
  companyName: text("company_name").notNull(),
  workEmail: text("work_email").notNull(),
  phone: text("phone"),
  companyLocation: text("company_location").notNull(),
  estimatedParticipants: text("estimated_participants").notNull(),
  preferredDates: text("preferred_dates").notNull(),
  arrangementType: text("arrangement_type").notNull(), // one-time | recurring | flexible
  preferredSessionFormat: text("preferred_session_format").notNull(),
  additionalRequirements: text("additional_requirements"),
  status: text("status").notNull().default("pending_review"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const partnershipInquiries = pgTable("partnership_inquiries", {
  id: serial("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  name: text("name").notNull(),
  organization: text("organization").notNull(),
  professionalRole: text("professional_role").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  collaborationType: text("collaboration_type").notNull(),
  location: text("location").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending_review"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryTopic: text("inquiry_topic").notNull(),
  locationPostal: text("location_postal"),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("received"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const businessProfilePlaceholders = pgTable(
  "business_profile_placeholders",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(), // 'default'
    therapistName: text("therapist_name").notNull(),
    biography: text("biography").notNull(),
    credentials: text("credentials").notNull(),
    training: text("training").notNull(),
    serviceArea: text("service_area").notNull(),
    philosophy: text("philosophy").notNull(),
    contactEmail: text("contact_email").notNull(),
    contactPhone: text("contact_phone").notNull(),
    businessHours: text("business_hours").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export const verifiedTestimonials = pgTable("verified_testimonials", {
  id: serial("id").primaryKey(),
  clientIdentifier: text("client_identifier").notNull(),
  contextLabel: text("context_label").notNull(),
  quote: text("quote").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
