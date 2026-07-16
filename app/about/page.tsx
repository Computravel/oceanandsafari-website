import { getConsultants } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/app/components/portableTextComponents";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "About Us | Ocean & Safari Luxury Travel",
  description: "Meet the Ocean & Safari team — luxury travel specialists with decades of experience crafting extraordinary journeys across Africa and the Indian Ocean Islands.",
};

export default async function AboutPage() {
  const consultants = await getConsultants();

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

      <nav style={{ background: "rgba(247,242,234,0.97)", borderBottom: "0.5px solid var(--border)", padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)" }}>
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

      <section style={{ background: "var(--abyss)", padding: "100px 40px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/lindsay-rikke.jpg)", backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.6 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>Our Story</div>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.2, marginBottom: "24px" }}>
            Travel is not just what we do.<br />
            <em style={{ color: "var(--gold)" }}>It is who we are.</em>
          </h1>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "rgba(247,242,234,0.7)", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
            Ocean & Safari was born from a simple belief — that extraordinary travel begins with people who truly love it.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 40px", maxWidth: "780px", margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>About Us</div>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "40px", color: "var(--charcoal)", marginBottom: "32px", lineHeight: 1.2 }}>A Computravel Company</h2>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "var(--charcoal)", lineHeight: 1.85 }}>
          <p style={{ marginBottom: "20px" }}>Ocean & Safari is a luxury travel brand by Computravel — one of Southern Africa's first online travel agencies, co-founded in 2008. For over 25 years, we have helped discerning travellers explore unforgettable destinations across Africa, the Indian Ocean Islands and beyond.</p>
          <p style={{ marginBottom: "20px" }}>What sets us apart is simple: our consultants have been there. We have stayed in the lodges we recommend, sailed on the ships we book, and walked the shores we describe. When you plan a journey with us, you are not speaking to an algorithm — you are speaking to someone who has lived the experience.</p>
          <p>As ASATA members and IATA accredited specialists, we bring the access, relationships and expertise of a fully established travel business — delivered with the personal attention of a boutique consultancy.</p>
        </div>
      </section>

      <section style={{ background: "var(--ivory)", borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)", padding: "32px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center", alignItems: "center" }}>
          {[
            { icon: "✦", label: "ASATA Member", desc: "Association of Southern African Travel Agents" },
            { icon: "◈", label: "IATA Accredited", desc: "International Air Transport Association" },
            { icon: "◎", label: "25+ Years Experience", desc: "Serving discerning travellers since 2000" },
            { icon: "✦", label: "Thompsons Partner", desc: "Official Thompsons Holidays partner" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", maxWidth: "200px" }}>
              <div style={{ fontSize: "20px", color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "4px" }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>The People Behind Your Journey</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(32px, 5vw, 48px)", color: "var(--charcoal)", lineHeight: 1.2 }}>Meet Our Consultants</h2>
        </div>

        {consultants && consultants.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {consultants.map((consultant: any, i: number) => (
              <div key={consultant._id} style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "360px 1fr" : "1fr 360px",
                gap: "60px",
                alignItems: "start",
              }}>
                {i % 2 === 0 ? (
                  <>
                    <div style={{ borderRadius: "12px", overflow: "hidden", background: "var(--abyss)", aspectRatio: "3/4" }}>
                      {consultant.photo ? (
                        <img src={consultant.photo} alt={consultant.photoAlt || consultant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", color: "rgba(247,242,234,0.3)" }}>O&S</div>
                        </div>
                      )}
                    </div>
                    <div style={{ paddingTop: "20px" }}>
                      <ConsultantContent consultant={consultant} />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ paddingTop: "20px" }}>
                      <ConsultantContent consultant={consultant} />
                    </div>
                    <div style={{ borderRadius: "12px", overflow: "hidden", background: "var(--abyss)", aspectRatio: "3/4" }}>
                      {consultant.photo ? (
                        <img src={consultant.photo} alt={consultant.photoAlt || consultant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", color: "rgba(247,242,234,0.3)" }}>O&S</div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--muted)" }}>
            Meet our team — coming soon.
          </div>
        )}
      </section>

      <section style={{ background: "var(--abyss)", padding: "80px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>What We Promise</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(32px, 5vw, 48px)", color: "var(--pearl)", marginBottom: "48px", lineHeight: 1.2 }}>The Ocean & Safari Difference</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", textAlign: "left" }}>
            {[
              { icon: "✦", title: "Personal Attention", desc: "One dedicated consultant handles your entire journey — from first enquiry to final farewell. You will always know who to call." },
              { icon: "◈", title: "Genuine Expertise", desc: "We have been to the destinations we recommend. Our advice comes from experience, not brochures." },
              { icon: "◎", title: "Seamless from Start to Finish", desc: "Flights, transfers, accommodation, insurance, visas — every detail managed so you can focus on the experience." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: "22px", color: "var(--gold)", marginBottom: "16px" }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--pearl)", marginBottom: "12px" }}>{item.title}</div>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "rgba(247,242,234,0.6)", lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", background: "var(--ivory)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(28px, 4vw, 44px)", color: "var(--charcoal)", marginBottom: "16px" }}>Ready to start planning?</h2>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>Speak to Lindsay or Rikke today and begin crafting your extraordinary journey.</p>
        <Link href="/#enquire" style={{ display: "inline-block", background: "var(--gold)", color: "var(--abyss)", fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 40px", borderRadius: "4px", textDecoration: "none" }}>
          Start a Conversation
        </Link>
      </section>

    </main>
  );
}

function ConsultantContent({ consultant }: { consultant: any }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "8px" }}>{consultant.role}</div>
      <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "40px", color: "var(--charcoal)", marginBottom: "20px", lineHeight: 1.1 }}>{consultant.name}</h2>

      {consultant.quote && (
        <div style={{ borderLeft: "3px solid var(--gold)", paddingLeft: "20px", marginBottom: "28px" }}>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--charcoal)", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{consultant.quote}&rdquo;</p>
        </div>
      )}

      {consultant.bio && (
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.85, marginBottom: "28px" }}>
          <PortableText value={consultant.bio} components={portableTextComponents} />
        </div>
      )}

      {consultant.specialities && consultant.specialities.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>Specialities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {consultant.specialities.map((spec: string, i: number) => (
              <span key={i} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--charcoal)", background: "var(--ivory)", border: "0.5px solid var(--border)", padding: "4px 12px", borderRadius: "20px" }}>{spec}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {consultant.email && (
          <a href={'mailto:' + consultant.email} style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--teal)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            {consultant.email}
          </a>
        )}
        {consultant.blogUrl && (
          <a href={consultant.blogUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", color: "var(--gold)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            {consultant.blogLabel || 'Read my travel blog'}
          </a>
        )}
      </div>
    </div>
  );
}
