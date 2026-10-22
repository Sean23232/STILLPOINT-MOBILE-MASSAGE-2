import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  bookingRequests,
  corporateInquiries,
  partnershipInquiries,
  contactMessages,
} from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawRef = searchParams.get("ref")?.trim().toUpperCase() || "";

  if (!rawRef || !/^SP-(REQ|CORP|PART|MSG)-[A-Z0-9]{6}$/.test(rawRef)) {
    return NextResponse.json(
      {
        error:
          "Please enter a valid Stillpoint reference code (for example, SP-REQ-8F3K92).",
      },
      { status: 400 }
    );
  }

  try {
    if (rawRef.startsWith("SP-REQ-")) {
      const rows = await db
        .select({
          referenceCode: bookingRequests.referenceCode,
          serviceType: bookingRequests.serviceType,
          preferredDate: bookingRequests.preferredDate,
          preferredTimeWindow: bookingRequests.preferredTimeWindow,
          isLastMinute: bookingRequests.isLastMinute,
          status: bookingRequests.status,
          createdAt: bookingRequests.createdAt,
        })
        .from(bookingRequests)
        .where(eq(bookingRequests.referenceCode, rawRef))
        .limit(1);

      if (rows.length > 0) {
        return NextResponse.json({
          found: true,
          workflow: "Booking Request",
          record: rows[0],
          note: "This inquiry is recorded as pending business review. Submitting a request does not confirm an appointment.",
        });
      }
    } else if (rawRef.startsWith("SP-CORP-")) {
      const rows = await db
        .select({
          referenceCode: corporateInquiries.referenceCode,
          arrangementType: corporateInquiries.arrangementType,
          preferredDates: corporateInquiries.preferredDates,
          status: corporateInquiries.status,
          createdAt: corporateInquiries.createdAt,
        })
        .from(corporateInquiries)
        .where(eq(corporateInquiries.referenceCode, rawRef))
        .limit(1);

      if (rows.length > 0) {
        return NextResponse.json({
          found: true,
          workflow: "Corporate Wellness Inquiry",
          record: rows[0],
          note: "Recorded in prototype database for proposal and schedule review.",
        });
      }
    } else if (rawRef.startsWith("SP-PART-")) {
      const rows = await db
        .select({
          referenceCode: partnershipInquiries.referenceCode,
          collaborationType: partnershipInquiries.collaborationType,
          status: partnershipInquiries.status,
          createdAt: partnershipInquiries.createdAt,
        })
        .from(partnershipInquiries)
        .where(eq(partnershipInquiries.referenceCode, rawRef))
        .limit(1);

      if (rows.length > 0) {
        return NextResponse.json({
          found: true,
          workflow: "Partnership Inquiry",
          record: rows[0],
          note: "Recorded in prototype database pending collaboration review.",
        });
      }
    } else if (rawRef.startsWith("SP-MSG-")) {
      const rows = await db
        .select({
          referenceCode: contactMessages.referenceCode,
          inquiryTopic: contactMessages.inquiryTopic,
          status: contactMessages.status,
          createdAt: contactMessages.createdAt,
        })
        .from(contactMessages)
        .where(eq(contactMessages.referenceCode, rawRef))
        .limit(1);

      if (rows.length > 0) {
        return NextResponse.json({
          found: true,
          workflow: "General Contact Message",
          record: rows[0],
          note: "Message received in prototype database.",
        });
      }
    }

    return NextResponse.json(
      {
        found: false,
        error: "No inquiry was found matching that reference code.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Lookup error:", error);
    return NextResponse.json(
      { error: "Unable to look up reference code at this moment." },
      { status: 500 }
    );
  }
}
