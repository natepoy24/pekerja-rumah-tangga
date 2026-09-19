import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    const content = await fs.readFile(filePath, "utf-8");
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return new NextResponse("# PT Jasa Mandiri Agency\n\nLayanan penyalur pekerja rumah tangga terpercaya.", {
      status: 200,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }
}
