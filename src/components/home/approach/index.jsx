import { Intro } from "./intro";
import { Visual } from "./visual";

export function Approach() {
  return (
    <section
      id="yaklasim"
      className="fluid gridContainer overflow-hidden bg-site-paper py-24 text-site-ink min-[901px]:py-36"
      aria-labelledby="approach-title"
      data-scroll-parallax-section
    >
      <Intro />
      <Visual />
    </section>
  );
}
