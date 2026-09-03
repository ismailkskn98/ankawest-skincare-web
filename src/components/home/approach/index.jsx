import { Intro } from "./intro";
import { Visual } from "./visual";

export function Approach() {
  return (
    <section
      id="yaklasim"
      className="fluid gridContainer bg-site-paper pt-14 pb-10 text-site-ink min-[901px]:pt-[clamp(4.5rem,7vw,6.5rem)] min-[901px]:pb-14 min-[1280px]:pb-18"
      aria-labelledby="approach-title"
    >
      <Intro />
      <Visual />
    </section>
  );
}
