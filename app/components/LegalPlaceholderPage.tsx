import Link from "next/link";
import SiteNav from "@/app/components/SiteNav";

/**
 * Shared shell for legal pages (Privacy Policy, Terms, POPIA Compliance)
 * that don't have real content yet. Renders a clearly-marked "coming soon"
 * notice rather than any invented legal text — swap this out once the real
 * policy content is ready.
 */
export default function LegalPlaceholderPage({ title }: { title: string }) {
  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)", minHeight: "100vh" }}>
      <SiteNav />

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 40px 120px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>Ocean & Safari</div>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(32px, 5vw, 48px)", color: "var(--charcoal)", lineHeight: 1.2, marginBottom: "20px" }}>{title}</h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "32px" }}>
          This page is coming soon. In the meantime, if you have any questions, please get in touch with our team directly.
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
          borderRadius: "3px",
          textDecoration: "none",
        }}>Contact Us</Link>
      </div>
    </main>
  );
}
