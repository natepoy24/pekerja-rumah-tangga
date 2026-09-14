import type { Metadata } from "next";
import { getPageSetting, getCompanyIdentity } from "@/lib/settings";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateEmploymentAgencySchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [setting, company] = await Promise.all([
    getPageSetting("page_home"),
    getCompanyIdentity(),
  ]);

  const title = setting.meta_title || `${SITE_CONFIG.name} - Penempatan Pekerja Rumah Tangga Resmi & Terpercaya`;
  const description = setting.meta_description || company.deskripsi;
  const ogImage = setting.og_image || setting.hero_image || SITE_CONFIG.logo;

  return {
    title,
    description,
    keywords: setting.keywords ? setting.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: "id_ID",
      images: [
        {
          url: ogImage,
          alt: setting.hero_image_alt || title,
        },
      ],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage() {
  const [pageSetting, company] = await Promise.all([
    getPageSetting("page_home"),
    getCompanyIdentity(),
  ]);

  const websiteSchema = generateWebSiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const agencySchema = generateEmploymentAgencySchema();
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Beranda", url: "/" }]);
  const faqSchema = generateFAQSchema(pageSetting.faqs || []);

  return (
    <>
      <JsonLd schema={[websiteSchema, organizationSchema, agencySchema, breadcrumbSchema]} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <HomeClient pageSetting={pageSetting} company={company} />
    </>
  );
}
