import { Suspense } from "react";
import { BookingForm } from "./booking-form";

/**
 * BookingForm reads search params (for ?event=holiday), so it needs a Suspense
 * boundary. Wrapping it once here keeps both pages that use it tidy.
 */
export function BookingFormSection() {
  return (
    <Suspense
      fallback={
        <div className="h-[600px] animate-pulse rounded-[10px] bg-cream-deep" aria-hidden />
      }
    >
      <BookingForm />
    </Suspense>
  );
}
