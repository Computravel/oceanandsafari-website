import { getExperiencesByCategory, getExclusiveEscapes } from "@/sanity/lib/queries";
import HomeClient from "./HomeClient";
export const revalidate = 30;

const CARDS_PER_SECTION = 3;

export default async function Home() {
  const [
    oceanIslandsExperiences,
    luxuryCruisesExperiences,
    africanSafarisExperiences,
    coastalExperiences,
    railExperiences,
    exclusiveEscapes,
  ] = await Promise.all([
    getExperiencesByCategory("island"),
    getExperiencesByCategory("cruise"),
    getExperiencesByCategory("safari"),
    getExperiencesByCategory("coastal"),
    getExperiencesByCategory("rail"),
    getExclusiveEscapes(),
  ]);

  const uniqueJourneysExperiences = [...coastalExperiences, ...railExperiences];

  return (
    <HomeClient
      oceanIslandsExperiences={oceanIslandsExperiences.slice(0, CARDS_PER_SECTION)}
      luxuryCruisesExperiences={luxuryCruisesExperiences.slice(0, CARDS_PER_SECTION)}
      africanSafarisExperiences={africanSafarisExperiences.slice(0, CARDS_PER_SECTION)}
      uniqueJourneysExperiences={uniqueJourneysExperiences.slice(0, CARDS_PER_SECTION)}
      exclusiveEscapes={exclusiveEscapes}
    />
  );
}