import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeftRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Layers,
  Building2,
  Home as HomeIcon,
  Store,
  ChevronRight
} from "lucide-react";
import { BEFORE_AFTER_PROJECTS } from "../data/mockData";
import { useSiteData } from "../context/SiteContext";

export default function BeforeAfterSlider() {
  const { settings } = useSiteData();
  const [activeId, setActiveId] = useState(BEFORE_AFTER_PROJECTS[0].id);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const activeProject =
    BEFORE_AFTER_PROJECTS.find((p) => p.id === activeId) || BEFORE_AFTER_PROJECTS[0];

  // Dynamically update container width so before image stays perfectly aligned with after image
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, [activeId]);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleContainerClick = (e) => {
    handleMove(e.clientX);
  };

  const getTabIcon = (id) => {
    switch (id) {
      case "villa-elevation":
        return <HomeIcon className="w-4 h-4" />;
      case "interior-remodel":
        return <Layers className="w-4 h-4" />;
      case "commercial-remodel":
        return <Store className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-100/70 border-y border-slate-200">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
            Interactive Engineering Showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight"
          >
            Real Transformation:{" "}
            <span className="text-gradient-gold">Before & After</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Witness the contrast between dated raw structures and Nasim
            Constructions’ completed turnkey builds. Drag the slider or select a
            project below to explore our craftsmanship.
          </motion.p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {BEFORE_AFTER_PROJECTS.map((proj) => {
            const isSelected = proj.id === activeId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveId(proj.id);
                  setSliderPos(50);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm ${
                  isSelected
                    ? "bg-slate-950 text-amber-400 border-2 border-amber-500 shadow-lg scale-105"
                    : "bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-slate-300"
                }`}
              >
                <span className={isSelected ? "text-amber-400" : "text-slate-400"}>
                  {getTabIcon(proj.id)}
                </span>
                <span>{proj.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Main Comparison Container */}
        <div className="max-w-5xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Project Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-900 text-xs font-bold uppercase tracking-wider">
                      {activeProject.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {activeProject.location}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950">
                    {activeProject.title}
                  </h3>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex items-center gap-2 text-xs font-bold">
                  <button
                    onClick={() => setSliderPos(98)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors ${
                      sliderPos > 85
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    100% Before
                  </button>
                  <button
                    onClick={() => setSliderPos(50)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors ${
                      sliderPos >= 40 && sliderPos <= 60
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    50 / 50 Split
                  </button>
                  <button
                    onClick={() => setSliderPos(2)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors ${
                      sliderPos < 15
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    100% After
                  </button>
                </div>
              </div>

              {/* Interactive Comparison Viewport */}
              <div
                ref={containerRef}
                onClick={handleContainerClick}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-300 bg-slate-900 aspect-[16/9] min-h-[320px] sm:min-h-[460px] md:min-h-[520px] select-none cursor-ew-resize group"
              >
                {/* AFTER Image (Full background) */}
                <img
                  src={activeProject.afterImg}
                  alt={activeProject.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  loading="eager"
                />

                {/* AFTER Label Tag */}
                <div className="absolute top-4 right-4 z-10 bg-emerald-600/95 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md pointer-events-none flex items-center gap-2 border border-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-100 flex-shrink-0" />
                  <span>{activeProject.afterLabel}</span>
                </div>

                {/* BEFORE Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeProject.beforeImg}
                    alt={activeProject.beforeLabel}
                    className="absolute inset-0 h-full object-cover max-w-none pointer-events-none"
                    style={{
                      width: containerWidth ? `${containerWidth}px` : "100%",
                      height: "100%"
                    }}
                    loading="eager"
                  />
                  {/* BEFORE Label Tag */}
                  <div className="absolute top-4 left-4 z-10 bg-slate-950/90 text-amber-400 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md pointer-events-none flex items-center gap-2 border border-amber-500/50">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{activeProject.beforeLabel}</span>
                  </div>
                </div>

                {/* Draggable Divider Bar */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] cursor-ew-resize z-20 flex items-center justify-center -ml-0.5"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Draggable Button Handle */}
                  <div className="w-11 h-11 -ml-[21px] rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 border-2 border-white shadow-2xl flex items-center justify-center text-slate-950 cursor-ew-resize hover:scale-115 active:scale-95 transition-transform duration-200">
                    <ArrowLeftRight className="w-5 h-5 text-slate-950 drop-shadow" />
                  </div>
                </div>

                {/* Helpful Instruction Tip */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 border border-amber-400/40 pointer-events-none shadow-lg flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                  <span>Drag slider or click anywhere to compare</span>
                </div>
              </div>

              {/* Narrative & Metrics */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {activeProject.subtitle}
                </p>

                {/* 4 Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  {activeProject.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center"
                    >
                      <div className="text-base sm:text-lg font-display font-extrabold text-amber-700">
                        {st.val}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Consultation CTA Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free architectural & structural evaluation included</span>
                  </div>

                  <a
                    href={`https://wa.me/${settings.whatsappNumber || "918507218492"}?text=Hello%20Nasim%20Constructions,%20I%20saw%20your%20transformation%20for%20${encodeURIComponent(
                      activeProject.title
                    )}%20and%20would%20like%20a%20site%20consultation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Request Renovation Estimate</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
