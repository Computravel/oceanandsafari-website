import {
  getExperiencesByCategory,
  getArticlesByCategory,
  getResorts,
  getCruiseLines,
  getLodges,
} from "@/sanity/lib/queries";
import Link from "next/link";
import CategoryTabs from "./CategoryTabs";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  experienceCategory: string | string[];
  articleCategory: string | string[];
  accentColor?: string;
  /**
   * Which "who" content type this category surfaces alongside its
   * Experiences. 'none' (default) hides the Who tab entirely — e.g. for
   * Unique Journeys, which doesn't have an equivalent property type.
   */
  whoType?: "resort" | "cruiseLine" | "lodge" | "none";
}

const WHO_CONFIG: Record<string, { label: string; basePath: string }> = {
  resort: { label: "Resorts & Hotels", basePath: "/ocean-islands/resorts" },
  cruiseLine: { label: "Cruise Lines", basePath: "/luxury-cruises/cruise-lines" },
  lodge: { label: "Safari Lodges & Reserves", basePath: "/safari-lodges" },
};

export default async function CategoryPage({
  title,
  subtitle,
  description,
  heroImage,
  experienceCategory,
  articleCategory,
  accentColor = "var(--teal)",
  whoType = "none",
}: Props) {
  const categories = Array.isArray(experienceCategory) ? experienceCategory : [experienceCategory];
  const articleCategories = Array.isArray(articleCategory) ? articleCategory : [articleCategory];

  const experiencePromises = categories.map(cat => getExperiencesByCategory(cat));
  const articlePromises = articleCategories.map(cat => getArticlesByCategory(cat));

  const experienceArrays = await Promise.all(experiencePromises);
  const articleArrays = await Promise.all(articlePromises);

  const experiences = experienceArrays.flat();
  const articles = articleArrays.flat();

  // Fetch the "who" content (Resorts / Cruise Lines / Safari Lodges) based
  // on which type this category uses. Each fetch function already filters
  // to published:true and is safe to call even before a schema/content
  // exists (returns []).
  let whoItems: any[] = [];
  if (whoType === "resort") whoItems = await getResorts();
  if (whoType === "cruiseLine") whoItems = await getCruiseLines();
  if (whoType === "lodge") whoItems = await getLodges();
  const whoConfig = whoType !== "none" ? WHO_CONFIG[whoType] : undefined;

  // Derive unique destination names directly from this category's
  // experiences (exp.destination is a free-text field on Experience).
  // NOTE: links assume a naive slugify matches the real destination slug —
  // worth verifying against sanity/schemaTypes/destination.ts and swapping
  // for a real lookup query if slugs differ (e.g. "Mauritius" -> "mauritius"
  // vs a custom slug).
  const destinationNames = Array.from(
    new Set(experiences.map((exp: any) => exp.destination).filter(Boolean))
  ) as string[];

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

      {/* ── EXPERIENCES / WHO / WHERE TABS ── */}
      <section style={{ padding: "64px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "var(--charcoal)",
          marginBottom: "12px",
          textAlign: "center",
        }}>Explore {subtitle}</h2>
        <p style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "16px",
          color: "var(--muted)",
          marginBottom: "40px",
          lineHeight: 1.7,
          textAlign: "center",
        }}>Hand-selected by our consultants — each experience crafted for the discerning traveller.</p>

        <CategoryTabs
          accentColor={accentColor}
          experiences={experiences}
          whoLabel={whoConfig?.label}
          whoItems={whoItems}
          whoBasePath={whoConfig?.basePath}
          destinationNames={destinationNames}
        />
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
