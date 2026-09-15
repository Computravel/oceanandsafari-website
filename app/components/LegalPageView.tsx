import { getLegalPage } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/app/components/portableTextComponents";
import SiteNav from "@/app/components/SiteNav";
import LegalPlaceholderPage from "@/app/components/LegalPlaceholderPage";

/**
 * Shared shell for legal pages backed by the `legalPage` Sanity document type
 * (pageKey: "terms" | "privacy" | "popia"). Falls back to the "coming soon"
 * placeholder when no document has been published for that page yet.
 */
export default async function LegalPageView({ pageKey, fallbackTitle }: { pageKey: string; fallbackTitle: string }) {
  const page = await getLegalPage(pageKey);

  if (!page) {
    return <LegalPlaceholderPage title={fallbackTitle} />;
  }

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>
      <SiteNav />

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "80px 40px 100px" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(32px, 5vw, 48px)", color: "var(--charcoal)", lineHeight: 1.2, marginBottom: "12px" }}>{page.title}</h1>
        {page.lastUpdated && (
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", marginBottom: "40px", paddingBottom: "40px", borderBottom: "0.5px solid var(--border)" }}>
            Last updated: {new Date(page.lastUpdated).toLocaleDateString("en-ZA", { dateStyle: "long" })}
          </div>
        )}
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.85 }}>
          <PortableText value={page.body} components={portableTextComponents} />
        </div>
      </div>
    </main>
  );
}
