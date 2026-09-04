import { Intro } from "./intro";
import { Visual } from "./visual";

export function Approach() {
  return (
    <section
      id="yaklasim"
      className="fluid gridContainer bg-site-paper pt-14 pb-10 text-site-ink nav:pt-[clamp(4.5rem,7vw,6.5rem)] nav:pb-14 xl:pb-18"
      aria-labelledby="approach-title"
    >
      <Intro />
      <Visual />
    </section>
  );
}
