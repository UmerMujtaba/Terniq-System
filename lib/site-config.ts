// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS to rename the company everywhere on the site: navigation,
// footer, page titles, meta description, and the Organization structured
// data used by search engines. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────
export const COMPANY_NAME = "Terniq Systems";

export const siteConfig = {
  name: COMPANY_NAME,
  tagline: "Cross-platform apps, storefronts, and business software",
  // Replace with your real production domain before deploying.
  // Used for canonical links, sitemap, robots, and Open Graph tags.
  url: "https://umerdigital.com",
  description: `${COMPANY_NAME} designs and builds mobile apps, e-commerce storefronts, and business software — from React Native and Flutter apps to Shopify stores and internal billing systems.`,
  email: "hello@umerdigital.com",
  phone: "+92 305 4034026",
  location: "Lahore, Pakistan",
  social: {
    github: "https://github.com/UmerMujtaba",
    linkedin: "https://linkedin.com/in/umermujtaba9",
  },
  keywords: [
    "React Native development agency",
    "Flutter app development",
    "Shopify store development",
    "Next.js web development",
    "Firebase app development",
    "Supabase development",
    "custom business software",
    "software house Lahore Pakistan",
  ],
};

export type SiteConfig = typeof siteConfig;
