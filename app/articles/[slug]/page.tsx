// v3
import { getArticle, getArticleSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { linkMark } from "@/app/components/portableTextComponents";
import SiteNav from "@/app/components/SiteNav";
import type { Metadata } from "next";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  return {
    title: article?.seoTitle || article?.title || "Ocean & Safari Journal",
    description: article?.seoDescription || article?.excerpt || "",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const categoryLabel = article.category?.replace(/-/g, " ") || "";
  const getImageUrl = (asset: any) => {
    if (!asset) return null;
    if (asset.url) return asset.url;
    if (asset._ref) {
      return `https://cdn.sanity.io/images/ibvmvzmo/production/${asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`;
    }
    return null;
  };

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>
      <SiteNav />

      <div style={{ position: "relative", background: "var(--abyss)", maxHeight: "70vh", overflow: "hidden" }}>
        {article.heroImage && (
          <img src={article.heroImage} alt={article.heroImageAlt || article.title} style={{ width: "100%", height: "auto", display: "block", opacity: 0.85 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,0.8) 0%, rgba(11,31,58,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px", maxWidth: "800px" }}>
          <div style={{ display: "inline-block", fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, background: "rgba(29,165,160,0.8)", color: "white", padding: "4px 12px", borderRadius: "2px", marginBottom: "12px", backdropFilter: "blur(4px)" }}>{categoryLabel}</div>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.2, marginBottom: "12px" }}>{article.title}</h1>
          {article.publishedAt && (
            <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "rgba(247,242,234,0.6)" }}>
              {new Date(article.publishedAt).toLocaleDateString("en-ZA", { dateStyle: "long" })}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 40px" }}>
        {article.excerpt && (
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", lineHeight: 1.7, fontStyle: "italic", marginBottom: "40px", paddingBottom: "40px", borderBottom: "0.5px solid var(--border)" }}>{article.excerpt}</p>
        )}
        {article.body && (
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.85 }}>
            <PortableText
              value={article.body}
              components={{
                block: {
                  h2: ({children}: any) => <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", fontWeight: 400, marginTop: "48px", marginBottom: "16px", lineHeight: 1.3 }}>{children}</h2>,
                  h3: ({children}: any) => <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--charcoal)", fontWeight: 400, marginTop: "36px", marginBottom: "12px" }}>{children}</h3>,
                  normal: ({children}: any) => <p style={{ marginBottom: "24px", lineHeight: 1.85 }}>{children}</p>,
                },
                list: {
                  bullet: ({children}: any) => <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>{children}</ul>,
                  number: ({children}: any) => <ol style={{ paddingLeft: "24px", marginBottom: "24px" }}>{children}</ol>,
                },
                listItem: {
                  bullet: ({children}: any) => (
                    <li style={{ marginBottom: "10px", lineHeight: 1.7, listStyleType: "none", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }}>◆</span>
                      <span>{children}</span>
                    </li>
                  ),
                },
                marks: {
                  strong: ({children}: any) => <strong style={{ fontWeight: 600, color: "var(--abyss)" }}>{children}</strong>,
                  em: ({children}: any) => <em style={{ fontStyle: "italic", color: "var(--charcoal)" }}>{children}</em>,
                  link: linkMark,
                },
                types: {
                  image: ({value}: any) => {
                    const imageUrl = getImageUrl(value.asset);
                    if (!imageUrl) return null;
                    return (
                      <div style={{ margin: "40px 0" }}>
                        <img src={imageUrl} alt={value.alt || ""} style={{ width: "100%", borderRadius: "6px", objectFit: "cover" }} />
                        {value.caption && <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", textAlign: "center", marginTop: "10px", fontStyle: "italic" }}>{value.caption}</p>}
                      </div>
                    );
                  },
                  youtubeEmbed: ({value}: any) => {
                    if (!value.url) return null;
                    const match = value.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/);
                    const videoId = match ? match[1] : null;
                    if (!videoId) return null;
                    return (
                      <div style={{ margin: "40px 0" }}>
                        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", background: "var(--abyss)" }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={value.caption || "Article Video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                          />
                        </div>
                        {value.caption && <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", textAlign: "center", marginTop: "10px", fontStyle: "italic" }}>{value.caption}</p>}
                      </div>
                    );
                  },
                  uploadedVideo: ({value}: any) => {
                    if (!value.video?.url) return null;
                    return (
                      <div style={{ margin: "40px 0" }}>
                        <video controls style={{ width: "100%", borderRadius: "8px", background: "var(--abyss)" }}>
                          <source src={value.video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        {value.caption && <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", textAlign: "center", marginTop: "10px", fontStyle: "italic" }}>{value.caption}</p>}
                      </div>
                    );
                  },
                },
              }}
            />
          </div>
        )}
        {article.relatedExperiences && article.relatedExperiences.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "24px" }}>Related Experiences</h2>
            <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
              {article.relatedExperiences.map((exp: any) => (
                <Link key={exp._id} href={exp.href} style={{ textDecoration: "none" }}>
                  <div style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ height: "180px", overflow: "hidden", background: "var(--abyss)", position: "relative", flexShrink: 0 }}>
                      {exp.heroImage ? (
                        <img src={exp.heroImage} alt={exp.heroImageAlt || exp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)" }} />
                      )}
                      <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {(exp.tags && exp.tags.length > 0 ? exp.tags : exp.category ? [exp.category] : []).map((tag: string, i: number) => (
                          <div key={i} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, background: "rgba(11,31,58,0.75)", color: "white", padding: "4px 10px", borderRadius: "2px", backdropFilter: "blur(4px)" }}>{tag}</div>
                        ))}
                      </div>
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

        <div style={{ marginTop: "60px", padding: "40px", background: "var(--abyss)", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--pearl)", marginBottom: "12px" }}>Ready to experience this for yourself?</div>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "rgba(247,242,234,0.6)", lineHeight: 1.7, marginBottom: "24px" }}>Speak to an Ocean & Safari consultant and begin planning your bespoke journey today.</p>
          <Link href="/#enquire" style={{ display: "inline-block", background: "var(--gold)", color: "var(--abyss)", fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 32px", borderRadius: "4px", textDecoration: "none" }}>Plan My Exclusive Experience</Link>
        </div>
      </div>
    </main>
  );
}
