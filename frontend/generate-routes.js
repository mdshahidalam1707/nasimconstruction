import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "dist");
const indexHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

const routes = [
  {
    path: "services",
    title: "Construction & Civil Contracting Services | Nasim Constructions & Works - Hajipur, Bihar",
    canonical: "https://nasimconstruction.in/services",
    description: "Explore end-to-end building construction, earthquake-resistant civil contracting, modern home renovation, and luxury interior execution by Nasim Constructions in Hajipur, Bihar."
  },
  {
    path: "projects",
    title: "Completed Projects Portfolio | Nasim Constructions & Works - Hajipur, Bihar",
    canonical: "https://nasimconstruction.in/projects",
    description: "View our completed residential villas, commercial complexes, and bespoke interior renovations delivered across Hajipur, Patna, and Vaishali, Bihar."
  },
  {
    path: "about",
    title: "About Us | Nasim Constructions & Works - Hajipur, Bihar",
    canonical: "https://nasimconstruction.in/about",
    description: "Learn about Nasim Constructions & Works, founded by Mohammad Nasim with 10+ years of trusted excellence in turnkey construction and engineering in Hajipur, Bihar."
  },
  {
    path: "contact",
    title: "Contact Us | Nasim Constructions & Works - Hajipur, Bihar",
    canonical: "https://nasimconstruction.in/contact",
    description: "Get in touch with Nasim Constructions & Works in Fatehabad, Hajipur, Bihar. Call +91-8507218492 or message on WhatsApp for free site consultation and estimate."
  },
  {
    path: "admin",
    title: "Admin Dashboard | Nasim Constructions & Works",
    canonical: "https://nasimconstruction.in/admin",
    description: "Admin & CRM portal for Nasim Constructions & Works."
  },
  {
    path: "crm",
    title: "CRM Dashboard | Nasim Constructions & Works",
    canonical: "https://nasimconstruction.in/crm",
    description: "Admin & CRM portal for Nasim Constructions & Works."
  }
];

function generateHtmlForRoute(route) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );

  // Replace Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace Twitter Title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );

  // Replace Description if provided
  if (route.description) {
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );
  }

  return html;
}

routes.forEach((route) => {
  const routeHtml = generateHtmlForRoute(route);

  // 1. Directory based index.html: dist/<route>/index.html
  const routeDir = path.join(distDir, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml, "utf-8");

  // 2. Direct html file: dist/<route>.html (for cleanUrls support)
  fs.writeFileSync(path.join(distDir, `${route.path}.html`), routeHtml, "utf-8");

  console.log(`Generated route files for /${route.path}`);
});

// Also create 404.html from base index.html as a SPA fallback
fs.writeFileSync(path.join(distDir, "404.html"), baseHtml, "utf-8");
console.log("Generated dist/404.html fallback.");
