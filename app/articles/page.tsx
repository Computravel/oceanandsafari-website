import { getArticles } from "@/sanity/lib/queries";
import SiteNav from "@/app/components/SiteNav";
import ArticlesFilter from "@/app/components/ArticlesFilter";

export const revalidate = 30;

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main style={{ fontFamily: "var(--font-jost), sans-serif", background: "var(--pearl)" }}>
      <SiteNav />

      <section style={{ background: "var(--abyss)", padding: "80px 40px 60px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500, marginBottom: "16px" }}>Travel Journal</div>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "var(--pearl)", lineHeight: 1.2, marginBottom: "16px" }}>Stories, Guides & Inspiration</h1>
        <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "17px", color: "rgba(247,242,234,0.6)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
          Expert destination guides, travel inspiration and insider knowledge from our luxury travel specialists.
        </p>
      </section>

      <section style={{ padding: "64px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <ArticlesFilter articles={articles} />
      </section>
    </main>
  );
}