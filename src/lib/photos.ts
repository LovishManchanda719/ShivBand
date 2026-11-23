// Built-in photos shipped with the site (in /public/images). Duplicates removed.
export interface LocalPhoto {
  id: string;
  url: string;
  title: string;
}

export const LOCAL_PHOTOS: LocalPhoto[] = [
  { id: "l-hero", url: "/images/shiv-band-luxury-royal-brass-band.jpg", title: "Shiv Band luxury royal brass band ensemble at grand wedding palace" },
  { id: "lvc1", url: "/images/vintage-car/red-vintage-car-groom.jpg", title: "Red vintage car leading a night baraat with celebratory fireworks" },
  { id: "l2", url: "/images/royal-wedding-ghodi-shringar.jpg", title: "White wedding ghodi in full royal peacock shringar" },
  { id: "l1", url: "/images/royal-flower-baggi-chariot.jpg", title: "Flower-decorated royal wedding baggi chariot at palace entrance" },
  { id: "l-shehnai", url: "/images/shehnai/shehnai-band-baraat.jpg", title: "Shiv Band royal shehnai players in red & gold sherwanis" },
  { id: "l3", url: "/images/shiv-band-ceremonial-trumpet-player.jpg", title: "Shiv Band trumpet musician in royal red and gold embroidered uniform" },
  { id: "l107", url: "/images/groom-ghodi-chhatri-lights.jpg", title: "Groom on a decorated ghodi with chhatri lights" },
  { id: "l50", url: "/images/shiv-band-brass-band-procession.jpg", title: "Shiv Band brass band in a night baraat procession with sousaphones" },
  { id: "l103", url: "/images/brass-band-chhatri-lights.jpg", title: "Band and crystal chhatri lights on the road" },
  { id: "l101", url: "/images/dhol-wale-baraat.jpg", title: "Dhol players before the baraat" },
  { id: "l-bagpipe", url: "/images/bagpiper/bagpiper-band-entry.jpg", title: "Bagpiper band in ceremonial uniforms at wedding entry" },
  { id: "l108", url: "/images/108.jpg", title: "Band uniforms at the Krishna Nagar shop" },
  { id: "l106", url: "/images/106.jpg", title: "Band uniform display at the shop" },
  { id: "l102", url: "/images/102.jpg", title: "Gold sherwani-style band uniform" },
  { id: "l110", url: "/images/110.jpg", title: "Shiv Band & Light House shop front" },
  { id: "lvc2", url: "/images/vintage-car/white-vintage-car-baraat.jpg", title: "White vintage car with the family" },
];

// Byte-identical copies that exist in /public/images under a second name.
// Any photo pointing at the alias is treated as the original, so it never shows twice.
export const DUPLICATE_ALIASES: Record<string, string> = {
  "/images/1.jpg": "/images/royal-flower-baggi-chariot.jpg",
  "/images/104.jpg": "/images/royal-flower-baggi-chariot.jpg",
  "/images/2.jpg": "/images/royal-wedding-ghodi-shringar.jpg",
  "/images/105.jpg": "/images/royal-wedding-ghodi-shringar.jpg",
  "/images/3.jpg": "/images/shiv-band-ceremonial-trumpet-player.jpg",
  "/images/109.jpg": "/images/shiv-band-ceremonial-trumpet-player.jpg",
  // Older low-quality copies, replaced by sharper versions under descriptive names
  "/images/100.jpg": "/images/shiv-band-brass-band-procession.jpg",
  "/images/50.jpg": "/images/shiv-band-brass-band-procession.jpg",
  "/images/101.jpg": "/images/dhol-wale-baraat.jpg",
  "/images/103.jpg": "/images/brass-band-chhatri-lights.jpg",
  "/images/107.jpg": "/images/groom-ghodi-chhatri-lights.jpg",
  "/images/vintage-car/red-vintage-car-baraat.jpg": "/images/vintage-car/red-vintage-car-groom.jpg",
};

export const canonicalPhotoUrl = (url: string) => DUPLICATE_ALIASES[url] || url;
