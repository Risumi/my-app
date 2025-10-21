"use client";

import { useEffect, useRef, useState } from "react";

type InvitationShellProps = {
  overlayTitle: string;
  overlaySubtitle?: string;
  overlayDescription?: string;
  buttonLabel?: string;
  children: React.ReactNode;
};

const OVERLAY_BG = "bg-gradient-to-br from-[#04111c]/95 via-[#0a2c3f] to-[#04111c]";
const SCROLL_BG = "bg-gradient-to-b from-[#020a10] via-[#062232]/90 to-[#020a10]";

export default function InvitationShell({
  overlayTitle,
  overlaySubtitle,
  overlayDescription,
  buttonLabel = "Buka Undangan",
  children,
}: InvitationShellProps) {
  const [hasOpened, setHasOpened] = useState(false);
  const originalOverflow = useRef<{ doc: string; body: string } | null>(null);

  useEffect(() => {
    if (!originalOverflow.current) {
      originalOverflow.current = {
        doc: document.documentElement.style.overflow,
        body: document.body.style.overflow,
      };
    }

    if (!hasOpened) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else if (originalOverflow.current) {
      document.documentElement.style.overflow = originalOverflow.current.doc;
      document.body.style.overflow = originalOverflow.current.body;
    }

    return () => {
      if (originalOverflow.current) {
        document.documentElement.style.overflow = originalOverflow.current.doc;
        document.body.style.overflow = originalOverflow.current.body;
      }
    };
  }, [hasOpened]);

  return (
    <>
      {!hasOpened && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-6 text-center text-[#e9e3c8] ${OVERLAY_BG}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 top-1/3 h-64 w-64 rotate-12 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -top-40 right-[-6rem] h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />
            <div className="absolute inset-0 opacity-30">
              <svg className="h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
                <defs>
                  <pattern id="botw-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M0 0h80v80H0z" fill="none" />
                    <path d="M40 0v80M0 40h80" stroke="#1b4a60" strokeWidth="0.5" />
                    <path d="M40 8l24 32-24 32-24-32z" stroke="#1b4a60" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#botw-grid)" />
              </svg>
            </div>
          </div>
          <div className="relative mx-auto max-w-xl space-y-8 rounded-[2.5rem] border border-teal-400/20 bg-[#031520]/80 p-10 shadow-[0_20px_70px_rgba(7,36,52,0.45)] backdrop-blur">
            {overlaySubtitle ? (
              <p className="text-xs uppercase tracking-[0.3em] text-teal-200/80">{overlaySubtitle}</p>
            ) : null}
            <h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-[#f4e5b5] drop-shadow-[0_4px_12px_rgba(8,30,43,0.45)] sm:text-5xl">
              {overlayTitle}
            </h1>
            {overlayDescription ? (
              <p className="text-sm text-teal-100/80">{overlayDescription}</p>
            ) : null}
            <button
              type="button"
              onClick={() => setHasOpened(true)}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#f4e5b5]/70 bg-[#d8b471] px-10 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#031520] transition hover:border-[#f7f0cd] hover:bg-[#f7f0cd] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4e5b5]/60"
            >
              <span aria-hidden="true" className="text-base text-[#041726]">▲</span>
              {buttonLabel}
            </button>
          </div>
        </div>
      )}

      <div
        aria-hidden={!hasOpened}
        className={`scrollbar-invisible relative h-screen overflow-y-auto scroll-smooth ${SCROLL_BG} text-[#e0dac5] transition-colors duration-500 snap-y snap-mandatory transition-opacity duration-700 ${
          hasOpened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}

