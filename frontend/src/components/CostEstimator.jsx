import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, Send } from "lucide-react";
import { useSiteData } from "../context/SiteContext";

export default function CostEstimator() {
  const { settings } = useSiteData();
  const [projectType, setProjectType] = useState("residential");
  const [area, setArea] = useState(1500);
  const [qualityGrade, setQualityGrade] = useState("premium");
  const [includeInterior, setIncludeInterior] = useState(true);

  // Pricing matrix per sq ft in Bihar
  const RATES = {
    residential: { standard: 1450, premium: 1850, luxury: 2450 },
    commercial: { standard: 1650, premium: 2150, luxury: 2850 },
    renovation: { standard: 650, premium: 950, luxury: 1450 },
    interior: { standard: 750, premium: 1200, luxury: 1950 },
  };

  const calculatedCost = useMemo(() => {
    const baseRate = RATES[projectType][qualityGrade];
    let total = area * baseRate;
    if (includeInterior && projectType !== "interior" && projectType !== "renovation") {
      total += area * (qualityGrade === "luxury" ? 600 : qualityGrade === "premium" ? 400 : 250);
    }
    return total;
  }, [projectType, area, qualityGrade, includeInterior]);

  const formattedCost = useMemo(() => {
    const inLakhs = (calculatedCost / 100000).toFixed(2);
    return {
      rupees: calculatedCost.toLocaleString("en-IN"),
      lakhs: inLakhs >= 100 ? `${(inLakhs / 100).toFixed(2)} Cr` : `₹ ${inLakhs} Lakhs`
    };
  }, [calculatedCost]);

  const whatsappMessage = encodeURIComponent(
    `Hello Nasim Constructions! I used your online Cost Estimator:\n\n• Project Type: ${projectType.toUpperCase()}\n• Built-up Area: ${area} Sq. Ft\n• Finishing Grade: ${qualityGrade.toUpperCase()}\n• Include Interior: ${includeInterior ? "YES" : "NO"}\n• Estimated Budget: ${formattedCost.lakhs} (₹${formattedCost.rupees})\n\nPlease share detailed BOQ and schedule a free site survey in Hajipur/Bihar.`
  );

  return (
    <section className="py-20 px-4 sm:px-6 relative bg-slate-100/70 dark:bg-[#070e1b] overflow-hidden border-y border-slate-200 dark:border-transparent transition-colors duration-300">
      {/* Blueprint Grid Lines & Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Budgeting
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Estimate Your <span className="text-gradient-gold">Construction Cost</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Instant estimate tailored to current material & labor rates in Hajipur, Patna & Bihar.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Controls Box */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 bg-white dark:bg-[#0b192c] shadow-lg">
            {/* 1. Project Type */}
            <div>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-3">
                1. Select Project Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "residential", label: "Residential" },
                  { id: "commercial", label: "Commercial" },
                  { id: "renovation", label: "Renovation" },
                  { id: "interior", label: "Interior Only" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProjectType(t.id)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      projectType === t.id
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold"
                        : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400 hover:bg-slate-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Built-up Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  2. Built-up Area (Sq. Ft)
                </label>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-display text-lg">
                  {area.toLocaleString()} sq.ft
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="10000"
                step="50"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                <span>400 sq.ft (Small Plot)</span>
                <span>5,000 sq.ft</span>
                <span>10,000+ sq.ft</span>
              </div>
            </div>

            {/* 3. Finishing Grade */}
            <div>
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-3">
                3. Construction Quality Package
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "standard", title: "Standard", desc: "Grade A Red Brick, UltraTech Cement, Tata/Jindal Steel" },
                  { id: "premium", title: "Premium", desc: "Italian Tiles, Teak Wood Doors, Designer Electricals, Premium Paint" },
                  { id: "luxury", title: "Luxury", desc: "Full Home Automation, Double-Height Glazing, Imported Marble" },
                ].map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setQualityGrade(g.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      qualityGrade === g.id
                        ? "bg-amber-500/15 border-amber-500 shadow-md"
                        : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${qualityGrade === g.id ? "text-amber-600 dark:text-amber-400" : "text-slate-800 dark:text-white"}`}>
                        {g.title}
                      </span>
                      {qualityGrade === g.id && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-tight">
                      {g.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Include Interior Add-on Toggle */}
            {projectType !== "interior" && projectType !== "renovation" && (
              <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInterior}
                  onChange={(e) => setIncludeInterior(e.target.checked)}
                  className="w-4 h-4 text-amber-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-white/20 rounded focus:ring-amber-400 accent-amber-500"
                />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                  Include Modular Kitchen, False Ceiling & Interior Work
                </span>
              </label>
            )}
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f2444] to-slate-900 text-white">
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="w-6 h-6 text-amber-400/40" />
            </div>

            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Estimated Total Investment
            </div>
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {formattedCost.lakhs}
            </div>
            <div className="text-xs text-slate-400 mt-1">Approx. ₹ {formattedCost.rupees} INR</div>

            <div className="my-6 border-t border-white/10 pt-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Selected Area:</span>
                <span className="font-semibold text-white">{area} Sq. Ft</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Rate / Sq. Ft:</span>
                <span className="font-semibold text-white">₹{Math.round(calculatedCost / area)} / sq.ft</span>
              </div>
              <div className="flex justify-between">
                <span>Engineering Grade:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Earthquake Safe RCC
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-semibold text-white">Milestone-linked Stages</span>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 leading-relaxed mb-6">
              * Note: Exact cost is determined post site soil testing, floor plan specifications, and elevation choice.
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber || "918507218492"}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30 text-sm"
              >
                <Send className="w-4 h-4" />
                Claim This Estimate on WhatsApp
              </a>
              <a
                href="/contact"
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 text-sm"
              >
                Schedule Free Site Visit <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
