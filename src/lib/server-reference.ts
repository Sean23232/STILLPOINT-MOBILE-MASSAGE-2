import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { businessProfilePlaceholders } from "@/db/schema";
import {
  DEFAULT_BUSINESS_PLACEHOLDERS,
  type EditableBusinessProfile,
} from "./brand-data";

export function generateReferenceCode(prefix: "REQ" | "CORP" | "PART" | "MSG"): string {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  let token = "";
  for (let i = 0; i < 6; i++) {
    token += alphabet[bytes[i] % alphabet.length];
  }
  return `SP-${prefix}-${token}`;
}

export async function getEditableBusinessProfile(): Promise<EditableBusinessProfile> {
  try {
    const rows = await db
      .select()
      .from(businessProfilePlaceholders)
      .where(eq(businessProfilePlaceholders.slug, "default"))
      .limit(1);

    if (rows.length > 0) {
      const row = rows[0];
      return {
        therapistName: row.therapistName,
        biography: row.biography,
        credentials: row.credentials,
        training: row.training,
        serviceArea: row.serviceArea,
        philosophy: row.philosophy,
        contactEmail: row.contactEmail,
        contactPhone: row.contactPhone,
        businessHours: row.businessHours,
      };
    }
  } catch {
    // Graceful fallback if table hasn't been initialized yet during static build
  }
  return DEFAULT_BUSINESS_PLACEHOLDERS;
}
