import { getCruiseLine, getCruiseLineSlugs } from "@/sanity/lib/queries";
import EnquiryForm from "@/app/components/EnquiryForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 10;

const CATEGORY_LABELS: Record<string, string> = {
  luxury: "Luxury",
  premium: "Premium",
  contemporary: "Contemporary",
  expedition: "Expedition",
  river: "River",
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

export async function generateStaticParams() {
  const slugs = await getCruiseLineSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cruiseLine = await getCruiseLine(slug);
  return {
    title: cruiseLine ? `${cruiseLine.name} | Ocean & Safari` : "Cruise Line | Ocean & Safari",
    description: cruiseLine ? `Discover ${cruiseLine.name}, a luxury cruise line featured by Ocean & Safari.` : undefined,
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

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

      {/* ── NAVIGATION ── */}
      <nav style={{
        background: "rgba(247,242,234,0.97)",
        borderBottom: "0.5px solid var(--border)",
        padding: "0 40px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(8px)",
      }}>
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
          <Link href="/luxury-cruises" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", textDecoration: "none" }}>← Back to Luxury Cruises</Link>
          <a href="#enquire-form" style={{ background: "var(--gold)", color: "var(--pearl)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", borderRadius: "3px", textDecoration: "none" }}>Enquire Now</a>
        </div>
      </nav>

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

          {/* Description */}
          {cruiseLine.description && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "16px" }}>About {cruiseLine.name}</h2>
              <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.85 }}>{cruiseLine.description}</p>
            </div>
          )}

          {/* Highlights */}
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

          {/* Ship Classes */}
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

          {/* Destinations Served */}
          {cruiseLine.destinationsServed && cruiseLine.destinationsServed.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Destinations Served</h2>
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
