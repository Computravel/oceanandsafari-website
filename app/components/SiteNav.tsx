import Link from "next/link";

interface Props {
  /** Where the CTA button on the right goes. Defaults to the homepage enquiry section. */
  ctaHref?: string;
  /** Text on the CTA button. */
  ctaLabel?: string;
}

export default function SiteNav({ ctaHref = "/#enquire", ctaLabel = "Plan My Journey" }: Props) {
  return (
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

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {[
          { label: "Ocean Islands", href: "/ocean-islands" },
        ].map((item) => (
          <Link key={item.label} href={item.href} style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            textDecoration: "none",
            opacity: 0.75,
          }}>{item.label}</Link>
        ))}

        <div className="nav-dropdown" style={{ position: "relative" }}>
          <Link href="/luxury-cruises" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            textDecoration: "none",
            opacity: 0.75,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
            Luxury Cruises
            <span style={{ fontSize: "11px", marginTop: "2px" }}>▾</span>
          </Link>
          <div className="nav-dropdown-menu" style={{
            position: "absolute",
            top: "100%",
            left: 0,
            paddingTop: "12px",
            minWidth: "230px",
            zIndex: 200,
          }}>
            <div style={{
              background: "white",
              border: "0.5px solid var(--border)",
              borderRadius: "6px",
              boxShadow: "0 8px 24px rgba(11,31,58,0.14)",
              overflow: "hidden",
            }}>
              <Link href="/luxury-cruises" style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                color: "var(--charcoal)",
                textDecoration: "none",
                borderBottom: "0.5px solid var(--border)",
              }}>Cruise Experiences</Link>
              <Link href="/luxury-cruises/cruise-lines" style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                color: "var(--charcoal)",
                textDecoration: "none",
              }}>Cruise Lines</Link>
            </div>
          </div>
        </div>

        <div className="nav-dropdown" style={{ position: "relative" }}>
          <Link href="/african-safaris" style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            textDecoration: "none",
            opacity: 0.75,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
            African Safaris
            <span style={{ fontSize: "11px", marginTop: "2px" }}>▾</span>
          </Link>
          <div className="nav-dropdown-menu" style={{
            position: "absolute",
            top: "100%",
            left: 0,
            paddingTop: "12px",
            minWidth: "230px",
            zIndex: 200,
          }}>
            <div style={{
              background: "white",
              border: "0.5px solid var(--border)",
              borderRadius: "6px",
              boxShadow: "0 8px 24px rgba(11,31,58,0.14)",
              overflow: "hidden",
            }}>
              <Link href="/african-safaris" style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                color: "var(--charcoal)",
                textDecoration: "none",
                borderBottom: "0.5px solid var(--border)",
              }}>Safari Journeys</Link>
              <Link href="/safari-lodges" style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "16px",
                color: "var(--charcoal)",
                textDecoration: "none",
              }}>Safari Lodges & Reserves</Link>
            </div>
          </div>
        </div>

        {[
          { label: "Unique Journeys", href: "/unique-journeys" },
          { label: "Destinations", href: "/destinations" },
          { label: "Journal", href: "/articles" },
          { label: "About", href: "/about" },
        ].map((item) => (
          <Link key={item.label} href={item.href} style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            textDecoration: "none",
            opacity: 0.75,
          }}>{item.label}</Link>
        ))}
        <Link href={ctaHref} style={{
          background: "var(--gold)",
          color: "var(--pearl)",
          fontSize: "17px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "12px 24px",
          borderRadius: "3px",
          textDecoration: "none",
        }}>{ctaLabel}</Link>
      </div>
    </nav>
  );
}
