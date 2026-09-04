import CategoryPage from "@/app/components/CategoryPage";

export const revalidate = 30;

export default function AfricanSafarisPage() {
  return (
    <CategoryPage
      title="African Safari Journeys"
      subtitle="Safaris"
      description="The Serengeti at dawn. The Okavango Delta by mokoro. The great migration in full flight. Africa's wildlife reserves offer experiences that change the way you see the world."
      heroImage="/serengeti.jpg"
      experienceCategory="safari"
      articleCategory="safari-guides"
      accentColor="var(--gold)"
      whoType="lodge"
    />
  );
}