import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Camera, 
  Video, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Instagram, 
  Facebook, 
  Youtube, 
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

// Official WhatsApp Logo Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.807 0-3.578-.484-5.128-1.402l-.367-.219-3.808.999 1.017-3.712-.241-.384c-1.01-1.608-1.544-3.473-1.544-5.385 0-5.659 4.604-10.263 10.264-10.263 2.743 0 5.319 1.068 7.258 3.008 1.939 1.94 3.007 4.516 3.007 7.257 0 5.66-4.604 10.262-10.264 10.262m0-21.843C5.972 0 0 5.972 0 13.245c0 2.324.606 4.593 1.757 6.589L0 24l4.316-1.132a13.2 13.2 0 006.377 1.623h.006c7.272 0 13.245-5.973 13.245-13.246 0-3.539-1.378-6.865-3.882-9.369C17.558 1.377 14.233 0 10.511 0z"/>
  </svg>
);

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <Instagram className="w-4 h-4 text-white" />,
      href: "https://www.instagram.com/shiv_band_and_light_house/",
      label: "Instagram",
      gradient: "from-amber-500 via-rose-500 to-purple-600"
    },
    {
      icon: <Facebook className="w-4 h-4 text-white" />,
      href: "https://www.facebook.com/shivband.lighthouse",
      label: "Facebook",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: <Youtube className="w-4 h-4 text-white" />,
      href: "https://www.youtube.com/@manishmanchanda4089/videos",
      label: "YouTube",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: <WhatsAppIcon className="w-4 h-4 text-white" />,
      href: "https://wa.me/919818626259?text=Hello%20Shiv%20Band,%20I%20want%20to%20inquire%20about%20your%20wedding%20services!",
      label: "WhatsApp",
      gradient: "from-emerald-500 to-green-600"
    }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Photo Gallery", href: "/gallery/photos" },
    { label: "Video Gallery", href: "/gallery/videos" },
    { label: "Contact Us", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
    { label: "Feedback", href: "/feedback" },
  ];

  const services = [
    { label: "Royal Barat Brass Band", href: "/gallery/photos" },
    { label: "Vintage Fancy Light House", href: "/gallery/photos" },
    { label: "Punjabi Dhol & Tasha Ensembles", href: "/gallery/photos" },
    { label: "Decorated Chariot & Rath Entry", href: "/gallery/photos" },
    { label: "Groom Light Pillars & Fireworks", href: "/gallery/photos" },
    { label: "Live Wedding Symphony", href: "/gallery/videos" }
  ];

  return (
    <footer 
      className={`relative pt-8 md:pt-14 pb-24 md:pb-12 px-4 md:px-10 transition-colors duration-300 border-t ${
        isDarkMode 
          ? 'bg-gray-950 text-gray-200 border-gray-800' 
          : 'bg-gray-900 text-white border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* MOBILE COMPACT FOOTER (Shown on screens below md) */}
        <div className="md:hidden flex flex-col items-center text-center space-y-5 pb-6 border-b border-gray-800/80">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <Logo size="sm" variant="inline" />
          </Link>

          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
            Shiv Band &amp; Light House — Royal wedding barat band, Punjabi dhol, ghori, flower baggi &amp; fancy lighting in Krishna Nagar, Old Govindpura, New Delhi-110051 (Since 1996).
          </p>

          {/* Social Icons Row */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-xl bg-gradient-to-tr ${social.gradient} shadow-md flex items-center justify-center`}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-300">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            <Link href="/gallery/photos" className="hover:text-teal-400">Photos</Link>
            <Link href="/gallery/videos" className="hover:text-teal-400">Videos</Link>
            <Link href="/reviews" className="hover:text-teal-400">Reviews</Link>
            <Link href="/contact" className="hover:text-teal-400">Contact</Link>
          </div>
        </div>

        {/* DESKTOP FULL GRID FOOTER (Shown on md and above) */}
        <div className="hidden md:grid grid-cols-4 gap-8 pb-12 border-b border-gray-800/80">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/">
              <Logo size="md" variant="inline" />
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              Shiv Band &amp; Light House (Est. 1996 by Manish Kumar) — Delivering royal wedding barat processions, live brass band symphonies, Punjabi dhol, ghori, flower baggi &amp; majestic fancy lighting across Krishna Nagar, Old Govindpura &amp; Delhi NCR.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Trusted by 1000+ Families Since 1996</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              <span>Quick Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Offered Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              <span>Our Services</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-2">
              Connect With Us
            </h4>

            <div className="space-y-2.5 text-xs text-gray-300">
              <a 
                href="tel:+919818626259"
                className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                title="Call Manish Kumar - Shiv Band & Light House"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 98186 26259 / 98186 22259</span>
              </a>

              <Link 
                href="/contact"
                className="flex items-start gap-2 text-gray-300 hover:text-teal-400 transition-colors"
                title="View location map"
              >
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>D-96 / C-40, Parwana Rd, Old Govindpura, Krishna Nagar, New Delhi - 110051</span>
              </Link>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Open Daily: 9:00 AM – 9:00 PM</span>
              </div>
            </div>

            {/* Social Media Pills */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-gray-400 mb-2">Follow Our Socials</div>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 rounded-xl bg-gradient-to-tr ${social.gradient} shadow-md flex items-center justify-center`}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar & Back To Top */}
        <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5">
            <span className="flex items-center gap-1.5">
              <span>© {new Date().getFullYear()} Shiv Band &amp; Light House</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.25, 1],
                  transition: { repeat: Infinity, duration: 1.2 }
                }}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </motion.div>
            </span>
            <span className="text-gray-700">•</span>
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/terms" className="hover:text-teal-400 transition-colors">
              Terms &amp; Disclaimer
            </Link>
          </div>

          {/* Back to top button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="px-3.5 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-teal-400 text-xs font-semibold flex items-center gap-1.5 border border-gray-700 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;