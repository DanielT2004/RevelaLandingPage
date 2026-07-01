import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The waitlist endpoint is not a page; keep crawlers off it.
      disallow: "/api/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
