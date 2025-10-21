"use client";

import { useEffect, useState } from "react";
import type { ReactNode, MouseEvent } from "react";

type Section = {
  id: string;
  label: string;
  icon?: ReactNode;
};

type FloatingNavProps = {
  sections: Section[];
};

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }

        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: Array.from({ length: 11 }, (_, index) => index / 10),
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 sm:bottom-10"
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-[#2f7f88]/40 bg-[#041b27]/85 px-2 py-1.5 shadow-[0_16px_45px_rgba(3,19,28,0.45)] backdrop-blur sm:gap-2 sm:px-3 sm:py-2">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          const icon = section.icon ?? "\u2022";

          const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            const target = document.getElementById(section.id);
            if (!target) {
              return;
            }
            target.scrollIntoView({ behavior: "smooth", block: "start" });

            const pulse = event.currentTarget.animate(
              [
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(0.9)", opacity: 0.8 },
                { transform: "scale(1)", opacity: 1 },
              ],
              {
                duration: 250,
                easing: "ease-out",
              },
            );
            pulse.addEventListener("finish", () => pulse.cancel());
          };

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              onClick={handleClick}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-base transition sm:h-10 sm:w-10 sm:text-lg ${
                isActive
                  ? "border-[#f0e2b6]/60 bg-[#d3b06a] text-[#041520] shadow-[0_0_18px_rgba(241,223,176,0.6)]"
                  : "text-teal-200/70 hover:border-teal-300/40 hover:bg-teal-200/10"
              }`}
            >
              <span aria-hidden="true" className="flex items-center justify-center">
                {icon}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
