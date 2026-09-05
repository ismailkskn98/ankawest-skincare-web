import { PageMotionReady } from "@/components/site/pageMotionReady";

import { Approach } from "./approach";
import { EditorialStory } from "./editorialStory";
import { Hero } from "./hero";
import { ProductSelection } from "./productSelection";

export function Home() {
  return (
    <>
      <PageMotionReady />
      <Hero />
      <Approach />
      <ProductSelection />
      <EditorialStory />
    </>
  );
}
