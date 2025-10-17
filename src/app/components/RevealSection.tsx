"use client";

import { useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

type RevealSectionProps = PropsWithChildren<{
  id: string;
  className?: string;
}>;

export default function RevealSection({ id, className = "", children }: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === element) {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else if (entry.boundingClientRect.top > 0) {
              // Reset when scrolling back above for snappier repeat animation
              setIsVisible(false);
            }
          }
        });
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0.15, 0.35, 0.75],
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      data-visible={isVisible}
      className={`snap-start opacity-0 translate-y-6 transition-all duration-500 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 ${className}`}
    >
      {children}
    </section>
  );
}

