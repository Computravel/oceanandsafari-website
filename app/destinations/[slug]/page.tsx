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

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

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
          <Link href="/destinations" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", textDecoration: "none" }}>← All Destinations</Link>
          <Link href="/#enquire" style={{ background: "var(--gold)", color: "var(--pearl)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", borderRadius: "3px", textDecoration: "none" }}>Plan My Journey</Link>
        </div>
      </nav>

      {/* HERO */}
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

        {/* BREADCRUMB */}
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

        {/* DESCRIPTION */}
        {destination.description && (
          <div style={{ marginBottom: "48px", maxWidth: "780px" }}>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.85 }}>
              <PortableText value={destination.description} />
            </div>
          </div>
        )}

        {/* SUB-DESTINATIONS */}
        {destination.children && destination.children.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>
              Explore {destination.name}
            </h2>
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

        {/* EXPERIENCES */}
        {destination.experiences && destination.experiences.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>
              {destination.name} Experiences
            </h2>
            <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {destination.experiences.map((exp: any) => (
                <Link key={exp._id} href={`/experiences/${exp.slug?.current}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ height: "200px", overflow: "hidden", background: "var(--abyss)", position: "relative", flexShrink: 0 }}>
                      {exp.heroImage ? (
                        <img src={exp.heroImage} alt={exp.heroImageAlt || exp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                      )}
                      <div style={{ position: "absolute", top: "12px", left: "12px", fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, background: "rgba(11,31,58,0.75)", color: "white", padding: "4px 10px", borderRadius: "2px" }}>{exp.category}</div>
                    </div>
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", marginBottom: "6px", lineHeight: 1.3 }}>{exp.title}</div>
                      <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", marginBottom: "16px" }}>{exp.duration} nights · {exp.destination}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "0.5px solid var(--border)", marginTop: "auto" }}>
                        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", fontWeight: 500, color: "var(--gold)" }}>From R{exp.priceFrom?.toLocaleString()} <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 400 }}>pp</span></div>
                        <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pearl)", background: "var(--indigo)", padding: "8px 16px", borderRadius: "3px", fontWeight: 500 }}>View</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ARTICLES */}
        {destination.articles && destination.articles.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>
              {destination.name} Travel Guides
            </h2>
            <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {destination.articles.map((article: any) => (
                <Link key={article._id} href={`/articles/${article.slug?.current}`} style={{ textDecoration: "none", display: "flex" }}>
                  <div style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", width: "100%" }}>
                    <div style={{ height: "160px", overflow: "hidden", background: "var(--abyss)", position: "relative", flexShrink: 0 }}>
                      {article.heroImage ? (
                        <img src={article.heroImage} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                      )}
                    </div>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "8px" }}>{article.title}</h3>
                      {article.excerpt && (
                        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>{article.excerpt}</p>
                      )}
                      <div style={{ paddingTop: "12px", borderTop: "0.5px solid var(--border)", marginTop: "12px" }}>
                        <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", color: "var(--gold)", fontWeight: 500 }}>Read more →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TRAVEL TIPS */}
        {destination.travelTips && (
          <div style={{ padding: "32px", background: "var(--ivory)", borderRadius: "8px", border: "0.5px solid var(--border)" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--charcoal)", marginBottom: "16px" }}>Travel Tips for {destination.name}</h2>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.8 }}>
              <PortableText value={destination.travelTips} />
            </div>
          </div>
        )}

      </div>

      {/* CTA */}
      <section style={{ padding: "80px 40px", background: "var(--abyss)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(28px, 4vw, 44px)", color: "var(--pearl)", marginBottom: "16px" }}>
          Ready to explore {destination.name}?
        </h2>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "rgba(247,242,234,0.6)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
          Speak to an Ocean & Safari consultant and begin planning your bespoke journey.
        </p>
        <Link href="/#enquire" style={{ display: "inline-block", background: "var(--gold)", color: "var(--abyss)", fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 40px", borderRadius: "4px", textDecoration: "none" }}>
          Plan My Journey
        </Link>
      </section>

    </main>
  );
}