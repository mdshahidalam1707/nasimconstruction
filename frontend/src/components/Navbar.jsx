import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  MessageSquare
} from "lucide-react";
import { useSiteData } from "../context/SiteContext";

export default function Navbar() {
  const { settings } = useSiteData();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact & Quote", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md py-2.5 sm:py-3"
          : "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 bg-white">
              <img
                src="/logo.jpg"
                alt="Nasim Construction Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-slate-950 block leading-none">
                NASIM <span className="text-amber-600">CONSTRUCTIONS</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
                {settings.companySubtitle || "& Works • Hajipur, Bihar"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-amber-400 rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Phone + Quote CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quick Call */}
            <a
              href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-800 hover:text-amber-600 transition-colors px-2 py-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
              <span className="font-bold">{settings.phonePrimary || "+91 85072 18492"}</span>
            </a>

            {/* Free Quote CTA */}
            <Link
              to="/contact"
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Actions: Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-slate-950"
              aria-label="Toggle Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 overflow-hidden px-4 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                        : "text-slate-700 hover:bg-slate-100 hover:text-amber-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
                <a
                  href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  Call: {settings.phonePrimary || "+91 85072 18492"}
                </a>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md"
                >
                  Get Instant Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}