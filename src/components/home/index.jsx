import { Approach } from "./approach";
import { EditorialStory } from "./editorialStory";
import { Hero } from "./hero";
import { ProductSelection } from "./productSelection";

export function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <ProductSelection />
      <EditorialStory />
    </>
  );
}
