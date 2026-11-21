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
  keyTakeaways?: string[]; // Quick bullet facts for AI overviews & skimmable reading
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
    keyTakeaways: [
      "Fix 3 core basics first: wedding date, starting point, and venue address to size the band and route correctly.",
      "Decide the groom entry mode early: calm white ghodi with a handler, fresh floral baggi, or luxury royal rath.",
      "Follow the Delhi 10 PM rule: Under the Noise Pollution Rules 2000, outdoor loudspeaker music must conclude by 10 PM.",
      "Book 1 to 3 months in advance for auspicious wedding season dates in Delhi NCR.",
      "Book directly with one established house to coordinate band, ghodi, dhol, and lights under a single point of contact.",
    ],
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
    keyTakeaways: [
      "Confirm owner vs. broker: Always deal directly with the actual band owner to prevent miscommunication on the wedding day.",
      "Specify band formation: Ask for the exact number of brass musicians and verify uniform and matching safas.",
      "Check song customization: Ensure the band leader agrees in advance to your preferred Bollywood, Punjabi, or family songs.",
      "Verify lighting and generators: Demand silent mobile trolley generators so equipment noise does not drown out the musicians.",
      "Review genuine local proof: Check verified Google Business reviews and authentic unedited event videos before confirming.",
    ],
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
          "Prices depend on the size of the band, venue distance, and which services you add. Once you agree, ask for the details — date, reporting time, number of musicians, ghodi or baggi, and lights — on WhatsApp so both sides have the same record.",
        ],
      },
    ],
    related: ["wedding-band", "baraat-package", "dhol-wale"],
  },
  {
    slug: "wedding-band-cost-delhi",
    title: "Wedding Band Booking Cost in Delhi: 2026 Price Factors, Packages & Budget Guide",
    description:
      "A complete guide to wedding band pricing in Delhi NCR — what decides the cost, honest zero-surge pricing, troop sizes (11 to 31+ players), ghodi & baggi packages, and how to get an exact custom quote without overpaying.",
    published: "2026-11-20",
    updated: "2026-11-20",
    readMinutes: 7,
    image: {
      src: "/images/shiv-band-brass-band-procession.jpg",
      alt: "Uniformed wedding brass band procession in Delhi with trumpets and drums",
    },
    intro:
      "One of the first questions families ask when planning a baraat is: 'How much does a wedding band cost in Delhi?' In the wedding industry, honest brass bands cannot publish a single flat number on the internet. That is because authentic wedding services are completely bespoke — your procession duration, venue location, equipment selection, and musical troop size all determine the logistics. Shiv Band operates on a strict zero-surge pricing policy: we never inflate rates for wedding season or auspicious dates. This guide explains the real factors that shape your budget and how to get an exact, honest quote without middleman markups.",
    keyTakeaways: [
      "Transparent, zero-surge pricing: Shiv Band charges fair, consistent rates year-round with no seasonal price hikes on auspicious wedding dates.",
      "Cost is determined strictly by setup: Musician troop size (11 to 31+ players), vehicle selection (ghodi, flower baggi, vintage car), and venue travel distance dictate your package.",
      "Bundling services (Brass Band + White Ghodi + Flower Baggi + Punjabi Dhol + Chhatri Lights) with one established house saves 20% to 30% compared to hiring separate vendors.",
      "Beware of aggregators and middleman agencies who mark up local band prices by 40% to 60%; always book directly with the family-run house.",
    ],
    sections: [
      {
        heading: "1. The 4 major factors that determine your wedding band budget",
        paragraphs: [
          "Understanding what goes into a baraat quote helps families compare services transparently. Here are the four variables that shape every wedding band quote in Delhi NCR:",
        ],
        list: [
          "Zero Surge Pricing Policy: Many booking portals and brokers inflate rates drastically when they hear your wedding falls on a popular auspicious date. Shiv Band refuses surge pricing. We charge the exact same fair family rates whether your wedding is on an auspicious Saya night or a weekday. We ask for your wedding date solely to verify artist availability.",
          "Size of the Musical Troop: A compact family baraat typically features 11 to 15 musicians. Grand banquet or farmhouse baraats feature 21 to 31+ brass artists, including master trumpet players, clarinets, euphoniums, snare drums, and bass tasha.",
          "Procession Duration & Route Length: A 45-minute street ghudchadi requires different stamina and crew rotation than a 3-hour moving procession covering several kilometers.",
          "Venue Distance & Logistics: A procession near our Krishna Nagar headquarters involves minimal transit. Farmhouse venues in Chattarpur, Sohna Road (Gurugram), or Greater Noida require specialized animal transport vehicles, equipment vans, and highway transit planning.",
        ],
      },
      {
        heading: "2. Why bundling packages saves 20% to 30%",
        paragraphs: [
          "Many families make the mistake of hiring a brass band from one vendor, a ghodi from another, and dhol players from a third party. This creates logistical chaos: the ghodi might arrive late, the dhol rhythm might clash with the brass trumpets, and you pay separate transportation and coordinator fees for each group.",
          "When you book a coordinated package with an established house like Shiv Band, all musicians, dhol players, the decorated ghodi handler, and the crystal chhatri light trolley travel together under a single master conductor. Because equipment transit is consolidated, you save substantially on overhead.",
        ],
      },
      {
        heading: "3. The 3 standard baraat package tiers (inclusions overview)",
        paragraphs: [
          "While rates are tailored to your date and venue, Shiv Band designs three structured package tiers to match different celebration scales:",
        ],
        list: [
          "Traditional Baraat Package: Ideal for intimate community weddings and colony ghudchadi. Includes 11–15 uniformed brass musicians, 2 energetic Punjabi dhol players, a calm decorated white ghodi with a dedicated handler, and mobile battery lighting.",
          "Grand Celebration Package: Our most popular option for banquet halls in Preet Vihar, Laxmi Nagar, Noida, and Rohini. Features 17–21 brass players, 2–4 Punjabi dhol players, royal flower baggi or white ghodi, generator-powered crystal chhatri lights, and a custom Bollywood/Punjabi playlist.",
          "Royal Maharaja VIP Package: Designed for luxury farmhouses and grand destination weddings in South Delhi, Chattarpur, and Gurugram. Includes a 25–31+ piece brass orchestra, 4–6 Punjabi dholis, fresh floral rath carriage or vintage car, dual-side umbrella crystal chandeliers, uniform safa/turban tying crew, and red carpet welcome fanfare.",
        ],
      },
      {
        heading: "4. How to get an exact, no-obligation quote in 2 minutes",
        paragraphs: [
          "To get an exact quote tailored to your wedding without any sales pressure, you only need to share three details with the owner, Manish Kumar:",
        ],
        list: [
          "Your wedding date (strictly to check artist and slot availability).",
          "Your venue or colony address in Delhi NCR (to calculate travel and route timing).",
          "Your preferred setup (e.g., Brass Band + Ghodi + 2 Dhols).",
        ],
      },
    ],
    related: ["wedding-band", "baraat-package", "dhol-wale", "ghodi-for-wedding", "flower-baggi-rath"],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
