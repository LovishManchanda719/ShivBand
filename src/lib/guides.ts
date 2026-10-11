// Helpful articles that answer the questions families search before booking.
// Each one links to the matching service pages. Keep them factual — no invented prices or numbers.

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated: string;
  readMinutes: number;
  image: { src: string; alt: string };
  intro: string;
  sections: GuideSection[];
  related: string[]; // service slugs
}

export const GUIDES: Guide[] = [
  {
    slug: "baraat-checklist-delhi",
    title: "Baraat Checklist for Delhi Weddings: Band, Ghodi, Baggi, Dhol & Lights",
    description:
      "A practical checklist for planning a baraat in Delhi — what to book, when to book it, how to plan the route and timing, and the questions to settle with your band.",
    published: "2026-10-11",
    updated: "2026-10-11",
    readMinutes: 6,
    image: { src: "/images/groom-ghodi-chhatri-lights.jpg", alt: "Groom on a decorated ghodi with chhatri lights during a Delhi baraat" },
    intro:
      "The baraat is the loudest, happiest part of a North Indian wedding — and the part that goes wrong most easily when nobody owns the details. This checklist covers everything families in Delhi usually need to decide, in the order it makes sense to decide it.",
    sections: [
      {
        heading: "1. Fix the basics first: date, start point and venue",
        paragraphs: [
          "Before calling any band, know three things: the wedding date, where the baraat will start (home, a nearby gurudwara or temple, or a point close to the venue) and the venue address. These decide the route length, how big a band you need and how much lighting is required.",
          "If the baraat starts close to the venue, a shorter route with a compact band works well. A longer route through a colony usually needs a bigger band and more lights so the procession does not feel thin.",
        ],
      },
      {
        heading: "2. Choose what the groom will ride",
        list: [
          "Ghodi — the traditional choice for ghudchadi; ask that the ghodi is calm around music and lights and comes with a handler.",
          "Baggi — a horse-drawn carriage decorated with flowers; good when the groom rides with family or for the bride's entry.",
          "Rath — a larger chariot-style carriage for a grander entry.",
          "Vintage car — some families prefer it for short routes or for the vidaai.",
        ],
      },
      {
        heading: "3. Decide the music: band, dhol or both",
        paragraphs: [
          "A uniformed brass band gives the baraat its classic sound — trumpets, clarinets and drums playing Bollywood and Punjabi songs. Dhol wale add raw energy for bhangra. Many families book both: the band leads, and dhol joins for the dancing stretches and the entry at the venue gate.",
          "Share a list of the songs your family loves a few days before the wedding so the band leader can plan the set.",
        ],
      },
      {
        heading: "4. Plan lighting for an evening baraat",
        paragraphs: [
          "Most Delhi baraats happen after sunset, so lighting is what makes the procession visible and the photographs glow. Crystal chhatri lights carried along both sides of the baraat are the classic look; jhumar-style chandelier lights and road lights fill in longer routes. Ask whether the generator is a silent type so it does not drown out the music.",
        ],
      },
      {
        heading: "5. Respect the 10 PM rule",
        paragraphs: [
          "Under the Noise Pollution (Regulation and Control) Rules, 2000, loudspeakers and public address systems cannot be used in public between 10 PM and 6 AM. Build your timeline so the baraat reaches the venue comfortably before 10 PM. A good band will help you plan the start time backwards from the venue arrival.",
        ],
      },
      {
        heading: "6. Book early for popular dates",
        paragraphs: [
          "Auspicious dates in the wedding season are booked by many families at once. Once your date is fixed, confirm the band, ghodi or baggi and lights together — booking everything from one house means one phone number to call on the day.",
        ],
      },
      {
        heading: "7. The day-before checklist",
        list: [
          "Confirm the reporting time and exact start point with the band leader.",
          "Share one family contact who will coordinate on the road.",
          "Confirm the route and where the ghodi or baggi will be ready.",
          "Keep the venue gate timing and the jaimala time in mind.",
          "Save the band's number on two family phones.",
        ],
      },
    ],
    related: ["wedding-band", "ghodi-for-wedding", "wedding-lights"],
  },
  {
    slug: "how-to-choose-wedding-band",
    title: "How to Choose a Wedding Band in Delhi: 10 Questions to Ask Before Booking",
    description:
      "Ten simple questions that help you compare wedding bands in Delhi — band size, uniforms, songs, timing, ghodi and lights, and who you will deal with on the day.",
    published: "2026-10-11",
    updated: "2026-10-11",
    readMinutes: 5,
    image: { src: "/images/3.jpg", alt: "Wedding band trumpet player in red ceremonial uniform" },
    intro:
      "Every band says it is the best. These questions help you see the difference between a band that will make your baraat memorable and one that will leave you making phone calls on the wedding night.",
    sections: [
      {
        heading: "The 10 questions",
        list: [
          "Who will I deal with — the owner or an agent? Booking directly with the owner usually means fewer surprises.",
          "How many musicians will actually come, and which instruments?",
          "Will all musicians be in matching uniform and safa?",
          "Can we choose the songs? Do you know the Punjabi and Bollywood numbers we want?",
          "What time will the band report, and how long will it play?",
          "Do you provide the ghodi, baggi and lights yourselves, or do you arrange them from someone else?",
          "Is the ghodi calm around music, and will a handler stay with it throughout?",
          "What kind of generator powers the lights — is it silent?",
          "What happens if the baraat starts late?",
          "Can I see photos or videos of your recent baraats, and read reviews from real families?",
        ],
      },
      {
        heading: "Look for proof, not promises",
        paragraphs: [
          "Ask for recent photos and videos, check the band's Google reviews and visit the shop if you can. A band that has been around for years in one neighbourhood has a reputation to protect.",
        ],
      },
      {
        heading: "Get the quote in writing",
        paragraphs: [
          "Prices depend on the date, the size of the band and which services you add. Once you agree, ask for the details — date, reporting time, number of musicians, ghodi or baggi, and lights — on WhatsApp so both sides have the same record.",
        ],
      },
    ],
    related: ["wedding-band", "baraat-package", "dhol-wale"],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
