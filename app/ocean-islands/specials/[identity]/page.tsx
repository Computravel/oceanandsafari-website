import { getBeachcomberSpecial, getBeachcomberSpecialIdentities } from "@/sanity/lib/queries";
import { getCheapestPackage, formatZAR } from "@/app/lib/beachcomber/pricing";
import EnquiryForm from "@/app/components/EnquiryForm";
import ExperienceGallery from "@/app/components/ExperienceGallery";
import SiteNav from "@/app/components/SiteNav";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export async function generateStaticParams() {
  const identities = await getBeachcomberSpecialIdentities();
  return identities.map((i: { identity: string }) => ({ identity: i.identity }));
}

export async function generateMetadata({ params }: { params: Promise<{ identity: string }> }): Promise<Metadata> {
  const { identity } = await params;
  const special = await getBeachcomberSpecial(identity);
  return {
    title: special ? `${special.title} | Ocean & Safari` : "Special Offer | Ocean & Safari",
    description: special ? `Limited-time offer at ${special.hotelName || special.title}.` : undefined,
  };
}

export default async function BeachcomberSpecialPage({
  params,
}: {
  params: Promise<{ identity: string }>;
}) {
  const { identity } = await params;
  const special = await getBeachcomberSpecial(identity);

  if (!special) notFound();

  const cheapest = getCheapestPackage(special.packages);
  const sortedPackages = special.packages
    ? [...special.packages].sort((a: any, b: any) => a.pricePerPersonZARFrom - b.pricePerPersonZARFrom)
    : [];

  const galleryImages = [...(special.hotelImages || []), ...(special.productImages || [])]
    .sort((a: any, b: any) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
    .map((img: any) => ({ asset: { url: img.imageURL }, alt: special.hotelName || special.title }));

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>

      {/* ── NAVIGATION ── */}
      <SiteNav ctaHref="#enquire-form" ctaLabel="Enquire Now" />

      {/* ── HERO ── */}
      <div style={{ height: "60vh", position: "relative", overflow: "hidden", background: "var(--abyss)" }}>
        {special.heroImage && (
          <img
            src={special.heroImage}
            alt={special.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,0.8) 0%, rgba(11,31,58,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            background: "rgba(212,175,55,0.85)",
            color: "var(--abyss)",
            padding: "4px 12px",
            borderRadius: "2px",
            marginBottom: "12px",
            backdropFilter: "blur(4px)",
          }}>{special.accSpecial1 || "Exclusive Offer"}</div>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.15, marginBottom: "8px" }}>{special.title}</h1>
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "rgba(247,242,234,0.7)" }}>
            {special.country}
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
          {special.description && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "16px" }}>About This Offer</h2>
              <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.85 }}>{special.description}</p>
            </div>
          )}

          {/* Packages */}
          {sortedPackages.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Package Options</h2>
              {sortedPackages.map((pkg: any, i: number) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 0", borderBottom: "0.5px solid var(--border)", gap: "16px",
                }}>
                  <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--charcoal)" }}>{pkg.packageDesc}</span>
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--gold)", whiteSpace: "nowrap" }}>{formatZAR(pkg.pricePerPersonZARFrom)} <span style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)" }}>pp</span></span>
                </div>
              ))}
            </div>
          )}

          {/* Beachcomber Plus Factors */}
          {special.beachcomberPlusFactors && special.beachcomberPlusFactors.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--charcoal)", marginBottom: "20px" }}>Beachcomber Plus</h2>
              <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none", fontFamily: "var(--font-jost), sans-serif", fontSize: "18px", color: "var(--charcoal)", lineHeight: 1.8 }}>
                {special.beachcomberPlusFactors.map((item: { plusFactor: string }, i: number) => (
                  <li key={i} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: "4px" }}>◆</span>
                    <span>{item.plusFactor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inclusions / Exclusions */}
          {((special.packageInclusions && special.packageInclusions.length > 0) || (special.packageExclusions && special.packageExclusions.length > 0)) && (
            <div style={{ marginBottom: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              {special.packageInclusions && special.packageInclusions.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", marginBottom: "12px" }}>Included</h3>
                  <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none", fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--charcoal)", lineHeight: 1.7 }}>
                    {special.packageInclusions.map((item: { inclusion: string }, i: number) => (
                      <li key={i} style={{ marginBottom: "8px" }}>✓ {item.inclusion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {special.packageExclusions && special.packageExclusions.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", marginBottom: "12px" }}>Excluded</h3>
                  <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none", fontFamily: "var(--font-jost), sans-serif", fontSize: "15px", color: "var(--muted)", lineHeight: 1.7 }}>
                    {special.packageExclusions.map((item: { exclusion: string }, i: number) => (
                      <li key={i} style={{ marginBottom: "8px" }}>✕ {item.exclusion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          <ExperienceGallery gallery={galleryImages} title="Gallery" />

          {/* Terms & Conditions */}
          {special.termsAndConditions && special.termsAndConditions.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "var(--charcoal)", marginBottom: "16px" }}>Terms &amp; Conditions</h2>
              <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none", fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.7 }}>
                {special.termsAndConditions.map((item: { tCItem: string }, i: number) => (
                  <li key={i} style={{ marginBottom: "6px" }}>{item.tCItem}</li>
                ))}
              </ul>
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
            {cheapest && (
              <div style={{ background: "var(--abyss)", padding: "24px" }}>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(247,242,234,0.5)", marginBottom: "8px" }}>Special price from</div>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: "var(--gold)", lineHeight: 1.2 }}>{formatZAR(cheapest.pricePerPersonZARFrom)}</div>
                <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", color: "rgba(247,242,234,0.6)", marginTop: "4px" }}>per person · {cheapest.packageDesc}</div>
              </div>
            )}

            <div style={{ padding: "20px 24px" }}>
              {[
                { label: "Destination", value: special.country },
                { label: "Nights", value: special.numberOfNights },
                { label: "Travel dates", value: special.travelFromDate && special.travelToDate ? `${formatDate(special.travelFromDate)} – ${formatDate(special.travelToDate)}` : null },
                { label: "Book by", value: special.bookingToDate ? formatDate(special.bookingToDate) : null },
                { label: "Flights", value: special.includeAir ? "Included" : null },
                { label: "Transfers", value: special.includeTransfers ? "Included" : null },
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
          <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "12px", textAlign: "center" }}>Enquire About This Offer</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(28px, 4vw, 40px)", color: "var(--charcoal)", textAlign: "center", marginBottom: "12px" }}>{special.title}</h2>
          <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "16px", color: "var(--muted)", textAlign: "center", lineHeight: 1.7, marginBottom: "40px" }}>
            One of our consultants will be in touch within 24 hours to begin crafting your personalised escape.
          </p>
          <EnquiryForm
            experienceTitle={special.title}
            experienceUrl={`https://oceanandsafari.com/ocean-islands/specials/${special.beachcomberIdentity}`}
          />
        </div>
      </section>

    </main>
  );
}
