import type { MetadataRoute } from "next";

const BASE_URL = "https://www.oceanandsafari.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Sanity Studio (CMS admin) and internal API routes aren't public content.
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
