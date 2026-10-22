export type ServiceSlug =
  | "in-home"
  | "corporate"
  | "hotel"
  | "events"
  | "other";

export interface ServiceOffering {
  number: string;
  slug: Exclude<ServiceSlug, "other">;
  route: string;
  bookingServiceValue: ServiceSlug;
  title: string;
  headline: string;
  shortDescription: string;
  longDescription: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface EditableBusinessProfile {
  therapistName: string;
  biography: string;
  credentials: string;
  training: string;
  serviceArea: string;
  philosophy: string;
  contactEmail: string;
  contactPhone: string;
  businessHours: string;
}

export const BRAND_IDENTITY = {
  name: "Stillpoint Mobile Massage",
  shortMark: "STILLPOINT",
  supportingLabel: "MOBILE MASSAGE",
  primaryTagline: "Your Space. Your Time. Your Moment of Calm.",
  alternativeHeadline: "Professional Massage, Wherever You Need It.",
} as const;

export const DEFAULT_BUSINESS_PLACEHOLDERS: EditableBusinessProfile = {
  therapistName: "[Editable Placeholder — Practitioner Name / Sylvia]",
  biography:
    "[Editable Placeholder — Practitioner biography to be added once confirmed. Share your background, what inspired Stillpoint Mobile Massage, and your approach to attentive client care.]",
  credentials:
    "[Editable Placeholder — Active state/provincial massage therapy license number and professional standing to be inserted upon verification.]",
  training:
    "[Editable Placeholder — Accredited massage therapy education, continuing coursework, and preferred session styles to be confirmed.]",
  serviceArea:
    "[Editable Placeholder — Primary city, surrounding neighborhoods, and travel radius to be confirmed.]",
  philosophy:
    "Professional massage should fit naturally into everyday life—delivered with calm preparation, clear communication, and respect for each client's space and schedule.",
  contactEmail: "[Editable Placeholder — Direct inquiry email pending setup]",
  contactPhone: "[Editable Placeholder — Business telephone pending setup]",
  businessHours:
    "[Editable Placeholder — Appointment request windows & operating hours to be confirmed]",
};

export const SERVICES_OVERVIEW: ServiceOffering[] = [
  {
    number: "01",
    slug: "in-home",
    route: "/services/in-home-massage",
    bookingServiceValue: "in-home",
    title: "In-Home Massage",
    headline: "Relax Without Leaving Home.",
    shortDescription:
      "Enjoy a convenient massage experience in the comfort of your own space. Appointments are arranged around your needs, preferred time, location, and available service options.",
    longDescription:
      "Skip the commute and transition straight from your session into rest. In-home appointments bring calm preparation, thoughtful communication, and personalized scheduling directly to your residence.",
    ctaLabel: "Request an In-Home Session",
    imageSrc: "/images/service-in-home.jpg",
    imageAlt:
      "A serene contemporary living space prepared with a wooden mobile massage table and neutral organic linens in natural daylight.",
    highlights: [
      "Private residential appointments arranged around your schedule",
      "No commute before or after your session",
      "Session preferences discussed prior to appointment confirmation",
    ],
  },
  {
    number: "02",
    slug: "corporate",
    route: "/corporate-wellness",
    bookingServiceValue: "corporate",
    title: "Corporate Massage",
    headline: "A More Thoughtful Workplace.",
    shortDescription:
      "Bring massage sessions to offices, employee appreciation days, wellness initiatives, and company events. Explore flexible arrangements for teams and organizations.",
    longDescription:
      "Support workplace focus and appreciation with well-organized on-site massage sessions tailored to your office layout, team size, and workday rhythm.",
    ctaLabel: "Explore Corporate Wellness",
    imageSrc: "/images/service-corporate.jpg",
    imageAlt:
      "A discreet modern office wellness lounge featuring an ergonomic seated massage setup in warm natural light.",
    highlights: [
      "Employee appreciation days and workplace wellness initiatives",
      "One-time activations or recurring organizational schedules",
      "Coordinated planning around conference rooms or quiet lounges",
    ],
  },
  {
    number: "03",
    slug: "hotel",
    route: "/services/hotel-massage",
    bookingServiceValue: "hotel",
    title: "Hotel & Travel Massage",
    headline: "Comfort, Wherever You Stay.",
    shortDescription:
      "Arrange a massage session at your hotel or accommodation, subject to location, property policies, and appointment availability.",
    longDescription:
      "After long flights, conferences, or full travel itineraries, inquire about an in-room massage session coordinated respectfully around your stay and your property's visitor guidelines.",
    ctaLabel: "Request a Hotel Session",
    imageSrc: "/images/service-hotel.jpg",
    imageAlt:
      "An upscale boutique hotel suite sitting area with a neatly prepared portable massage table near sheer curtains.",
    highlights: [
      "Ideal for business travelers, conference guests, and visitors",
      "Subject to service area, scheduling, and property policies",
      "Clear communication prior to arrival and setup",
    ],
  },
  {
    number: "04",
    slug: "events",
    route: "/services/events-pop-ups",
    bookingServiceValue: "events",
    title: "Pop-Ups & Events",
    headline: "Wellness That Brings People Together.",
    shortDescription:
      "Add massage experiences to selected gatherings, private events, pop-ups, and workplace activations. Tell us about your event to explore a suitable arrangement.",
    longDescription:
      "Create an inviting pause within conferences, hospitality activations, private retreats, or community gatherings with custom-planned pop-up massage experiences.",
    ctaLabel: "Plan an Event",
    imageSrc: "/images/service-events.jpg",
    imageAlt:
      "A sunlit architectural loft arranged with neutral linen screens and seated massage stations for a boutique pop-up event.",
    highlights: [
      "Tailored to venue footprint, guest count, and event flow",
      "Suitable for private gatherings, retreats, and brand pop-ups",
      "Advance logistics review before confirming scope",
    ],
  },
];

export const STILLPOINT_DIFFERENCE = [
  {
    title: "Convenience",
    description:
      "Appointments can be requested for home, workplace, hotel, and event settings.",
    iconName: "compass",
  },
  {
    title: "Personalized Experience",
    description:
      "Share your preferences and goals so the requested session can be discussed before confirmation.",
    iconName: "sliders",
  },
  {
    title: "Flexible Service Options",
    description:
      "Explore individual appointments, group sessions, and organizational arrangements.",
    iconName: "layers",
  },
  {
    title: "Professional Communication",
    description:
      "Receive clear information about availability, service scope, pricing, and appointment details.",
    iconName: "message",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Choose Your Service",
    description: "Select in-home, corporate, hotel, or event massage.",
  },
  {
    step: "02",
    title: "Share Your Details",
    description:
      "Tell us your preferred date, location, service requirements, and any relevant scheduling preferences.",
  },
  {
    step: "03",
    title: "Confirm the Arrangement",
    description:
      "Submit your request. The business reviews availability, travel requirements, and service details before confirming the appointment.",
  },
  {
    step: "04",
    title: "Enjoy Your Session",
    description:
      "Once the details are confirmed, prepare your space or agreed location for the scheduled appointment.",
  },
] as const;

export const COLLABORATION_CATEGORIES = [
  {
    title: "Chiropractors",
    note: "Explore coordinated soft-tissue care inquiries and professional referral communication.",
  },
  {
    title: "Physicians and Medical Practices",
    note: "Discuss general wellness support inquiries for clients seeking non-clinical relaxation.",
  },
  {
    title: "Licensed Massage and Wellness Professionals",
    note: "Connect regarding multi-practitioner corporate days, events, and peer collaboration.",
  },
  {
    title: "Hotels and Hospitality Teams",
    note: "Explore guest wellness request workflows aligned with property standards and policies.",
  },
  {
    title: "Corporate Wellness Coordinators",
    note: "Plan recurring employee wellness calendars, appreciation days, and workplace pop-ups.",
  },
  {
    title: "Event Organizers",
    note: "Integrate calm, thoughtfully staged massage lounges into retreats, summits, and gatherings.",
  },
] as const;

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    id: "appointment-types",
    question: "What types of massage appointments can I request?",
    answer:
      "You can inquire about in-home, workplace, hotel, and selected event massage services. The available options depend on your location and the details of your request.",
  },
  {
    id: "last-minute",
    question: "Do you offer last-minute appointments?",
    answer:
      "You can submit a last-minute request, and availability can be reviewed. A request is not a confirmed appointment until the business confirms it.",
  },
  {
    id: "travel-area",
    question: "Do you travel to my location?",
    answer:
      "Share your address or ZIP/postal code when requesting an appointment so the service area and any travel requirements can be reviewed.",
  },
  {
    id: "corporate-employees",
    question: "Can I arrange massage sessions for my employees?",
    answer:
      "Yes, you can submit a corporate wellness inquiry with your team size, preferred dates, location, and event requirements.",
  },
  {
    id: "hotel-services",
    question: "Can you provide massage services at hotels?",
    answer:
      "Hotel appointments may be requested, subject to location, availability, and the property's policies.",
  },
  {
    id: "session-cost",
    question: "How much does a session cost?",
    answer:
      "Pricing depends on the service, duration, location, and appointment requirements. Submit an inquiry to receive information about the applicable options.",
  },
  {
    id: "confirmation-process",
    question: "How do I know my appointment is confirmed?",
    answer:
      "Submitting a booking request does not guarantee a reservation. Wait for direct confirmation of the agreed service, time, location, and pricing.",
  },
  {
    id: "recurring-arrangement",
    question: "Can I request a recurring arrangement?",
    answer:
      "You can inquire about recurring individual or corporate arrangements. The business will review the requirements and available options.",
  },
  {
    id: "preparation",
    question: "What should I prepare before the appointment?",
    answer:
      "Any preparation requirements will be communicated when your appointment details are confirmed.",
  },
];

export const APPROVED_DURATION_OPTIONS = [
  {
    value: "discuss-on-review",
    label: "Discuss available session lengths during review (Recommended)",
  },
  {
    value: "individual-standard-inquiry",
    label: "Individual appointment — share available duration & pricing options",
  },
  {
    value: "back-to-back-household",
    label: "Back-to-back sessions (2+ individuals at one location)",
  },
  {
    value: "group-or-event-block",
    label: "Corporate or event block — custom schedule to be proposed",
  },
] as const;

export const PREFERRED_TIME_WINDOWS = [
  { value: "morning", label: "Morning (8:00 AM – 12:00 PM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM – 4:00 PM)" },
  { value: "evening", label: "Evening (4:00 PM – 8:00 PM)" },
  { value: "flexible", label: "Flexible — open to available windows" },
] as const;

export const EDITORIAL_BRAND_COMMITMENTS = [
  {
    label: "01 / RESPECT FOR YOUR SPACE",
    title: "Calm Arrival & Thoughtful Preparation",
    body: "Every mobile appointment is approached with discretion, punctuality, and respect for the rhythm of your home, office, or accommodation.",
  },
  {
    label: "02 / TRANSPARENT ARRANGEMENTS",
    title: "Clear Scope Before Confirmation",
    body: "Service options, travel logistics, space needs, and pricing are always communicated and agreed upon directly before an appointment is finalized.",
  },
  {
    label: "03 / TAILORED TO THE SETTING",
    title: "Personal & Organizational Care",
    body: "Whether supporting one individual seeking quiet rest or an entire team during a wellness day, arrangements adapt to the people and setting involved.",
  },
] as const;
