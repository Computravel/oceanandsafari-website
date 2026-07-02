import { getExperience, getExperienceSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperience(slug);

  if (!experience) notFound();

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
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>← Back to experiences</Link>
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
          }}>Enquire Now</Link>
        </div>
      </nav>

      {/* ── HERO IMAGE ── */}
      <div style={{
        height: "60vh",
        position: "relative",
        overflow: "hidden",
        background: "var(--abyss)",
      }}>
        {experience.heroImage && (
          <img
            src={experience.heroImage}
            alt={experience.title}
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
          }}>{experience.category}</div>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            color: "var(--pearl)",
            lineHeight: 1.15,
            marginBottom: "8px",
          }}>{experience.title}</h1>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            color: "rgba(247,242,234,0.7)",
          }}>
            {experience.duration} nights · {experience.destination}{experience.country ? `, ${experience.country}` : ""}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{
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
          {experience.description && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "32px",
                color: "var(--charcoal)",
                marginBottom: "16px",
              }}>About this experience</h2>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "18px",
                color: "var(--muted)",
                lineHeight: 1.85,
              }}>
                <PortableText value={experience.description} />
              </div>
            </div>
          )}

          {/* Highlights */}
          {experience.highlights && experience.highlights.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "32px",
                color: "var(--charcoal)",
                marginBottom: "20px",
              }}>Highlights</h2>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "18px",
                color: "var(--charcoal)",
                lineHeight: 1.8,
              }}>
                <PortableText value={experience.highlights} />
              </div>
            </div>
          )}

          {/* Included / Not Included */}
          {(experience.included?.length > 0 || experience.notIncluded?.length > 0) && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "32px",
                color: "var(--charcoal)",
                marginBottom: "20px",
              }}>What&apos;s included</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {experience.included?.length > 0 && (
                  <div>
                    <div style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--teal)",
                      marginBottom: "12px",
                    }}>Included</div>
                    <div style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "17px",
                      color: "var(--charcoal)",
                      lineHeight: 1.7,
                    }}>
                      <PortableText value={experience.included} />
                    </div>
                  </div>
                )}
                {experience.notIncluded?.length > 0 && (
                  <div>
                    <div style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--coral)",
                      marginBottom: "12px",
                    }}>Not included</div>
                    <div style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "17px",
                      color: "var(--charcoal)",
                      lineHeight: 1.7,
                    }}>
                      <PortableText value={experience.notIncluded} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Terms */}
          {experience.termsAndConditions && (
            <div style={{
              padding: "20px 24px",
              background: "var(--ivory)",
              borderRadius: "6px",
              border: "0.5px solid var(--border)",
            }}>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "10px",
              }}>Terms & Conditions</div>
              <p style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}>{experience.termsAndConditions}</p>
            </div>
          )}
        </div>

        {/* RIGHT — Booking sidebar */}
        <div style={{
          position: "sticky",
          top: "84px",
        }}>
          <div style={{
            background: "white",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(11,31,58,0.08)",
          }}>
            {/* Price header */}
            <div style={{
              background: "var(--abyss)",
              padding: "24px",
            }}>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(247,242,234,0.5)",
                marginBottom: "8px",
              }}>From</div>
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "40px",
                color: "var(--gold)",
                lineHeight: 1,
                marginBottom: "4px",
              }}>R{experience.priceFrom?.toLocaleString()}</div>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "14px",
                color: "rgba(247,242,234,0.5)",
              }}>per person</div>
            </div>

            {/* Trip details */}
            <div style={{ padding: "20px 24px" }}>
              {[
                { label: "Duration", value: experience.duration ? `${experience.duration} nights` : null },
                { label: "Destination", value: experience.destination },
                { label: "Departure city", value: experience.departureCity },
                { label: "Arrival city", value: experience.arrivalCity },
                { label: "Flights", value: experience.flights === "included" ? "✓ Included" : experience.flights === "not-included" ? "Not included" : null },
                { label: "Transfers", value: experience.transfers === "included" ? "✓ Included" : experience.transfers === "not-included" ? "Not included" : null },
                { label: "Ship", value: experience.shipName },
                { label: "Cruise line", value: experience.cruiseLine },
                { label: "Departure date", value: experience.departureDate },
                { label: "Valid from", value: experience.validFrom },
                { label: "Valid to", value: experience.validTo },
                { label: "Offer expires", value: experience.offerExpires },
                { label: "Visas", value: experience.needVisas },
                { label: "Trip reference", value: experience.tripReference },
              ].filter(item => item.value).map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "10px 0",
                  borderBottom: "0.5px solid var(--border)",
                  gap: "12px",
                }}>
                  <span style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "15px",
                    color: "var(--muted)",
                    flexShrink: 0,
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "15px",
                    color: "var(--charcoal)",
                    fontWeight: 500,
                    textAlign: "right",
                  }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Enquire button */}
            <div style={{ padding: "0 24px 24px" }}>
              <Link href="/#enquire" style={{
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
              }}>Enquire About This Trip</Link>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "14px",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "12px",
                lineHeight: 1.5,
              }}>
                One of our consultants will be in touch within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}