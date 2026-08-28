import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Sparkles,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import FloatingActions from "../components/FloatingActions";
import { useSiteData } from "../context/SiteContext";

export default function Contact() {
  const { settings, addInquiry } = useSiteData();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Hajipur",
    projectType: "Complete Turnkey Building Construction",
    area: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const currentData = { ...form };

    // 1. Immediately store inquiry in Website CRM Portal
    if (addInquiry) {
      addInquiry({
        name: currentData.name,
        phone: currentData.phone,
        city: currentData.city,
        projectType: currentData.projectType,
        area: currentData.area || "Not specified",
        message: currentData.message || "Consultation requested"
      });
    }

    // 2. Forward inquiry details directly to official Email (nasimconstructioninfo@gmail.com)
    try {
      await fetch("https://formsubmit.co/ajax/nasimconstructioninfo@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `🏗️ New Construction Inquiry: ${currentData.name} (${currentData.city})`,
          Customer_Name: currentData.name,
          Phone_Number: currentData.phone,
          Project_City: currentData.city,
          Builtup_Area: currentData.area || "Not Specified",
          Service_Requested: currentData.projectType,
          Customer_Message: currentData.message || "Requested on-site consultation"
        })
      });
    } catch (mailErr) {
      console.warn("Mail forwarding:", mailErr);
    }

    // 3. Forward to local backend if running
    try {
      await axios.post("http://localhost:5000/api/contact", currentData);
    } catch (err) {
      console.warn("Backend local store:", err);
    }

    setLastSubmitted(currentData);
    setSubmitted(true);
    setLoading(false);
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "Hajipur",
      projectType: "Complete Turnkey Building Construction",
      area: "",
      message: "",
    });
  };

  // WhatsApp link generator with pre-filled inquiry details
  const getWhatsAppLeadLink = () => {
    if (!lastSubmitted) return `https://wa.me/${settings.whatsappNumber || "918507218492"}`;
    const text = `Namaste Nasim Constructions! Maine abhi website par inquiry submit ki hai:%0A%0A👤 *Naam:* ${encodeURIComponent(lastSubmitted.name)}%0A📞 *Mobile:* ${encodeURIComponent(lastSubmitted.phone)}%0A📍 *Location:* ${encodeURIComponent(lastSubmitted.city)}%0A📐 *Area:* ${encodeURIComponent(lastSubmitted.area || "N/A")}%0A🏗️ *Service:* ${encodeURIComponent(lastSubmitted.projectType)}%0A%0AKripya quotation aur free site survey ki details share karein!`;
    return `https://wa.me/${settings.whatsappNumber || "918507218492"}?text=${text}`;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Let's Build Together
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight"
          >
            Contact & <span className="text-gradient-gold">Request a Free Quote</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg"
          >
            Schedule a free site survey in Hajipur, Patna, or anywhere in Bihar. Details will be delivered directly to our executive team.
          </motion.p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts & Maps (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Cards */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 bg-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shadow-md bg-white flex-shrink-0 animate-float">
                  <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-950 flex items-center gap-2">
                    Office Headquarters
                  </h2>
                  <span className="text-xs text-amber-700 font-semibold">
                    {settings.companyName || "Nasim Constructions"} {settings.companySubtitle || "& Works"}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      Head Office Location
                    </span>
                    <span className="text-slate-950 font-semibold">
                      {settings.officeAddress || "Fatehabad, Hajipur, Vaishali District, Bihar - 844101"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      Phone Lines (Direct)
                    </span>
                    <a
                      href={`tel:${settings.phonePrimary?.replace(/[^0-9+]/g, "") || "8507218492"}`}
                      className="text-amber-700 font-bold hover:underline block text-base"
                    >
                      {settings.phonePrimary || "+91 85072 18492"}
                    </a>
                    {settings.phoneSecondary && (
                      <a
                        href={`tel:${settings.phoneSecondary?.replace(/[^0-9+]/g, "")}`}
                        className="text-slate-600 font-semibold hover:underline block text-sm"
                      >
                        {settings.phoneSecondary}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      Direct Email Inquiries
                    </span>
                    <a
                      href={`mailto:${settings.email || "nasimconstructioninfo@gmail.com"}`}
                      className="text-slate-900 font-medium hover:text-amber-600 transition-colors"
                    >
                      {settings.email || "nasimconstructioninfo@gmail.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">
                      Working Hours
                    </span>
                    <span className="text-slate-900 font-medium">
                      {settings.workingHours || "Monday – Sunday: 8:00 AM – 8:00 PM"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Pill */}
              <a
                href={`https://wa.me/${settings.whatsappNumber || "918507218492"}?text=Hello%20Nasim%20Constructions,%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Hajipur/Bihar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Chat Directly on WhatsApp
              </a>
            </div>

            {/* Google Maps Preview Embed */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 h-64 relative bg-slate-100 shadow-md">
              <iframe
                title="Nasim Constructions Location"
                src="https://maps.google.com/maps?q=Hajipur,%20Bihar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 border border-slate-200 pointer-events-none shadow-md">
                📍 Fatehabad, Hajipur, Bihar
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Consultation & Quote Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl bg-white relative overflow-hidden"
          >
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">
                    ✓ Sent directly to nasimconstructioninfo@gmail.com & registered in Nasim Constructions CRM.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5 max-w-md mx-auto text-slate-700">
                  <div><strong>Customer:</strong> {lastSubmitted?.name}</div>
                  <div><strong>Contact:</strong> {lastSubmitted?.phone}</div>
                  <div><strong>Service:</strong> {lastSubmitted?.projectType}</div>
                  <div><strong>City / Location:</strong> {lastSubmitted?.city}</div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Our chief civil engineer Mohammad Nasim will reach out to you within 2-4 hours. You can also connect immediately on WhatsApp below.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppLeadLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send on WhatsApp & Get Instant Reply</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-display font-bold text-slate-950">
                    Request Free Site Inspection & BOQ Estimate
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your project details below. They will be emailed directly to our team.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Mohammad Nasim"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 85072 18492"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Project Location / City
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Fatehabad, Hajipur, Patna"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Approx. Area (Sq. Ft)
                    </label>
                    <input
                      type="text"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      placeholder="e.g. 1,800 sq.ft"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Complete Turnkey Building Construction">Complete Turnkey Building Construction</option>
                    <option value="Commercial Complex & Showroom Construction">Commercial Complex & Showroom Construction</option>
                    <option value="Home & Structural Renovation">Home & Structural Renovation</option>
                    <option value="Luxury Modular Interior Design">Luxury Modular Interior Design</option>
                    <option value="3D Architectural & Vastu Blueprint Planning">3D Architectural & Vastu Blueprint Planning</option>
                    <option value="Certified Material & Skilled Labor Supply">Certified Material & Skilled Labor Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Project Requirements / Message (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your plot size, floors planned, expected start date, or specific design desires..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Submit Inquiry & Request Free Survey"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <FloatingActions />
    </div>
  );
}