/**
 * Appends Sanity's image-transform query params so the CDN serves a
 * resized/compressed asset instead of the original upload.
 */
export function sanityThumb(url: string | null | undefined, w: number, h?: number): string {
  if (!url || !url.includes("cdn.sanity.io")) return url || "";
  const params = h ? `w=${w}&h=${h}&fit=crop` : `w=${w}&fit=max`;
  return `${url}?${params}&auto=format&q=70`;
}
