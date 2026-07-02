"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

interface Experience {
  _id: string;
  title: string;
  category: string;
  destination: string;
  country: string;
  duration: number;
  priceFrom: number;
  heroImage: string;
  description: string;
  slug: { current: string };
}

interface ExclusiveEscape {
  _id: string;
  title: string;
  description: string;
  heroImage: string;
  originalPrice: number;
  offerPrice: number;
  expiryDate: string;
  linkedExperience: string;
}

interface Props {
  experiences: Experience[];
  exclusiveEscapes: ExclusiveEscape[];
}

export default function HomeClient({ experiences, exclusiveEscapes }: Props) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", destination: "", message: ""
  });

  // Pre-fill experience from URL and scroll to form
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const experience = params.get("experience");
    if (experience) {
      setFormData(prev => ({ ...prev, destination: experience }));
      // Small delay to ensure page has rendered before scrolling
      setTimeout(() => {
        const enquireSection = document.getElementById("enquire");
        if (enquireSection) {
          enquireSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    const { error } = await supabase
      .from("enquiries")
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        message: formData.message,
      }]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    try {
      await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    setStatus("success");
    setFormData({ name: "", email: "", phone: "", destination: "", message: "" });
  };

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif" }}>

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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "28px",
            color: "var(--abyss)",
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
        </div>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["Destinations", "Experiences", "Cruises", "About"].map((item) => (
            <Link key={item} href="#" style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "18px",
              letterSpacing: "0.08em",
              color: "var(--charcoal)",
              textDecoration: "none",
              opacity: 0.75,
            }}>{item}</Link>
          ))}
          <Link href="#enquire" style={{
            background: "var(--gold)",
            color: "var(--pearl)",
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "12px 24px",
            borderRadius: "3px",
            textDecoration: "none",
          }}>Plan My Journey</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "80px 40px",
      }}>
        <video autoPlay muted loop playsInline style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.65) 50%, rgba(11,31,58,0.3) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(29,165,160,0.12) 0%, transparent 60%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          top: "20%", right: "10%",
          width: "400px", height: "400px",
          borderRadius: "50%",
          border: "0.5px solid rgba(201,168,76,0.2)",
          zIndex: 1,
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "640px" }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "13px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--teal)",
            fontWeight: 500,
            marginBottom: "20px",
          }}>South Africa&apos;s Luxury Travel Specialists</div>

          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 7vw, 82px)",
            fontWeight: 400,
            color: "var(--pearl)",
            lineHeight: 1.15,
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}>
            Your luxury experience<br />
            begins the moment<br />
            <em style={{ color: "var(--gold)" }}>we connect</em>
          </h1>

          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            color: "rgba(247,242,234,0.75)",
            lineHeight: 1.85,
            marginBottom: "36px",
            maxWidth: "500px",
          }}>
            Expert advice, personal attention, and seamless planning —
            from your first enquiry to your last day away. Every journey
            we craft is an extraordinary experience.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="#enquire" style={{
              background: "var(--gold)",
              color: "var(--abyss)",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "16px 32px",
              borderRadius: "3px",
              textDecoration: "none",
              display: "inline-block",
            }}>Plan My Exclusive Experience</a>
            <a href="#packages" style={{
              color: "rgba(247,242,234,0.75)",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>Browse experiences <span style={{ color: "var(--teal)" }}>→</span></a>
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "52px",
            paddingTop: "32px",
            borderTop: "0.5px solid rgba(255,255,255,0.1)",
          }}>
            {["ASATA Member", "IATA Accredited", "25+ Years Experience", "A Computravel Company"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  color: "rgba(247,242,234,0.6)",
                }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(247,242,234,0.4)",
          }}>Scroll</div>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
          }} />
        </div>
      </section>

      {/* ── USP PILLARS ── */}
      <section style={{
        background: "var(--pearl)",
        padding: "64px 40px",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(18px, 2.5vw, 24px)",
          fontWeight: 400,
          color: "var(--charcoal)",
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: "580px",
          margin: "0 auto 48px",
          fontStyle: "italic",
        }}>
          &ldquo;True value lies in expert advice, personal attention,
          and seamless planning — from your first enquiry to your last day away.&rdquo;
        </p>

        <div className="usp-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "0.5px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {[
            { icon: "✦", title: "Personal consultant", desc: "One dedicated specialist handles your entire journey from first enquiry to final farewell", color: "var(--gold)" },
            { icon: "◈", title: "Exclusive access", desc: "Official partner relationships with Thompsons mean benefits no algorithm can find", color: "var(--teal)" },
            { icon: "◎", title: "Every detail managed", desc: "From transfers to insurance — nothing is left to chance, nothing left to worry about", color: "var(--cobalt)" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "36px 28px",
              borderRight: i < 2 ? "0.5px solid var(--border)" : "none",
              background: "white",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "22px", color: item.color, marginBottom: "16px" }}>{item.icon}</div>
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "20px",
                color: "var(--charcoal)",
                marginBottom: "10px",
              }}>{item.title}</div>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DUAL AUDIENCE ── */}
      <section className="dual-section" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <div style={{ padding: "56px 48px", background: "var(--abyss)", borderRight: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--teal)",
            background: "rgba(29,165,160,0.12)",
            padding: "4px 10px",
            borderRadius: "2px",
            marginBottom: "20px",
          }}>Personalised Planning</div>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--pearl)",
            lineHeight: 1.25,
            marginBottom: "16px",
          }}>Design your unique journey</h2>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            color: "rgba(247,242,234,0.55)",
            lineHeight: 1.8,
            marginBottom: "28px",
          }}>
            Tell us where you dream of going. Our consultants work with
            officially appointed luxury travel representatives to craft an itinerary
            built entirely around you.
          </p>
          <Link href="#enquire" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>Start a conversation <span>→</span></Link>
        </div>

        <div style={{ padding: "56px 48px", background: "var(--ivory)" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--cobalt)",
            background: "rgba(26,110,168,0.1)",
            padding: "4px 10px",
            borderRadius: "2px",
            marginBottom: "20px",
          }}>Ready to Reserve</div>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--charcoal)",
            lineHeight: 1.25,
            marginBottom: "16px",
          }}>Browse our curated experiences</h2>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            color: "var(--muted)",
            lineHeight: 1.8,
            marginBottom: "28px",
          }}>
            Curated by our consultants and available at your convenience.
            Browse safaris, island escapes, cruises, and more —
            fully planned, ready when you are.
          </p>
          <Link href="#packages" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--cobalt)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>See all experiences <span>→</span></Link>
        </div>
      </section>

      {/* ── FEATURED EXPERIENCES — FROM SANITY ── */}
      <section id="packages" style={{
        padding: "64px 40px",
        background: "var(--pearl)",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "32px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "var(--charcoal)",
          }}>Featured experiences</h2>
          <Link href="#" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "17px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
            fontWeight: 500,
          }}>View all →</Link>
        </div>

        {experiences && experiences.length > 0 ? (
          <div className="packages-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}>
            {experiences.map((pkg) => (
            <Link key={pkg._id} href={`/experiences/${pkg.slug?.current}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "white",
                  border: "0.5px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
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
                <div style={{ height: "220px", position: "relative", overflow: "hidden" }}>
                  {pkg.heroImage ? (
                    <img
                      src={pkg.heroImage}
                      alt={pkg.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
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
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    background: "rgba(11,31,58,0.75)",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "2px",
                    backdropFilter: "blur(4px)",
                  }}>{pkg.category}</div>
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "60px",
                    background: "linear-gradient(to top, rgba(11,31,58,0.5), transparent)",
                  }} />
                </div>

                <div style={{ padding: "20px" }}>
                  <div style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "22px",
                    color: "var(--charcoal)",
                    marginBottom: "6px",
                    lineHeight: 1.3,
                  }}>{pkg.title}</div>
                  <div style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "15px",
                    color: "var(--muted)",
                    marginBottom: "16px",
                  }}>{pkg.duration} nights · {pkg.destination}</div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "0.5px solid var(--border)",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "var(--gold)",
                    }}>From R{pkg.priceFrom?.toLocaleString()} <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 400 }}>pp</span></div>
                    <span style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--pearl)",
                      textDecoration: "none",
                      background: "var(--indigo)",
                      padding: "9px 18px",
                      borderRadius: "3px",
                      fontWeight: 500,
                    }}>View details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </div>
        ) : (
          <div className="packages-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}>
            {[
              { image: "/serengeti.jpg", category: "Safari", title: "Serengeti & Zanzibar", nights: "10 nights · Tanzania", price: "From R42,500" },
              { image: "/mediterranean.jpg", category: "Cruise", title: "Seabourne Cruise Experience", nights: "12 nights · Luxury Ocean Cruise", price: "From R38,900" },
              { image: "/mauritius.jpg", category: "Island", title: "Mauritius Escape", nights: "7 nights · Beachfront villa", price: "From R54,200" },
              { image: "/maldives.jpg", category: "Island", title: "Maldives Overwater", nights: "8 nights · Private villa", price: "From R78,000" },
              { image: "/okavango.jpg", category: "Safari", title: "Okavango & Victoria Falls", nights: "9 nights · Botswana & Zimbabwe", price: "From R65,500" },
              { image: "/seychelles.jpg", category: "Island", title: "Seychelles Island Escape", nights: "10 nights · Private island", price: "From R92,000" },
            ].map((pkg, i) => (
              <div key={i}
                style={{
                  background: "white",
                  border: "0.5px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div style={{ height: "220px", position: "relative", overflow: "hidden" }}>
                  <img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{
                    position: "absolute",
                    top: "12px", left: "12px",
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    background: "rgba(11,31,58,0.75)",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "2px",
                  }}>{pkg.category}</div>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "22px",
                    color: "var(--charcoal)",
                    marginBottom: "6px",
                  }}>{pkg.title}</div>
                  <div style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "15px",
                    color: "var(--muted)",
                    marginBottom: "16px",
                  }}>{pkg.nights}</div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "0.5px solid var(--border)",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "var(--gold)",
                    }}>{pkg.price} <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 400 }}>pp</span></div>
                    <a href="#enquire" style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--pearl)",
                      textDecoration: "none",
                      background: "var(--indigo)",
                      padding: "9px 18px",
                      borderRadius: "3px",
                      fontWeight: 500,
                    }}>Enquire</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── EXCLUSIVE ESCAPES — FROM SANITY ── */}
      {exclusiveEscapes && exclusiveEscapes.length > 0 && (
        <section style={{
          padding: "64px 40px",
          background: "var(--abyss)",
          borderBottom: "0.5px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "32px",
          }}>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--pearl)",
            }}>Exclusive Escapes</h2>
            <span style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "13px",
              color: "var(--gold)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>Limited availability</span>
          </div>

          <div className="packages-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}>
            {exclusiveEscapes.map((escape) => (
              <div key={escape._id} style={{
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(201,168,76,0.3)",
                borderRadius: "8px",
                overflow: "hidden",
              }}>
                {escape.heroImage && (
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img
                      src={escape.heroImage}
                      alt={escape.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ padding: "20px" }}>
                  <div style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "22px",
                    color: "var(--pearl)",
                    marginBottom: "8px",
                  }}>{escape.title}</div>
                  <div style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "14px",
                    color: "rgba(247,242,234,0.55)",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                  }}>{escape.description}</div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "0.5px solid rgba(255,255,255,0.08)",
                  }}>
                    <div>
                      {escape.originalPrice && (
                        <div style={{
                          fontFamily: "var(--font-jost), sans-serif",
                          fontSize: "13px",
                          color: "rgba(247,242,234,0.35)",
                          textDecoration: "line-through",
                        }}>R{escape.originalPrice?.toLocaleString()}</div>
                      )}
                      <div style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "var(--gold)",
                      }}>R{escape.offerPrice?.toLocaleString()} <span style={{ fontSize: "12px", fontWeight: 400, color: "rgba(247,242,234,0.4)" }}>pp</span></div>
                    </div>
                    <a href="#enquire" style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--abyss)",
                      textDecoration: "none",
                      background: "var(--gold)",
                      padding: "9px 18px",
                      borderRadius: "3px",
                      fontWeight: 500,
                    }}>Enquire</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TESTIMONIAL ── */}
      <section style={{
        background: "var(--abyss)",
        padding: "64px 40px",
        borderBottom: "0.5px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
        }}>
          <div style={{
            width: "3px",
            minHeight: "80px",
            background: "var(--gold)",
            borderRadius: "2px",
            flexShrink: 0,
            marginTop: "4px",
          }} />
          <div>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(20px, 2.5vw, 26px)",
              color: "rgba(247,242,234,0.82)",
              lineHeight: 1.75,
              fontStyle: "italic",
              marginBottom: "20px",
            }}>
              &ldquo;They didn&apos;t just book our holiday — they understood
              exactly what we needed before we even did. Every detail was
              perfect, from the moment we called to the moment we returned home.
              This is the only way to travel.&rdquo;
            </p>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "17px",
              color: "rgba(247,242,234,0.4)",
              letterSpacing: "0.1em",
            }}>
              <span style={{ color: "rgba(247,242,234,0.7)", fontWeight: 500 }}>Sandra & Mark T.</span>
              {" "}· Mauritius honeymoon, 2024
              <span style={{ color: "var(--gold)", marginLeft: "8px" }}>★★★★★</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquire" style={{
        padding: "80px 40px",
        background: "var(--ivory)",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--teal)",
            fontWeight: 500,
            marginBottom: "12px",
            textAlign: "center",
          }}>Start Planning</div>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(30px, 4vw, 44px)",
            color: "var(--charcoal)",
            textAlign: "center",
            marginBottom: "12px",
          }}>Tell us about your dream journey</h2>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "17px",
            color: "var(--muted)",
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}>
            One of our consultants will be in touch within 24 hours
            to begin crafting your personalised itinerary.
          </p>

          <div className="enquiry-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: "var(--charcoal)",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}>Full name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "0.5px solid var(--border)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "16px",
                  color: "var(--charcoal)",
                  background: "white",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: "var(--charcoal)",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}>Email address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "0.5px solid var(--border)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "16px",
                  color: "var(--charcoal)",
                  background: "white",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: "var(--charcoal)",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}>Phone number</label>
              <input
                type="tel"
                placeholder="+27 ..."
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "0.5px solid var(--border)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "16px",
                  color: "var(--charcoal)",
                  background: "white",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: "var(--charcoal)",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}>Experience or destination in mind</label>
              <input
                type="text"
                placeholder="e.g. Serengeti & Zanzibar, Mauritius Escape..."
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "0.5px solid var(--border)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "16px",
                  color: "var(--charcoal)",
                  background: "white",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: "var(--charcoal)",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}>Tell us about your dream holiday</label>
              <textarea
                placeholder="Dates, number of travellers, special occasions, budget range, anything else we should know..."
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "0.5px solid var(--border)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "16px",
                  color: "var(--charcoal)",
                  background: "white",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              {status === "success" ? (
                <div style={{
                  background: "rgba(29,165,160,0.1)",
                  border: "0.5px solid var(--teal)",
                  borderRadius: "4px",
                  padding: "20px",
                  textAlign: "center",
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "22px",
                  color: "var(--teal)",
                }}>
                  Thank you — we will be in touch within 24 hours to begin planning your journey. 🌊
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    background: status === "sending" ? "var(--muted)" : "var(--gold)",
                    color: "var(--abyss)",
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "18px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: status === "sending" ? "wait" : "pointer",
                  }}>
                  {status === "sending" ? "Sending..." : "Send My Enquiry"}
                </button>
              )}
              {status === "error" && (
                <div style={{
                  marginTop: "12px",
                  textAlign: "center",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "14px",
                  color: "var(--coral)",
                }}>
                  Something went wrong — please try again or email us directly.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SANTAM INSURANCE ── */}
      <section className="santam-strip" style={{
        background: "rgba(29,165,160,0.08)",
        borderTop: "0.5px solid rgba(29,165,160,0.2)",
        borderBottom: "0.5px solid rgba(29,165,160,0.2)",
        padding: "24px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "var(--teal)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}>🛡️</div>
          <div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              color: "var(--charcoal)",
            }}>Travel protected with Santam Insurance</div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              color: "var(--muted)",
            }}>Get a quote in seconds — before you confirm your booking</div>
          </div>
        </div>
        <button style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: "var(--teal)",
          background: "rgba(29,165,160,0.12)",
          border: "0.5px solid var(--teal)",
          padding: "10px 22px",
          borderRadius: "4px",
          cursor: "pointer",
        }}>Get a quote</button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--abyss)", padding: "48px 40px 32px" }}>
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "40px",
          marginBottom: "40px",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "36px",
              marginBottom: "4px",
              lineHeight: 1,
            }}>
              <span style={{ color: "var(--pearl)" }}>O</span>
              <span style={{ color: "var(--gold)", margin: "0 3px" }}>&</span>
              <span style={{ color: "var(--teal)" }}>S</span>
            </div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "13px",
              letterSpacing: "0.14em",
              color: "rgba(247,242,234,0.4)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>Ocean & Safari · Luxury Travel</div>
            <p style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "16px",
              color: "rgba(247,242,234,0.4)",
              lineHeight: 1.7,
              maxWidth: "240px",
              marginBottom: "20px",
            }}>
              A division of Computravel — proudly South African,
              serving discerning travellers for over 25 years.
            </p>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <img
                src="/asata.png"
                alt="ASATA Member"
                style={{
                  height: "48px",
                  width: "auto",
                  opacity: 0.85,
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
          </div>

          {[
            { heading: "Experiences", links: ["Ocean Islands", "African Safari", "Luxury Cruises", "Unique Journeys"] },
            { heading: "Destinations", links: ["Mauritius", "Maldives", "Serengeti", "Seychelles"] },
            { heading: "Company", links: ["About Us", "Our Consultants", "ASATA Member", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "13px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: "16px",
              }}>{col.heading}</div>
              {col.links.map((link) => (
                <div key={link} style={{ marginBottom: "12px" }}>
                  <Link href="#" style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "16px",
                    color: "rgba(247,242,234,0.45)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}>{link}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom" style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "15px",
            color: "rgba(247,242,234,0.25)",
            letterSpacing: "0.04em",
          }}>© 2026 Ocean & Safari · A Computravel Company · All rights reserved</div>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms", "POPIA Compliance"].map((item) => (
              <Link key={item} href="#" style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "15px",
                color: "rgba(247,242,234,0.25)",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}>{item}</Link>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}