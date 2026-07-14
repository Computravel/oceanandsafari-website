import { getExperiencesByCategory, getArticlesByCategory } from "@/sanity/lib/queries";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  experienceCategory: string | string[];
  articleCategory: string | string[];
  accentColor?: string;
}

export default async function CategoryPage({
  title,
  subtitle,
  description,
  heroImage,
  experienceCategory,
  articleCategory,
  accentColor = "var(--teal)",
}: Props) {
  const categories = Array.isArray(experienceCategory) ? experienceCategory : [experienceCategory];
  const articleCategories = Array.isArray(articleCategory) ? articleCategory : [articleCategory];

  const experiencePromises = categories.map(cat => getExperiencesByCategory(cat));
  const articlePromises = articleCategories.map(cat => getArticlesByCategory(cat));

  const experienceArrays = await Promise.all(experiencePromises);
  const articleArrays = await Promise.all(articlePromises);

  const experiences = experienceArrays.flat();
  const articles = articleArrays.flat();

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
          <Link href="/" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", textDecoration: "none" }}>← Back to home</Link>
          <Link href="/#enquire" style={{ background: "var(--gold)", color: "var(--pearl)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", borderRadius: "3px", textDecoration: "none" }}>Plan My Journey</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "var(--abyss)",
        padding: "100px 40px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: accentColor,
            fontWeight: 500,
            marginBottom: "16px",
          }}>Ocean & Safari</div>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(40px, 6vw, 68px)",
            fontWeight: 400,
            color: "var(--pearl)",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}>{title}</h1>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "17px",
            color: "rgba(247,242,234,0.7)",
            lineHeight: 1.8,
            marginBottom: "32px",
          }}>{description}</p>
          <Link href="/#enquire" style={{
            display: "inline-block",
            background: "var(--gold)",
            color: "var(--abyss)",
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: "3px",
            textDecoration: "none",
          }}>Plan My {subtitle}</Link>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section style={{ padding: "64px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "var(--charcoal)",
          marginBottom: "12px",
        }}>{subtitle} Experiences</h2>
        <p style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "16px",
          color: "var(--muted)",
          marginBottom: "40px",
          lineHeight: 1.7,
        }}>Hand-selected by our consultants — each experience crafted for the discerning traveller.</p>

        {experiences.length > 0 ? (
          <div className="packages-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}>
            {experiences.map((exp: any) => (
              <Link key={exp._id} href={`/experiences/${exp.slug?.current}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "white",
                  border: "0.5px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}>
                  <div style={{ height: "220px", position: "relative", overflow: "hidden", background: "var(--abyss)", flexShrink: 0 }}>
                    {exp.heroImage ? (
                      <img src={exp.heroImage} alt={exp.heroImageAlt || exp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                    )}
                    <div style={{
                      position: "absolute", top: "12px", left: "12px",
                      fontFamily: "var(--font-jost), sans-serif", fontSize: "11px",
                      letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500,
                      background: "rgba(11,31,58,0.75)", color: "white",
                      padding: "4px 10px", borderRadius: "2px", backdropFilter: "blur(4px)",
                    }}>{exp.category}</div>
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", marginBottom: "6px", lineHeight: 1.3 }}>{exp.title}</div>
                    <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", marginBottom: "16px" }}>{exp.duration} nights · {exp.destination}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "0.5px solid var(--border)", marginTop: "auto" }}>
                      <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", fontWeight: 500, color: "var(--gold)" }}>
                        From R{exp.priceFrom?.toLocaleString()} <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 400 }}>pp</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pearl)", background: "var(--indigo)", padding: "9px 18px", borderRadius: "3px", fontWeight: 500 }}>View details</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "60px 40px",
            fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--muted)",
            border: "0.5px solid var(--border)", borderRadius: "8px",
          }}>
            New experiences coming soon — speak to a consultant to plan your bespoke journey.
          </div>
        )}
      </section>

      {/* ── RELATED ARTICLES ── */}
      {articles.length > 0 && (
        <section style={{ padding: "64px 40px", background: "var(--abyss)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif", fontSize: "11px",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: accentColor, fontWeight: 500, marginBottom: "12px",
            }}>Travel Journal</div>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--pearl)", marginBottom: "40px",
            }}>Expert Guides & Inspiration</h2>
            <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {articles.map((article: any) => (
                <Link key={article._id} href={`/articles/${article.slug?.current}`} style={{ textDecoration: "none", display: "flex" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", width: "100%",
                  }}>
                    <div style={{ height: "180px", overflow: "hidden", position: "relative", background: "var(--indigo)", flexShrink: 0 }}>
                      {article.heroImage ? (
                        <img src={article.heroImage} alt={article.heroImageAlt || article.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                      )}
                    </div>
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--pearl)", lineHeight: 1.3, marginBottom: "10px" }}>{article.title}</h3>
                      {article.excerpt && (
                        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "rgba(247,242,234,0.55)", lineHeight: 1.7, marginBottom: "16px", flex: 1 }}>{article.excerpt}</p>
                      )}
                      <div style={{ paddingTop: "14px", borderTop: "0.5px solid rgba(255,255,255,0.1)", marginTop: "auto" }}>
                        <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", color: "var(--gold)", fontWeight: 500, letterSpacing: "0.06em" }}>Read more →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/articles" style={{
                fontFamily: "var(--font-jost), sans-serif", fontSize: "14px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--gold)", textDecoration: "none", fontWeight: 500,
              }}>View all articles →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: "80px 40px", background: "var(--ivory)", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          color: "var(--charcoal)", marginBottom: "16px",
        }}>Ready to plan your {subtitle.toLowerCase()}?</h2>
        <p style={{
          fontFamily: "var(--font-jost), sans-serif", fontSize: "17px",
          color: "var(--muted)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px",
        }}>Speak to an Ocean & Safari consultant and begin planning your bespoke journey today.</p>
        <Link href="/#enquire" style={{
          display: "inline-block", background: "var(--gold)", color: "var(--abyss)",
          fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 40px",
          borderRadius: "4px", textDecoration: "none",
        }}>Plan My Exclusive Experience</Link>
      </section>

    </main>
  );
}