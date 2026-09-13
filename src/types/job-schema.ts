export interface HiringOrganization {
  name: string;
  sameAs?: string;
  logo?: string;
}

export type HaringOrganization = HiringOrganization;

export interface JobLocationAddress {
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
  postalCode?: string;
  streetAddress?: string;
}

export interface JobBaseSalary {
  minValue: number;
  maxValue: number;
  currency?: string;
  unitText?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
}

export interface JobSchemaInput {
  title: string;
  description: string;
  datePosted?: string | Date;
  validityDays?: number;
  employmentType?: string | string[];
  hiringOrganization?: HiringOrganization;
  jobLocation?: JobLocationAddress;
  baseSalary?: JobBaseSalary;
  directApply?: boolean;
  applicantLocationRequirements?: string;
  jobLocationType?: string;
  applyUrl?: string;
}

export interface JobSchemaOptions {
  defaultValidityDays?: number;
  defaultOrganization?: HiringOrganization;
  defaultLocation?: JobLocationAddress;
  currency?: string;
  siteUrl?: string;
}
