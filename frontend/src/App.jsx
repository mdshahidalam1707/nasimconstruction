import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  Building2,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Search,
  Wrench,
  FileCheck
} from "lucide-react";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import FloatingActions from "./components/FloatingActions";
import { useSiteData } from "./context/SiteContext";

// Scroll to top & SEO title/canonical helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const routeMeta = {
      "/": {
        title: "Nasim Constructions & Works | Construction Company in Hajipur, Bihar",
        canonical: "https://nasimconstruction.in/"
      },
      "/services": {
        title: "Construction & Civil Contracting Services | Nasim Constructions & Works - Hajipur, Bihar",
        canonical: "https://nasimconstruction.in/services"
      },
      "/projects": {
        title: "Completed Projects Portfolio | Nasim Constructions & Works - Hajipur, Bihar",
        canonical: "https://nasimconstruction.in/projects"
      },
      "/about": {
        title: "About Us | Nasim Constructions & Works - Hajipur, Bihar",
        canonical: "https://nasimconstruction.in/about"
      },
      "/contact": {
        title: "Contact Us | Nasim Constructions & Works - Hajipur, Bihar",
        canonical: "https://nasimconstruction.in/contact"
      },
      "/admin": {
        title: "Admin Dashboard | Nasim Constructions & Works",
        canonical: "https://nasimconstruction.in/admin"
      },
      "/crm": {
        title: "CRM Dashboard | Nasim Constructions & Works",
        canonical: "https://nasimconstruction.in/crm"
      }
    };

    const current = routeMeta[pathname] || {
      title: "Nasim Constructions & Works | Construction Company in Hajipur, Bihar",
      canonical: `https://nasimconstruction.in${pathname}`
    };

    document.title = current.title;

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", current.canonical);
  }, [pathname]);

  return null;
}

// ==========================================
// 1. ABOUT PAGE (Light Theme & Comprehensive)
// ==========================================
function About() {
  const { settings, stats } = useSiteData();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Building2 className="w-3.5 h-3.5" />
            Our Legacy in Bihar
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-950 tracking-tight"
          >
            About <span className="text-gradient-gold">Nasim Constructions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed"
          >
            Founded and led by <strong className="text-amber-700 font-bold">{settings.founderName || "Mohammad Nasim"}</strong> ({settings.founderTitle || "Owner & Founder"}), Nasim Constructions & Works has been proudly serving clients for the last 10+ years across Hajipur and nearby areas with trusted turnkey building construction, architectural planning, and structural engineering.
          </motion.p>
        </div>

        {/* Story & Image Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">
              Pioneering Quality, Integrity & Earthquake-Resistant Engineering
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              We specialize in constructing residential luxury villas, multi-storey commercial complexes, school and institutional buildings, and bespoke interior renovations. Our philosophy is simple: <span className="text-amber-700 font-bold">zero compromise on structural safety, absolute transparent itemized billing, and strict on-time completion.</span>
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              Every foundation we pour in Hajipur, Patna, Vaishali, and Muzaffarpur undergoes stringent soil testing and structural load analysis. We use exclusively Grade 53 UltraTech/ACC cement and primary TMT rebars (Tata Tiscon / Jindal Panther) to ensure each structure stands strong for generations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="glass-card p-4 rounded-2xl border border-slate-200 text-center bg-white shadow-sm">
                <div className="text-2xl font-display font-black text-amber-600">{settings.experienceYears || "10+"} Yrs</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Excellence</div>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-slate-200 text-center bg-white shadow-sm">
                <div className="text-2xl font-display font-black text-emerald-600">50+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Completed Builds</div>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-slate-200 text-center col-span-2 sm:col-span-1 bg-white shadow-sm">
                <div className="text-2xl font-display font-black text-blue-600">100%</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">On-Time Handover</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-slate-200 shadow-2xl p-8 sm:p-10 bg-white flex flex-col items-center justify-center text-center min-h-[420px] group text-slate-900">
              {/* Subtle Ambient Glow */}
              <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

              {/* Animated Central Logo Emblem with untouched image */}
              <div className="relative z-10 my-auto">
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto rounded-full p-2 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-xl animate-float group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                    <img
                      src="/logo.jpg"
                      alt="Nasim Construction and Works Official Emblem"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Typography & Verification */}
              <div className="relative z-10 mt-6 space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                  Official Corporate Emblem
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                  {settings.companyName ? settings.companyName.toUpperCase() : "NASIM CONSTRUCTIONS"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 tracking-wider uppercase font-semibold">
                  {settings.tagline || "Building Tomorrow, Today"}
                </p>
              </div>

              {/* Bottom Info Bar */}
              <div className="relative z-10 w-full mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-left">
                  <span className="text-amber-700 font-bold uppercase tracking-wider block text-[10px]">Headquarters</span>
                  <span className="text-slate-900 font-semibold">Fatehabad, Hajipur, Bihar</span>
                </div>
                <div className="px-3.5 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Certified Premier Builder</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-950">Our Mission</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              To deliver world-class, earthquake-safe, and aesthetically stunning residential and commercial spaces across Bihar with complete client transparency, certified raw materials, and precision timelines.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-950">Our Vision</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              To remain Bihar’s most trusted and technologically advanced construction brand, bridging modern architectural trends with enduring structural resilience and environmental sustainability.
            </p>
          </div>
        </div>

        {/* Construction Pillars */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-8 bg-white shadow-md">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">Our Construction Pillars</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">Built on engineering precision, safety compliance, and transparent practices.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h4 className="font-bold text-slate-950 text-base">Structural RCC Integrity</h4>
              <p className="text-xs text-slate-600">High-grade structural engineering for all columns, beams, footings, and slabs.</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <Clock className="w-8 h-8 text-amber-600" />
              <h4 className="font-bold text-slate-950 text-base">On-Time Execution</h4>
              <p className="text-xs text-slate-600">Strict milestone scheduling with transparent daily and weekly site reporting.</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-slate-950 text-base">100% Transparent BOQ</h4>
              <p className="text-xs text-slate-600">Detailed bill of quantities with zero hidden charges or unexpected mid-project rate hikes.</p>
            </div>
          </div>
        </div>

        {/* Company Leadership & Founders */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              Company Leadership
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">
              Meet Our <span className="text-gradient-gold">Founder & Leadership</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Steering engineering precision, architectural innovation, and client trust for over 10 years in Hajipur and nearby areas.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 hover:border-amber-500 transition-all group shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-700 border-2 border-amber-300 flex items-center justify-center font-display font-black text-2xl group-hover:scale-105 transition-transform flex-shrink-0 shadow-inner">
                MN
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h4 className="font-display font-bold text-slate-950 text-xl group-hover:text-amber-700 transition-colors">
                    {settings.founderName || "Mohammad Nasim"}
                  </h4>
                  <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                    {settings.founderTitle || "Owner & Founder"}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {settings.founderBio ||
                    "Guiding company vision, civil contracting operations, and turnkey project execution across Hajipur and nearby regions with 10+ years of hands-on structural expertise."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingActions />
    </div>
  );
}

// ==========================================
// 2. SERVICES PAGE (Light Theme & Detailed)
// ==========================================
function Services() {
  const { services, settings } = useSiteData();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Wrench className="w-3.5 h-3.5" />
            End-to-End Civil & Architectural Expertise
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-950 tracking-tight"
          >
            Our Construction <span className="text-gradient-gold">Services & Solutions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
          >
            Explore our comprehensive range of turnkey construction services across Bihar, backed by master craftsmen and certified civil engineers.
          </motion.p>
        </div>

        {/* Detailed Grid of All Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-500 transition-all duration-500 flex flex-col group bg-white shadow-md hover:shadow-xl"
            >
              {/* Image Banner - Vibrant and Untouched */}
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => {
                    e.currentTarget.src = "/services/building-construction.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full shadow-md">
                    {service.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-700 border border-amber-300 shadow-sm">
                  ⚡ {service.animatedBadge}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    {service.shortDesc}
                  </p>

                  {/* Checklist */}
                  {service.features && (
                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Key Highlights:
                      </span>
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    <div>Standard: <span className="text-emerald-700 font-bold">{service.standard || "Grade A Materials"}</span></div>
                  </div>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber || "918507218492"}?text=Hello%20Nasim%20Constructions,%20I%20would%20like%20a%20detailed%20quote%20for:%20${encodeURIComponent(
                      service.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Request Quote
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <FloatingActions />
    </div>
  );
}

// ==========================================
// 3. PROJECTS PAGE (Light Theme Portfolio & Modal)
// ==========================================
function Projects() {
  const { projects } = useSiteData();
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "Residential", "Commercial", "Interior", "Renovation"];

  const filtered = projects.filter((p) => {
    const matchesCat = selectedCat === "All" || (p.category || "").toLowerCase() === selectedCat.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Building2 className="w-3.5 h-3.5" />
            Landmark Construction Portfolio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-950 tracking-tight"
          >
            Explore Our <span className="text-gradient-gold">Completed Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
          >
            A curated showcase of luxury villas, commercial hubs, duplexes, and interior transformations delivered across Hajipur, Patna, and Vaishali.
          </motion.p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 glass-card rounded-2xl border border-slate-200 bg-white shadow-md">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCat === cat
                    ? "bg-amber-500 text-slate-950 shadow-sm font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onSelect={(proj) => setSelectedProject(proj)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl border border-slate-200 p-8 bg-white shadow-sm">
            <Building2 className="w-12 h-12 text-amber-500/50 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-950">No projects found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your category filter or search terms.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <FloatingActions />
    </div>
  );
}

// ==========================================
// 4. MAIN APP WITH ROUTING & NAVBAR / FOOTER
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/crm" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}