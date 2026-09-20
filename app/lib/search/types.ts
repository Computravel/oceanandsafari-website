export type SearchResultType =
  | "experience"
  | "lodge"
  | "resort"
  | "cruiseLine"
  | "destination"
  | "article"
  | "special";

// The site has no single "type of experience" field anywhere — experience,
// lodge, resort, cruiseLine, and article each carry their own independent
// classification (or none at all). This facet is derived per source type in
// getSearchIndex(), not read from one shared field. In particular:
//   - cruiseLine.category (luxury/premium/contemporary/expedition/river) is a
//     tier classification, NOT a trip type — it must never be used as the
//     facet value here, only surfaced as a secondary badge.
//   - article.category is a content-genre enum (e.g. "safari-guides" is an
//     article ABOUT safari, not bookable safari inventory) — always "Journal".
export type SearchFacet =
  | "Safari"
  | "Island"
  | "Cruise"
  | "Coastal"
  | "Rail"
  | "Destination"
  | "Journal";

export interface SearchIndexItem {
  id: string;
  title: string;
  resultType: SearchResultType;
  facet: SearchFacet;
  /** Secondary text badge, e.g. a cruise line's tier ("Premium") — never used for faceting/filtering. */
  badge: string | null;
  /** Combined region/country/destination string, "" if none available. */
  location: string;
  excerpt: string;
  heroImage: string | null;
  heroImageAlt: string | null;
  /** Editor-curated synonyms/occasions/highlights (from the searchKeywords Sanity field). */
  searchKeywords: string[];
  url: string;
}
