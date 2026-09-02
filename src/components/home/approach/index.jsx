import { Intro } from "./intro";
import { Visual } from "./visual";

export function Approach() {
  return (
    <section
      id="yaklasim"
      className="fluid gridContainer bg-site-paper pt-18 pb-10 text-site-ink min-[901px]:pt-28 min-[901px]:pb-16 min-[1280px]:pb-20"
      aria-labelledby="approach-title"
    >
      <Intro />
      <Visual />
    </section>
  );
}
