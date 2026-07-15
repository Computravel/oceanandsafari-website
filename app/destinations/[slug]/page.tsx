import { getDestination, getDestinationSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);
  return {
    title: destination?.seoTitle || `${destination?.name} | Ocean & Safari`,
    description: destination?.seoDescription || `Luxury travel experiences in ${destination?.name}`,
  };
}

const portableTextComponents = {
  block: {
    normal: ({children}: any) => <p style={{ marginBottom: "16px", lineHeight: 1.75 }}>{children}</p>,
    h2: ({children}: any) => <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--charcoal)", fontWeight: 400, marginTop: "32px", marginBottom: "12px" }}>{children}</h2>,
    h3: ({children}: any) => <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", fontWeight: 400, marginTop: "24px", marginBottom: "8px" }}>{children}</h3>,
  },
  list: {
    bullet: ({children}: any) => <ul style={{ paddingLeft: "0", margin: "8px 0", listStyle: "none" }}>{children}</ul>,
  },
  listItem: {
    bullet: ({children}: any) => (
      <li style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "4px" }}>◆</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({children}: any) => <strong style={{ fontWeight: 600, color: "var(--abyss)" }}>{children}</strong>,
  },
};

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

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
          <Link href="/destinations" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", textDecoration: "none" }}>← All Destinations</Link>
          <Link href="/#enquire" style={{ background: "var(--gold)", color: "var(--pearl)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", borderRadius: "3px", textDecoration: "none" }}>Plan My Journey</Link>
        </div>
      </nav>

      <div style={{ height: "60vh", position: "relative", overflow: "hidden", background: "var(--abyss)" }}>
        {destination.heroImage && (
          <img src={destination.heroImage} alt={destination.heroImageAlt || destination.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: "48px", left: "40px", right: "40px" }}>
          {destination.parent && (
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "rgba(247,242,234,0.6)", marginBottom: "8px", letterSpacing: "0.1em" }}>
              <Link href={`/destinations/${destination.parent.slug?.current}`} style={{ color: "var(--teal)", textDecoration: "none" }}>{destination.parent.name}</Link>
              {' → '}
            </div>
          )}
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.15, marginBottom: "12px" }}>{destination.name}</h1>
          {destination.bestTimeToVisit && (
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "rgba(247,242,234,0.65)" }}>
              Best time to visit: {destination.bestTimeToVisit}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 40px" }}>

        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", marginBottom: "40px", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/destinations" style={{ color: "var(--teal)", textDecoration: "none" }}>Destinations</Link>
          {destination.parent && (
            <>
              <span>→</span>
              <Link href={`/destinations/${destination.parent.slug?.current}`} style={{ color: "var(--teal)", textDecoration: "none" }}>{destination.parent.name}</Link>
            </>
          )}
          <span>→</span>
          <span style={{ color: "var(--charcoal)" }}>{destination.name}</span>
        </div>

        {destination.description && (
          <div style={{ marginBottom: "48px", maxWidth: "780px" }}>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.75 }}>
              <PortableText value={destination.description} components={portableTextComponents} />
            </div>
          </div>
        )}

        {destination.highlights && destination.highlights.length > 0 && (
          <div style={{ marginBottom: "48px", maxWidth: "780px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Highlights</h2>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.75 }}>
              <PortableText value={destination.highlights} components={portableTextComponents} />
            </div>
          </div>
        )}

        {destination.children && destination.children.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>Explore {destination.name}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {destination.children.map((child: any) => (
                <Link key={child._id} href={`/destinations/${child.slug?.current}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ height: "120px", overflow: "hidden", background: "var(--abyss)", position: "relative" }}>
                      {child.heroImage ? (
                        <img src={child.heroImage} alt={child.heroImageAlt || child.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--teal) 100%)" }} />
                      )}
                    </div>
                    <div style={{ padding: "16px" }}>
                      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", marginBottom: "4px" }}>{child.name}</div>
                      <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", color: "var(--gold)", fontWeight: 500 }}>Explore →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {destination.experiences && destination.experiences.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom:
