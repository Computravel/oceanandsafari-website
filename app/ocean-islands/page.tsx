import CategoryPage from "@/app/components/CategoryPage";

export const revalidate = 30;

export default function OceanIslandsPage() {
  return (
    <CategoryPage
      title="Ocean Island Escapes"
      subtitle="Island"
      description="From the turquoise lagoons of the Maldives to the granite shores of the Seychelles — our curated island escapes offer the finest in Indian Ocean luxury."
      heroImage="/maldives.jpg"
      experienceCategory="island"
      articleCategory={["destination-guide", "travel-tips"]}
      accentColor="var(--teal)"
    />
  );
}