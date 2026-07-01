"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view (default). Used to drive CSS
 * reveals and to gate animated mockup loops so nothing animates off-screen.
 * Falls back to visible immediately if IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  amount?: number;
  rootMargin?: string;
}) {
  const { once = true, amount = 0.2, rootMargin = "0px 0px -10% 0px" } =
    options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, amount, rootMargin]);

  return { ref, inView };
}
