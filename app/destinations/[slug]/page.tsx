import { getDestination, getDestinationSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ExperienceGallery from "@/app/components/ExperienceGallery";
import { linkMark } from "@/app/components/portableTextComponents";
import SiteNav from "@/app/components/SiteNav";

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
    h2: ({children}: any) => <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", fontWeight: 400, marginTop: "36px", marginBottom: "14px" }}>{children}</h2>,
    h3: ({children}: any) => <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", fontWeight: 400, marginTop: "24px", marginBottom: "8px" }}>{children}</h3>,
  },
  list: {
    bullet: ({children}: any) => <ul style={{ paddingLeft: "0", margin: "8px 0", listStyle: "none" }}>{children}</ul>,
  },
  listItem: {
    bullet: ({children}: any) => (
      <li style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "inherit", lineHeight: 1.75 }}>
        <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "4px" }}>◆</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({children}: any) => <strong style={{ fontWeight: 600, color: "var(--abyss)" }}>{children}</strong>,
    link: linkMark,
  },
};

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

      <SiteNav />

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

        {destination.whyYoullLoveIt && (
          <div style={{ marginBottom: "48px", maxWidth: "780px", padding: "24px 28px", background: "var(--ivory)", borderLeft: "3px solid var(--gold)", borderRadius: "4px" }}>
            <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", fontStyle: "italic", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>
              &ldquo;{destination.whyYoullLoveIt}&rdquo;
            </p>
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

        <ExperienceGallery gallery={destination.gallery || []} title="Gallery" />

        {destination.signatureLuxuryExperiences && destination.signatureLuxuryExperiences.length > 0 && (
          <div style={{ marginBottom: "48px", maxWidth: "780px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: destination.signatureLuxuryExperiencesIntro ? "12px" : "20px" }}>Signature Luxury Experiences</h2>
            {destination.signatureLuxuryExperiencesIntro && (
              <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "28px" }}>{destination.signatureLuxuryExperiencesIntro}</p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {destination.signatureLuxuryExperiences.map((item: { title: string; description?: string }, i: number) => (
                <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", fontSize: "20px", flexShrink: 0, lineHeight: 1.4 }}>✦</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", marginBottom: "6px" }}>{item.title}</div>
                    {item.description && (
                      <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.75, margin: 0 }}>{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {destination.perfectFor && destination.perfectFor.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Perfect For</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {destination.perfectFor.map((tag: string, i: number) => (
                <span key={i} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--charcoal)", background: "var(--ivory)", border: "0.5px solid var(--border)", padding: "8px 16px", borderRadius: "20px" }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {destination.bestTimeToVisitDetail && destination.bestTimeToVisitDetail.length > 0 && (
          <div style={{ marginBottom: "48px", maxWidth: "780px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Best Time to Visit</h2>
            {destination.bestTimeToVisitDetail.map((season: any, i: number) => (
              <div key={i} style={{ marginBottom: "18px", paddingBottom: "18px", borderBottom: i < destination.bestTimeToVisitDetail.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", fontWeight: 600, color: "var(--teal)", marginBottom: "6px" }}>{season.period}</div>
                {season.description && (
                  <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{season.description}</p>
                )}
              </div>
            ))}
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
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>{destination.name} Experiences</h2>
            <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {destination.experiences.map((exp: any) => (
                <Link key={exp._id} href={exp.href || `/experiences/${exp.slug?.current}`} style={{ textDecoration: "none" }}>
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

        {destination.articles && destination.articles.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>{destination.name} Travel Guides</h2>
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

        {destination.combineWith && destination.combineWith.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "12px" }}>Combine With</h2>
            <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", marginBottom: "20px" }}>Pair {destination.name} with these destinations for an even more unforgettable journey.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {destination.combineWith.map((item: string, i: number) => (
                <span key={i} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--pearl)", background: "var(--indigo)", padding: "8px 16px", borderRadius: "20px" }}>{item}</span>
              ))}
            </div>
          </div>
        )}

        {destination.travelTips && (
          <div style={{ padding: "32px", background: "var(--ivory)", borderRadius: "8px", border: "0.5px solid var(--border)", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--charcoal)", marginBottom: "16px" }}>Travel Tips for {destination.name}</h2>
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--charcoal)", lineHeight: 1.75 }}>
              <PortableText value={destination.travelTips} components={portableTextComponents} />
            </div>
          </div>
        )}

        {destination.practicalInformation && Object.values(destination.practicalInformation).some(Boolean) && (
          <div style={{ padding: "32px", background: "white", borderRadius: "8px", border: "0.5px solid var(--border)", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--charcoal)", marginBottom: "20px" }}>Practical Information</h2>
            <div className="practical-info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
              {[
                { label: "Currency", value: destination.practicalInformation.currency },
                { label: "Language", value: destination.practicalInformation.language },
                { label: "Flight Time", value: destination.practicalInformation.flightTime },
                { label: "Time Zone", value: destination.practicalInformation.timeZone },
                { label: "Visa Requirements", value: destination.practicalInformation.visaRequirements },
                { label: "Getting Around", value: destination.practicalInformation.gettingAround },
                { label: "Health", value: destination.practicalInformation.health },
                { label: "Electricity", value: destination.practicalInformation.electricity },
                { label: "Tipping", value: destination.practicalInformation.tipping },
                { label: "Ideal Stay", value: destination.practicalInformation.idealStay },
              ].filter(item => item.value).map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--border)", gap: "12px" }}>
                  <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)" }}>{item.label}</span>
                  <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--charcoal)", fontWeight: 500, textAlign: "right" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <section style={{ padding: "80px 40px", background: "var(--abyss)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(28px, 4vw, 44px)", color: "var(--pearl)", marginBottom: "16px" }}>Plan Your Unique Journey</h2>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "rgba(247,242,234,0.6)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "560px", margin: "0 auto 32px" }}>
          Every Ocean & Safari itinerary is thoughtfully designed around your individual travel style. From exclusive villas and luxury lodges to private guides, yacht charters and seamless air travel, our specialists create journeys that are as unique as the destinations themselves.
        </p>
        <Link href="/#enquire" style={{ display: "inline-block", background: "var(--gold)", color: "var(--abyss)", fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 40px", borderRadius: "4px", textDecoration: "none" }}>
          Plan My Journey
        </Link>
      </section>

    </main>
  );
}