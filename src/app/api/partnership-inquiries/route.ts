import { NextResponse } from "next/server";
import { db } from "@/db";
import { partnershipInquiries } from "@/db/schema";
import {
  validatePartnershipPayload,
  type PartnershipInquiryPayload,
} from "@/lib/validation";
import { generateReferenceCode } from "@/lib/server-reference";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PartnershipInquiryPayload;

    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Unable to process submission." },
        { status: 400 }
      );
    }

    const errors = validatePartnershipPayload(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error: "Please check the required partnership inquiry fields.",
          fieldErrors: errors,
        },
        { status: 422 }
      );
    }

    const referenceCode = generateReferenceCode("PART");

    await db.insert(partnershipInquiries).values({
      referenceCode,
      name: body.name.trim(),
      organization: body.organization.trim(),
      professionalRole: body.professionalRole.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      collaborationType: body.collaborationType.trim(),
      location: body.location.trim(),
      message: body.message.trim(),
      status: "pending_review",
    });

    return NextResponse.json(
      {
        ok: true,
        referenceCode,
        transmissionMode: "prototype_database_recorded",
        message:
          "Thank you for reaching out. Your collaboration inquiry has been recorded in this prototype database pending business review.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Partnership inquiry submission error:", error);
    return NextResponse.json(
      {
        error:
          "We encountered an issue saving your partnership inquiry. Please try submitting again.",
      },
      { status: 500 }
    );
  }
}
