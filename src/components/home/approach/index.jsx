import { Intro } from "./intro";
import { Visual } from "./visual";

export function Approach() {
  return (
    <section
      id="yaklasim"
      className="fluid gridContainer bg-site-paper pt-[clamp(3.5rem,8vh,7rem)] pb-[clamp(3rem,7vh,6.5rem)] text-site-ink short-desktop:py-[clamp(3rem,6vh,4.5rem)]"
      aria-labelledby="approach-title"
    >
      <Intro />
      <Visual />
    </section>
  );
}
