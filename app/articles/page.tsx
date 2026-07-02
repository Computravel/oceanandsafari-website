import { getArticles } from "@/sanity/lib/queries";
import Link from "next/link";

export const revalidate = 30;
export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
  const articles = await getArticles();

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
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "28px",
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}>
            <span style={{ color: "var(--abyss)" }}>O</span>
            <span style={{ color: "var(--gold)", margin: "0 2px" }}>&</span>
            <span style={{ color: "var(--teal)" }}>S</span>
          </div>
          <div style={{ width: "0.5px", height: "24px", background: "var(--border)" }} />
          <div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "var(--charcoal)",
              textTransform: "uppercase",
            }}>Ocean & Safari</div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}>Luxury Travel · by Computravel</div>
          </div>
        </Link>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link href="/" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "15px",
            color: "var(--muted)",
            textDecoration: "none",
          }}>← Back to home</Link>
          <Link href="/#enquire" style={{
            background: "var(--gold)",
            color: "var(--pearl)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "10px 20px",
            borderRadius: "3px",
            textDecoration: "none",
          }}>Plan My Journey</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "var(--abyss)",
        padding: "80px 40px 60px",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "11px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--teal)",
          fontWeight: 500,
          marginBottom: "16px",
        }}>Travel Journal</div>
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 400,
          color: "var(--pearl)",
          lineHeight: 1.2,
          marginBottom: "16px",
        }}>Stories, Guides & Inspiration</h1>
        <p style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "17px",
          color: "rgba(247,242,234,0.6)",
          maxWidth: "520px",
          margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Expert destination guides, travel inspiration and insider knowledge
          from our luxury travel specialists.
        </p>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section style={{ padding: "64px 40px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Category filter labels */}
        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}>
          {["All", "Destination Guide", "Travel Tips", "Client Stories", "Cruise Guides", "Safari Guides", "Community & Sustainability", "Travel Requirements"].map((cat) => (
            <div key={cat} style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: cat === "All" ? "var(--pearl)" : "var(--muted)",
              background: cat === "All" ? "var(--abyss)" : "transparent",
              border: "0.5px solid var(--border)",
              padding: "6px 14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}>{cat}</div>
          ))}
        </div>

        {articles && articles.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}>
            {articles.map((article: any) => (
              <Link
                key={article._id}
                href={`/articles/${article.slug?.current}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "white",
                  border: "0.5px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(11,31,58,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Image */}
                  <div style={{ height: "200px", overflow: "hidden", position: "relative", background: "var(--abyss)" }}>
                    {article.heroImage ? (
                      <img
                        src={article.heroImage}
                        alt={article.heroImageAlt || article.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)",
                      }} />
                    )}
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      background: "rgba(11,31,58,0.75)",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      backdropFilter: "blur(4px)",
                    }}>{article.category?.replace(/-/g, ' ')}</div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px" }}>
                    <h2 style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "20px",
                      color: "var(--charcoal)",
                      lineHeight: 1.3,
                      marginBottom: "10px",
                    }}>{article.title}</h2>
                    {article.excerpt && (
                      <p style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "14px",
                        color: "var(--muted)",
                        lineHeight: 1.7,
                        marginBottom: "16px",
                      }}>{article.excerpt}</p>
                    )}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "14px",
                      borderTop: "0.5px solid var(--border)",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "12px",
                        color: "var(--muted)",
                      }}>
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "12px",
                        color: "var(--gold)",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                      }}>Read more →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "80px 40px",
            color: "var(--muted)",
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "24px",
          }}>
            Articles coming soon — check back shortly.
          </div>
        )}
      </section>

    </main>
  );
}