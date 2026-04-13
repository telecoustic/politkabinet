"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateOnScroll({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Before hydration or if no JS: show content normally
  // After hydration: start hidden, animate on scroll
  const style = hasHydrated && !isVisible
    ? { opacity: 0, transform: "translateY(20px)" }
    : { opacity: 1, transform: "translateY(0)" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      {children}
    </div>
  );
}
