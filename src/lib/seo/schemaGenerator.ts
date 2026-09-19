import { SITE_CONFIG } from "@/lib/siteConfig";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": `${SITE_CONFIG.name} - Penyalur ART, Baby Sitter, dan Perawat Lansia Resmi Terpercaya.`,
    "publisher": {
      "@id": `${SITE_CONFIG.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_CONFIG.url}/pekerja?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    "name": SITE_CONFIG.name,
    "legalName": SITE_CONFIG.legalName,
    "url": SITE_CONFIG.url,
    "logo": SITE_CONFIG.logo,
    "image": SITE_CONFIG.logo,
    "foundingDate": SITE_CONFIG.foundingDate,
    "telephone": SITE_CONFIG.telephone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.streetAddress,
      "addressLocality": SITE_CONFIG.address.addressLocality,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": SITE_CONFIG.address.addressCountry
    },
    "sameAs": SITE_CONFIG.social
  };
}

export function generateEmploymentAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EmploymentAgency", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#local`,
    "name": SITE_CONFIG.name,
    "legalName": SITE_CONFIG.legalName,
    "image": SITE_CONFIG.image,
    "logo": SITE_CONFIG.logo,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.telephone,
    "email": SITE_CONFIG.email,
    "priceRange": SITE_CONFIG.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.streetAddress,
      "addressLocality": SITE_CONFIG.address.addressLocality,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": SITE_CONFIG.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.geo.latitude,
      "longitude": SITE_CONFIG.geo.longitude
    },
    "openingHours": SITE_CONFIG.openingHours,
    "sameAs": SITE_CONFIG.social
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string; path?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const pathVal = item.url || item.path || "/";
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": pathVal.startsWith("http") ? pathVal : `${SITE_CONFIG.url}${pathVal.startsWith("/") ? "" : "/"}${pathVal}`
      };
    })
  };
}

export function generateFAQSchema(faqs: Array<{ q?: string; question?: string; a?: string; answer?: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q || faq.question || "",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a || faq.answer || ""
      }
    }))
  };
}

export function generateCollectionPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`
  };
}

export function generateAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `Tentang ${SITE_CONFIG.name}`,
    "description": `Profil resmi ${SITE_CONFIG.name} (${SITE_CONFIG.legalStatus}).`,
    "url": `${SITE_CONFIG.url}/tentang-kami`
  };
}

export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Kontak Kami - ${SITE_CONFIG.name}`,
    "description": `Hubungi ${SITE_CONFIG.name} di ${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.addressRegion} ${SITE_CONFIG.address.postalCode}.`,
    "url": `${SITE_CONFIG.url}/kontak`
  };
}

export function generateServiceSchema(serviceName: string, serviceDescription: string, serviceUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "EmploymentAgency",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "telephone": SITE_CONFIG.telephone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_CONFIG.address.streetAddress,
        "addressLocality": SITE_CONFIG.address.addressLocality,
        "addressRegion": SITE_CONFIG.address.addressRegion,
        "postalCode": SITE_CONFIG.address.postalCode,
        "addressCountry": SITE_CONFIG.address.addressCountry
      }
    },
    "areaServed": ["Jabodetabek", "Nasional"],
    "url": serviceUrl.startsWith("http") ? serviceUrl : `${SITE_CONFIG.url}${serviceUrl}`
  };
}

export function generateJobPostingSchema(job: {
  title: string;
  description: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string;
  gaji_min?: number;
  gaji_max?: number;
  lokasi?: string;
  provinsi?: string;
  slug: string;
  status?: string;
}) {
  if (job.status && job.status.toLowerCase() === "tutup") {
    return null;
  }

  const postedDate = job.datePosted ? new Date(job.datePosted) : new Date();
  const validUntil = job.validThrough
    ? new Date(job.validThrough)
    : new Date(postedDate.getTime() + 60 * 24 * 60 * 60 * 1000);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": SITE_CONFIG.name,
      "value": job.slug
    },
    "datePosted": postedDate.toISOString().split("T")[0],
    "validThrough": validUntil.toISOString().split("T")[0],
    "employmentType": job.employmentType || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "sameAs": SITE_CONFIG.url,
      "logo": SITE_CONFIG.logo
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_CONFIG.address.streetAddress,
        "addressLocality": SITE_CONFIG.address.addressLocality,
        "addressRegion": SITE_CONFIG.address.addressRegion,
        "postalCode": SITE_CONFIG.address.postalCode,
        "addressCountry": SITE_CONFIG.address.addressCountry
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "IDR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.gaji_min || 2500000,
        "maxValue": job.gaji_max || 5500000,
        "unitText": "MONTH"
      }
    },
    "directApply": true
  };
}

export function generateProfileSchema(worker: {
  nama: string;
  kategori: string;
  slug: string;
  pengalaman?: number;
  lokasi?: string;
  fotoUrl?: string;
  foto_url?: string;
  gaji?: number;
  deskripsi?: string;
  status?: string;
}) {
  const imageUrl = worker.fotoUrl || worker.foto_url || SITE_CONFIG.logo;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": worker.nama,
      "jobTitle": worker.kategori,
      "image": imageUrl,
      "description": worker.deskripsi || `Profil ${worker.nama}, ${worker.kategori} berpengalaman di ${worker.lokasi || "Jakarta"}.`,
      "worksFor": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.url,
        "logo": SITE_CONFIG.logo
      }
    }
  };
}

export function generateArticleSchema(article: {
  judul: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  gambar_url?: string;
  alt_gambar?: string;
  published_at?: string;
  created_at?: string;
  focus_keyword?: string;
  secondary_keyword?: string;
  tags?: string;
}) {
  const canonicalUrl = `${SITE_CONFIG.url}/artikel/${article.slug}`;
  const imageUrl = article.gambar_url?.startsWith("http")
    ? article.gambar_url
    : `${SITE_CONFIG.url}${article.gambar_url || "/asisten-rumah-tangga.webp"}`;

  const keywords = [article.focus_keyword, article.secondary_keyword, article.tags]
    .filter(Boolean)
    .join(", ");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta_title || article.judul,
    "description": article.meta_description || `Artikel edukasi seputar ${article.judul} dari ${SITE_CONFIG.name}.`,
    "image": [imageUrl],
    "datePublished": article.published_at || article.created_at,
    "dateModified": article.created_at || article.published_at,
    "author": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": SITE_CONFIG.logo,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": {
        "@type": "ImageObject",
        "url": SITE_CONFIG.logo,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    "keywords": keywords || undefined,
  };
}


