import { NextResponse } from "next/server";
import { db } from "@/db";
import { corporateInquiries } from "@/db/schema";
import {
  validateCorporatePayload,
  type CorporateInquiryPayload,
} from "@/lib/validation";
import { generateReferenceCode } from "@/lib/server-reference";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CorporateInquiryPayload;

    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Unable to process submission." },
        { status: 400 }
      );
    }

    const errors = validateCorporatePayload(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error: "Please complete all required corporate inquiry fields.",
          fieldErrors: errors,
        },
        { status: 422 }
      );
    }

    const referenceCode = generateReferenceCode("CORP");

    await db.insert(corporateInquiries).values({
      referenceCode,
      contactName: body.contactName.trim(),
      companyName: body.companyName.trim(),
      workEmail: body.workEmail.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      companyLocation: body.companyLocation.trim(),
      estimatedParticipants: body.estimatedParticipants.trim(),
      preferredDates: body.preferredDates.trim(),
      arrangementType: body.arrangementType,
      preferredSessionFormat: body.preferredSessionFormat.trim(),
      additionalRequirements: body.additionalRequirements?.trim() || null,
      status: "pending_review",
    });

    return NextResponse.json(
      {
        ok: true,
        referenceCode,
        transmissionMode: "prototype_database_recorded",
        message:
          "Your corporate wellness inquiry has been recorded in this Stillpoint prototype database for review. External email dispatch is not yet active; proposals and rates are shared directly once scope and availability are reviewed.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Corporate inquiry submission error:", error);
    return NextResponse.json(
      {
        error:
          "We could not save your corporate inquiry right now. Your details remain intact—please retry in a moment.",
      },
      { status: 500 }
    );
  }
}
