"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { COMPANY_NAME } from "@/lib/site-config";

const links = [
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  // Hide the bar while scrolling down, bring it back on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-signal"
      />
      <motion.header
        animate={{ y: hidden ? "-140%" : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-3xl items-center justify-between rounded-full border border-ink/10 py-2 pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(19,23,55,0.25)] backdrop-blur-xl transition-colors duration-300 ${open ? "bg-paper" : "bg-paper/75"}`}
        >
          <a href="#top" className="font-display text-[1.05rem] font-bold tracking-tight">
            {COMPANY_NAME}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[0.92rem] text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pl-1">
              <a
                href="#contact"
                className="inline-block rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-signal"
              >
                Start a project
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-0.5 w-4 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-0.5 w-4 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.25rem) 2.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.25rem) 2.75rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.25rem) 2.75rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="on-dark fixed inset-0 z-40 flex flex-col justify-end bg-ink px-8 pb-14 text-white md:hidden"
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.5 } }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl font-bold tracking-tight"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
