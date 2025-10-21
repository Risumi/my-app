"use client";

import { Montserrat_Alternates, Raleway } from "next/font/google";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type InvitationShellProps = {
  overlayTitle: string;
  overlaySubtitle?: string;
  overlayDescription?: string;
  buttonLabel?: string;
  children: React.ReactNode;
};

const displayFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const overlayStarFieldStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(1px 1px at 25px 55px, rgba(240, 240, 245, 0.45) 0, transparent 55%), radial-gradient(1px 1px at 120px 180px, rgba(201, 169, 225, 0.35) 0, transparent 55%), radial-gradient(1px 1px at 210px 90px, rgba(233, 196, 106, 0.35) 0, transparent 55%)",
  backgroundSize: "240px 240px",
};

const overlayDistantStarsStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(2px 2px at 60px 220px, rgba(240, 240, 245, 0.22) 0, transparent 60%), radial-gradient(2px 2px at 280px 120px, rgba(201, 169, 225, 0.3) 0, transparent 60%), radial-gradient(2px 2px at 180px 260px, rgba(233, 196, 106, 0.25) 0, transparent 60%)",
  backgroundSize: "360px 360px",
};

type OverlayBlinkingStar = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  blurClass?: string;
};

const overlayBlinkingStars: OverlayBlinkingStar[] = [
  { left: "18%", top: "22%", size: "h-1.5 w-1.5", delay: "0s", duration: "4.2s", opacity: 0.92 },
  { left: "34%", top: "18%", size: "h-1 w-1", delay: "1.1s", duration: "5s", opacity: 0.78, blurClass: "blur-[0.5px]" },
  { left: "52%", top: "20%", size: "h-1.5 w-1.5", delay: "2.3s", duration: "4.6s", opacity: 0.88 },
  { left: "70%", top: "24%", size: "h-1 w-1", delay: "3.5s", duration: "5.4s", opacity: 0.7 },
  { left: "26%", top: "40%", size: "h-1.5 w-1.5", delay: "1.7s", duration: "3.9s", opacity: 0.9 },
  { left: "47%", top: "42%", size: "h-1 w-1", delay: "2.8s", duration: "4.8s", opacity: 0.76 },
  { left: "64%", top: "45%", size: "h-1.5 w-1.5", delay: "0.8s", duration: "5.1s", opacity: 0.84 },
  { left: "78%", top: "48%", size: "h-1 w-1", delay: "4.2s", duration: "5.6s", opacity: 0.68 },
  { left: "22%", top: "58%", size: "h-1.5 w-1.5", delay: "3.1s", duration: "4.5s", opacity: 0.86 },
  { left: "48%", top: "62%", size: "h-1 w-1", delay: "0.5s", duration: "4.1s", opacity: 0.74, blurClass: "blur-[0.5px]" },
  { left: "68%", top: "60%", size: "h-1.5 w-1.5", delay: "2.6s", duration: "5.2s", opacity: 0.82 },
  { left: "36%", top: "68%", size: "h-1.5 w-1.5", delay: "4.4s", duration: "5.8s", opacity: 0.8 },
  { left: "58%", top: "70%", size: "h-1 w-1", delay: "1.6s", duration: "4.3s", opacity: 0.72 },
];

export default function InvitationShell({
  overlayTitle,
  overlaySubtitle,
  overlayDescription,
  buttonLabel = "Buka Undangan",
  children,
}: InvitationShellProps) {
  const [hasOpened, setHasOpened] = useState(false);
  const [overlayState, setOverlayState] = useState<"visible" | "fading" | "hidden">("visible");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const originalOverflow = useRef<{ doc: string; body: string } | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/hateno.mp3");
    audio.preload = "auto";
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

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

  useEffect(() => {
    if (overlayState !== "fading") {
      return;
    }

    const timeoutId = window.setTimeout(() => setOverlayState("hidden"), 700);
    return () => window.clearTimeout(timeoutId);
  }, [overlayState]);

  const handleOpenInvitation = () => {
    setHasOpened(true);
    setOverlayState("fading");

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => undefined);
    }
  };

  return (
    <>
      {overlayState !== "hidden" && (
        <div
          className={`${bodyFont.className} fixed inset-0 z-50 flex items-center justify-center bg-[#05071a] px-6 py-16 text-center text-[#F0F0F5] transition-opacity duration-700 ease-out sm:py-20 ${
            overlayState === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,169,225,0.2),transparent_65%),radial-gradient(circle_at_85%_25%,rgba(75,63,114,0.45),transparent_65%),linear-gradient(180deg,#05071a_0%,#1A1B33_55%,#05071a_100%)]" />
              <div className="absolute inset-0 blur-3xl bg-[radial-gradient(circle_at_50%_-20%,rgba(233,196,106,0.28),transparent_65%)] opacity-70" />
              <div className="absolute inset-0 opacity-55" style={overlayStarFieldStyle} />
            <div className="absolute inset-0 opacity-35" style={overlayDistantStarsStyle} />
            <div className="absolute -left-28 bottom-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,169,225,0.35),transparent_70%)] blur-[140px]" />
            <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(233,196,106,0.3),transparent_70%)] blur-[150px]" />
            {overlayBlinkingStars.map((star, index) => (
              <div
                key={`overlay-blinking-star-${index}`}
                className={`pointer-events-none absolute rounded-full bg-[#F0F0F5] shadow-[0_0_10px_rgba(240,240,245,0.6)] ${star.size} ${star.blurClass ?? ""}`}
                style={{
                  left: star.left,
                  top: star.top,
                  opacity: star.opacity,
                  animation: `pulse ${star.duration} ease-in-out infinite`,
                  animationDelay: star.delay,
                }}
              />
            ))}
          </div>
          <div
            className={`relative mx-auto max-w-xl space-y-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_25px_120px_-45px_rgba(8,6,24,0.9)] backdrop-blur-2xl transition-all duration-700 ease-out sm:space-y-9 sm:p-12 ${
              overlayState === "fading" ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {overlaySubtitle ? (
              <p className={`${displayFont.className} text-xs uppercase tracking-[0.55em] text-[#E9C46A]/85 sm:text-sm`}>
                {overlaySubtitle}
              </p>
            ) : null}
            <h1
              className={`${displayFont.className} text-4xl font-semibold uppercase tracking-[0.4em] text-[#F0F0F5] sm:text-5xl lg:text-[3.5rem] lg:tracking-[0.45em]`}
            >
              {overlayTitle}
            </h1>
            {overlayDescription ? (
              <p className="text-sm leading-6 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-7">
                {overlayDescription}
              </p>
            ) : null}
            <div className="flex flex-col items-center gap-4">
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#E9C46A]/80 to-transparent" />
              <button
                type="button"
                onClick={handleOpenInvitation}
                className="inline-flex items-center justify-center rounded-full bg-[#E9C46A] px-12 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#1A1B33] transition hover:bg-[#f2d7a4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d21] sm:text-sm lg:text-base lg:px-14 lg:tracking-[0.4em]"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        aria-hidden={!hasOpened}
        className={`scrollbar-invisible ${bodyFont.className} relative h-screen overflow-y-auto scroll-smooth bg-[#05071a] text-[#F0F0F5] transition-colors duration-500 snap-y snap-mandatory transition-opacity duration-700 ${
          hasOpened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
