import { PoppyStem } from "./poppy";

/** A single stem, laid on its side, used to break long cream sections. */
export function PoppyDivider() {
  return (
    <div className="flex justify-center py-4" aria-hidden>
      <PoppyStem className="h-16 w-auto -rotate-90 opacity-80" treatment="solid" />
    </div>
  );
}
