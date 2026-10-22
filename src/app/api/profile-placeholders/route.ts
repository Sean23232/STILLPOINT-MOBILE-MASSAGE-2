import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { businessProfilePlaceholders } from "@/db/schema";
import {
  DEFAULT_BUSINESS_PLACEHOLDERS,
  type EditableBusinessProfile,
} from "@/lib/brand-data";
import { getEditableBusinessProfile } from "@/lib/server-reference";

export async function GET() {
  const profile = await getEditableBusinessProfile();
  return NextResponse.json({ ok: true, profile });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<EditableBusinessProfile> & {
      resetToDefaults?: boolean;
    };

    const nextProfile: EditableBusinessProfile = body.resetToDefaults
      ? DEFAULT_BUSINESS_PLACEHOLDERS
      : {
          therapistName:
            body.therapistName?.trim() ||
            DEFAULT_BUSINESS_PLACEHOLDERS.therapistName,
          biography:
            body.biography?.trim() || DEFAULT_BUSINESS_PLACEHOLDERS.biography,
          credentials:
            body.credentials?.trim() ||
            DEFAULT_BUSINESS_PLACEHOLDERS.credentials,
          training:
            body.training?.trim() || DEFAULT_BUSINESS_PLACEHOLDERS.training,
          serviceArea:
            body.serviceArea?.trim() ||
            DEFAULT_BUSINESS_PLACEHOLDERS.serviceArea,
          philosophy:
            body.philosophy?.trim() || DEFAULT_BUSINESS_PLACEHOLDERS.philosophy,
          contactEmail:
            body.contactEmail?.trim() ||
            DEFAULT_BUSINESS_PLACEHOLDERS.contactEmail,
          contactPhone:
            body.contactPhone?.trim() ||
            DEFAULT_BUSINESS_PLACEHOLDERS.contactPhone,
          businessHours:
            body.businessHours?.trim() ||
            DEFAULT_BUSINESS_PLACEHOLDERS.businessHours,
        };

    const existing = await db
      .select({ id: businessProfilePlaceholders.id })
      .from(businessProfilePlaceholders)
      .where(eq(businessProfilePlaceholders.slug, "default"))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(businessProfilePlaceholders)
        .set({
          ...nextProfile,
          updatedAt: new Date(),
        })
        .where(eq(businessProfilePlaceholders.slug, "default"));
    } else {
      await db.insert(businessProfilePlaceholders).values({
        slug: "default",
        ...nextProfile,
      });
    }

    return NextResponse.json({ ok: true, profile: nextProfile });
  } catch (error) {
    console.error("Profile placeholder update error:", error);
    return NextResponse.json(
      { error: "Unable to update editable profile placeholders right now." },
      { status: 500 }
    );
  }
}
