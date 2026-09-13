import type { JobSchemaInput, JobSchemaOptions } from "@/types/job-schema";
import {
  generateEvergreenJobSchema,
  generateEvergreenJobListSchema,
} from "@/lib/seo/job-schema";

interface EvergreenJobJsonLdProps {
  job?: JobSchemaInput;
  jobs?: JobSchemaInput[];
  options?: JobSchemaOptions;
}

/**
 * Portable React Server Component (RSC) that injects dynamic, always-fresh
 * Schema.org JobPosting JSON-LD for Google for Jobs.
 *
 * Can be mounted inside any Server Component page, layout, or dynamic route.
 */
export default function EvergreenJobJsonLd({
  job,
  jobs,
  options,
}: EvergreenJobJsonLdProps) {
  if (!job && (!jobs || jobs.length === 0)) {
    return null;
  }

  let schema: Record<string, any>;

  if (jobs && jobs.length > 0) {
    schema = generateEvergreenJobListSchema(jobs, options);
  } else if (job) {
    schema = generateEvergreenJobSchema(job, options);
  } else {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
