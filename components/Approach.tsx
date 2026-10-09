"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map the problem, the users, and the constraints: what the product needs to do, and what it needs to integrate with.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "We design and develop in short cycles, with working versions to review early rather than a single reveal at the end.",
  },
  {
    step: "03",
    title: "Ship & support",
    description:
      "We launch, monitor, and keep improving: bug fixes, new features, and scaling as your user base grows.",
  },
];

function Step({ s, i, progress }: { s: (typeof steps)[number]; i: number; progress: MotionValue<number> }) {
  const start = i / steps.length;
  const lit = useTransform(progress, [start - 0.08, start + 0.08], [0.28, 1]);
  const scale = useTransform(progress, [start - 0.08, start + 0.08], [0.85, 1]);
  return (
    <motion.li style={{ opacity: lit }} className="relative pl-14 md:pl-20">
      <motion.span
        style={{ scale }}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white md:h-12 md:w-12"
      >
        {s.step}
      </motion.span>
      <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight">{s.title}</h3>
      <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{s.description}</p>
    </motion.li>
  );
}

export default function Approach() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <section id="approach" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.02]">How we work</h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted">Three stages, with a working product to react to at each one.</p>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute bottom-6 left-5 top-5 w-px bg-ink/15 md:left-6">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-signal" />
          </div>
          <ol ref={ref} className="relative space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <Step key={s.step} s={s} i={i} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
