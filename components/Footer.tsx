import { COMPANY_NAME, siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="on-dark bg-ink pb-8 text-white">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-col gap-4 border-t border-white/15 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}.
          </p>
          <div className="flex gap-6">
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              GitHub
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
              Email
            </a>
          </div>
        </div>
        {/* <p
          aria-hidden
          className="mt-10 select-none whitespace-nowrap text-center font-display text-[clamp(3rem,15.5vw,13rem)] font-bold pb-[0.12em] leading-[0.9] tracking-[-0.05em] text-white/10"
        >
          {COMPANY_NAME}
        </p> */}
      </div>
    </footer>
  );
}
