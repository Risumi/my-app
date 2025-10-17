"use client";

import { useEffect, useRef, useState } from "react";

type InvitationShellProps = {
  overlayTitle: string;
  overlaySubtitle?: string;
  overlayDescription?: string;
  buttonLabel?: string;
  children: React.ReactNode;
};

const OVERLAY_BG = "bg-gradient-to-b from-white via-gray-100 to-white";

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
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${OVERLAY_BG} px-6 text-center`}>
          <div className="mx-auto max-w-xl space-y-8">
            {overlaySubtitle ? (
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{overlaySubtitle}</p>
            ) : null}
            <h1 className="text-4xl font-semibold uppercase tracking-[0.35em] text-gray-900 sm:text-5xl">
              {overlayTitle}
            </h1>
            {overlayDescription ? (
              <p className="text-sm text-gray-600">{overlayDescription}</p>
            ) : null}
            <button
              type="button"
              onClick={() => setHasOpened(true)}
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-10 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      )}

      <div
        aria-hidden={!hasOpened}
        className={`scrollbar-invisible relative h-screen overflow-y-auto scroll-smooth bg-gradient-to-b from-white via-gray-100/40 to-white text-gray-900 transition-colors duration-500 snap-y snap-mandatory transition-opacity duration-700 ${
          hasOpened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}

