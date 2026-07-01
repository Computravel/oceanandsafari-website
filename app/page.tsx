import { getExperiences, getExclusiveEscapes } from "@/sanity/lib/queries";
import HomeClient from "./HomeClient";

export default async function Home() {
  const experiences = await getExperiences();
  const exclusiveEscapes = await getExclusiveEscapes();

  return (
    <HomeClient
      experiences={experiences}
      exclusiveEscapes={exclusiveEscapes}
    />
  );
}