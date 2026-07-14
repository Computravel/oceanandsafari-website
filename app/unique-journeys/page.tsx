import CategoryPage from "@/app/components/CategoryPage";

export const revalidate = 30;

export default function UniqueJourneysPage() {
  return (
    <CategoryPage
      title="Unique Journeys"
      subtitle="Journey"
      description="Coastal adventures, legendary rail journeys and extraordinary experiences that defy easy categorisation. For travellers who seek the exceptional."
      heroImage="/seychelles.jpg"
      experienceCategory={["coastal", "rail"]}
      articleCategory={["travel-tips", "community-sustainability"]}
      accentColor="var(--coral)"
    />
  );
}