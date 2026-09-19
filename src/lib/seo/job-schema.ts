import type {
  JobSchemaInput,
  JobSchemaOptions,
  HaringOrganization,
  JobLocationAddress,
} from "@/types/job-schema";
import { SITE_CONFIG } from "@/lib/siteConfig";

const DEFAULT_ORGANIZATION: HaringOrganization = {
  name: SITE_CONFIG.name,
  sameAs: SITE_CONFIG.url,
  logo: SITE_CONFIG.logo,
};

const DEFAULT_LOCATION: JobLocationAddress = {
  streetAddress: "Jl. Gunung Balon III No.78, RT.11/RW.4",
  addressLocality: "Lebak bulus, Cilandak, Jakarta Selatan",
  addressRegion: "DKI Jakarta",
  postalCode: "12440",
  addressCountry: "ID",
};

export function sanitizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateEvergreenDates(
  datePostedInput?: string | Date,
  validityDaysInput?: number
): { datePosted: string; validThrough: string } {
  const validityDays = validityDaysInput ?? 30;
  const nowMs = Date.now();

  const validThroughDate = new Date(nowMs + validityDays * 24 * 60 * 60 * 1000);
  const validThrough = validThroughDate.toISOString();

  const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
  let finalDatePosted: string;

  if (datePostedInput) {
    const parsedDate =
      typeof datePostedInput === "string"
        ? new Date(datePostedInput)
        : datePostedInput;

    const ageMs = nowMs - parsedDate.getTime();

    if (isNaN(parsedDate.getTime()) || ageMs > maxAgeMs || ageMs < 0) {
      finalDatePosted = new Date(nowMs - 3 * 24 * 60 * 60 * 1000).toISOString();
    } else {
      finalDatePosted = parsedDate.toISOString();
    }
  } else {
    finalDatePosted = new Date(nowMs - 3 * 24 * 60 * 60 * 1000).toISOString();
  }

  return { datePosted: finalDatePosted, validThrough };
}

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
        streetAddress: loc.streetAddress || DEFAULT_LOCATION.streetAddress,
        addressLocality: loc.addressLocality || DEFAULT_LOCATION.addressLocality,
        addressRegion: loc.addressRegion || DEFAULT_LOCATION.addressRegion,
        postalCode: loc.postalCode || DEFAULT_LOCATION.postalCode,
        addressCountry: loc.addressCountry || DEFAULT_LOCATION.addressCountry,
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

