import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SERVICES_DATA as DEFAULT_SERVICES,
  PROJECTS_DATA as DEFAULT_PROJECTS,
  STATS_DATA as DEFAULT_STATS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQS as DEFAULT_FAQS,
  WORKFLOW_STEPS as DEFAULT_WORKFLOW
} from "../data/mockData";

const SiteContext = createContext();

const STORAGE_KEYS = {
  THEME: "nasim_theme_v2",
  SETTINGS: "nasim_settings_v2",
  PROJECTS: "nasim_projects_v2",
  SERVICES: "nasim_services_v2",
  STATS: "nasim_stats_v2",
  TESTIMONIALS: "nasim_testimonials_v2",
  FAQS: "nasim_faqs_v2",
  INQUIRIES: "nasim_inquiries_v2",
};

const DEFAULT_SETTINGS = {
  companyName: "Nasim Constructions",
  companySubtitle: "& Works • Bihar",
  tagline: "Building Dreams into Architectural Reality",
  aboutShort: "Pioneering excellence in building construction, modern architectural planning, renovation, and turnkey civil contracting across Hajipur, Patna, and Bihar.",
  experienceText: "Running for last 10+ years in Hajipur & Nearby Areas",
  experienceYears: "10+",
  founderName: "Mohammad Nasim",
  founderTitle: "Owner & Founder",
  founderBio: "Guiding company vision, civil contracting operations, and turnkey project execution across Hajipur and nearby regions with 10+ years of hands-on structural expertise.",
  coFounderName: "Md Shahid Alam",
  coFounderTitle: "Co-Owner & Co-Founder",
  coFounderBio: "Spearheading modern architectural planning, digital site monitoring, client relationships, and quality management across Hajipur, Vaishali, and neighboring districts.",
  phonePrimary: "+91 85072 18492",
  phoneSecondary: "+91 9709797714",
  whatsappNumber: "918507218492",
  email: "nasimconstructioninfo@gmail.com",
  officeAddress: "Fatehabad, Hajipur, Vaishali District, Bihar - 844101",
  workingHours: "Monday – Sunday: 8:00 AM – 8:00 PM",
  heroSubtitle: "From turnkey residential villas and commercial landmarks to luxury interior remodels across Hajipur & Patna. Delivering on-time excellence with premier structural engineering."
};

export function SiteProvider({ children }) {

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try { return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
    }
    return DEFAULT_SETTINGS;
  });

  // Projects
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_PROJECTS;
  });

  // Services
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_SERVICES;
  });

  // Stats
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_STATS;
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_TESTIMONIALS;
  });

  // FAQs
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_FAQS;
  });

  // Inquiries / Leads from Contact Form
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: "inq-1",
        date: "28 Aug 2026, 11:30 AM",
        name: "Ramesh Singh",
        phone: "+91 98350 44521",
        city: "Hajipur, Bihar",
        area: "2,200 sq.ft",
        projectType: "Complete Turnkey Building Construction",
        message: "Want to construct a 2-storey residential villa with earthquake-safe RCC foundation in Hajipur.",
        status: "New Lead"
      }
    ];
  });

  const addInquiry = (inquiry) => {
    setInquiries((prev) => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) + 
        ", " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      const newEntry = {
        id: `inq-${Date.now()}`,
        date: dateStr,
        status: "New Lead",
        ...inquiry
      };
      const updated = [newEntry, ...prev];
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => {
      const updated = prev.filter((inq) => inq.id !== id);
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      return updated;
    });
  };

  // Enforce Light Theme across the website per user instruction
  const [theme, setTheme] = useState("light");

  // Apply light theme to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.setItem("nasim_theme_v3", "light");
    localStorage.removeItem("nasim_theme_v2");
  }, []);

  const toggleTheme = () => {
    // Keep theme light
    setTheme("light");
  };

  // Updaters with localStorage sync
  const updateSettings = (newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

  const addProject = (project) => {
    setProjects((prev) => {
      const id = project.id || `project-${Date.now()}`;
      const updated = [{ ...project, id }, ...prev];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProject = (id, updatedProject) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProject = (id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateService = (id, updatedService) => {
    setServices((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updatedService } : s));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
  };

  const updateTestimonial = (idx, updatedItem) => {
    setTestimonials((prev) => {
      const updated = [...prev];
      updated[idx] = updatedItem;
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
      return updated;
    });
  };

  const addTestimonial = (item) => {
    setTestimonials((prev) => {
      const updated = [item, ...prev];
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteTestimonial = (idx) => {
    setTestimonials((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateFaq = (idx, updatedItem) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[idx] = updatedItem;
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const addFaq = (item) => {
    setFaqs((prev) => {
      const updated = [...prev, item];
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFaq = (idx) => {
    setFaqs((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all site details to original default values?")) {
      Object.values(STORAGE_KEYS).forEach((k) => {
        if (k !== STORAGE_KEYS.THEME) localStorage.removeItem(k);
      });
      setSettings(DEFAULT_SETTINGS);
      setProjects(DEFAULT_PROJECTS);
      setServices(DEFAULT_SERVICES);
      setStats(DEFAULT_STATS);
      setTestimonials(DEFAULT_TESTIMONIALS);
      setFaqs(DEFAULT_FAQS);
      return true;
    }
    return false;
  };

  const exportData = () => {
    const data = {
      settings,
      projects,
      services,
      stats,
      testimonials,
      faqs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nasim-constructions-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) {
        setSettings(data.settings);
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      }
      if (data.projects) {
        setProjects(data.projects);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
      }
      if (data.services) {
        setServices(data.services);
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data.services));
      }
      if (data.stats) {
        setStats(data.stats);
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.stats));
      }
      if (data.testimonials) {
        setTestimonials(data.testimonials);
        localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(data.testimonials));
      }
      if (data.faqs) {
        setFaqs(data.faqs);
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(data.faqs));
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <SiteContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
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
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults,
        exportData,
        importData,
        DEFAULT_WORKFLOW
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteProvider");
  }
  return context;
}
