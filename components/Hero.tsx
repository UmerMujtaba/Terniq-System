"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { featuredProjects } from "@/lib/data";

const headline = "We build the apps, stores, and back‑office systems that run your business.".split(" ");
const stack = ["React Native", "Flutter", "Next.js", "Shopify", "Firebase", "Supabase"];
const EASE = [0.22, 1, 0.36, 1] as const;

// Resting pose of each card in the cascade (x/y in %, rotation in deg).
const poses = [
  { x: 0, y: 0, r: -4 },
  { x: 16, y: 23, r: 3 },
  { x: 3, y: 48, r: -2 },
  { x: 20, y: 72, r: 4 },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.045, ease: EASE }}
                >
                  {word}
                </motion.span>
                {i < headline.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted"
          >
            Mobile apps, e-commerce storefronts, and the software behind the scenes (inventory, billing,
            bookings), designed and built end to end by one team.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(47,63,224,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-10px_rgba(47,63,224,0.8)]"
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#work"
              className="rounded-full border border-ink/15 px-7 py-3.5 text-[0.95rem] font-semibold transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
            >
              See live products
            </a>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            aria-label="Technologies we build with"
            className="mt-14 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted"
          >
            {stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </motion.ul>
        </div>

        {/* Cascade of live products. Tilts toward the pointer; spreads on hover. */}
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative mx-auto h-[27rem] w-full max-w-[26rem] [perspective:1100px] sm:h-[32rem] lg:col-span-5 lg:max-w-none"
        >
          <motion.div style={reduce ? undefined : { rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
            {featuredProjects.map((p, i) => {
              const pose = poses[i];
              return (
                <motion.a
                  key={p.id}
                  href="#work"
                  onClick={() => window.dispatchEvent(new CustomEvent("select-project", { detail: p.id }))}
                  aria-label={`${p.name}: open in live showcase`}
                  initial={reduce ? false : { opacity: 0, y: 80, rotate: pose.r * 2 }}
                  animate={{ opacity: 1, y: 0, rotate: pose.r }}
                  transition={{ duration: 0.9, delay: 0.55 + i * 0.12, ease: EASE }}
                  whileHover={{ y: -10, rotate: 0, scale: 1.03, zIndex: 20 }}
                  style={{ left: `${pose.x}%`, top: `${pose.y}%`, zIndex: i + 1, backgroundColor: p.tint }}
                  className="absolute block w-[76%] rounded-[1.4rem] border border-ink/10 p-5 shadow-[0_24px_50px_-24px_rgba(19,23,55,0.45)]"
                >
                  <span className="flex items-center justify-between text-[0.8rem] font-medium text-ink/70">
                    {p.industry}
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulseDot rounded-full" style={{ backgroundColor: p.accent }} />
                      Live
                    </span>
                  </span>
                  <span className="mt-5 block font-display text-[1.6rem] font-bold leading-none tracking-tight">{p.name}</span>
                  <span className="mt-5 flex gap-1.5" aria-hidden>
                    <span className="h-2 w-12 rounded-full" style={{ backgroundColor: p.accent }} />
                    <span className="h-2 w-6 rounded-full bg-ink/15" />
                    <span className="h-2 w-8 rounded-full bg-ink/10" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
