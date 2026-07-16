import { getConsultants } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/app/components/portableTextComponents";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 10;

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
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "40px", color:
