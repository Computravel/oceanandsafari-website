import Link from "next/link";

export default function Home() {
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
        {/* Logo */}
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
          <div style={{
            width: "0.5px",
            height: "24px",
            background: "var(--border)",
          }} />
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
            }}>Luxury Travel</div>
          </div>
        </div>

        {/* Nav Links */}
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
          }}>Plan My Trip</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, var(--abyss) 0%, var(--indigo) 50%, #1A5A8A 100%)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 40px",
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(29,165,160,0.15) 0%, transparent 60%)",
        }} />
        <div style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "0.5px solid rgba(201,168,76,0.2)",
        }} />
        <div style={{
          position: "absolute",
          top: "15%",
          right: "7%",
          width: "460px",
          height: "460px",
          borderRadius: "50%",
          border: "0.5px solid rgba(201,168,76,0.1)",
        }} />

        {/* Hero Content */}
        <div style={{ position: "relative", maxWidth: "600px" }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--teal)",
            fontWeight: 500,
            marginBottom: "20px",
          }}>South Africa&apos;s Luxury Travel Specialists</div>

          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 400,
            color: "var(--pearl)",
            lineHeight: 1.15,
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}>
            Your luxury experience<br />
            begins the moment<br />
            <em style={{ color: "var(--gold)" }}>you make contact</em>
          </h1>

          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            color: "rgba(247,242,234,0.65)",
            lineHeight: 1.8,
            marginBottom: "36px",
            maxWidth: "480px",
          }}>
            Expert advice, personal attention, and seamless planning —
            from your first enquiry to your last day away. Every journey
            we craft is a bespoke experience.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="#enquire" style={{
              background: "var(--gold)",
              color: "var(--abyss)",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 28px",
              borderRadius: "3px",
              textDecoration: "none",
            }}>Plan My Bespoke Trip</Link>
            <Link href="#packages" style={{
              color: "rgba(247,242,234,0.7)",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "18px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>Browse packages <span style={{ color: "var(--teal)" }}>→</span></Link>
          </div>

          {/* Trust strip */}
          <div style={{
            display: "flex",
            gap: "24px",
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "0.5px solid rgba(255,255,255,0.1)",
          }}>
            {["ASATA Member", "IATA Accredited", "25+ Years Experience", "Thompsons Partner"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--teal)" }} />
                <span style={{
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "16px",
                  letterSpacing: "0.1em",
                  color: "rgba(247,242,234,0.5)",
                }}>{item}</span>
              </div>
            ))}
          </div>
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

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
          border: "0.5px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {[
            {
              icon: "✦",
              title: "Personal consultant",
              desc: "One dedicated specialist handles your entire journey from first enquiry to final farewell",
              color: "var(--gold)",
            },
            {
              icon: "◈",
              title: "Exclusive access",
              desc: "Official partner relationships with Thompsons mean benefits no algorithm can find",
              color: "var(--teal)",
            },
            {
              icon: "◎",
              title: "Every detail managed",
              desc: "From transfers to insurance — nothing is left to chance, nothing left to worry about",
              color: "var(--cobalt)",
            },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "36px 28px",
              borderRight: i < 2 ? "0.5px solid var(--border)" : "none",
              background: "white",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "22px",
                color: item.color,
                marginBottom: "16px",
              }}>{item.icon}</div>
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "18px",
                color: "var(--charcoal)",
                marginBottom: "10px",
              }}>{item.title}</div>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "18px",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DUAL AUDIENCE ── */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <div style={{
          padding: "56px 48px",
          background: "var(--abyss)",
          borderRight: "0.5px solid rgba(255,255,255,0.08)",
        }}>
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
          }}>Bespoke Planning</div>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--pearl)",
            lineHeight: 1.25,
            marginBottom: "16px",
          }}>Design your journey from scratch</h2>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            color: "rgba(247,242,234,0.55)",
            lineHeight: 1.8,
            marginBottom: "28px",
          }}>
            Tell us where you dream of going. Our consultants work with
            officially appointed travel representatives to craft an itinerary
            built entirely around you — no templates, no compromises.
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

        <div style={{
          padding: "56px 48px",
          background: "var(--ivory)",
        }}>
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
          }}>Ready to Book</div>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--charcoal)",
            lineHeight: 1.25,
            marginBottom: "16px",
          }}>Handpicked packages, bookable instantly</h2>
          <p style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "16px",
            color: "var(--muted)",
            lineHeight: 1.8,
            marginBottom: "28px",
          }}>
            Curated by our consultants and available at fixed prices.
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
          }}>See all packages <span>→</span></Link>
        </div>
      </section>

      {/* ── FEATURED PACKAGES ── */}
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

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}>
          {[
            { emoji: "🦁", category: "Safari", title: "Serengeti & Zanzibar", nights: "10 nights · Tanzania", price: "From R42,500", bg: "linear-gradient(135deg, #C8A96E 0%, #8B6914 100%)" },
            { emoji: "🚢", category: "Cruise", title: "Mediterranean Discovery", nights: "12 nights · MSC Bellissima", price: "From R38,900", bg: "linear-gradient(135deg, var(--cobalt) 0%, var(--indigo) 100%)" },
            { emoji: "🏝️", category: "Island", title: "Mauritius Escape", nights: "7 nights · Beachfront villa", price: "From R54,200", bg: "linear-gradient(135deg, var(--teal) 0%, var(--cobalt) 100%)" },
            { emoji: "🌺", category: "Island", title: "Maldives Overwater", nights: "8 nights · Private villa", price: "From R78,000", bg: "linear-gradient(135deg, #1DA5A0 0%, #0B7A75 100%)" },
            { emoji: "🦒", category: "Safari", title: "Okavango & Victoria Falls", nights: "9 nights · Botswana & Zimbabwe", price: "From R65,500", bg: "linear-gradient(135deg, #8B6914 0%, #5A4010 100%)" },
            { emoji: "⛵", category: "Cruise", title: "Seychelles Island Hop", nights: "10 nights · Luxury yacht", price: "From R92,000", bg: "linear-gradient(135deg, #1A6EA8 0%, #0B3A6E 100%)" },
          ].map((pkg, i) => (
            <div key={i} style={{
              background: "white",
              border: "0.5px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}>
              <div style={{
                height: "120px",
                background: pkg.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                position: "relative",
              }}>
                <span style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  backdropFilter: "blur(4px)",
                }}>{pkg.category}</span>
                {pkg.emoji}
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "17px",
                  color: "var(--charcoal)",
                  marginBottom: "4px",
                }}>{pkg.title}</div>
                <div style={{
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "17px",
                  color: "var(--muted)",
                  marginBottom: "12px",
                }}>{pkg.nights}</div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "17px",
                    fontWeight: 500,
                    color: "var(--gold)",
                  }}>{pkg.price} <span style={{ fontSize: "16px", color: "var(--muted)", fontWeight: 400 }}>pp</span></div>
                  <Link href="#enquire" style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "16px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--charcoal)",
                    textDecoration: "none",
                    border: "0.5px solid var(--border)",
                    padding: "4px 10px",
                    borderRadius: "2px",
                  }}>Enquire</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              fontSize: "clamp(18px, 2.5vw, 24px)",
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
            fontSize: "16px",
            color: "var(--muted)",
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}>
            One of our consultants will be in touch within 24 hours
            to begin crafting your bespoke itinerary.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { label: "Full name", placeholder: "Your name", type: "text", full: false },
              { label: "Email address", placeholder: "your@email.com", type: "email", full: false },
              { label: "Phone number", placeholder: "+27 ...", type: "tel", full: false },
              { label: "Destination in mind", placeholder: "e.g. Mauritius, Serengeti...", type: "text", full: false },
            ].map((field, i) => (
              <div key={i}>
                <label style={{
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "17px",
                  letterSpacing: "0.08em",
                  color: "var(--charcoal)",
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
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
            ))}

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: "var(--charcoal)",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}>Tell us about your dream trip</label>
              <textarea
                placeholder="Dates, number of travellers, special occasions, budget range, anything else we should know..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "11px 14px",
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
              <button style={{
                width: "100%",
                background: "var(--gold)",
                color: "var(--abyss)",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "16px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}>Send My Enquiry</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SANTAM INSURANCE ── */}
      <section style={{
        background: "rgba(29,165,160,0.08)",
        borderTop: "0.5px solid rgba(29,165,160,0.2)",
        borderBottom: "0.5px solid rgba(29,165,160,0.2)",
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            background: "var(--teal)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}>🛡️</div>
          <div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--charcoal)",
            }}>Travel protected with Santam Insurance</div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "17px",
              color: "var(--muted)",
            }}>Get a quote in seconds — before you confirm your booking</div>
          </div>
        </div>
        <button style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "17px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: "var(--teal)",
          background: "rgba(29,165,160,0.12)",
          border: "0.5px solid var(--teal)",
          padding: "8px 18px",
          borderRadius: "4px",
          cursor: "pointer",
        }}>Get a quote</button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "var(--abyss)",
        padding: "48px 40px 32px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "40px",
          marginBottom: "40px",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "32px",
              marginBottom: "4px",
              lineHeight: 1,
            }}>
              <span style={{ color: "var(--pearl)" }}>O</span>
              <span style={{ color: "var(--gold)", margin: "0 3px" }}>&</span>
              <span style={{ color: "var(--teal)" }}>S</span>
            </div>
            <div style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "16px",
              letterSpacing: "0.14em",
              color: "rgba(247,242,234,0.4)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>Ocean & Safari · Luxury Travel</div>
            <p style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "18px",
              color: "rgba(247,242,234,0.4)",
              lineHeight: 1.7,
              maxWidth: "240px",
            }}>
              A division of Computravel — proudly South African,
              serving discerning travellers for over 25 years.
            </p>
          </div>

          {[
            {
              heading: "Experiences",
              links: ["Ocean Islands", "African Safari", "Luxury Cruises", "Bespoke Journeys"],
            },
            {
              heading: "Destinations",
              links: ["Mauritius", "Maldives", "Serengeti", "Seychelles"],
            },
            {
              heading: "Company",
              links: ["About Us", "Our Consultants", "ASATA Member", "Contact"],
            },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: "16px",
              }}>{col.heading}</div>
              {col.links.map((link) => (
                <div key={link} style={{ marginBottom: "10px" }}>
                  <Link href="#" style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "18px",
                    color: "rgba(247,242,234,0.45)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}>{link}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "17px",
            color: "rgba(247,242,234,0.25)",
            letterSpacing: "0.04em",
          }}>© 2026 Ocean & Safari · A Computravel Company · All rights reserved</div>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms", "POPIA Compliance"].map((item) => (
              <Link key={item} href="#" style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "17px",
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