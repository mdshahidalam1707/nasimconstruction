import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Maximize2, Calendar, ShieldCheck } from "lucide-react";

export default function ProjectCard({ project, onSelect }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onClick={() => onSelect && onSelect(project)}
      className="group relative rounded-3xl overflow-hidden glass-card border border-slate-200 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-500 cursor-pointer shadow-md hover:shadow-xl flex flex-col h-full bg-white dark:bg-[#0b192c]/90"
    >
      {/* Image Container with Hover Zoom & Badges */}
      <div className="relative h-64 overflow-hidden bg-slate-900">
        <img
          src={project.image || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full shadow-lg uppercase tracking-wider">
            {project.category || "Residential"}
          </span>

          <span className="w-8 h-8 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-emerald-400 bg-slate-950/85 px-2.5 py-1 rounded-full backdrop-blur-md border border-emerald-500/30 font-medium shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {project.status || "Completed"} {project.year && `• ${project.year}`}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{project.location || "Hajipur, Bihar"}</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
            {project.description || "High quality construction delivered on-schedule with supreme structural integrity."}
          </p>
        </div>

        {/* Card Footer Specs */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          {project.area ? (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
              {project.area}
            </span>
          ) : (
            <span>Turnkey Build</span>
          )}

          {project.duration && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {project.duration}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}