import React from "react";

interface JsonLdProps {
  data?: Record<string, unknown> | Array<Record<string, unknown>> | null | undefined;
  schema?: Record<string, unknown> | Array<Record<string, unknown>> | null | undefined;
}

export default function JsonLd({ data, schema }: JsonLdProps) {
  const content = data || schema;
  if (!content) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
    />
  );
}
