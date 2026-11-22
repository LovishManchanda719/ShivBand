import { SITE, SITE_URL, AREAS_SERVED } from "./site";
import { SERVICES, type Service, type ServiceFaq } from "./services";

export const BUSINESS_ID = `${SITE_URL}/#business`;

// LocalBusiness: the core entity Google uses for the map pack and brand searches.
// No aggregateRating here on purpose — Google ignores self-published ratings on
// LocalBusiness and hard-coded numbers risk a manual action.
export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EntertainmentBusiness", "PerformingGroup", "MusicGroup"],
  "@id": BUSINESS_ID,
  name: SITE.name,
  legalName: "Shiv Band & Light House",
  alternateName: SITE.alternateNames,
  slogan: "Baraat ki Shaan, Delhi NCR Since 1996",
  brand: {
    "@type": "Brand",
    name: "Shiv Band",
    alternateName: SITE.alternateNames,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon`,
  },
  description:
    "Shiv Band & Light House is a premier family-run wedding brass band in Krishna Nagar, East Delhi, serving all Delhi NCR since 1996 with live brass symphony, baraat band, groom ghodi, flower baggi, rath, Punjabi dhol wale and crystal chhatri lights.",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-icon`,
  image: [`${SITE_URL}/images/shiv-band-brass-band-procession.jpg`, `${SITE_URL}/images/groom-ghodi-chhatri-lights.jpg`, `${SITE_URL}/images/2.jpg`, `${SITE_URL}/images/1.jpg`],
  telephone: SITE.phones[0].tel,
  email: SITE.email,
  foundingDate: String(SITE.foundingYear),
  founder: { "@type": "Person", name: SITE.owner },
  priceRange: "₹₹ (Transparent Family Rates · Zero-Surge Guarantee)",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Net Banking",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: `${SITE.address.locality}, ${SITE.address.city}`,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
  ],
  contactPoint: SITE.phones.map((p, i) => ({
    "@type": "ContactPoint",
    telephone: p.tel,
    contactType: i === 0 ? "customer service" : "reservations",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "pa"],
  })),
  areaServed: [
    { "@type": "AdministrativeArea", name: "Delhi" },
    { "@type": "AdministrativeArea", name: "Delhi NCR" },
    ...AREAS_SERVED.map((name) => ({ "@type": "Place", name: `${name}, Delhi NCR` })),
  ],
  knowsLanguage: ["en", "hi", "pa"],
  knowsAbout: [
    "Wedding Brass Band",
    "Baraat Processions",
    "Groom Ghodi",
    "Flower Baggi",
    "Rath Chariot",
    "Punjabi Dhol",
    "Chhatri Lights",
    "Bagpiper Band",
    "Shehnai",
    "Vintage Wedding Car Rental",
  ],
  makesOffer: SERVICES.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.h1, url: `${SITE_URL}/services/${s.slug}` },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Baraat & Wedding Band Packages",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Traditional Baraat Package",
        description: "11-15 brass musicians, decorated ghodi with handler, 2 Punjabi dhol players, crystal chhatri lanterns, and generator trolley.",
        url: `${SITE_URL}/packages`,
      },
      {
        "@type": "OfferCatalog",
        name: "Grand Celebration Package",
        description: "21-piece brass orchestra, decorated white mare, 2-horse luxury flower baggi, 4 Punjabi dholis, crystal chhatri & vintage jhumar lighting.",
        url: `${SITE_URL}/packages`,
      },
      {
        "@type": "OfferCatalog",
        name: "Royal Maharaja VIP Package",
        description: "31+ piece grand brass symphony, 4-horse royal rath or vintage car, 6 Punjabi dhol masters, full chhatri, jhumar and road lighting with zero-surge guarantee.",
        url: `${SITE_URL}/packages`,
      },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#about p", ".faq-answer"],
  },
  sameAs: [
    SITE.social.instagram,
    SITE.social.facebook,
    SITE.social.youtube,
    SITE.mapsUrl,
    "https://en.wikipedia.org/wiki/Brass_band",
    "https://en.wikipedia.org/wiki/Baraat",
    "https://en.wikipedia.org/wiki/Ghudchari",
    "https://en.wikipedia.org/wiki/Dhol",
    "https://en.wikipedia.org/wiki/Shehnai",
    "https://en.wikipedia.org/wiki/Bagpipes",
    "https://www.wikidata.org/wiki/Q10886",
    "https://www.wikidata.org/wiki/Q1353",
    "https://www.wikidata.org/wiki/Q38968",
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE.shortName,
  alternateName: [
    "Shiv Band & Light House",
    "Shiv Band and Light House",
    "Shiv Band Delhi",
    "Shiv Band Krishna Nagar",
    "शिव बैंड",
    "शिव बैंड एंड लाइट हाउस",
  ],
  inLanguage: "en-IN",
  publisher: { "@id": BUSINESS_ID },
});

export const siteNavigationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#navigation`,
  name: "Shiv Band Main Navigation",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Wedding Services",
      description: "Brass band, ghodi, flower baggi, dhol wale, chhatri lights and vintage cars.",
      url: `${SITE_URL}/services`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Baraat Packages & Pricing",
      description: "Custom wedding band packages with transparent Zero-Surge pricing.",
      url: `${SITE_URL}/packages`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Areas Served in Delhi NCR",
      description: "Coverage across East Delhi, South Delhi, Noida, Ghaziabad, Gurugram & Faridabad.",
      url: `${SITE_URL}/locations`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Live Photos & Video Gallery",
      description: "Authentic live performance recordings and photography from real Delhi baraats.",
      url: `${SITE_URL}/gallery/photos`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "Customer Reviews",
      description: "Verified customer testimonials and ratings from wedding families.",
      url: `${SITE_URL}/reviews`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "Contact & Booking",
      description: "Direct contact with owner Manish Kumar, shop location on Parwana Road, Krishna Nagar.",
      url: `${SITE_URL}/contact`,
    },
  ],
});

export const serviceSchema = (s: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/${s.slug}#service`,
  name: s.h1,
  serviceType: s.name,
  description: s.metaDescription,
  url: `${SITE_URL}/services/${s.slug}`,
  image: s.images.length ? s.images.map((i) => (i.src.startsWith("http") ? i.src : `${SITE_URL}${i.src}`)) : `${SITE_URL}/opengraph-image`,
  provider: { "@id": BUSINESS_ID },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Delhi NCR" },
    ...AREAS_SERVED.map((name) => ({ "@type": "Place", name: `${name}, Delhi NCR` })),
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "INR",
      description: "Custom family rates with Zero-Surge Pricing Guarantee based purely on troop configuration and venue distance.",
    },
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/packages`,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".service-description", ".faq-answer"],
  },
});

export const faqSchema = (faqs: ServiceFaq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const locationBusinessSchema = (loc: {
  slug: string;
  name: string;
  metaDescription: string;
  coverageAreas: string[];
  keywords: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EntertainmentBusiness"],
  "@id": `${SITE_URL}/locations/${loc.slug}#business`,
  name: `${SITE.name} — ${loc.name}`,
  url: `${SITE_URL}/locations/${loc.slug}`,
  description: loc.metaDescription,
  telephone: SITE.phones[0].tel,
  priceRange: "₹₹ (Transparent Family Rates · Zero-Surge Guarantee)",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Net Banking",
  parentOrganization: { "@id": BUSINESS_ID },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: [
    { "@type": "Place", name: `${loc.name}, Delhi NCR` },
    ...loc.coverageAreas.map((c) => ({ "@type": "Place", name: `${c}, Delhi NCR` })),
  ],
  knowsAbout: loc.keywords,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".loc-intro", ".faq-answer"],
  },
});

export const HOME_FAQS: ServiceFaq[] = [
  {
    q: "Is Shiv Band affiliated with Shiv Mohan Band?",
    a: "No. Shiv Band & Light House (est. 1996 in Krishna Nagar, East Delhi, owned by Manish Kumar) is an independent family-run heritage brass band. We are completely independent of Shiv Mohan Band (Karol Bagh / Rajouri Garden). Shiv Band is celebrated across Delhi NCR for our strict Zero-Surge pricing policy, cruelty-free trained white ghodis, in-house uniformed brass musicians, and direct owner supervision on every single baraat.",
  },
  {
    q: "Where is Shiv Band & Light House located?",
    a: "Our shop is at D-96, Parwana Road, New Govindpura (near Laxmi Dairy), Krishna Nagar, New Delhi 110051. We are open every day from 10 AM to 9 PM.",
  },
  {
    q: "Who is the owner of Shiv Band in Delhi?",
    a: "Shiv Band & Light House was founded in 1996 and is personally managed by Manish Kumar (Manish Manchanda). Customers interact directly with Manish Kumar with zero broker markups or commission agents.",
  },
  {
    q: "What is Shiv Band's official contact number?",
    a: "Shiv Band's direct booking numbers are +91 98186 26259 and +91 98186 22259. You can also contact us on WhatsApp at 919818626259 or visit our official website at https://shivband.in.",
  },
  {
    q: "Does Shiv Band charge surge pricing on peak wedding season or auspicious (Saya) dates?",
    a: "No. Shiv Band maintains a strict Zero-Surge Pricing policy. Our rates never inflate or surge based on auspicious dates or wedding season peaks. Event dates are checked strictly for troop and artist availability. Pricing is determined strictly by troop size (11 to 31+ players), vehicle selection (ghodi, baggi, rath, vintage car), and travel distance with zero middleman commissions.",
  },
  {
    q: "Which is a good wedding band near me in East Delhi?",
    a: "Shiv Band & Light House has led baraats from Krishna Nagar since 1996 and covers Geeta Colony, Preet Vihar, Laxmi Nagar, Shahdara, Mayur Vihar, and the rest of Delhi NCR with brass band, ghodi, baggi, dhol wale and chhatri lights.",
  },
  {
    q: "What instruments and musicians are in a traditional wedding brass band?",
    a: "A traditional brass band lineup includes trumpets, clarinets, euphoniums, side snare drums, master tasha, and dholak, all led by an experienced master conductor in matching ceremonial uniforms and traditional safas.",
  },
  {
    q: "Can I book ghodi, baggi or dhol separately without the brass band?",
    a: "Yes. Every service can be booked on its own — only a decorated ghodi, only Punjabi dhol players, only flower baggi, or only chhatri lights — or combined into an all-in-one complete baraat package for a 20% to 30% bundle savings.",
  },
  {
    q: "Until what time can a wedding band perform in Delhi?",
    a: "Under the Delhi Noise Pollution (Regulation and Control) Rules 2000, outdoor amplified brass band music and loudspeakers must conclude by 10:00 PM. Shiv Band coordinates route timing backwards from your venue arrival to ensure complete legal compliance.",
  },
  {
    q: "How do I book Shiv Band?",
    a: "Call or WhatsApp the owner, Manish Kumar, on 98186 26259 or 98186 22259, or send your date and venue through our online booking form. No account or registration is needed.",
  },
  {
    q: "Do you serve Noida, Ghaziabad, Gurugram, and Faridabad?",
    a: "Yes. Centrally based in Krishna Nagar, East Delhi, our private transport fleet regularly travels across Noida, Greater Noida, Ghaziabad (Indirapuram, Vaishali), Gurugram (Golf Course & Sohna Road farmhouses), and Faridabad.",
  },
];
