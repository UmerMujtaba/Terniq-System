# Company Website

A company/agency website built with **Next.js 14 (App Router)**,
**TypeScript**, **Tailwind CSS**, and **Firebase** (Firestore for the
"Start a project" form). Smooth scrolling and animation come from **Lenis** and **Framer Motion**.
Fonts are self-hosted via Fontsource — no runtime dependency on Google's
font CDN.

## Renaming the company

The company name is defined **once**, at the top of `lib/site-config.ts`:

```ts
export const COMPANY_NAME = "Umer Digital";
```

Change that one line and the name updates everywhere: the navigation, the
footer, page titles, the meta description, the generated favicon, and the
`Organization` structured data used by search engines. Nothing else needs to
be touched.

## Stack

- Next.js 14 (App Router, static generation)
- TypeScript
- Tailwind CSS
- Firebase (Firestore)
- Framer Motion (animation) and Lenis (smooth scrolling)
- Self-hosted variable fonts: Bricolage Grotesque (display), Instrument Sans (body)

## Project structure

```
app/
  layout.tsx          Root layout, global metadata, Organization JSON-LD
  page.tsx            Home page — composes all sections
  globals.css         Design tokens, base styles, reduced-motion handling
  sitemap.ts          Auto-generated /sitemap.xml
  robots.ts           Auto-generated /robots.txt
  manifest.ts         Auto-generated web app manifest
  icon.tsx            Auto-generated favicon (uses the company initial)
  opengraph-image.tsx Auto-generated social share image

components/
  SmoothScroll.tsx    Lenis smooth scrolling (off for reduced-motion users)
  Nav.tsx             Floating pill nav: hides on scroll down, progress bar, animated mobile menu
  Hero.tsx            Headline reveal + cursor-tilting cascade of the live products
  LiveShowcase.tsx    Live-site previews in a browser frame (desktop/phone toggle);
                      the section colour morphs to each product's accent
  MoreWork.tsx        Filterable, expandable list of the remaining projects
  Expertise.tsx       Bento grid of services with cursor spotlight
  Approach.tsx        3-step process with a scroll-linked progress line
  Contact.tsx         "Start a project" form (writes to Firestore), animated success state
  Footer.tsx          Footer with oversized wordmark

lib/
  data.ts             Expertise areas and project list (edit here to update content)
  site-config.ts      COMPANY_NAME + all other site-wide config
  firebase.ts         Firebase client initialization
```

### Why it's structured this way

Every project and service shown on the site lives in **`lib/data.ts`** as
typed data, separate from the components that render it — add, remove, or
reorder projects there and the "Selected work" section updates on its own.
Company-wide details (name, email, tagline, keywords) live in
**`lib/site-config.ts`**, reused by the page metadata, the structured data,
the sitemap, and the contact section, so nothing is duplicated.

The site intentionally leaves out a work-history/experience section, since
this is a company page — visitors care about what you can build for them
(expertise + past work), not a personal timeline.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

The "Start a project" form saves submissions to Firestore. To connect it to
your own Firebase project:

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Add a **Web app** to the project (Project settings → General → "Your apps" → Web).
3. Copy the config values Firebase gives you.
4. Enable **Firestore Database** (Build → Firestore Database → Create database). Start in production mode.
5. Under Firestore → Rules, use rules like these so visitors can only *create*
   inquiries, not read or edit them:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /inquiries/{inquiryId} {
         allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message'])
                       && request.resource.data.name is string
                       && request.resource.data.email is string
                       && request.resource.data.message is string;
         allow read, update, delete: if false;
       }
     }
   }
   ```

6. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

7. Fill in `.env.local` with the values from step 3.

Submitted inquiries appear in the Firebase console under
**Firestore Database → Data → inquiries**.

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

### 4. Update your content

- **Company name**: `lib/site-config.ts` → `COMPANY_NAME`.
- **Projects and services**: `lib/data.ts`.
- **Contact details, tagline, keywords**: `lib/site-config.ts`.
  Update the `url` field to your real production domain before deploying —
  it's used for canonical URLs, the sitemap, and Open Graph tags.

### 5. Build for production

```bash
npm run build
npm start
```

## Deployment

Easiest option is [Vercel](https://vercel.com/):

1. Push this project to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Add the same environment variables from `.env.local` in the Vercel project
   settings (Settings → Environment Variables).
4. Deploy. Vercel rebuilds automatically on every push.

Any other Node.js host (Netlify, Firebase Hosting with a Cloud Function,
Render, your own server) works too — just set the same environment variables
there.

## SEO checklist (already handled)

- Per-page `<title>` and meta description via the Next.js Metadata API
- Open Graph and Twitter card tags, with a dynamically generated share image
  (`app/opengraph-image.tsx`) — no manual image asset required
- JSON-LD `Organization` structured data in `app/layout.tsx`
- Auto-generated `sitemap.xml` and `robots.txt`
- Dynamically generated favicon (`app/icon.tsx`), using the company's initial
- Semantic HTML (`<section>`, `<nav>`, `<main>`, `<article>`), one `<h1>` per
  page, and a logical heading order
- Fully static output — every route pre-renders at build time
- Visible focus states and `prefers-reduced-motion` support

Before going live, update `lib/site-config.ts` → `url` to your real domain,
then re-run `npm run build` so the sitemap and canonical URLs point to it.

## Adding a live product to the showcase

Open `lib/data.ts`, add a project with a `url`, an `accent` colour, and a soft
`tint`, then add its `id` to `FEATURED_ORDER` at the bottom of the file. Projects
without a `url` appear in the "More we've built" list instead.

**Embedding note:** the showcase loads each site in an `<iframe>`. If a site sends
an `X-Frame-Options` or `Content-Security-Policy: frame-ancestors` header that
forbids embedding, its preview stays blank; the "Open" button still works. For
your own Vercel/Next.js projects, allow embedding by adding this site's domain to
`frame-ancestors` in that project's response headers.

## Customizing the design

Design tokens live in `tailwind.config.ts` and `app/globals.css`. The palette is
a cool paper background (`#F5F6FB`) with deep indigo ink (`#131737`) and an
electric indigo brand accent (`#2F3FE0`); each featured project brings its own
accent. Change the `colors` block in `tailwind.config.ts` to re-theme the site.
