import { getDestinations } from "@/sanity/lib/queries";
import Link from "next/link";

export const revalidate = 30;

const REGION_LABELS: Record<string, string> = {
  'indian-ocean-islands': 'Indian Ocean Islands',
  'southern-africa': 'Southern Africa',
  'east-africa': 'East Africa',
  'europe': 'Europe',
  'asia': 'Asia',
  'americas': 'Americas',
  'polar-expedition': 'Polar & Expedition',
  'ocean-voyages': 'Ocean Voyages',
}

const REGION_ORDER = [
  'indian-ocean-islands',
  'southern-africa',
  'east-africa',
  'europe',
  'asia',
  'americas',
  'polar-expedition',
  'ocean-voyages',
]

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  const topLevel = destinations.filter((d: any) => !d.parent && d.level === 'country')
  const byRegion: Record<string, any[]> = {}
  topLevel.forEach((d: any) => {
    if (!byRegion[d.region]) byRegion[d.region] = []
    byRegion[d.region].push(d)
  })

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
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>Explore the World</div>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.2, marginBottom: "20px" }}>Our Destinations</h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "rgba(247,242,234,0.7)", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
          From the Indian Ocean's turquoise lagoons to Africa's great wilderness — discover the destinations we know best.
        </p>
      </section>

      {/* DESTINATIONS BY REGION */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 40px" }}>
        {REGION_ORDER.filter(r => byRegion[r]?.length > 0).map(regionKey => (
          <div key={regionKey} style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)" }}>
                {REGION_LABELS[regionKey]}
              </h2>
              <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {byRegion[regionKey].map((dest: any) => (
                <Link key={dest._id} href={`/destinations/${dest.slug?.current}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "white",
                    border: "0.5px solid var(--border)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}>
                    <div style={{ height: "140px", overflow: "hidden", background: "var(--abyss)", position: "relative" }}>
                      {dest.heroImage ? (
                        <img src={dest.heroImage} alt={dest.heroImageAlt || dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--teal) 100%)" }} />
                      )}
                    </div>
                    <div style={{ padding: "16px" }}>
                      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", marginBottom: "4px" }}>{dest.name}</div>
                      {dest.bestTimeToVisit && (
                        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", color: "var(--muted)" }}>Best time: {dest.bestTimeToVisit}</div>
                      )}
                      <div style={{ marginTop: "10px", fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", color: "var(--gold)", fontWeight: 500 }}>Explore →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {destinations.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px", fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--muted)" }}>
            Destinations coming soon — contact us to plan your bespoke journey.
          </div>
        )}
      </section>

    </main>
  )
}