/**
 * Every word of the proposal lives here.
 *
 * The deck and the print view are two readings of the same data, so a change
 * made once shows up in both. Nothing in the components carries copy.
 */

export const DOC = {
  ref: "PS–2026–01",
  kind: "Statement of Work",
  client: "Pankaj Soni",
  studio: "Ishaan Chadha",
  issued: "5 September 2026",
  validUntil: "19 September 2026",
  headline: "Pankaj Soni — online store",
  lede: "A complete shop that takes payments, with the checkout on your own site, live by the first of October.",
};

export const FIGURES = [
  { k: "Hours", v: "80", n: "16 days × 5 hrs" },
  { k: "Rate", v: "₹3,000", n: "per hour" },
  { k: "Total", v: "₹2,40,000", n: "for the work below" },
  { k: "Live", v: "1 Oct", n: "Thursday, 2026" },
];

export type Work = { name: string; hours: number; points: string[] };

export const WORK: Work[] = [
  {
    name: "Database and catalogue",
    hours: 8,
    points: [
      "Supabase set up as the store’s own database — pieces, variants, customers, orders.",
      "Your catalogue loaded with sizing, pricing and photography.",
    ],
  },
  {
    name: "Storefront, cart and checkout",
    hours: 14,
    points: [
      "The site reads live from the database — pieces, prices and availability always current.",
      "Cart and a checkout that stays on your own site from start to finish.",
    ],
  },
  {
    name: "Payments",
    hours: 12,
    points: [
      "Razorpay taking card, UPI and netbanking, embedded in your checkout.",
      "Orders recorded, receipts sent, refunds handled.",
      "Order confirmation to the customer and to you.",
    ],
  },
  {
    name: "Customer accounts",
    hours: 6,
    points: [
      "Sign-in, saved addresses, order history and saved pieces.",
      "Guest checkout kept, so an account is never forced on a first purchase.",
    ],
  },
  {
    name: "Your admin",
    hours: 10,
    points: [
      "Add and retire pieces, edit names, prices, sizing and descriptions.",
      "Upload and order photography, and choose which shot leads a piece.",
      "See every order and enquiry, with status, and mark them handled.",
    ],
  },
  {
    name: "Shipping and stock",
    hours: 5,
    points: [
      "Shipping rates by weight and destination, India and international.",
      "Courier connected for labels and tracking.",
      "Stock counts that fall as pieces sell; made-to-order handled separately.",
    ],
  },
  {
    name: "Price on Request",
    hours: 6,
    points: [
      "Any piece can be set to enquire rather than buy — for couture and made-to-order.",
      "Enquiries reach you on WhatsApp, and are recorded against the piece.",
    ],
  },
  {
    name: "Private appointments",
    hours: 5,
    points: [
      "Booking for atelier visits and fittings, in the boutique or by video.",
      "Your availability respected, with confirmations and reminders.",
    ],
  },
  {
    name: "Storefront finishing and analytics",
    hours: 7,
    points: [
      "Home page and campaign film completed to the agreed direction.",
      "Two rounds of revisions, each as one consolidated set of notes.",
      "Google Analytics 4 and Meta Pixel installed, with purchase tracking verified.",
    ],
  },
  {
    name: "Testing, launch and handover",
    hours: 7,
    points: [
      "Full checkout tested on live payments, including a real refund.",
      "Phone, tablet and desktop tested; accessibility to WCAG 2.1 AA.",
      "Domain connected, accounts in your name, documentation and a training session.",
      "One year of support and maintenance after launch, at no charge.",
      "Support and maintenance only — not the building of anything new.",
    ],
  },
];

/** Guards the arithmetic: the deck refuses to lie about the total. */
export const TOTAL_HOURS = WORK.reduce((n, w) => n + w.hours, 0);
export const RATE = 3000;
export const TOTAL_FEE = TOTAL_HOURS * RATE;

export const WEEKS = [
  {
    when: "Week One",
    dates: "8–11 September",
    title: "Database set up, catalogue loaded",
    body: "Supabase configured, your catalogue in with photography and pricing. Home page finished.",
  },
  {
    when: "Week Two",
    dates: "14–18 September",
    title: "Checkout and accounts live",
    body: "Payments working end to end. A real order placed and refunded before the week closes.",
  },
  {
    when: "Week Three",
    dates: "21–25 September",
    title: "Shipping, enquiries, appointments",
    body: "Courier and tax configured, Price on Request built, booking added, analytics installed.",
  },
  {
    when: "Week Four",
    dates: "28–29 September",
    title: "Testing and handover",
    body: "Everything tested, domain connected, documentation and training delivered.",
  },
  {
    when: "Launch",
    dates: "1 October",
    title: "The shop opens",
    body: "Two days held clear beforehand for contingency.",
  },
];

export const PROVIDE = [
  { when: "By 8 September", text: "Product photography, product details and pricing, logo and brand marks." },
  {
    when: "Start on 8 September",
    text: "The Razorpay account application. Approval takes 3 to 10 working days and nothing can take money until it clears.",
  },
  { when: "By 18 September", text: "Courier account, WhatsApp Business number, and your appointment availability." },
  { when: "By 22 September", text: "The domain name and access to manage it." },
];

export const TERMS = [
  "Payment splits to be decided after this agreement is signed.",
  "Anything beyond 80 hours is agreed in writing first, at the same ₹3,000 rate.",
  "Hosting, database, payment-gateway percentages and courier charges are billed to you directly by those providers.",
  "All code, design and accounts transfer to you on the final payment.",
];

export const money = (n: number) => "₹" + n.toLocaleString("en-IN");
