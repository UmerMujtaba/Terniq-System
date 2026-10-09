"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { otherProjects, projectTypes, type ProjectType } from "@/lib/data";

type Filter = "All" | ProjectType;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function MoreWork() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(otherProjects[0]?.id ?? null);

  const filters: Filter[] = ["All", ...projectTypes.filter((t) => otherProjects.some((p) => p.type === t))];
  const list = otherProjects.filter((p) => filter === "All" || p.type === filter);

  return (
    <section id="more-work" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.02]">More we&apos;ve built</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
              Mobile apps, storefronts, and internal systems across health, media, education, and retail.
            </p>
          </div>

          <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:px-0">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className="relative flex-none rounded-full px-4 py-2 text-sm font-semibold"
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={`relative transition-colors ${filter === f ? "text-white" : "text-ink/65 hover:text-ink"}`}>{f}</span>
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-12 border-t border-ink/15">
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((p) => {
                const open = openId === p.id;
                return (
                  <motion.li
                    key={p.id}
                    layout={reduce ? false : "position"}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="border-b border-ink/15"
                  >
                    <h3 className="font-body text-base font-normal tracking-normal [font-stretch:100%]">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`more-${p.id}`}
                        onClick={() => setOpenId(open ? null : p.id)}
                        className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 text-left md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_2.25rem]"
                      >
                        <span className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-tight tracking-tight transition-transform duration-500 ease-smooth group-hover:translate-x-2">
                          {p.name}
                        </span>
                        <span className="col-start-1 text-sm text-muted md:col-start-auto md:text-base">{p.industry}</span>
                        <span className="col-start-1 text-sm text-muted md:col-start-auto md:text-base">{p.type}</span>
                        <span
                          aria-hidden
                          className={`col-start-2 row-span-3 row-start-1 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 md:col-start-auto md:row-span-1 md:row-start-auto ${open ? "rotate-45 bg-ink text-white" : "group-hover:bg-ink/5"}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`more-${p.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-6 pb-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_2.25rem] md:gap-x-6">
                            <p className="text-sm text-muted">
                              {p.stack.join(", ")}
                              {p.status ? <span className="mt-2 block font-semibold text-ink">{p.status}</span> : null}
                            </p>
                            <div className="md:col-span-2">
                              <p className="max-w-xl leading-relaxed text-ink/80">{p.description}</p>
                              <ul className="mt-3 space-y-2">
                                {p.bullets.map((b) => (
                                  <li key={b} className="flex gap-3 text-muted">
                                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-signal" />
                                    <span className="max-w-xl leading-relaxed">{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
