export interface Expertise {
  title: string;
  description: string;
  tools: string[];
}

export const expertiseAreas: Expertise[] = [
  {
    title: "Mobile app development",
    description:
      "Native-feeling apps in React Native and Flutter, sharing logic across iOS and Android without sacrificing platform feel.",
    tools: ["React Native", "Flutter", "Redux", "FCM"],
  },
  {
    title: "E-commerce & Shopify",
    description:
      "Custom Shopify storefronts and themes for fashion and lifestyle brands, built around conversion and fast checkout.",
    tools: ["Shopify", "Liquid", "Next.js"],
  },
  {
    title: "Web & product engineering",
    description:
      "Full-stack web apps in Next.js and React, from marketing sites to complex, data-heavy dashboards.",
    tools: ["Next.js", "React", "TypeScript"],
  },
  {
    title: "Business & POS software",
    description:
      "Internal systems for retail and healthcare — stock management, billing, invoicing, and reporting.",
    tools: ["Billing", "Inventory", "Reporting"],
  },
  {
    title: "Backend & cloud",
    description:
      "Firebase and Supabase-backed architectures with real-time sync, authentication, and secure data models.",
    tools: ["Firebase", "Supabase", "Auth"],
  },
  {
    title: "Real-time integrations",
    description:
      "Live calling, push notifications, booking systems, and wearable/health-data sync built into the product.",
    tools: ["Agora", "Push", "HealthKit"],
  },
];

export type ProjectType = "Mobile App" | "Web App" | "E-commerce" | "Business Software";

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  industry: string;
  description: string;
  bullets: string[];
  stack: string[];
  status?: string;
  /** Live site. When present, the project appears in the live showcase. */
  url?: string;
  /** Saturated accent + soft tint used by the showcase for this project. */
  accent: string;
  tint: string;
}

const DEFAULT_ACCENT = "#2F3FE0";
const DEFAULT_TINT = "#E8EAFE";

export const projects: Project[] = [
  {
    id: "cafe-flow",
    name: "Cafe Flow",
    type: "Business Software",
    industry: "Café & Hospitality",
    description:
      "A café ERP that runs a whole rooftop tea café from one screen: waiters punch orders, the counter prints receipts, and the kitchen always knows what is next.",
    bullets: [
      "Order entry for waiters, receipt printing at the counter, and a live kitchen view.",
      "Manager sign-in, plus a guided setup flow for onboarding a new café.",
    ],
    stack: ["Next.js", "Supabase", "Tailwind CSS"],
    status: "Live",
    url: "https://cafe-flow-zeta.vercel.app/login",
    accent: "#D9861A",
    tint: "#FBEBD3",
  },
  {
    id: "artistry-haven",
    name: "The Artistry Haven",
    type: "E-commerce",
    industry: "Handmade & Crafts",
    description:
      "A storefront for a handmade resin-art studio, built to let one-of-a-kind pieces do the selling, from keychains and charms to canvas paintings.",
    bullets: [
      "Category-filtered catalog covering resin art, candles, clay pieces, and custom gifts.",
      "Product pages with add-to-cart, plus direct Instagram and WhatsApp contact.",
    ],
    stack: ["Next.js", "Tailwind CSS"],
    status: "Live",
    url: "https://artistry-heaven.vercel.app/",
    accent: "#8C6AE6",
    tint: "#ECE5FB",
  },
  {
    id: "zaid-pharmacy",
    name: "Zaid Pharmacy",
    type: "Web App",
    industry: "Healthcare & Retail",
    description:
      "An ordering site for a four-branch family pharmacy: browse medicines, check weekly offers, find the nearest branch, and send a prescription photo over WhatsApp.",
    bullets: [
      "Medicine catalog with weekly offers and a free-delivery threshold.",
      "Branch finder with hours, and prescription ordering over WhatsApp.",
      "Staff sign-in that opens the in-store point of sale.",
    ],
    stack: ["Next.js", "WhatsApp ordering", "POS"],
    status: "Live",
    url: "https://pharmzp.vercel.app/",
    accent: "#1F9D6B",
    tint: "#DDF3E9",
  },
  {
    id: "rosewood-scents",
    name: "Rosewood Scents",
    type: "E-commerce",
    industry: "Beauty & Fragrance",
    description:
      "A perfume brand's online storefront, built for fast browsing and a smooth checkout on any device.",
    bullets: [
      "Custom product catalog with scent notes, collections, and gift bundling.",
      "Supabase-backed inventory and order data with real-time stock updates.",
    ],
    stack: ["Next.js", "Supabase", "Tailwind CSS"],
    status: "Live",
    url: "https://rosewood-scents.vercel.app/",
    accent: "#B4415F",
    tint: "#F9E3E9",
  },
  {
    id: "jewelry-brand-storefront",
    name: "Jewelry Brand Storefront",
    type: "E-commerce",
    industry: "Fashion & Jewelry",
    description:
      "A Shopify storefront for a jewelry label, with a custom theme built around large product photography and gifting.",
    bullets: [
      "Custom Shopify theme with collection storytelling and product zoom.",
      "Streamlined checkout and discount/bundle logic for gift sets.",
    ],
    stack: ["Shopify", "Liquid", "JavaScript"],
    status: "Live",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "footwear-brand-storefront",
    name: "Footwear Brand Storefront",
    type: "E-commerce",
    industry: "Fashion & Footwear",
    description:
      "A Shopify store for a shoe brand, with size/variant selection and inventory built for frequent drops.",
    bullets: [
      "Variant-heavy product pages with size charts and stock indicators.",
      "Optimized for fast catalog browsing during high-traffic launches.",
    ],
    stack: ["Shopify", "Liquid", "JavaScript"],
    status: "Live",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "medical-store-management-system",
    name: "Medical Store Management System",
    type: "Business Software",
    industry: "Healthcare & Retail",
    description:
      "A stock and billing system built for pharmacies — inventory, invoicing, and expiry tracking in one place.",
    bullets: [
      "Real-time stock levels with low-stock and near-expiry alerts.",
      "Point-of-sale billing with itemized invoices and daily sales reporting.",
      "Role-based access for cashiers, pharmacists, and store owners.",
    ],
    stack: ["Next.js", "Firebase", "TypeScript"],
    status: "Deployed",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "salon-booking-app",
    name: "Salon Booking App",
    type: "Mobile App",
    industry: "Beauty & Wellness",
    description:
      "A mobile app for booking salon appointments — pick a salon, choose services, and confirm a time slot.",
    bullets: [
      "Salon and service discovery with real-time availability.",
      "End-to-end booking flow with confirmation and reminder notifications.",
      "Push notifications for booking status and upcoming appointments.",
    ],
    stack: ["React Native", "Firebase", "FCM"],
    status: "Live",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "buzzmi",
    name: "Buzzmi",
    type: "Web App",
    industry: "Health & Fitness",
    description:
      "A fitness and community platform sharing one codebase across iOS, Android, and web.",
    bullets: [
      "Monorepo architecture cutting duplicated code by roughly 40% across platforms.",
      "HealthKit and Health Connect integration for real-time smartwatch sync.",
      "Community feed, in-app chat, and role-based access for coaches and members.",
    ],
    stack: ["React Native", "Next.js", "Zustand", "HealthKit"],
    status: "Live",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "storybirds",
    name: "Storybirds",
    type: "Mobile App",
    industry: "Media & Entertainment",
    description:
      "An audio-storytelling app connecting adults and children through asynchronous voice recordings.",
    bullets: [
      "Background-capable, interruption-free audio playback with secure recording.",
      "Push notifications on new posts, plus chunked media upload with retry logic.",
    ],
    stack: ["Flutter", "Firebase", "FCM"],
    status: "Live on Play Store",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "photo-play",
    name: "Photo Play",
    type: "Mobile App",
    industry: "Media & Entertainment",
    description:
      "A movie discovery app with a Netflix-inspired browsing experience for large media catalogs.",
    bullets: [
      "Custom carousels, hero banners, and animated transitions.",
      "List virtualization and image caching for smooth scrolling at scale.",
    ],
    stack: ["Flutter", "REST APIs"],
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "kiddu",
    name: "Kiddu",
    type: "Mobile App",
    industry: "Education",
    description:
      "An educational app for kids with six interactive learning modules.",
    bullets: [
      "Alphabets, numbers, animals, shapes, games, and pronunciation guides.",
      "Rewards system and premium content gating by user role.",
    ],
    stack: ["React Native", "TypeScript", "Redux", "Firebase"],
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "food-ordering-app",
    name: "Food Ordering App",
    type: "Mobile App",
    industry: "Food & Delivery",
    description:
      "A full-cycle ordering app with live in-app voice support for customer service.",
    bullets: [
      "Cart management, item customization, and automated order confirmations.",
      "Agora real-time calling built into the ordering flow.",
    ],
    stack: ["React Native", "Redux", "Agora"],
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
  {
    id: "fit-hunt",
    name: "Fit Hunt",
    type: "Mobile App",
    industry: "Health & Fitness",
    description:
      "A fitness and nutrition app with tailored diet plans and progress tracking.",
    bullets: [
      "Exercise libraries and daily progress tracking.",
      "Firebase-backed persistence for goals, diet logs, and workout history.",
    ],
    stack: ["React Native", "Firebase"],
    status: "Award-winning",
    accent: DEFAULT_ACCENT,
    tint: DEFAULT_TINT,
  },
];

/** Projects with a live URL, in showcase order. */
const FEATURED_ORDER = ["cafe-flow", "artistry-haven", "rosewood-scents", "zaid-pharmacy"];
export const featuredProjects: Project[] = FEATURED_ORDER.map(
  (id) => projects.find((p) => p.id === id)!
);
export const otherProjects: Project[] = projects.filter((p) => !FEATURED_ORDER.includes(p.id));
export const projectTypes: ProjectType[] = ["Mobile App", "Web App", "E-commerce", "Business Software"];
