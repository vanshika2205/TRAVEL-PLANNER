import { NextResponse } from "next/server";
import { destinations } from "@/lib/destinations";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;

    // Static pages
    const staticUrls = [
      "",
      "/admin",
    ];

    // Dynamic state itinerary pages
    const stateKeys = Object.keys(destinations);
    const dynamicUrls = stateKeys.map(key => `/itinerary/${key}`);

    const allUrls = [...staticUrls, ...dynamicUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(url => {
      return `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${url === "" ? "daily" : "weekly"}</changefreq>
    <priority>${url === "" ? "1.0" : url.startsWith("/itinerary/") ? "0.8" : "0.5"}</priority>
  </url>`;
    })
    .join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (e) {
    console.error("Sitemap generation error:", e);
    return NextResponse.json({ success: false, error: "Failed to generate sitemap" }, { status: 500 });
  }
}
