import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MapPin, Calendar, Clock, Maximize2, ShieldCheck, UserCheck, PhoneCall } from "lucide-react";
import { useSiteData } from "../context/SiteContext";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const { settings } = useSiteData();
  const [activeImg, setActiveImg] = useState(project.image || (project.gallery && project.gallery[0]));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0b192c] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-900 dark:text-white max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070e1b]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {project.location}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-200/60 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 space-y-6">
            {/* Main Image Showcase */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-slate-200 dark:border-white/10 group shadow-md">
              <img
                src={activeImg}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-slate-200 text-sm mt-1">Verified Nasim Construction Project</p>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(imgUrl)}
                    className={`relative rounded-xl overflow-hidden flex-shrink-0 w-24 h-16 border-2 transition-all ${
                      activeImg === imgUrl ? "border-amber-500 scale-105 shadow-md" : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-center">
                <Maximize2 className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Area</div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{project.area || "Custom"}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500 dark:text-slate-400">Duration</div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{project.duration || "On Schedule"}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-center">
                <Calendar className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500 dark:text-slate-400">Completed</div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{project.year || "2024"}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500 dark:text-slate-400">Quality</div>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Verified Build</div>
              </div>
            </div>

            {/* Description & Scope */}
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                <h4 className="text-slate-900 dark:text-white font-semibold text-base mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  Project Overview
                </h4>
                <p>{project.description || "High standard construction executed strictly adhering to state civil engineering codes, earthquake-resistant RCC design, and luxury interior finishing."}</p>
              </div>

              {project.scope && (
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                  <h4 className="text-slate-900 dark:text-white font-semibold text-base mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                    Scope of Work
                  </h4>
                  <p>{project.scope}</p>
                </div>
              )}

              {project.client && (
                <div className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <UserCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider font-semibold block">Client / Owner</span>
                    <span className="text-slate-900 dark:text-white font-medium">{project.client}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Call To Action */}
          <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070e1b]/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-xs text-slate-500 dark:text-slate-400">Want a similar design for your property?</div>
              <div className="text-sm font-bold text-amber-600 dark:text-amber-400">Get Free Site Survey & Cost Estimate</div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/${settings.whatsappNumber || "918507218492"}?text=Hello%20Nasim%20Constructions,%20I%20am%20interested%20in%20a%20project%20similar%20to%20your%20portfolio:%20${encodeURIComponent(project.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2"
              >
                Inquire via WhatsApp
              </a>
              <a
                href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
