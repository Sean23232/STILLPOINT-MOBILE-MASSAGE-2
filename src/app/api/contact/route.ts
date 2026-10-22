import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import {
  validateContactPayload,
  type ContactMessagePayload,
} from "@/lib/validation";
import { generateReferenceCode } from "@/lib/server-reference";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactMessagePayload;

    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Unable to process submission." },
        { status: 400 }
      );
    }

    const errors = validateContactPayload(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error: "Please review the highlighted contact form fields.",
          fieldErrors: errors,
        },
        { status: 422 }
      );
    }

    const referenceCode = generateReferenceCode("MSG");

    await db.insert(contactMessages).values({
      referenceCode,
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      inquiryTopic: body.inquiryTopic.trim(),
      locationPostal: body.locationPostal?.trim() || null,
      preferredContactMethod: body.preferredContactMethod,
      message: body.message.trim(),
      status: "received",
    });

    return NextResponse.json(
      {
        ok: true,
        referenceCode,
        transmissionMode: "prototype_database_recorded",
        message:
          "Your message has been saved in this Stillpoint concept prototype database. Once live email notifications are connected, messages will also route directly to the business inbox.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      {
        error:
          "We could not save your message right now. Your text is still in the form—please retry shortly.",
      },
      { status: 500 }
    );
  }
}
