// Built-in photos shipped with the site (in /public/images). Duplicates removed.
export interface LocalPhoto {
  id: string;
  url: string;
  title: string;
}

export const LOCAL_PHOTOS: LocalPhoto[] = [
  { id: "l-hero", url: "/images/shiv-band-luxury-royal-brass-band.jpg", title: "Shiv Band luxury royal brass band ensemble at grand wedding palace in Delhi" },
  { id: "lvc1", url: "/images/vintage-car/red-vintage-car-groom.jpg", title: "Shiv Band red vintage car leading a night baraat with celebratory fireworks in Delhi" },
  { id: "l2", url: "/images/royal-wedding-ghodi-shringar.jpg", title: "Shiv Band white wedding safed ghodi in royal peacock shringar" },
  { id: "l1", url: "/images/royal-flower-baggi-chariot.jpg", title: "Shiv Band phool wali flower-decorated royal wedding baggi chariot" },
  { id: "l-shehnai", url: "/images/shehnai/shehnai-band-baraat.jpg", title: "Shiv Band royal shehnai vadak players in red and gold sherwanis" },
  { id: "l3", url: "/images/shiv-band-ceremonial-trumpet-player.jpg", title: "Shiv Band trumpet musician in royal red and gold embroidered uniform" },
  { id: "l107", url: "/images/groom-ghodi-chhatri-lights.jpg", title: "Shiv Band groom on decorated ghodi with crystal chhatri lights" },
  { id: "l50", url: "/images/shiv-band-brass-band-procession.jpg", title: "Shiv Band 21 piece and 31 piece brass band in a night baraat procession" },
  { id: "l103", url: "/images/brass-band-chhatri-lights.jpg", title: "Shiv Band brass band and crystal chhatar lights on the road in Delhi" },
  { id: "l101", url: "/images/dhol-wale-baraat.jpg", title: "Shiv Band Punjabi dhol wale and dhol toli players before the baraat" },
  { id: "l-bagpipe", url: "/images/bagpiper/bagpiper-band-entry.jpg", title: "Shiv Band military bagpiper band in ceremonial uniforms at wedding entry" },
  { id: "l108", url: "/images/shiv-band-krishna-nagar-uniforms.jpg", title: "Shiv Band ceremonial brass band uniforms at Krishna Nagar Delhi shop" },
  { id: "l106", url: "/images/shiv-band-uniform-display-shop.jpg", title: "Shiv Band wedding band uniform display at Krishna Nagar workshop" },
  { id: "l102", url: "/images/shiv-band-gold-sherwani-uniform.jpg", title: "Shiv Band gold sherwani-style wedding band uniform" },
  { id: "l110", url: "/images/shiv-band-light-house-krishna-nagar-shop.jpg", title: "Shiv Band & Light House shop front in Krishna Nagar, New Delhi" },
  { id: "lvc2", url: "/images/vintage-car/white-vintage-car-baraat.jpg", title: "Shiv Band white vintage car for wedding baraat and vidaai in Delhi NCR" },
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
