import CategoryPage from "@/app/components/CategoryPage";

export const revalidate = 30;

export default function LuxuryCruisesPage() {
  return (
    <CategoryPage
      title="Luxury Ocean Cruises"
      subtitle="Cruise"
      description="From the Mediterranean to the Indian Ocean — ultra-luxury vessels, all-inclusive fares, and destinations that only the sea can reach."
      heroImage="/mediterranean.jpg"
      experienceCategory="cruise"
      articleCategory="cruise-guides"
      accentColor="var(--cobalt)"
    />
  );
}