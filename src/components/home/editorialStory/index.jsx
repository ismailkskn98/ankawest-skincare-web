import { Community } from "./community";
import { CreamTrail } from "./creamTrail";
import { Journal } from "./journal";
import { Transparency } from "./transparency";

export function EditorialStory() {
  return (
    <div
      className="fluid gridContainer relative isolate overflow-clip bg-[#f2f2ef] text-site-ink"
      data-scroll-draw-section
    >
      <CreamTrail />
      <Transparency />
      <Journal />
      <Community />
    </div>
  );
}
