import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  PhoneCall,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Building2,
  Compass,
  Star,
  HelpCircle,
  ChevronDown
} from "lucide-react";

import { useSiteData } from "../context/SiteContext";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FloatingActions from "../components/FloatingActions";

export default function Home() {
  const {
    settings,
    projects,
    services,
    stats,
    testimonials,
    faqs,
    DEFAULT_WORKFLOW
  } = useSiteData();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = ["All", "Residential", "Commercial", "Interior", "Renovation"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => (p.category || "").toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950 overflow-hidden">
      {/* =====================================================
          1. HERO SECTION (Bright, Architectural Light Theme)
      ====================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-900 bg-gradient-to-b from-white via-slate-50 to-white">
        {/* Cinematic Background Image with Light Architectural Veil */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1920&q=80"
            alt="Modern Construction"
            className="w-full h-full object-cover object-center scale-105 opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/98 via-slate-50/90 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/70" />
          <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />
        </div>

        {/* Ambient Warm Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
              <span>Premier Construction & Engineering in Bihar</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.1]"
            >
              Building Dreams into <br />
              <span className="text-gradient-gold drop-shadow-sm">
                {settings.tagline || "Architectural Reality"}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {settings.heroSubtitle ||
                "From turnkey residential villas and commercial landmarks to luxury interior remodels across Hajipur & Patna. Delivering on-time excellence with premier structural engineering."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Free Quote & Site Survey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-base rounded-2xl border-2 border-slate-300 shadow-sm hover:border-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5 text-amber-600" />
                <span>Call: {settings.phonePrimary || "+91 85072 18492"}</span>
              </a>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 text-xs text-slate-700 font-semibold"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Earthquake Resistant RCC</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>100% On-Time Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>ISO Certified Steel & Cement</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Floating Visual Card (Company Logo Showcase) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative hidden sm:flex justify-center"
          >
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden glass-card border border-slate-200 shadow-2xl p-6 group bg-white flex flex-col items-center text-center text-slate-900">
              {/* Subtle Ambient Radial */}
              <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

              {/* Company Logo Image with 3D Float Animation */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl p-1 bg-white animate-float group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/logo.jpg"
                  alt="Nasim Construction and Works Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Tagline & Brand Label */}
              <div className="mt-5 relative z-10">
                <span className="px-4 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider shadow-sm">
                  Official Brand Emblem
                </span>
                <h3 className="text-xl font-bold font-display text-slate-950 mt-2">
                  {settings.companyName ? settings.companyName.toUpperCase() : "NASIM CONSTRUCTIONS"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-semibold tracking-wide">
                  Building Tomorrow, Today • Hajipur, Bihar
                </p>
              </div>

              {/* Floating Stat Badge 1 */}
              <div className="absolute -top-3 -left-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold font-display text-lg">
                  {settings.experienceYears || "10+"}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Years of Trust</div>
                  <div className="text-[10px] text-slate-500">Serving Across Bihar</div>
                </div>
              </div>

              {/* Floating Stat Badge 2 */}
              <div className="absolute -bottom-3 -right-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float-slow text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center font-bold font-display text-lg">
                  50+
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Projects Delivered</div>
                  <div className="text-[10px] text-slate-500">100% Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          2. ANIMATED STATS COUNTER BAR
      ====================================================== */}
      <section className="py-12 bg-white border-y border-slate-200 relative shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl glass-card border border-slate-200 hover:border-amber-500 transition-all bg-white shadow-sm"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-amber-600">
                  {item.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  {item.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. ANIMATED SERVICES SECTION (With rich visuals)
      ====================================================== */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <HardHat className="w-3.5 h-3.5" />
              Specialized Solutions
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight"
            >
              Professional <span className="text-gradient-gold">Construction Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 text-base sm:text-lg"
            >
              High-precision engineering, architectural innovation, and verified master craftsmanship tailored for Bihar.
            </motion.p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-500 transition-all duration-500 flex flex-col group shadow-md hover:shadow-xl bg-white"
              >
                {/* Service Image with Zoom & Animated Tag */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    onError={(e) => {
                      e.currentTarget.src = "/services/building-construction.jpg";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full shadow-md">
                      {service.badge}
                    </span>
                  </div>

                  {/* Animated Corner Floating Tag */}
                  <div className="absolute bottom-3 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-700 border border-amber-300 shadow-sm">
                    ⚡ {service.animatedBadge}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                      {service.shortDesc}
                    </p>

                    {/* Features Checklist */}
                    {service.features && (
                      <div className="mt-4 space-y-2">
                        {service.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Service Footer / Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 font-medium">
                      <span>Timeline: </span>
                      <span className="text-slate-900 font-bold">{service.timeline}</span>
                    </div>

                    <a
                      href={`https://wa.me/${settings.whatsappNumber || "918507218492"}?text=Hello%20Nasim%20Constructions,%20I%20am%20interested%20in%20your%20service:%20${encodeURIComponent(
                        service.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-amber-700 text-xs font-semibold rounded-xl border border-slate-200 hover:border-amber-500 transition-all flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. BEFORE & AFTER INTERACTIVE TRANSFORMATION
      ====================================================== */}
      <BeforeAfterSlider />

      {/* =====================================================
          5. FEATURED PROJECTS SHOWCASE (With Modal)
      ====================================================== */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              Verified Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
              Our Completed <span className="text-gradient-gold">Landmark Projects</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Explore residential villas, modern commercial hubs, and architectural interior builds across Bihar.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-slate-950 shadow-md scale-105 font-bold"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          6. CONSTRUCTION WORKFLOW / ROADMAP
      ====================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              How We Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
              Our 4-Step <span className="text-gradient-gold">Construction Roadmap</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              A transparent, hassle-free process from initial sketch to final key handover.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {DEFAULT_WORKFLOW.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card p-6 rounded-3xl border border-slate-200 relative flex flex-col justify-between group hover:border-amber-500 transition-all bg-slate-50 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 font-display font-black text-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-950 mb-2 group-hover:text-amber-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          7. CLIENT TESTIMONIALS & REVIEWS
      ====================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Client Endorsements
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
              Trusted by <span className="text-gradient-gold">Homeowners in Bihar</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Hear directly from our clients in Hajipur, Patna, and Vaishali.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-6 relative hover:border-amber-500 transition-all bg-white shadow-md"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">{t.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          9. FREQUENTLY ASKED QUESTIONS (Accordion)
      ====================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              Got Questions? <span className="text-gradient-gold">We Have Answers</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-200 overflow-hidden transition-colors bg-slate-50 shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-900 hover:text-amber-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-3 font-medium"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          10. HIGH-IMPACT CLOSING CTA SECTION
      ====================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-slate-950">
              Ready to Start Your Construction?
            </h2>
            <p className="text-slate-900 font-medium text-base sm:text-lg mt-2 max-w-xl">
              Book a complimentary on-site visit and receive a 3D architectural elevation preview with transparent itemized pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-base rounded-2xl shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`}
              className="w-full sm:w-auto px-6 py-4 bg-slate-900/10 hover:bg-slate-900/20 text-slate-950 border-2 border-slate-950/20 font-bold text-base rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Project Lightbox Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Floating Call & WhatsApp Action Pill */}
      <FloatingActions />
    </div>
  );
}