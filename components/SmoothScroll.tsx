"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Inertial smooth scrolling. Disabled automatically for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: { offset: -72 },
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
