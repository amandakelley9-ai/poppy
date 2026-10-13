/**
 * The /catering accordion.
 *
 * Power/water and trailer-footprint questions used to live here with guessed
 * numbers. They are out until the real specs are measured — a wrong amperage
 * or footprint is a cancelled event, and silence sends the question to the
 * booking form where it gets a real answer.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Do you charge travel fees?",
    a: "Events anywhere in Salt Lake or Utah County have no travel fee. Outside those two counties we add a per-mile rate — we'll quote it up front, never after the fact.",
  },
  {
    q: "Can you serve indoors?",
    a: "Yes. When the trailer won't fit or the weather won't cooperate, we bring an indoor cart and set up in the room. Everything is still made to order.",
  },
  {
    q: "How far ahead should we book?",
    a: "Two to four weeks is comfortable for most events. Holiday and wedding dates go earlier — December weekends in particular tend to fill by early November.",
  },
  {
    q: "What's the deposit and cancellation policy?",
    a: "A 50% deposit holds your date and comes off the final balance. Cancellations more than 30 days out are refundable; inside that window the deposit is retained.",
  },
];
