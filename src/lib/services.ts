// Service catalogue. Every page under /services/[slug] is generated from this file,
// including its metadata, FAQ and structured data. Copy is based on what the business offers.

export type ServiceIcon = "music" | "crown" | "flower" | "drum" | "lamp" | "package" | "bagpipe" | "shehnai" | "car";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  icon: ServiceIcon;
  name: string; // short name used on cards and nav
  hindi: string; // Hindi heading shown under the H1 (helps Hindi and Hinglish searches)
  h1: string; // page heading (keyword-focused, human-readable)
  tagline: string; // one line on cards
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string[]; // paragraphs
  includes: string[];
  occasions: string[];
  images: { src: string; alt: string; focus?: string }[]; // focus = CSS object-position; may be empty until real photos are added
  videos?: { src: string; poster: string; title: string }[]; // short muted clips from real events
  illustrativeImages?: boolean; // true when photos are illustrations, not from a real event
  faqs: ServiceFaq[];
}

export const SERVICES: Service[] = [
  {
    slug: "wedding-band",
    icon: "music",
    name: "Wedding Band",
    hindi: "शादी के लिए बैंड बाजा — बारात बैंड, दिल्ली",
    h1: "Wedding Band & Baraat Band in Delhi",
    tagline: "Uniformed brass band for the baraat, from Krishna Nagar to all of Delhi NCR.",
    metaTitle: "Best Wedding Band & Baraat Band Near Me in Delhi",
    metaDescription:
      "Book Shiv Band & Light House — a live uniformed brass band for your baraat. Trumpet, clarinet and drums playing Bollywood and Punjabi hits. Krishna Nagar, East Delhi. Call 98186 26259.",
    keywords: [
      "best wedding band near me",
      "best baraat band near me",
      "wedding band in Delhi",
      "baraat band Delhi",
      "band baaja for wedding",
      "brass band for baraat",
      "Shiv Band",
          "band baja near me",
      "band baaja baraat",
      "band wala near me",
      "brass band Delhi",
      "baraat band East Delhi",
      "wedding band Krishna Nagar",
    ],
    intro: [
      "A baraat is only as good as its band baja. Shiv Band & Light House has been leading baraats out of Krishna Nagar since 1996 with a live, uniformed brass band — trumpets, clarinets, side drums and the big bass — playing the songs your family actually wants to dance to.",
      "Bands are available in different sizes, from a compact group for a short procession to a full 21 to 51-piece royal band for a grand baraat. Every musician arrives in matching ceremonial uniform with safa, and the band leader coordinates with your family on timing, route and song list.",
    ],
    includes: [
      "Live brass band in matching ceremonial uniform and safa",
      "Trumpet, clarinet, side drums and bass drum",
      "Bollywood, Punjabi and traditional baraat songs on request",
      "Band sizes from small groups up to a 21 to 51-piece royal band",
      "Band leader who coordinates timing with your family",
      "Can be combined with ghodi, baggi, dhol and lights",
    ],
    occasions: ["Baraat procession", "Groom entry", "Jaimala", "Engagement and roka", "Religious processions"],
    images: [
      { src: "/images/shiv-band-brass-band-procession.jpg", alt: "Shiv Band brass band playing in a night baraat procession in Delhi" },
      { src: "/images/3.jpg", alt: "Shiv Band trumpet player in red ceremonial uniform" },
      { src: "/images/brass-band-chhatri-lights.jpg", alt: "Wedding band musicians walking with chhatri lights at night" },
      { src: "/images/108.jpg", alt: "Shiv Band wedding band uniforms displayed at the Krishna Nagar shop" },
    ],
    faqs: [
      {
        q: "How do I book the best wedding band near me in East Delhi?",
        a: "Call or WhatsApp Manish Kumar on 98186 26259, or send your date through the booking form on this site. Our shop is on Parwana Road, New Govindpura, Krishna Nagar, and we cover all of Delhi NCR.",
      },
      {
        q: "What size of baraat band can I book?",
        a: "We arrange bands of different sizes, from a small group for a short procession up to a full 21 to 51-piece royal band. Tell us the length of your route and the feel you want, and we will suggest a size.",
      },
      {
        q: "Can we choose the songs the band plays?",
        a: "Yes. Share your favourite Bollywood, Punjabi or family songs in advance and the band leader will plan the set around them.",
      },
      {
        q: "Till what time can the band play in Delhi?",
        a: "Under the Noise Pollution Rules, loudspeakers and sound systems are not allowed in public between 10 PM and 6 AM. Plan the baraat so it reaches the venue before 10 PM and we will time the band accordingly.",
      },
      {
        q: "How early should we book a wedding band?",
        a: "Popular wedding dates in the season fill quickly, so it is best to book as soon as your date is fixed. You can still call for last-minute dates and we will tell you honestly what is available.",
      },
    ],
  },
  {
    slug: "ghodi-for-wedding",
    icon: "crown",
    name: "Ghodi",
    hindi: "शादी के लिए घोड़ी — दूल्हे की सजी हुई सफ़ेद घोड़ी",
    h1: "Ghodi for Wedding — Decorated White Ghodi for the Groom",
    tagline: "Calm, well-trained white ghodi with full shringar for the groom's entry.",
    metaTitle: "Ghodi for Wedding in Delhi | Best Ghodi Wala Near Me",
    metaDescription:
      "Book a decorated white ghodi for the groom from Shiv Band & Light House, Krishna Nagar, Delhi. Calm, healthy, well-trained mares with traditional shringar. Call 98186 26259.",
    keywords: [
      "ghodi for wedding",
      "ghodi wala near me",
      "best ghodi near me",
      "ghori for wedding Delhi",
      "white horse for groom",
      "wedding ghodi booking",
          "ghodi wala",
      "ghori wala near me",
      "ghudchadi ghodi",
      "ghodi booking Delhi",
      "white ghodi for groom",
    ],
    intro: [
      "The groom's ride on the ghodi is the moment everyone lines up to watch. Our white ghodis are healthy, calm and used to music, lights and crowds, so the groom can enjoy the ride and the photographs come out right.",
      "Each ghodi is dressed in traditional shringar — embroidered saddle cloth, silver and gold work, plume and jewellery — and is led by an experienced handler who stays with the ghodi for the whole procession.",
    ],
    includes: [
      "Healthy, well-trained white ghodi",
      "Traditional shringar with embroidered saddle and jewellery",
      "Experienced handler throughout the procession",
      "Calm around band music, dhol and lights",
      "Available on its own or with band, baggi and lights",
    ],
    occasions: ["Groom's ghudchadi", "Baraat procession", "Sehrabandi", "Pre-wedding photo shoots"],
    images: [
      { src: "/images/2.jpg", alt: "Decorated white wedding ghodi with traditional shringar by Shiv Band" },
      { src: "/images/groom-ghodi-chhatri-lights.jpg", alt: "Groom riding a decorated ghodi under chhatri lights in a Delhi baraat" },
    ],
    faqs: [
      {
        q: "Can I book only a ghodi without the band?",
        a: "Yes. The ghodi can be booked on its own, or combined with the band, dhol, baggi and lights for a full baraat.",
      },
      {
        q: "Is the ghodi comfortable around loud music and crowds?",
        a: "Our ghodis are used to band music, dhol, lights and crowds, and an experienced handler leads the ghodi for the whole procession.",
      },
      {
        q: "Where do you provide wedding ghodi?",
        a: "We are based in Krishna Nagar, East Delhi, and bring the ghodi to venues across Delhi NCR, including Noida, Ghaziabad, Gurugram and Faridabad.",
      },
    ],
  },
  {
    slug: "flower-baggi-rath",
    icon: "flower",
    name: "Baggi & Rath",
    hindi: "शादी के लिए फूलों वाली बग्गी और रथ",
    h1: "Flower Baggi & Rath for Wedding in Delhi",
    tagline: "Flower-decorated baggi and royal rath for the groom or bride's entry.",
    metaTitle: "Wedding Baggi & Flower Baggi Near Me in Delhi | Rath for Baraat",
    metaDescription:
      "Book a flower-decorated wedding baggi or royal rath from Shiv Band & Light House, Krishna Nagar, Delhi. Horse-drawn carriages for the groom or bride's entry. Call 98186 26259.",
    keywords: [
      "baggi for wedding",
      "best baggi near me",
      "flower baggi near me",
      "wedding rath Delhi",
      "baggi for marriage",
      "horse carriage for wedding",
          "baggi on rent",
      "buggy for wedding",
      "wedding buggy Delhi",
      "baggi wala near me",
      "rath for wedding",
    ],
    intro: [
      "For families who want something grander than the ghodi, the baggi (wedding buggy) is the showpiece of the baraat. We decorate our horse-drawn baggis with fresh flowers and lights, and also provide larger rath-style chariots for a royal entry.",
      "The baggi works beautifully for the groom's baraat, the bride's entry, or the couple's vidaai. Tell us your colour theme and we will plan the flower decoration around it.",
    ],
    includes: [
      "Horse-drawn baggi decorated with flowers and lights",
      "Royal rath-style chariots for a grand entry",
      "Trained horses and experienced driver",
      "Decoration planned around your colour theme",
      "Works for groom's baraat, bride's entry or vidaai",
    ],
    occasions: ["Groom's baraat", "Bride's entry", "Vidaai", "Religious processions and jhankis"],
    images: [{ src: "/images/1.jpg", alt: "Flower-decorated wedding baggi by Shiv Band & Light House, Delhi" }],
    faqs: [
      {
        q: "What is the difference between a baggi and a rath?",
        a: "A baggi is a classic horse-drawn carriage, decorated with flowers and lights. A rath is a larger chariot-style carriage for a more dramatic, royal entry. We can show you both before you decide.",
      },
      {
        q: "Can the baggi decoration match our wedding colours?",
        a: "Yes. Share your colour theme when you book and we will plan the flowers around it.",
      },
      {
        q: "Can the bride use the baggi for her entry?",
        a: "Absolutely. Many families book the baggi for the bride's entry or for the couple's vidaai.",
      },
    ],
  },
  {
    slug: "dhol-wale",
    icon: "drum",
    name: "Dhol Wale",
    hindi: "शादी के लिए ढोल वाले — पंजाबी ढोल, दिल्ली",
    h1: "Dhol Wale for Wedding — Punjabi Dhol in Delhi",
    tagline: "Punjabi dhol players for the baraat, mehndi, sangeet and every entry.",
    metaTitle: "Best Dhol Wale Near Me in Delhi | Punjabi Dhol for Wedding",
    metaDescription:
      "Book Punjabi dhol wale for your baraat, mehndi or sangeet from Shiv Band & Light House, Krishna Nagar, Delhi. Dhol players in traditional dress. Call 98186 26259.",
    keywords: [
      "best dhol wale near me",
      "dhol wale near me",
      "dhol for wedding Delhi",
      "punjabi dhol players",
      "dhol for baraat",
      "dhol tasha Delhi",
          "dhol wala near me",
      "dhol for mehndi",
      "dhol for sangeet",
      "punjabi dhol Delhi",
    ],
    intro: [
      "Nothing gets the baraat dancing faster than the dhol. Our dhol players perform in traditional dress and know exactly when to lift the energy — at the groom's departure, at the venue gate and during the bhangra in between.",
      "Book dhol on its own for a mehndi, sangeet, roka or Jago night, or add dhol to the brass band for a louder, longer baraat.",
    ],
    includes: [
      "Punjabi dhol players in traditional dress",
      "Dhol for baraat, mehndi, sangeet, roka and Jago nights",
      "Nashik-style dhol tasha on request",
      "Can play alongside the brass band",
    ],
    occasions: ["Baraat", "Mehndi", "Sangeet", "Roka", "Jago night", "Bride and groom entry"],
    images: [{ src: "/images/dhol-wale-baraat.jpg", alt: "Shiv Band dhol players ready for a wedding baraat at night" }],
    faqs: [
      {
        q: "Can I book dhol wale without the full band?",
        a: "Yes. Dhol can be booked on its own for any function, or added to the brass band for the baraat.",
      },
      {
        q: "Do you provide dhol for mehndi and sangeet?",
        a: "Yes, we provide dhol for mehndi, sangeet, roka, Jago nights and bride or groom entries across Delhi NCR.",
      },
      {
        q: "How do I check if dhol wale are free on my date?",
        a: "Call or WhatsApp 98186 26259, or send your date through the booking form and we will confirm availability.",
      },
    ],
  },
  {
    slug: "wedding-lights",
    icon: "lamp",
    name: "Lights",
    hindi: "बारात के लिए छत्री लाइट, झूमर और रोड लाइट",
    h1: "Chhatri Lights, Jhumar & Baraat Lighting in Delhi",
    tagline: "Crystal chhatri lights, jhumar and road lights that light up the evening baraat.",
    metaTitle: "Chhatri Lights, Jhumar & Baraat Lighting in Delhi",
    metaDescription:
      "Crystal chhatri (chattar) lights, jhumar lights, road lights and silent generators for your baraat from Shiv Band & Light House, Krishna Nagar, Delhi. Call 98186 26259.",
    keywords: [
      "chhatri light for wedding",
      "baraat lights Delhi",
      "wedding light house near me",
      "fancy lights for baraat",
      "crystal chhatri lights",
      "Shiv Band & Light House",
          "jhumar light for wedding",
      "jhumar lights for baraat",
      "crystal chattar light",
      "road light for baraat",
      "light wala near me",
      "baraat lighting East Delhi",
    ],
    intro: [
      "The \"Light House\" in our name is there for a reason. An evening baraat lit by rows of crystal chhatri lights is one of the most beautiful sights of a Delhi wedding — and it is what makes your night photos glow.",
      "We provide crystal chhatri (chattar) lights, jhumar-style chandelier lights, road lights along the route, maharaja-style lanterns and LED light pillars, powered by silent trolley generators so the music is never drowned out.",
    ],
    includes: [
      "Crystal chhatri (chattar) lights carried along the procession",
      "Jhumar-style chandelier lights and road lights",
      "Maharaja-style lanterns and LED light pillars",
            "Silent trolley generators",
      "Lighting crew who walk with the baraat",
    ],
    occasions: ["Evening baraat", "Groom entry", "Venue entrance", "Religious processions"],
    images: [
      { src: "/images/brass-band-chhatri-lights.jpg", alt: "Crystal chhatri lights lighting up a night baraat in Delhi" },
      { src: "/images/groom-ghodi-chhatri-lights.jpg", alt: "Baraat with chhatri lights and light strings around the groom's ghodi" },
    ],
    faqs: [
      {
        q: "What lighting do you provide for the baraat?",
        a: "Crystal chhatri (chattar) lights, jhumar-style chandelier lights, road lights, maharaja-style lanterns and LED light pillars, powered by silent trolley generators.",
      },
      {
        q: "Will the generator be noisy?",
        a: "We use silent trolley generators so the band and dhol are not drowned out.",
      },
      {
        q: "Can lights be booked without the band?",
        a: "Yes. Lighting can be booked on its own or as part of a full baraat package.",
      },
    ],
  },
  {
    slug: "bagpiper-band",
    icon: "bagpipe",
    name: "Bagpiper Band",
    hindi: "शादी के लिए बैगपाइपर बैंड",
    h1: "Bagpiper Band for Wedding in Delhi",
    tagline: "A uniformed bagpiper band for a royal, regal baraat entry.",
    metaTitle: "Bagpiper Band for Wedding in Delhi | Bagpipe Band Near Me",
    metaDescription:
      "Book a uniformed bagpiper band for your baraat or wedding entry from Shiv Band & Light House, Krishna Nagar, Delhi. Call 98186 26259.",
    keywords: [
      "bagpiper band for wedding",
      "bagpipe band Delhi",
      "bagpiper band near me",
      "pipe band for baraat",
      "bagpiper for wedding entry",
    ],
    intro: [
      "Few sounds announce a grand entry like a bagpiper band. The deep drone of the pipes and the steady beat of the drums give the baraat a royal, ceremonial feel that stands out from every other procession on the road.",
      "Our bagpiper band performs in matching ceremonial uniform and works well for the groom's arrival, the bride's entry, the jaimala or a formal reception welcome. It can lead the baraat on its own or play alongside the brass band and dhol.",
    ],
    includes: [
      "Bagpiper band in matching ceremonial uniform",
      "Bagpipes with accompanying drums",
      "For baraat, bride or groom entry, jaimala and receptions",
      "Can be combined with brass band, dhol, ghodi and lights",
    ],
    occasions: ["Baraat procession", "Groom entry", "Bride entry", "Jaimala", "Reception welcome"],
    images: [
      { src: "/images/bagpiper/bagpiper-band-wedding.jpg", alt: "Illustration of a bagpiper band in red tartan uniforms at a night wedding" },
      { src: "/images/bagpiper/bagpiper-band-entry.jpg", alt: "Illustration of bagpipers leading a wedding entry under chhatri lights" },
    ],
    illustrativeImages: true,
    faqs: [
      {
        q: "Can the bagpiper band play with the brass band?",
        a: "Yes. Many families have the bagpiper band lead a part of the baraat or the venue entry, with the brass band and dhol for the dancing stretches.",
      },
      {
        q: "Is a bagpiper band good for the bride's entry?",
        a: "Yes. The bagpiper band gives a graceful, regal feel to the bride's entry and the jaimala.",
      },
      {
        q: "How do I book a bagpiper band in Delhi?",
        a: "Call or WhatsApp 98186 26259, or send your date and venue through the booking form on this page.",
      },
    ],
  },
  {
    slug: "shehnai-wedding",
    icon: "shehnai",
    name: "Shehnai",
    hindi: "शादी के लिए शहनाई वादन",
    h1: "Shehnai for Wedding in Delhi — Live Shehnai Players",
    tagline: "Live shehnai for the pheras, milni and the moments that need tradition.",
    metaTitle: "Shehnai for Wedding in Delhi | Shehnai Wala Near Me",
    metaDescription:
      "Book live shehnai players for your wedding, pheras, milni or griha pravesh from Shiv Band & Light House, Krishna Nagar, Delhi. Call 98186 26259.",
    keywords: [
      "shehnai for wedding",
      "shehnai wala near me",
      "shehnai players Delhi",
      "live shehnai for pheras",
      "shehnai vadan",
    ],
    intro: [
      "The shehnai is the sound of an Indian wedding. Its sweet, auspicious notes set the mood for the most sacred moments — the milni, the pheras, the vidaai — in a way recorded music never can.",
      "We provide live shehnai players for weddings and family functions, either on their own or alongside the band and dhol during the baraat.",
    ],
    includes: [
      "Live shehnai players",
      "Traditional and devotional tunes for the rituals",
      "For milni, pheras, vidaai, griha pravesh and religious functions",
      "Can be combined with the band and dhol",
    ],
    occasions: ["Milni", "Pheras", "Vidaai", "Griha pravesh", "Religious functions"],
    images: [
      { src: "/images/shehnai/shehnai-band-baraat.jpg", alt: "Illustration of shehnai players in red and gold Shiv Band uniforms at a night wedding" },
      { src: "/images/shehnai/shehnai-players-wedding.jpg", alt: "Illustration of shehnai players leading a wedding entry under chhatri lights" },
      { src: "/images/shehnai/shehnai-player-closeup.jpg", alt: "Illustration of a shehnai player in ceremonial turban at a wedding" },
    ],
    illustrativeImages: true,
    faqs: [
      {
        q: "When is shehnai usually played at a wedding?",
        a: "Most families have shehnai during the milni, the pheras and the vidaai, and some also during the baraat's arrival at the venue.",
      },
      {
        q: "Can I book only shehnai without the band?",
        a: "Yes. Shehnai can be booked on its own for any function, or added to the band and dhol.",
      },
      {
        q: "How do I book shehnai players?",
        a: "Call or WhatsApp 98186 26259, or send your date and venue through the booking form on this page.",
      },
    ],
  },
  {
    slug: "vintage-car-wedding",
    icon: "car",
    name: "Vintage Car",
    hindi: "शादी के लिए विंटेज कार — दूल्हे की एंट्री और विदाई",
    h1: "Vintage Car for Wedding in Delhi — Groom Entry & Vidaai",
    tagline: "A decorated vintage car for the groom's entry or the couple's vidaai.",
    metaTitle: "Vintage Car for Wedding in Delhi | Vintage Car on Rent for Baraat",
    metaDescription:
      "Book a decorated vintage car for the groom's entry or the couple's vidaai from Shiv Band & Light House, Krishna Nagar, Delhi. Call 98186 26259.",
    keywords: [
      "vintage car for wedding",
      "vintage car on rent Delhi",
      "vintage car for baraat",
      "vintage car for groom entry",
      "vintage car for vidaai",
    ],
    intro: [
      "For couples who want something different from the ghodi or baggi, a decorated vintage car makes a stylish, timeless entry — and photographs beautifully.",
      "The vintage car works well for the groom's arrival, for shorter routes, and especially for the couple's vidaai. It can be booked on its own or as part of a complete baraat with the band, dhol and lights.",
    ],
    includes: [
      "Decorated vintage car with driver",
      "For groom entry, couple entry or vidaai",
      "Decoration planned around your wedding theme",
      "Can be combined with band, dhol and lights",
    ],
    occasions: ["Groom entry", "Couple entry", "Vidaai", "Pre-wedding shoots"],
    images: [
      { src: "/images/vintage-car/red-vintage-car-groom.jpg", alt: "Groom in a decorated red vintage car leading a night baraat with chhatri lights in Delhi" },
      { src: "/images/vintage-car/white-vintage-car-baraat.jpg", alt: "Family dancing on a white vintage car during a Delhi baraat with chhatri lights" },
    ],
    videos: [
      { src: "/images/vintage-car/vintage-car-baraat.mp4", poster: "/images/vintage-car/red-vintage-car-groom.jpg", title: "Red vintage car leading the baraat" },
      { src: "/images/vintage-car/vintage-car-bride.mp4", poster: "/images/vintage-car/white-vintage-car-baraat.jpg", title: "White vintage car with the family" },
    ],
    faqs: [
      {
        q: "Can we use the vintage car for the vidaai?",
        a: "Yes. The vintage car is a popular choice for the couple's vidaai and for photographs after the wedding.",
      },
      {
        q: "Can the vintage car be decorated with flowers?",
        a: "Yes. Tell us your colour theme when you book and we will plan the decoration.",
      },
      {
        q: "How do I book a vintage car for my wedding?",
        a: "Call or WhatsApp 98186 26259, or send your date and venue through the booking form on this page.",
      },
    ],
  },
  {
    slug: "baraat-package",
    icon: "package",
    name: "Full Baraat",
    hindi: "पूरी बारात का पैकेज — बैंड, घोड़ी, बग्गी, ढोल और लाइट",
    h1: "Complete Baraat Package — Band, Ghodi, Baggi, Dhol, Lights & More",
    tagline: "Everything for the baraat from one family-run house, booked directly with the owner.",
    metaTitle: "Complete Baraat Package in Delhi | Band, Ghodi, Baggi, Dhol & Lights",
    metaDescription:
      "Book a complete baraat — brass band, ghodi, flower baggi, dhol and chhatri lights — directly with the owner of Shiv Band & Light House, Krishna Nagar, Delhi. Call 98186 26259.",
    keywords: [
      "baraat package Delhi",
      "wedding band ghodi baggi package",
      "complete baraat booking",
      "band baaja ghodi package",
      "Shiv Band and Light House",
          "band baja ghodi baggi package",
      "baraat booking Delhi",
      "wedding band and ghodi package",
    ],
    intro: [
      "Most families do not want to coordinate five different vendors on the wedding night. With Shiv Band & Light House, the band, ghodi, baggi, dhol and lights all come from one family-run house and arrive as one team.",
      "You deal directly with the owner, Manish Kumar — no middlemen. Tell us your date, venue and the size of the baraat, and we will put together a package that fits.",
    ],
    includes: [
      "Brass band, ghodi, baggi, dhol and lights from one team",
      "Booked directly with the owner, no middlemen",
      "One point of contact for timing on the day",
      "Package built around your date, route and budget",
    ],
    occasions: ["Full wedding baraat", "Destination baraats within Delhi NCR"],
    images: [
      { src: "/images/groom-ghodi-chhatri-lights.jpg", alt: "Complete baraat with ghodi, band and chhatri lights by Shiv Band", focus: "32% 50%" },
      { src: "/images/shiv-band-brass-band-procession.jpg", alt: "Shiv Band brass band leading a full baraat procession" },
    ],
    faqs: [
      {
        q: "What does a complete baraat package include?",
        a: "Any combination of brass band, bagpiper band, shehnai, ghodi, flower baggi or rath, vintage car, dhol and chhatri or jhumar lights. We build it around your date, route and budget.",
      },
      {
        q: "Who do we deal with for the booking?",
        a: "You book directly with the owner, Manish Kumar, on 98186 26259 or 98186 22259.",
      },
      {
        q: "What are your prices?",
        a: "Prices depend on the date, the size of the band and which services you combine. Call or WhatsApp with your details for an exact quote.",
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const SERVICE_NAMES = SERVICES.map((s) => s.name);
