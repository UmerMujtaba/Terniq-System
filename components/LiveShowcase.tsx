"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { featuredProjects, type Project } from "@/lib/data";

type Mode = "desktop" | "mobile";
const EASE = [0.22, 1, 0.36, 1] as const;

function host(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Renders a real site at a fixed virtual width, then scales it to fit the frame. */
function ScaledFrame({ project, mode, active }: { project: Project; mode: Mode; active: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const vw = mode === "mobile" ? 390 : w < 560 ? 390 : w < 900 ? 900 : 1280;
  const scale = w && h ? (mode === "mobile" ? Math.min(h / 800, w / vw) : w / vw) : 1;
  const boxW = vw * scale;

  return (
    <div ref={wrap} className="absolute inset-0 flex items-start justify-center" hidden={!active}>
      {w > 0 && (
        <div
          className="relative h-full overflow-hidden bg-white transition-[width,border-radius,box-shadow] duration-500 ease-smooth"
          style={{
            width: boxW,
            borderRadius: mode === "mobile" ? 22 : 0,
            boxShadow: mode === "mobile" ? "0 0 0 6px #131737" : "none",
          }}
        >
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="absolute left-0 top-0 origin-top-left border-0 bg-white transition-[width,height,transform] duration-500 ease-smooth"
            style={{ width: vw, height: h / scale, transform: `scale(${scale})` }}
          />
        </div>
      )}
    </div>
  );
}

export default function LiveShowcase() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(featuredProjects[0].id);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<Mode>("desktop");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const active = featuredProjects.find((p) => p.id === activeId) ?? featuredProjects[0];
  const isLoaded = loaded.has(active.id);

  const load = useCallback((id: string) => setLoaded((s) => new Set(s).add(id)), []);

  // Hero cards can pre-select a project.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (featuredProjects.some((p) => p.id === id)) setActiveId(id);
    };
    window.addEventListener("select-project", handler);
    return () => window.removeEventListener("select-project", handler);
  }, []);

  function onKey(e: KeyboardEvent, i: number) {
    const n = featuredProjects.length;
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else return;
    e.preventDefault();
    const id = featuredProjects[next].id;
    setActiveId(id);
    tabRefs.current[id]?.focus();
  }

  return (
    <motion.section
      id="work"
      animate={{ backgroundColor: active.tint }}
      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <h2 className="max-w-2xl text-balance font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.02]">
          Four products, live right now.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">
          Pick one, load the preview, and click around. These are the real, deployed sites.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[21rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0">
          {/* Chooser */}
          <div className="lg:col-start-1 lg:row-start-1">
            <div
              role="tablist"
              aria-label="Live products"
              aria-orientation="vertical"
              className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
            >
              {featuredProjects.map((p, i) => {
                const on = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[p.id] = el;
                    }}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={on}
                    aria-controls="showcase-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActiveId(p.id)}
                    onKeyDown={(e) => onKey(e, i)}
                    className="relative flex-none rounded-2xl px-4 py-3 text-left lg:flex-auto"
                  >
                    {on && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-2xl bg-white shadow-[0_10px_30px_-14px_rgba(19,23,55,0.35)]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative flex items-center gap-3">
                      <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ backgroundColor: p.accent }} />
                      <span>
                        <span className={`block whitespace-nowrap font-display text-lg font-semibold leading-tight ${on ? "text-ink" : "text-ink/65"}`}>
                          {p.name}
                        </span>
                        <span className="hidden text-sm text-ink/55 lg:block">{p.industry}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details: after the frame on mobile, under the chooser on desktop */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 lg:order-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-8"
              >
                <p className="leading-relaxed text-ink/80">{active.description}</p>
                <ul className="mt-5 space-y-3">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/70">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: active.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink/60">{active.stack.join(", ")}</p>
                <a
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open {host(active.url!)}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M4 10l6-6M5 4h5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Browser frame */}
          <div
            id="showcase-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="order-2 overflow-hidden rounded-[1.6rem] border border-ink/10 bg-white shadow-[0_40px_80px_-40px_rgba(19,23,55,0.5)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:order-none"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 bg-paper px-4 py-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm text-ink/70 ring-1 ring-ink/10">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="flex-none">
                  <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                <span className="truncate">{host(active.url!)}</span>
              </div>
              <div role="group" aria-label="Preview size" className="flex rounded-full bg-white p-1 ring-1 ring-ink/10">
                {(["desktop", "mobile"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={mode === m}
                    onClick={() => setMode(m)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${mode === m ? "bg-ink text-white" : "text-ink/60 hover:text-ink"}`}
                  >
                    {m === "desktop" ? "Desktop" : "Phone"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[min(68vh,40rem)] min-h-[26rem] bg-white">
              {featuredProjects.map((p) =>
                loaded.has(p.id) ? <ScaledFrame key={p.id} project={p} mode={mode} active={p.id === activeId} /> : null
              )}

              <AnimatePresence>
                {!isLoaded && (
                  <motion.div
                    key={`poster-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
                    style={{ backgroundColor: active.tint }}
                  >
                    <p className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-none tracking-tight">{active.name}</p>
                    <p className="max-w-xs text-sm text-ink/65">{active.industry}</p>
                    <button
                      type="button"
                      onClick={() => load(active.id)}
                      className="rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-transform duration-300 hover:scale-105"
                    >
                      Load live preview
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-ink/60 lg:pl-[23rem]">
          If a preview stays blank, the site has blocked embedding. Use &ldquo;Open&rdquo; to view it in a new tab.
        </p>
      </div>
    </motion.section>
  );
}
