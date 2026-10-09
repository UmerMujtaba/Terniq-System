"use client";

import { useRef, type PointerEvent } from "react";
import { expertiseAreas } from "@/lib/data";

// Bento spans on a 6-col grid (md+). The first cell is the anchor and gets the dark treatment.
const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4", "md:col-span-3", "md:col-span-3"];

function Cell({ children, className, dark }: { children: React.ReactNode; className: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className={`group relative overflow-hidden ${dark ? "bg-ink text-white" : "bg-white"} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${dark ? "rgba(122,136,255,0.28)" : "rgba(47,63,224,0.09)"}, transparent 70%)`,
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" className="bg-signal-soft/60 py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <h2 className="max-w-xl font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.02]">What we&apos;re good at</h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          {expertiseAreas.map((area, i) => {
            const dark = i === 0;
            return (
              <Cell
                key={area.title}
                dark={dark}
                className={`${spans[i]} p-7 md:p-8 ${i === 0 ? "rounded-[2rem] md:min-h-[17rem]" : "rounded-3xl"}`}
              >
                <h3 className={`font-display font-bold leading-tight ${dark ? "text-[clamp(1.8rem,3vw,2.6rem)]" : "text-[1.45rem]"}`}>
                  {area.title}
                </h3>
                <p className={`mt-3 max-w-md leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{area.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {area.tools.map((t) => (
                    <li
                      key={t}
                      className={`rounded-full px-3 py-1 text-[0.8rem] font-medium ${dark ? "bg-white/10 text-white/90" : "bg-signal-soft text-signal-deep"}`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Cell>
            );
          })}
        </div>
      </div>
    </section>
  );
}
