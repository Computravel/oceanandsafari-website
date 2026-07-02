import { getArticle, getArticleSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  const categoryLabel = article.category?.replace(/-/g, ' ') || '';

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
          <Link href="/articles" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "15px",
            color: "var(--muted)",
            textDecoration: "none",
          }}>← Travel Journal</Link>
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

      {/* ── HERO IMAGE ── */}
      <div style={{
        height: "55vh",
        position: "relative",
        overflow: "hidden",
        background: "var(--abyss)",
      }}>
        {article.heroImage && (
          <img
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.85,
            }}
          />
        )}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(11,31,58,0.8) 0%, rgba(11,31,58,0.2) 60%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "40px",
          left: "40px",
          right: "40px",
          maxWidth: "800px",
        }}>
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
            backdropFilter: "blur(4px)",
          }}>{categoryLabel}</div>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 400,
            color: "var(--pearl)",
            lineHeight: 1.2,
            marginBottom: "12px",
          }}>{article.title}</h1>
          {article.publishedAt && (
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "14px",
              color: "rgba(247,242,234,0.6)",
            }}>
              {new Date(article.publishedAt).toLocaleDateString('en-ZA', { dateStyle: 'long' })}
            </div>
          )}
        </div>
      </div>

      {/* ── ARTICLE CONTENT ── */}
      <div style={{
        maxWidth: "780px",
        margin: "0 auto",
        padding: "60px 40px",
      }}>

        {/* Excerpt */}
        {article.excerpt && (
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "22px",
            color: "var(--charcoal)",
            lineHeight: 1.7,
            fontStyle: "italic",
            marginBottom: "40px",
            paddingBottom: "40px",
            borderBottom: "0.5px solid var(--border)",
          }}>{article.excerpt}</p>
        )}

        {/* Body */}
        {article.body && (
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            color: "var(--charcoal)",
            lineHeight: 1.85,
          }}>
            <PortableText
              value={article.body}
              components={{
                block: {
                  h2: ({children}: any) => (
                    <h2 style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "32px",
                      color: "var(--charcoal)",
                      fontWeight: 400,
                      marginTop: "48px",
                      marginBottom: "16px",
                      lineHeight: 1.3,
                    }}>{children}</h2>
                  ),
                  h3: ({children}: any) => (
                    <h3 style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "24px",
                      color: "var(--charcoal)",
                      fontWeight: 400,
                      marginTop: "36px",
                      marginBottom: "12px",
                    }}>{children}</h3>
                  ),
                  normal: ({children}: any) => (
                    <p style={{
                      marginBottom: "24px",
                      lineHeight: 1.85,
                    }}>{children}</p>
                  ),
                },
                list: {
                  bullet: ({children}: any) => (
                    <ul style={{
                      paddingLeft: "24px",
                      marginBottom: "24px",
                    }}>{children}</ul>
                  ),
                  number: ({children}: any) => (
                    <ol style={{
                      paddingLeft: "24px",
                      marginBottom: "24px",
                    }}>{children}</ol>
                  ),
                },
                listItem: {
                  bullet: ({children}: any) => (
                    <li style={{
                      marginBottom: "10px",
                      lineHeight: 1.7,
                      listStyleType: "none",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}>
                      <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }}>◆</span>
                      <span>{children}</span>
                    </li>
                  ),
                },
                marks: {
                  strong: ({children}: any) => (
                    <strong style={{ fontWeight: 600, color: "var(--abyss)" }}>{children}</strong>
                  ),
                  em: ({children}: any) => (
                    <em style={{ fontStyle: "italic", color: "var(--charcoal)" }}>{children}</em>
                  ),
                },
                types: {
                  image: ({value}: any) => {
                    const imageurl = value.asset?.url ||
                      (value.asset?._ref
                        ? `https://cdn.sanity.io/images/ibvmvzmo/production/${value.asset._ref
                            .replace('image-', '')
                            .replace(/-(\w+)$/, '.$1')}`
                        : null);
                    if (!imageurl) return null;
                    return (
                      <div style={{ margin: "40px 0" }}>
                        <img
                          src={imageurl}
                          alt={value.alt || ""}
                          style={{
                            width: "100%",
                            borderradius: "6px",
                            objectfit: "cover",
                          }}
                        />
                        {value.caption && (
                          <p style={{
                            fontfamily: "var(--font-jost), sans-serif",
                            fontsize: "13px",
                            color: "var(--muted)",
                            textalign: "center",
                            margintop: "10px",
                            fontstyle: "italic",
                          }}>{value.caption}</p>
                        )}
                      </div>
                    );
                  },
                },
                        alt={value.alt || ""}
                        style={{
                          width: "100%",
                          borderRadius: "6px",
                          objectFit: "cover",
                        }}
                      />
                      {value.caption && (
                        <p style={{
                          fontFamily: "var(--font-jost), sans-serif",
                          fontSize: "13px",
                          color: "var(--muted)",
                          textAlign: "center",
                          marginTop: "10px",
                          fontStyle: "italic",
                        }}>{value.caption}</p>
                      )}
                    </div>
                  ),
                },
              }}
            />
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: "60px",
          padding: "40px",
          background: "var(--abyss)",
          borderRadius: "12px",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "28px",
            color: "var(--pearl)",
            marginBottom: "12px",
          }}>Ready to experience this for yourself?</div>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            color: "rgba(247,242,234,0.6)",
            lineHeight: 1.7,
            marginBottom: "24px",
          }}>
            Speak to an Ocean & Safari consultant and begin planning
            your bespoke journey today.
          </p>
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
            borderRadius: "4px",
            textDecoration: "none",
          }}>Plan My Exclusive Experience</Link>
        </div>
      </div>

    </main>
  );
}