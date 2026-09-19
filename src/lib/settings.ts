import { createPublicClient } from "@/lib/supabase/server";
import {
  CompanyIdentity,
  PageSetting,
  DEFAULT_COMPANY_IDENTITY,
  DEFAULT_PAGE_SETTINGS,
} from "./settings-data";

export * from "./settings-data";

const LEGACY_IMAGE_MAP: Record<string, string> = {
  "/asisten rumah tangga.jpeg": "/asisten-rumah-tangga.webp",
  "/asisten%20rumah%20tangga.jpeg": "/asisten-rumah-tangga.webp",
  "/baby sitter.jpeg": "/baby-sitter.webp",
  "/baby%20sitter.jpeg": "/baby-sitter.webp",
  "/perawat lansia.jpeg": "/perawat-lansia.webp",
  "/perawat%20lansia.jpeg": "/perawat-lansia.webp",
  "/logo.png": "/logo-jm.webp",
};

export function normalizeImagePath<T extends string | undefined>(path: T): T {
  if (!path || typeof path !== "string") return path;
  const trimmed = path.trim();
  if (LEGACY_IMAGE_MAP[trimmed]) {
    return LEGACY_IMAGE_MAP[trimmed] as T;
  }
  return path;
}

export async function getCompanyIdentity(): Promise<CompanyIdentity> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", "company_identity")
      .single();

    if (data && data.data) {
      const normalized = { ...data.data };
      if (normalized.logo_url) normalized.logo_url = normalizeImagePath(normalized.logo_url);
      if (normalized.favicon_url) normalized.favicon_url = normalizeImagePath(normalized.favicon_url);
      return { ...DEFAULT_COMPANY_IDENTITY, ...normalized };
    }
  } catch (err) {
    // Graceful fallback to default
  }
  return DEFAULT_COMPANY_IDENTITY;
}

export async function getPageSetting(pageKey: string): Promise<PageSetting> {
  const fallback = DEFAULT_PAGE_SETTINGS[pageKey] || DEFAULT_PAGE_SETTINGS.page_home;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", pageKey)
      .single();

    if (data && data.data) {
      const normalized = { ...data.data };
      if (normalized.hero_image) normalized.hero_image = normalizeImagePath(normalized.hero_image);
      if (normalized.og_image) normalized.og_image = normalizeImagePath(normalized.og_image);
      if (normalized.service_art_image) normalized.service_art_image = normalizeImagePath(normalized.service_art_image);
      if (normalized.service_babysitter_image) normalized.service_babysitter_image = normalizeImagePath(normalized.service_babysitter_image);
      if (normalized.service_perawat_image) normalized.service_perawat_image = normalizeImagePath(normalized.service_perawat_image);
      return { ...fallback, ...normalized };
    }
  } catch (err) {
    // Graceful fallback to default
  }
  return fallback;
}

export async function getAllSettingsFromDb(): Promise<Record<string, any>> {
  const result: Record<string, any> = {
    company_identity: { ...DEFAULT_COMPANY_IDENTITY },
    ...DEFAULT_PAGE_SETTINGS,
  };

  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("site_settings").select("id, data");
    if (data && Array.isArray(data)) {
      for (const item of data) {
        if (item.id && item.data) {
          result[item.id] = { ...result[item.id], ...item.data };
        }
      }
    }
  } catch (err) {
    console.warn("Could not fetch site_settings table (using defaults):", err);
  }

  return result;
}
