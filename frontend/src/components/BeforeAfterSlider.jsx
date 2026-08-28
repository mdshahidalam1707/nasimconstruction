import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { BEFORE_AFTER_DATA } from "../data/mockData";

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
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

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-white dark:bg-gradient-to-b dark:from-[#070e1b] dark:via-[#0b192c] dark:to-[#070e1b] border-y border-slate-200 dark:border-transparent transition-colors duration-300">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Transformation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Real Transformation: <span className="text-gradient-gold">Before & After</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg"
          >
            {BEFORE_AFTER_DATA.subtitle} Drag the slider to witness our engineering precision.
          </motion.p>
        </div>

        {/* Interactive Comparison Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-300 dark:border-white/15 bg-slate-950 aspect-[16/10] select-none"
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER Image (Full background) */}
          <img
            src={BEFORE_AFTER_DATA.afterImg}
            alt="After Renovation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-emerald-500/95 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {BEFORE_AFTER_DATA.afterLabel}
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={BEFORE_AFTER_DATA.beforeImg}
              alt="Before Renovation"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                height: "100%"
              }}
            />
            <div className="absolute top-4 left-4 bg-slate-900/90 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none">
              {BEFORE_AFTER_DATA.beforeLabel}
            </div>
          </div>

          {/* Draggable Divider Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-md cursor-ew-resize z-20 flex items-center justify-center -ml-0.5"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-10 h-10 -ml-[18px] rounded-full bg-amber-500 border-2 border-slate-950 shadow-2xl flex items-center justify-center text-slate-950 cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-slate-200 border border-white/10 pointer-events-none">
            ↔ Drag handle to compare
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BEFORE_AFTER_DATA.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="glass-card p-4 rounded-2xl text-center border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm"
            >
              <div className="text-xl sm:text-2xl font-bold font-display text-amber-600 dark:text-amber-400">
                {stat.val}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
