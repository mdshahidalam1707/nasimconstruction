import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Secondary Actions when expanded */}
      {expanded && (
        <div className="flex flex-col gap-2 items-end animate-in fade-in slide-in-from-bottom-3 duration-200">
          <a
            href="tel:+918507218492"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full shadow-2xl transition-all hover:scale-105 text-xs sm:text-sm border border-amber-300"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 85072 18492</span>
          </a>

          <a
            href="tel:+919199701165"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-2xl transition-all hover:scale-105 text-xs sm:text-sm border border-white/20"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call +91 91997 01165</span>
          </a>
        </div>
      )}

      {/* Main WhatsApp & Toggle Button */}
      <div className="flex items-center gap-2">
        <a
          href="https://wa.me/918507218492?text=Hello%20Nasim%20Constructions,%20I%20would%20like%20to%20discuss%20a%20construction%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-emerald-500/40"
          aria-label="Chat on WhatsApp"
        >
          {/* Radar Ripple Effect */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          <MessageCircle className="w-7 h-7 text-white fill-current" />
          <span className="absolute right-16 px-3 py-1 bg-slate-950 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-10 h-10 bg-[#0f2444] hover:bg-[#173361] text-amber-400 rounded-full shadow-xl border border-white/15 transition-all hover:scale-105"
          aria-label="Toggle Phone Options"
        >
          {expanded ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
