import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award, ArrowRight, Lock } from "lucide-react";
import { useSiteData } from "../context/SiteContext";

export default function Footer() {
  const { settings } = useSiteData();

  return (
    <footer className="bg-slate-100 text-slate-800 border-t border-slate-200 relative overflow-hidden">
      {/* Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm flex-shrink-0 bg-white">
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
                  {settings.companySubtitle || "& Works • Bihar"}
                </span>
              </div>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed">
              {settings.aboutShort ||
                "Pioneering excellence in building construction, modern architectural planning, renovation, and turnkey civil contracting across Hajipur, Patna, and Bihar."}
            </p>

            {/* Leadership & Founder Details Card */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-medium">{settings.founderTitle || "Founder & Owner"}:</span>
                <span className="text-amber-600 font-bold">{settings.founderName || "Mohammad Nasim"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{settings.coFounderTitle || "Co-Founder & Co-Owner"}:</span>
                <span className="text-slate-900 font-semibold">{settings.coFounderName || "Md Shahid Alam"}</span>
              </div>
              <div className="text-[11px] text-amber-700 pt-0.5 flex items-center gap-1.5 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>{settings.experienceText || "Running for last 10+ years in Hajipur & Nearby Areas"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-amber-700 font-medium shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Quality Assured
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-emerald-700 font-medium shadow-sm">
                <Award className="w-3.5 h-3.5 text-emerald-600" /> ISO Standard Steel
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-blue-700 font-medium shadow-sm">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> On-Time Guarantee
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-slate-950 text-base tracking-wide border-b-2 border-amber-500 pb-1.5 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" /> About Company
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" /> All Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" /> Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" /> Free Consultation
                </Link>
              </li>
              <li>
                <Link to="/crm" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 text-amber-600 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-amber-600" /> CRM Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Construction Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-slate-950 text-base tracking-wide border-b-2 border-amber-500 pb-1.5 inline-block">
              Key Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors">
                  • Residential Turnkey Villas
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors">
                  • Commercial Complex Construction
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors">
                  • Home & Structural Renovation
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors">
                  • Luxury Modular Interiors & Ceilings
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors">
                  • 3D Vastu Architectural Planning
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-600 transition-colors">
                  • Certified Material & Labor Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-slate-950 text-base tracking-wide border-b-2 border-amber-500 pb-1.5 inline-block">
              Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{settings.officeAddress || "Fatehabad, Hajipur, Vaishali District, Bihar - 844101"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`} className="hover:text-amber-600 font-bold text-slate-900">
                    {settings.phonePrimary || "+91 85072 18492"}
                  </a>
                  {settings.phoneSecondary && (
                    <a href={`tel:${settings.phoneSecondary?.replace(/[^0-9+]/g, "")}`} className="hover:text-amber-600 text-xs text-slate-500 font-medium">
                      {settings.phoneSecondary}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href={`mailto:${settings.email || "nasimconstructioninfo@gmail.com"}`} className="hover:text-amber-600 text-xs sm:text-sm truncate font-medium text-slate-800">
                  {settings.email || "nasimconstructioninfo@gmail.com"}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber || "918507218492"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Connect on WhatsApp Direct
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <p>© {new Date().getFullYear()} {settings.companyName || "Nasim Constructions"}. All Rights Reserved.</p>
            <span>•</span>
            <Link to="/crm" className="text-slate-600 hover:text-amber-600 font-semibold flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3 text-amber-600" /> CRM Portal
            </Link>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-2 text-slate-600">
            <span>{settings.founderTitle || "Founder & Owner"}: <strong className="text-amber-700 font-bold">{settings.founderName || "Mohammad Nasim"}</strong></span>
            <span>•</span>
            <span>{settings.coFounderTitle || "Co-Founder"}: <strong className="text-slate-900 font-bold">{settings.coFounderName || "Md Shahid Alam"}</strong></span>
          </p>
        </div>
      </div>
    </footer>
  );
}