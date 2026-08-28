import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Phone,
  MapPin,
  Users,
  Briefcase,
  Wrench,
  BarChart3,
  MessageSquare,
  HelpCircle,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  Search,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  LogOut,
  ShieldAlert,
  X
} from "lucide-react";
import { useSiteData } from "../context/SiteContext";

export default function Admin() {
  const {
    settings,
    updateSettings,
    projects,
    addProject,
    updateProject,
    deleteProject,
    services,
    updateService,
    stats,
    updateStats,
    testimonials,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    faqs,
    updateFaq,
    addFaq,
    deleteFaq,
    inquiries = [],
    updateInquiryStatus,
    deleteInquiry,
    resetToDefaults,
    exportData,
    importData
  } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("nasim_crm_auth") === "authorized";
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("company");
  const [saveAlert, setSaveAlert] = useState("");

  // Local copy of settings for form editing
  const [formData, setFormData] = useState(settings);

  // Project modal / editing state
  const [editingProject, setEditingProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");

  const showToast = (message) => {
    setSaveAlert(message);
    setTimeout(() => setSaveAlert(""), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const targetEmail = "nasimconstructioninfo@gmail.com";
    const targetPassword = "AnishaBegum@17077";

    if (
      loginEmail.trim().toLowerCase() === targetEmail.toLowerCase() &&
      loginPassword === targetPassword
    ) {
      sessionStorage.setItem("nasim_crm_auth", "authorized");
      setIsAuthenticated(true);
      showToast("🔐 Authentication successful. Welcome to Nasim Constructions CRM.");
    } else {
      setLoginError("Access Denied: Invalid email or password. Access is restricted to authorized leadership.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nasim_crm_auth");
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    showToast("✅ Company details & contacts saved successfully!");
  };

  const handleProjectSave = (e) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.image) {
      alert("Please provide at least a title and image URL.");
      return;
    }

    if (isNewProject) {
      addProject(editingProject);
      showToast("✅ New project added to portfolio!");
    } else {
      updateProject(editingProject.id, editingProject);
      showToast("✅ Project updated successfully!");
    }
    setEditingProject(null);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importData(event.target.result);
      if (res.success) {
        showToast("✅ Backup imported and applied successfully!");
      } else {
        alert("Import failed: " + res.error);
      }
    };
    reader.readAsText(file);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.location?.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(projectSearch.toLowerCase())
  );

  // If not authenticated, render Login Screen in Pure Light Theme
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-6 text-slate-900">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-extrabold text-slate-950">
                  CRM Portal Access
                </h1>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-wider mt-1">
                  Nasim Constructions & Works
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Strictly restricted to Mohammad Nasim and authorized leadership. Please verify your credentials to manage website details.
                </p>
              </div>
            </div>

            {/* Error Alert */}
            {loginError && (
              <div className="p-3.5 bg-rose-100 border border-rose-300 rounded-xl text-xs font-bold text-rose-700 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Authorized Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="nasimconstructioninfo@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Verify & Enter CRM Portal</span>
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-200">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors"
              >
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
              <LayoutDashboard className="w-4 h-4" />
              Nasim Constructions CRM & CMS Control Suite
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
              Executive CRM Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Logged in as: <strong className="text-amber-700 font-bold">nasimconstructioninfo@gmail.com</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportData}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-all shadow-sm"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export JSON</span>
            </button>

            <Link
              to="/"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>View Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              title="Sign Out of CRM"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {saveAlert && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-bold shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>{saveAlert}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-200 border border-slate-300 shadow-inner">
          {[
            { id: "inquiries", label: `Customer Leads (${inquiries.length})`, icon: Mail },
            { id: "company", label: "Company & Contacts", icon: Building2 },
            { id: "projects", label: `Projects (${projects.length})`, icon: Briefcase },
            { id: "services", label: `Services (${services.length})`, icon: Wrench },
            { id: "stats", label: "Stats & Counters", icon: BarChart3 },
            { id: "reviews", label: "Reviews & FAQs", icon: MessageSquare },
            { id: "backup", label: "Backup & Reset", icon: RotateCcw }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                    : "text-slate-700 hover:bg-slate-300/80 hover:text-slate-950"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            TAB: CUSTOMER LEADS & INQUIRIES
        ========================================================= */}
        {activeTab === "inquiries" && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6 shadow-md text-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-display font-extrabold text-slate-950 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-600" />
                  Customer Inquiries & Leads ({inquiries.length})
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  Leads submitted from the website contact form, forward-synced to nasimconstructioninfo@gmail.com.
                </p>
              </div>
            </div>

            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm hover:border-amber-400 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-base text-slate-950">{inq.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inq.status === "New Lead" ? "bg-amber-100 text-amber-800 border border-amber-300" :
                            inq.status === "Survey Scheduled" ? "bg-blue-100 text-blue-800 border border-blue-300" :
                            "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          }`}>
                            {inq.status || "New Lead"}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">Received: {inq.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status || "New Lead"}
                          onChange={(e) => updateInquiryStatus && updateInquiryStatus(inq.id, e.target.value)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-800 cursor-pointer"
                        >
                          <option value="New Lead">Mark: New Lead</option>
                          <option value="Survey Scheduled">Mark: Survey Scheduled</option>
                          <option value="In Progress">Mark: In Progress</option>
                          <option value="Closed / Completed">Mark: Closed</option>
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete lead from ${inq.name}?`)) {
                              deleteInquiry && deleteInquiry(inq.id);
                              showToast("🗑️ Inquiry deleted");
                            }
                          }}
                          className="p-1.5 rounded-lg bg-white hover:bg-rose-500 hover:text-white text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-500 font-bold block">Mobile / WhatsApp:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <a href={`tel:${inq.phone?.replace(/[^0-9+]/g, "")}`} className="font-bold text-amber-700 hover:underline">
                            {inq.phone}
                          </a>
                          <a
                            href={`https://wa.me/${inq.phone?.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Mohammad%20Nasim%20from%20Nasim%20Constructions%20regarding%20your%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-0.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[11px] font-bold"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500 font-bold block">Location & Area:</span>
                        <span className="font-semibold text-slate-900">{inq.city} ({inq.area || "Area N/A"})</span>
                      </div>

                      <div>
                        <span className="text-slate-500 font-bold block">Service Needed:</span>
                        <span className="font-semibold text-slate-900">{inq.projectType}</span>
                      </div>
                    </div>

                    {inq.message && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block mb-0.5">Project Message / Notes:</span>
                        {inq.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-sm font-medium">
                No customer inquiries received yet. New inquiries submitted on the website will appear here in real time.
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 1: COMPANY & CONTACTS
        ========================================================= */}
        {activeTab === "company" && (
          <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-md text-slate-900">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-extrabold text-slate-950">
                  Company Identity & Contacts
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  Update business name, headquarters location, phone numbers, and founders details.
                </p>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

            {/* General Brand Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Brand Info
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Subtitle / State Tag
                  </label>
                  <input
                    type="text"
                    value={formData.companySubtitle}
                    onChange={(e) => setFormData({ ...formData, companySubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Tagline / Hero Main Slogan
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    About Summary (Footer & Cards)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.aboutShort}
                    onChange={(e) => setFormData({ ...formData, aboutShort: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Founder & Leadership Section */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" />
                Founders & Ownership Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Founder */}
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <h4 className="text-xs font-bold text-amber-800 uppercase">
                    Founder / Owner
                  </h4>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.founderName}
                      onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Title / Designation
                    </label>
                    <input
                      type="text"
                      value={formData.founderTitle}
                      onChange={(e) => setFormData({ ...formData, founderTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Bio / Role Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.founderBio}
                      onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Co-Founder */}
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                  <h4 className="text-xs font-bold text-blue-800 uppercase">
                    Co-Founder / Co-Owner
                  </h4>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.coFounderName}
                      onChange={(e) => setFormData({ ...formData, coFounderName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Title / Designation
                    </label>
                    <input
                      type="text"
                      value={formData.coFounderTitle}
                      onChange={(e) => setFormData({ ...formData, coFounderTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Bio / Role Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.coFounderBio}
                      onChange={(e) => setFormData({ ...formData, coFounderBio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Experience Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.experienceText}
                    onChange={(e) => setFormData({ ...formData, experienceText: e.target.value })}
                    placeholder="Running for last 10+ years in Hajipur & Nearby Areas"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Office, Phones & Location */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Office Location & Contacts
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Head Office Full Address
                  </label>
                  <input
                    type="text"
                    value={formData.officeAddress}
                    onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phonePrimary}
                    onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Secondary Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSecondary}
                    onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    WhatsApp Direct (With Country Code e.g. 918507218492)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Inquiry Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 text-slate-700">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save All Changes
              </button>
            </div>
          </form>
        )}

        {/* =========================================================
            TAB 2: PORTFOLIO PROJECTS
        ========================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects by title, category, or location..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    title: "",
                    category: "Residential",
                    location: "Fatehabad, Hajipur",
                    year: "2024",
                    status: "Completed",
                    area: "3,500 Sq. Ft",
                    duration: "8 Months",
                    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
                    description: "",
                    scope: "Full Turnkey Construction & Architectural Planning",
                    client: ""
                  });
                  setIsNewProject(true);
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between shadow-md group"
                >
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase shadow-md">
                      {proj.category}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 text-white font-bold text-[10px]">
                      {proj.area || "Custom Area"}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1">
                    <h3 className="font-display font-bold text-base text-slate-950 line-clamp-1">
                      {proj.title}
                    </h3>
                    <div className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {proj.description || proj.scope || "No description provided."}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Duration: {proj.duration || "N/A"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject({ ...proj });
                          setIsNewProject(false);
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-amber-500 hover:text-slate-950 text-slate-700 transition-colors shadow-sm cursor-pointer border border-slate-200"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast("🗑️ Project deleted!");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-rose-500 hover:text-white text-rose-600 transition-colors shadow-sm cursor-pointer border border-slate-200"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit / Add Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 my-8 shadow-2xl text-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-display font-extrabold text-slate-950">
                      {isNewProject ? "Add New Showcase Project" : `Edit Project: ${editingProject.title}`}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleProjectSave} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-slate-700">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1 text-slate-700">
                          Category
                        </label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Interior">Interior</option>
                          <option value="Renovation">Renovation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1 text-slate-700">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editingProject.location}
                          onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-slate-700">
                        Cover Image URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.image}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1 text-slate-700">
                          Built-up Area (Sq. Ft)
                        </label>
                        <input
                          type="text"
                          value={editingProject.area || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1 text-slate-700">
                          Construction Duration
                        </label>
                        <input
                          type="text"
                          value={editingProject.duration || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-slate-700">
                        Description & Scope
                      </label>
                      <textarea
                        rows={3}
                        value={editingProject.description || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
                      >
                        {isNewProject ? "Publish Project" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 3: SERVICES
        ========================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Customize the titles, descriptions, timelines, and feature lists of the services rendered by Nasim Constructions.
            </p>

            <div className="space-y-6">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-md text-slate-900"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold uppercase mr-2">
                        {serv.badge}
                      </span>
                      <span className="font-display font-bold text-base text-slate-950">
                        {serv.title}
                      </span>
                    </div>
                    <span className="text-xs text-amber-700 font-bold">
                      Standard: {serv.standard}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-slate-700">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={serv.title}
                        onChange={(e) => updateService(serv.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-slate-700">
                        Estimated Timeline
                      </label>
                      <input
                        type="text"
                        value={serv.timeline}
                        onChange={(e) => updateService(serv.id, { timeline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold mb-1 text-slate-700">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={serv.shortDesc}
                        onChange={(e) => updateService(serv.id, { shortDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: STATS & COUNTERS
        ========================================================= */}
        {activeTab === "stats" && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6 shadow-md text-slate-900">
            <div>
              <h2 className="text-xl font-display font-extrabold text-slate-950">
                Live Stats & Experience Counters
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Update the numbers displayed on the homepage stats bar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm"
                >
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Display Metric
                    </label>
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx] = { ...st, value: e.target.value };
                        updateStats(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg font-display font-black text-xl text-amber-700 border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Label
                    </label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx] = { ...st, label: e.target.value };
                        updateStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      Subtext
                    </label>
                    <input
                      type="text"
                      value={st.subtext || ""}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx] = { ...st, subtext: e.target.value };
                        updateStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg text-xs text-slate-700 font-medium border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: REVIEWS & FAQS
        ========================================================= */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Reviews Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-md text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-display font-extrabold text-slate-950">
                    Client Testimonials
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Manage client endorsements.</p>
                </div>
                <button
                  onClick={() => {
                    addTestimonial({
                      name: "New Client",
                      role: "Homeowner, Hajipur",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                      text: "Nasim Constructions completed our project on time with outstanding quality.",
                      rating: 5
                    });
                    showToast("Added new testimonial placeholder!");
                  }}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Review
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => updateTestimonial(idx, { ...t, name: e.target.value })}
                        className="font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded border border-slate-300"
                      />
                      <button
                        onClick={() => deleteTestimonial(idx)}
                        className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => updateTestimonial(idx, { ...t, role: e.target.value })}
                      className="text-xs text-slate-600 font-medium bg-white px-2 py-1 rounded border border-slate-200 w-full"
                    />
                    <textarea
                      rows={3}
                      value={t.text}
                      onChange={(e) => updateTestimonial(idx, { ...t, text: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-normal focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-md text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-display font-extrabold text-slate-950">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Edit customer FAQ answers.</p>
                </div>
                <button
                  onClick={() => {
                    addFaq({
                      q: "What is the process to start construction with Nasim Constructions?",
                      a: "You can book a free site survey. We visit the plot, test soil levels, and deliver a transparent BOQ estimate."
                    });
                    showToast("Added new FAQ!");
                  }}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add FAQ
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => updateFaq(idx, { ...faq, q: e.target.value })}
                        className="font-bold text-sm text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300 w-full mr-3"
                      />
                      <button
                        onClick={() => deleteFaq(idx)}
                        className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => updateFaq(idx, { ...faq, a: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-normal focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: BACKUP & FACTORY RESET
        ========================================================= */}
        {activeTab === "backup" && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6 shadow-md text-slate-900">
            <div>
              <h2 className="text-xl font-display font-extrabold text-slate-950">
                Data Backup & Factory Reset
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Safely download all current data as JSON, import previous backups, or restore original defaults.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <Download className="w-8 h-8 text-amber-600 mb-2" />
                  <h4 className="font-bold text-base text-slate-950">Export Backup</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Download all your custom projects, phone numbers, and text to your computer.
                  </p>
                </div>
                <button
                  onClick={exportData}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download JSON
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <Upload className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-base text-slate-950">Import Backup</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Restore website details from a previously saved JSON file.
                  </p>
                </div>
                <label className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" /> Select JSON File
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <RotateCcw className="w-8 h-8 text-rose-600 mb-2" />
                  <h4 className="font-bold text-base text-rose-700">Factory Reset</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Reset all settings, projects, and services back to initial code default values.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (resetToDefaults()) {
                      showToast("🔄 All details reset to initial factory values.");
                      setFormData(settings);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
