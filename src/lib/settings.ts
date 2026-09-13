import { createClient } from "@/lib/supabase/server";
import {
  CompanyIdentity,
  PageSetting,
  DEFAULT_COMPANY_IDENTITY,
  DEFAULT_PAGE_SETTINGS,
} from "./settings-data";

export * from "./settings-data";

export async function getCompanyIdentity(): Promise<CompanyIdentity> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", "company_identity")
      .single();

    if (data && data.data) {
      return { ...DEFAULT_COMPANY_IDENTITY, ...data.data };
    }
  } catch (err) {
    // Graceful fallback to default
  }
  return DEFAULT_COMPANY_IDENTITY;
}

export async function getPageSetting(pageKey: string): Promise<PageSetting> {
  const fallback = DEFAULT_PAGE_SETTINGS[pageKey] || DEFAULT_PAGE_SETTINGS.page_home;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", pageKey)
      .single();

    if (data && data.data) {
      return { ...fallback, ...data.data };
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
    const supabase = await createClient();
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
