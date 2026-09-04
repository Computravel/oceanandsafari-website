import { getCruiseLine, getCruiseLineSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import EnquiryForm from "@/app/components/EnquiryForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExperienceGallery from "@/app/components/ExperienceGallery";
import { linkMark } from "@/app/components/portableTextComponents";
import SiteNav from "@/app/components/SiteNav";
import type { Metadata } from "next";

export const revalidate = 10;

const CATEGORY_LABELS: Record<string, string> = {
  luxury: "Luxury",
  premium: "Premium",
  contemporary: "Contemporary",
  expedition: "Expedition",
  river: "River",
};

const WHO_IS_IT_FOR_LABELS: Record<string, string> = {
  couples: "Couples",
  families: "Families",
  multigenerational: "Multigenerational",
  solo: "Solo Travellers",
  honeymooners: "Honeymooners",
  groups: "Groups of Friends",
};

const AT_A_GLANCE_LABELS: Record<string, string> = {
  founded: "Founded",
  fleetSize: "Fleet Size",
  flagship: "Flagship",
  onboardCurrency: "Onboard Currency",
  gratuities: "Gratuities",
  dressCode: "Dress Code",
  idealVoyageLength: "Ideal Voyage Length",
  pricePositioning: "Price Positioning",
};

const portableTextComponents = {
  marks: {
    strong: ({ children }: any) => <strong style={{ fontWeight: 600, color: "var(--abyss)" }}>{children}</strong>,
    link: linkMark,
  },
  list: {
    bullet: ({ children }: any) => <ul style={{ paddingLeft: "0", margin: "8px 0", listStyle: "none" }}>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "4px" }}>◆</span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const imageUrl = value.asset?.url;
      if (!imageUrl) return null;
      return (
        <div style={{ margin: "32px 0" }}>
          <img src={imageUrl} alt={value.alt || ""} style={{ width: "100%", borderRadius: "6px", objectFit: "cover", maxHeight: "480px" }} />
          {value.caption && (
            <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", textAlign: "center", marginTop: "8px", fontStyle: "italic" }}>{value.caption}</p>
          )}
        </div>
      );
    },
    youtubeEmbed: ({ value }: any) => {
      if (!value.url) return null;
      const match = value.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/);
      const videoId = match ? match[1] : null;
      if (!videoId) return null;
      return (
        <div style={{ margin: "32px 0" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", background: "var(--abyss)" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={value.caption || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          {value.caption && (
            <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", textAlign: "center", marginTop: "8px", fontStyle: "italic" }}>{value.caption}</p>
          )}
        </div>
      );
    },
  },
};

function renderVideo(video: any, i: number) {
  return (
    <div key={i} style={{ marginBottom: "32px" }}>
      {video._type === "youtubeEmbed" && video.url && (() => {
        const match = video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/);
        const videoId = match ? match[1] : null;
        if (!videoId) return null;
        return (
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <div style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "8px",
              background: "var(--abyss)",
              width: "100%",
              maxWidth: "100%",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.caption || "Cruise Line Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
            {video.caption && (
              <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", textAlign: "center", marginTop: "10px", fontStyle: "italic" }}>{video.caption}</p>
            )}
          </div>
        );
      })()}
      {video._type === "uploadedVideo" && video.video?.url && (
        <div>
          <video controls style={{ width: "100%", borderRadius: "8px", background: "var(--abyss)" }}>
            <source src={video.video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {video.caption && (
            <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", textAlign: "center", marginTop: "10px", fontStyle: "italic" }}>{video.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ heading, value }: { heading: string; value: any }) {
  if (!value || value.length === 0) return null;
  return (
    <div style={{ marginBottom: "48px" }}>
      <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "16px" }}>{heading}</h2>
      <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.85 }}>
        <PortableText value={value} components={portableTextComponents} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getCruiseLineSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cruiseLine = await getCruiseLine(slug);
  return {
    title: cruiseLine?.seoTitle || (cruiseLine ? `${cruiseLine.name} | Ocean & Safari` : "Cruise Line | Ocean & Safari"),
    description: cruiseLine?.seoDescription || (cruiseLine ? `Discover ${cruiseLine.name}, a luxury cruise line featured by Ocean & Safari.` : undefined),
  };
}

export default async function CruiseLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cruiseLine = await getCruiseLine(slug);

  if (!cruiseLine) notFound();

  const lifeOnBoard = cruiseLine.lifeOnBoard || {};
  const hasLifeOnBoard = lifeOnBoard.dining?.length || lifeOnBoard.wellness?.length || lifeOnBoard.entertainment?.length || lifeOnBoard.enrichment?.length;
  const atAGlanceEntries = cruiseLine.atAGlance
    ? Object.entries(cruiseLine.atAGlance).filter(([, value]) => value)
    : [];

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

      {/* ── NAVIGATION ── */}
      <SiteNav ctaHref="#enquire-form" ctaLabel="Enquire Now" />

      {/* ── HEADER (no hero image field on this schema — logo-led banner instead) ── */}
      <div style={{ background: "var(--abyss)", padding: "64px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
          {cruiseLine.logo && (
            <div style={{ width: "120px", height: "120px", flexShrink: 0, background: "white", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={cruiseLine.logo} alt={cruiseLine.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
          )}
          <div>
            {cruiseLine.category && (
              <div style={{
                display: "inline-block",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
                background: "rgba(29,165,160,0.8)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "2px",
                marginBottom: "12px",
              }}>{CATEGORY_LABELS[cruiseLine.category] || cruiseLine.category}</div>
            )}
            <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.15, marginBottom: "8px" }}>{cruiseLine.name}</h1>
            {cruiseLine.starRating && (
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--gold)" }}>{"★".repeat(cruiseLine.starRating)}</div>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="experience-content-grid" style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: "48px",
        alignItems: "start",
      }}>

        {/* LEFT — Main content */}
        <div>

          {/* Legacy Description — kept until migrated into 01/02/etc. below */}
          {cruiseLine.description && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "16px" }}>About {cruiseLine.name}</h2>
              <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{cruiseLine.description}</p>
            </div>
          )}

          {/* Legacy Highlights — kept until migrated */}
          {cruiseLine.highlights && cruiseLine.highlights.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Highlights</h2>
              <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none", fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.8 }}>
                {cruiseLine.highlights.map((h: string, i: number) => (
                  <li key={i} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "4px" }}>◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 01 — The Cruise Line */}
          <Section heading="The Cruise Line" value={cruiseLine.section01Introduction} />

          {/* 02 — The Experience */}
          <Section heading="The Experience" value={cruiseLine.section02Experience} />

          {/* 03 — Life On Board */}
          {hasLifeOnBoard && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>Life On Board</h2>
              {[
                { label: "Dining", value: lifeOnBoard.dining },
                { label: "Wellness", value: lifeOnBoard.wellness },
                { label: "Entertainment", value: lifeOnBoard.entertainment },
                { label: "Enrichment", value: lifeOnBoard.enrichment },
              ].filter(s => s.value?.length).map((s, i) => (
                <div key={i} style={{ marginBottom: "28px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--teal)", marginBottom: "10px" }}>{s.label}</h3>
                  <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "var(--charcoal)", lineHeight: 1.8 }}>
                    <PortableText value={s.value} components={portableTextComponents} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 04 — Suites & Accommodation */}
          <Section heading="Suites & Accommodation" value={cruiseLine.section04Accommodation} />
          <ExperienceGallery gallery={cruiseLine.accommodationGallery || []} title="Suites & Accommodation Gallery" />

          {/* 05 — Destinations */}
          <Section heading="Destinations" value={cruiseLine.section05Destinations} />
          {cruiseLine.destinationsServed && cruiseLine.destinationsServed.length > 0 && (
            <div style={{ marginBottom: "48px", marginTop: "-24px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {cruiseLine.destinationsServed.map((d: string, i: number) => (
                  <span key={i} style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "14px",
                    color: "var(--charcoal)",
                    background: "var(--ivory)",
                    border: "0.5px solid var(--border)",
                    padding: "8px 16px",
                    borderRadius: "20px",
                  }}>{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* 06 — Signature Experiences */}
          {cruiseLine.signatureExperiences && cruiseLine.signatureExperiences.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: cruiseLine.signatureExperiencesIntro ? "12px" : "20px" }}>Signature Experiences</h2>
              {cruiseLine.signatureExperiencesIntro && (
                <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "28px" }}>{cruiseLine.signatureExperiencesIntro}</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {cruiseLine.signatureExperiences.map((item: { title: string; description?: string }, i: number) => (
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

          {/* 07 — Why Choose Them? */}
          <Section heading="Why Choose Them?" value={cruiseLine.section07WhyChooseThem} />

          {/* Legacy Ship Classes — kept, factual list */}
          {cruiseLine.shipClasses && cruiseLine.shipClasses.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Ship Classes</h2>
              <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none", fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.8 }}>
                {cruiseLine.shipClasses.map((s: string, i: number) => (
                  <li key={i} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "4px" }}>◆</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 08 — Who Is It For? */}
          {cruiseLine.whoIsItFor && cruiseLine.whoIsItFor.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Who Is It For?</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {cruiseLine.whoIsItFor.map((tag: string, i: number) => (
                  <span key={i} style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "14px",
                    color: "var(--charcoal)",
                    background: "var(--ivory)",
                    border: "0.5px solid var(--border)",
                    padding: "8px 16px",
                    borderRadius: "20px",
                  }}>{WHO_IS_IT_FOR_LABELS[tag] || tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* 09 — When to Go */}
          {cruiseLine.whenToGo && cruiseLine.whenToGo.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>When to Go</h2>
              {cruiseLine.whenToGo.map((season: any, i: number) => (
                <div key={i} style={{ marginBottom: "18px", paddingBottom: "18px", borderBottom: i < cruiseLine.whenToGo.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", fontWeight: 600, color: "var(--teal)", marginBottom: "6px" }}>{season.period}</div>
                  {season.description && (
                    <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{season.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 10 — Our Perspective */}
          <Section heading="Our Perspective" value={cruiseLine.ourPerspective} />

          {/* 11 — Selected Voyages */}
          {cruiseLine.selectedVoyages && cruiseLine.selectedVoyages.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>Selected Voyages</h2>
              <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                {cruiseLine.selectedVoyages.map((exp: any) => (
                  <Link key={exp._id} href={`/experiences/${exp.slug?.current}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                      <div style={{ height: "180px", overflow: "hidden", background: "var(--abyss)", position: "relative", flexShrink: 0 }}>
                        {exp.heroImage ? (
                          <img src={exp.heroImage} alt={exp.heroImageAlt || exp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                        )}
                      </div>
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", marginBottom: "6px", lineHeight: 1.3 }}>{exp.title}</div>
                        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", marginBottom: "16px" }}>
                          {[exp.duration ? `${exp.duration} nights` : null, exp.destination].filter(Boolean).join(" · ")}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "0.5px solid var(--border)", marginTop: "auto" }}>
                          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", fontWeight: 500, color: "var(--gold)" }}>
                            {exp.priceFrom ? <>From R{exp.priceFrom.toLocaleString()} <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 400 }}>pp</span></> : ""}
                          </div>
                          <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pearl)", background: "var(--indigo)", padding: "8px 16px", borderRadius: "3px", fontWeight: 500 }}>View</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 12 — At a Glance */}
          {atAGlanceEntries.length > 0 && (
            <div style={{ padding: "32px", background: "var(--ivory)", borderRadius: "8px", border: "0.5px solid var(--border)", marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--charcoal)", marginBottom: "20px" }}>At a Glance</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                {atAGlanceEntries.map(([key, value], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--border)", gap: "12px" }}>
                    <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)" }}>{AT_A_GLANCE_LABELS[key] || key}</span>
                    <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--charcoal)", fontWeight: 500, textAlign: "right" }}>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {cruiseLine.videos && cruiseLine.videos.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Watch &amp; Explore</h2>
              {cruiseLine.videos.map((video: any, i: number) => renderVideo(video, i))}
            </div>
          )}
        </div>

        {/* RIGHT — Sidebar */}
        <div className="experience-sidebar" style={{ position: "sticky", top: "84px" }}>
          <div style={{
            background: "white",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(11,31,58,0.08)",
          }}>
            <div style={{ padding: "20px 24px" }}>
              {[
                { label: "Category", value: cruiseLine.category ? (CATEGORY_LABELS[cruiseLine.category] || cruiseLine.category) : null },
                { label: "Star Rating", value: cruiseLine.starRating ? "★".repeat(cruiseLine.starRating) : null },
                { label: "Destinations", value: cruiseLine.destinationsServed?.join(", ") },
              ].filter(item => item.value).map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "10px 0",
                  borderBottom: "0.5px solid var(--border)",
                  gap: "12px",
                }}>
                  <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--charcoal)", fontWeight: 500, textAlign: "right" }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "0 24px 24px" }}>
              <a href="#enquire-form" style={{
                display: "block",
                width: "100%",
                background: "var(--gold)",
                color: "var(--abyss)",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "16px",
                borderRadius: "6px",
                textDecoration: "none",
                textAlign: "center",
              }}>Enquire Now</a>
              <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--muted)", textAlign: "center", marginTop: "12px", lineHeight: 1.5 }}>
                One of our consultants will be in touch within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquire-form" style={{ padding: "80px 40px", background: "var(--ivory)", borderTop: "0.5px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "12px", textAlign: "center" }}>Enquire About This Cruise Line</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(28px, 4vw, 40px)", color: "var(--charcoal)", textAlign: "center", marginBottom: "12px" }}>{cruiseLine.name}</h2>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--muted)", textAlign: "center", lineHeight: 1.7, marginBottom: "40px" }}>
            One of our consultants will be in touch within 24 hours to begin crafting your personalised voyage.
          </p>
          <EnquiryForm
            experienceTitle={cruiseLine.name}
            experienceUrl={`https://oceanandsafari.com/luxury-cruises/cruise-lines/${cruiseLine.slug?.current}`}
          />
        </div>
      </section>

    </main>
  );
}
