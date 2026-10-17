import type { MetadataRoute } from "next";
import {
  getExperienceSlugs,
  getArticleSlugs,
  getDestinationSlugs,
  getLodgeSlugs,
  getResortSlugs,
  getCruiseLineSlugs,
  getBeachcomberSpecialIdentities,
} from "@/sanity/lib/queries";

const BASE_URL = "https://www.oceanandsafari.com";

// Matches the ISR cadence most pages on the site already use.
export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/ocean-islands", priority: 0.9, changeFrequency: "weekly" },
  { path: "/luxury-cruises", priority: 0.9, changeFrequency: "weekly" },
  { path: "/luxury-cruises/cruise-lines", priority: 0.8, changeFrequency: "weekly" },
  { path: "/african-safaris", priority: 0.9, changeFrequency: "weekly" },
  { path: "/safari-lodges", priority: 0.8, changeFrequency: "weekly" },
  { path: "/unique-journeys", priority: 0.8, changeFrequency: "weekly" },
  { path: "/destinations", priority: 0.9, changeFrequency: "weekly" },
  { path: "/articles", priority: 0.8, changeFrequency: "daily" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/popia", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [experiences, articles, destinations, lodges, resorts, cruiseLines, specials] = await Promise.all([
    getExperienceSlugs(),
    getArticleSlugs(),
    getDestinationSlugs(),
    getLodgeSlugs(),
    getResortSlugs(),
    getCruiseLineSlugs(),
    getBeachcomberSpecialIdentities(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...experiences.map((e: { slug: string }) => ({
      url: `${BASE_URL}/experiences/${e.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.map((a: { slug: string }) => ({
      url: `${BASE_URL}/articles/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...destinations.map((d: { slug: string }) => ({
      url: `${BASE_URL}/destinations/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...lodges.map((l: { slug: string }) => ({
      url: `${BASE_URL}/safari-lodges/${l.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...resorts.map((r: { slug: string }) => ({
      url: `${BASE_URL}/ocean-islands/resorts/${r.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...cruiseLines.map((c: { slug: string }) => ({
      url: `${BASE_URL}/luxury-cruises/cruise-lines/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...specials.map((s: { identity: string }) => ({
      url: `${BASE_URL}/ocean-islands/specials/${s.identity}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
