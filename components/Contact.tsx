"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent" | "error";

const projectTypes = ["Mobile app", "E-commerce store", "Business software", "Web app", "Something else"];

const field =
  "peer w-full rounded-2xl border border-white/15 bg-white/5 px-4 pb-2.5 pt-6 text-white outline-none transition-colors placeholder-transparent focus:border-white focus:bg-white/10";
const label =
  "pointer-events-none absolute left-4 top-4 origin-left text-white/60 transition-all duration-200 peer-focus:top-2 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) return;

    // Honeypot: real visitors never see or fill this field.
    if (String(data.get("company") || "")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await addDoc(collection(db, "inquiries"), {
        name,
        email,
        projectType,
        message,
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      form.reset();
      setProjectType("");
    } catch (err) {
      console.error("Failed to save inquiry:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="on-dark rounded-t-[2.5rem] bg-ink py-24 text-white md:rounded-t-[4rem] md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1]">Start a project</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/70">
            Tell us what you&apos;re building. We&apos;ll reply within a couple of business days.
          </p>
          <ul className="mt-10 space-y-4 text-lg">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-white/80 transition-colors hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="text-white/60">{siteConfig.location}</li>
          </ul>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[26rem] flex-col items-start justify-center rounded-[2rem] bg-white/5 p-10 ring-1 ring-white/15"
              >
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
                  <circle cx="32" cy="32" r="30" stroke="#7A88FF" strokeWidth="2.5" />
                  <motion.path
                    d="M19 33l9 9 17-19"
                    stroke="#fff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  />
                </svg>
                <p className="mt-6 font-display text-3xl font-bold">Message sent</p>
                <p className="mt-2 max-w-sm text-white/70">Thanks. We&apos;ll reply by email within a couple of business days.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm font-semibold underline underline-offset-4">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <input id="c-name" name="name" type="text" required placeholder="Your name" autoComplete="name" className={field} />
                    <label htmlFor="c-name" className={label}>Your name</label>
                  </div>
                  <div className="relative">
                    <input id="c-email" name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
                    <label htmlFor="c-email" className={label}>Email</label>
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-3 text-sm text-white/60">What are you looking to build?</legend>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => {
                      const on = projectType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setProjectType(on ? "" : t)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${on ? "border-white bg-white text-ink" : "border-white/20 text-white/80 hover:border-white/60"}`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="relative">
                  <textarea id="c-message" name="message" required rows={5} placeholder="Tell us about it" className={`${field} resize-none`} />
                  <label htmlFor="c-message" className={label}>Tell us about it</label>
                </div>

                {/* Honeypot */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-white px-8 py-3.5 font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-signal-soft disabled:translate-y-0 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  {status === "error" && (
                    <p role="alert" className="text-sm text-[#FFB4A8]">
                      Your message didn&apos;t send. Please email {siteConfig.email} instead.
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
