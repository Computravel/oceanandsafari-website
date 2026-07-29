import { getLodges } from "@/sanity/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Safari Lodges & Reserves | Ocean & Safari",
  description: "Discover our curated collection of luxury safari lodges and private reserves across Africa.",
};

const ACCOMMODATION_STYLE_LABELS: Record<string, string> = {
  "luxury-tented": "Luxury Tented Camp",
  lodge: "Lodge",
  "luxury-suite": "Luxury Suite",
  mobile: "Mobile Safari",
  "private-villa": "Private Villa",
  mixed: "Mixed",
};

const PRICE_RANGE_LABELS: Record<string, string> = {
  "ultra-luxury": "Ultra Luxury",
  luxury: "Luxury",
  premium: "Premium",
};

export default async function SafariLodgesPage() {
  const lodges = await getLodges();

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

      {/* NAV */}
      <nav style={{ background: "rgba(247,242,234,0.97)", borderBottom: "0.5px solid var(--border)", padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", letterSpacing: "0.02em", lineHeight: 1 }}>
            <span style={{ color: "var(--abyss)" }}>O</span>
            <span style={{ color: "var(--gold)", margin: "0 2px" }}>&</span>
            <span style={{ color: "var(--teal)" }}>S</span>
          </div>
          <div style={{ width: "0.5px", height: "24px", background: "var(--border)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", fontWeight: 500, letterSpacing: "0.16em", color: "var(--charcoal)", textTransform: "uppercase" }}>Ocean & Safari</div>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>Luxury Travel · by Computravel</div>
          </div>
        </Link>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", textDecoration: "none" }}>← Back to home</Link>
          <Link href="/#enquire" style={{ background: "var(--gold)", color: "var(--pearl)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", borderRadius: "3px", textDecoration: "none" }}>Plan My Journey</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "var(--abyss)", padding: "100px 40px 80px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>Africa Awaits</div>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.2, marginBottom: "20px" }}>Safari Lodges & Reserves</h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "rgba(247,242,234,0.7)", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
          A curated collection of luxury lodges, tented camps and private reserves across Africa&apos;s most storied wilderness.
        </p>
      </section>

      {/* LODGES GRID */}
      <section style={{ padding: "64px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        {lodges && lodges.length > 0 ? (
          <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {lodges.map((lodgeItem: any) => (
              <Link key={lodgeItem._id} href={`/safari-lodges/${lodgeItem.slug?.current}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ height: "200px", overflow: "hidden", background: "var(--abyss)", position: "relative", flexShrink: 0 }}>
                    {lodgeItem.heroImage ? (
                      <img src={lodgeItem.heroImage} alt={lodgeItem.heroImageAlt || lodgeItem.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                    )}
                    {lodgeItem.accommodationStyle && (
                      <div style={{ position: "absolute", top: "12px", left: "12px", fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, background: "rgba(11,31,58,0.75)", color: "white", padding: "4px 10px", borderRadius: "2px", backdropFilter: "blur(4px)" }}>
                        {ACCOMMODATION_STYLE_LABELS[lodgeItem.accommodationStyle] || lodgeItem.accommodationStyle}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", marginBottom: "6px", lineHeight: 1.3 }}>{lodgeItem.name}</div>
                    <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", marginBottom: "16px" }}>
                      {[lodgeItem.region, lodgeItem.country].filter(Boolean).join(", ")}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "0.5px solid var(--border)", marginTop: "auto" }}>
                      <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", fontWeight: 500, color: "var(--gold)" }}>
                        {lodgeItem.priceRange ? (PRICE_RANGE_LABELS[lodgeItem.priceRange] || lodgeItem.priceRange) : ""}
                      </span>
                      <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pearl)", background: "var(--indigo)", padding: "8px 16px", borderRadius: "3px", fontWeight: 500 }}>Explore</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 40px", fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--muted)" }}>
            Safari lodges coming soon — contact us to plan your bespoke journey.
          </div>
        )}
      </section>

    </main>
  );
}
