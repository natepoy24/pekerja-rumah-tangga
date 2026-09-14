import { NextResponse } from "next/server";
import { getCompanyIdentity } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const company = await getCompanyIdentity();
    const faviconUrl = company.favicon_url || "/logo-jm.webp";

    const origin = new URL(request.url).origin;
    const targetUrl = faviconUrl.startsWith("http")
      ? faviconUrl
      : `${origin}${faviconUrl.startsWith("/") ? faviconUrl : `/${faviconUrl}`}`;

    return NextResponse.redirect(new URL(targetUrl), 307);
  } catch (err) {
    return new Response("Not found", { status: 404 });
  }
}
