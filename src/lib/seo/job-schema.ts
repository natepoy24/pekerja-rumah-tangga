import type {
  JobSchemaInput,
  JobSchemaOptions,
  HiringOrganization,
  JobLocationAddress,
} from "@/types/job-schema";

const DEFAULT_ORGANIZATION: HiringOrganization = {
  name: "PT Jasa Mandiri",
  sameAs: "https://pekerjarumahtangga.com",
  logo: "https://pekerjarumahtangga.com/logo.png",
};

const DEFAULT_LOCATION: JobLocationAddress = {
  addressLocality: "Jakarta",
  addressRegion: "DKI Jakarta",
  addressCountry: "ID",
};

/**
 * Sanitizes text content by removing HTML tags and normalizing whitespace
 * to ensure clean string embedding inside JSON-LD script blocks.
 */
export function sanitizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

/**
 * Calculates dynamic rolling freshness dates for Google for Jobs compliance.
 * Computes a rolling validThrough date (now + validityDays) and normalizes
 * datePosted if stale (> 30 days old) to prevent algorithmic indexing drops.
 */
export function calculateEvergreenDates(
  datePostedInput?: string | Date,
  validityDaysInput?: number
): { datePosted: string; validThrough: string } {
  const validityDays = validityDaysInput ?? 30;
  const nowMs = Date.now();

  // 1. Dynamic Rolling validThrough (ISO 8601)
  const validThroughDate = new Date(nowMs + validityDays * 24 * 60 * 60 * 1000);
  const validThrough = validThroughDate.toISOString();

  // 2. Intelligent datePosted Freshness
  const maxAgeMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  let finalDatePosted: string;

  if (datePostedInput) {
    const parsedDate =
      typeof datePostedInput === "string"
        ? new Date(datePostedInput)
        : datePostedInput;

    const ageMs = nowMs - parsedDate.getTime();

    // If date is invalid or older than 30 days, normalize to a rolling fresh relative date (now - 3 days)
    if (isNaN(parsedDate.getTime()) || ageMs > maxAgeMs || ageMs < 0) {
      finalDatePosted = new Date(nowMs - 3 * 24 * 60 * 60 * 1000).toISOString();
    } else {
      finalDatePosted = parsedDate.toISOString();
    }
  } else {
    // Fallback: 3 days prior to current crawl timestamp
    finalDatePosted = new Date(nowMs - 3 * 24 * 60 * 60 * 1000).toISOString();
  }

  return { datePosted: finalDatePosted, validThrough };
}

/**
 * Pure utility function to generate a valid, evergreen Schema.org JobPosting object.
 */
export function generateEvergreenJobSchema(
  input: JobSchemaInput,
  options?: JobSchemaOptions
): Record<string, any> {
  const { datePosted, validThrough } = calculateEvergreenDates(
    input.datePosted,
    input.validityDays ?? options?.defaultValidityDays
  );

  const org =
    input.hiringOrganization ||
    options?.defaultOrganization ||
    DEFAULT_ORGANIZATION;

  const loc =
    input.jobLocation || options?.defaultLocation || DEFAULT_LOCATION;

  const currency = input.baseSalary?.currency || options?.currency || "IDR";

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: sanitizeText(input.title),
    description: sanitizeText(input.description),
    datePosted,
    validThrough,
    directApply: input.directApply ?? true,
    employmentType: input.employmentType || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: org.name,
      sameAs: org.sameAs || "https://pekerjarumahtangga.com",
      logo: org.logo || "https://pekerjarumahtangga.com/logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.addressLocality || "Jakarta",
        addressRegion: loc.addressRegion || "DKI Jakarta",
        addressCountry: loc.addressCountry || "ID",
        ...(loc.streetAddress ? { streetAddress: loc.streetAddress } : {}),
        ...(loc.postalCode ? { postalCode: loc.postalCode } : {}),
      },
    },
  };

  if (input.baseSalary) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: input.baseSalary.minValue,
        maxValue: input.baseSalary.maxValue,
        unitText: input.baseSalary.unitText || "MONTH",
      },
    };
  }

  if (input.applyUrl) {
    schema.url = input.applyUrl;
  }

  if (input.applicantLocationRequirements) {
    schema.applicantLocationRequirements = {
      "@type": "Country",
      name: input.applicantLocationRequirements,
    };
  }

  if (input.jobLocationType) {
    schema.jobLocationType = input.jobLocationType;
  }

  return schema;
}

/**
 * Utility function to generate a Schema.org ItemList wrapping multiple JobPosting objects.
 */
export function generateEvergreenJobListSchema(
  inputs: JobSchemaInput[],
  options?: JobSchemaOptions
): Record<string, any> {
  const orgName =
    options?.defaultOrganization?.name || DEFAULT_ORGANIZATION.name;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Lowongan Kerja Active Penempatan ${orgName}`,
    itemListElement: inputs.map((input, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: generateEvergreenJobSchema(input, options),
    })),
  };
}
