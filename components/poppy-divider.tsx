import { PoppyBloom } from "./poppy";

/** A single mark used to break long cream sections. */
export function PoppyDivider() {
  return (
    <div className="flex justify-center py-4" aria-hidden>
      <PoppyBloom className="h-10 w-auto opacity-80" />
    </div>
  );
}
