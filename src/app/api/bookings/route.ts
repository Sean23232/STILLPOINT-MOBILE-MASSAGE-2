import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookingRequests } from "@/db/schema";
import {
  isLastMinuteDate,
  validateBookingPayload,
  type BookingFormPayload,
} from "@/lib/validation";
import { generateReferenceCode } from "@/lib/server-reference";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingFormPayload;

    // Spam honeypot check
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Unable to process submission." },
        { status: 400 }
      );
    }

    const errors = validateBookingPayload(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error: "Please review the highlighted fields before submitting.",
          fieldErrors: errors,
        },
        { status: 422 }
      );
    }

    const referenceCode = generateReferenceCode("REQ");
    const lastMinute = isLastMinuteDate(body.preferredDate);

    await db.insert(bookingRequests).values({
      referenceCode,
      serviceType: body.serviceType,
      preferredDate: body.preferredDate,
      preferredTimeWindow: body.preferredTimeWindow.trim(),
      isLastMinute: lastMinute,
      durationOption: body.durationOption.trim(),
      participantsCount: body.participantsCount
        ? Number(body.participantsCount)
        : null,
      locationPostal: body.locationPostal.trim(),
      addressDetails: body.addressDetails?.trim() || null,
      hotelName: body.hotelName?.trim() || null,
      hotelPolicyAcknowledged: Boolean(body.hotelPolicyAcknowledged),
      additionalRequests: body.additionalRequests?.trim() || null,
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      preferredContactMethod: body.preferredContactMethod,
      additionalNotes: body.additionalNotes?.trim() || null,
      status: "pending_review",
    });

    return NextResponse.json(
      {
        ok: true,
        referenceCode,
        isLastMinute: lastMinute,
        transmissionMode: "prototype_database_recorded",
        message:
          "Your request has been submitted. Your appointment is not confirmed until availability and details have been reviewed by the business.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      {
        error:
          "We could not record your booking request right now. Your entered details have been preserved—please try submitting again.",
      },
      { status: 500 }
    );
  }
}
