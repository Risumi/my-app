"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type WeddingGalleryProps = {
  images: GalleryImage[];
};

type ExtendedImage = GalleryImage & {
  originalIndex: number;
  virtualIndex: number;
};

const THUMB_WIDTH = 120;
const THUMB_GAP = 12;
const ITEM_TOTAL = THUMB_WIDTH + THUMB_GAP;
const DUPLICATES = 3;

export default function WeddingGallery({ images }: WeddingGalleryProps) {
  const totalImages = images.length;

  const extendedImages = useMemo<ExtendedImage[]>(() => {
    if (totalImages === 0) {
      return [];
    }

    const total = totalImages * DUPLICATES;
    return Array.from({ length: total }, (_, index) => {
      const originalIndex = index % totalImages;
      return {
        ...images[originalIndex],
        originalIndex,
        virtualIndex: index,
      };
    });
  }, [images, totalImages]);

  const minVirtualIndex = totalImages;
  const maxVirtualIndex = totalImages * 2 - 1;
  const carouselWidth = totalImages * ITEM_TOTAL;

  const [virtualIndex, setVirtualIndex] = useState(() =>
    totalImages > 0 ? totalImages : 0,
  );
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const instantScrollRef = useRef(false);

  useEffect(() => {
    if (totalImages > 0) {
      setVirtualIndex(totalImages);
      instantScrollRef.current = true;
    }
  }, [totalImages]);

  if (totalImages === 0) {
    return null;
  }

  const normalizedIndex = ((virtualIndex % totalImages) + totalImages) % totalImages;
  const activeImage = images[normalizedIndex];

  const clearInteractionTimeout = useCallback(() => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  }, []);

  const markInteracting = useCallback(() => {
    setIsInteracting(true);
    clearInteractionTimeout();
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      interactionTimeoutRef.current = null;
    }, 3000);
  }, [clearInteractionTimeout]);

  useEffect(() => () => clearInteractionTimeout(), [clearInteractionTimeout]);

  useEffect(() => {
    if (totalImages <= 1 || isInteracting) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [virtualIndex, totalImages, isInteracting]);

  useEffect(() => {
    const container = viewportRef.current;
    if (!container) {
      return;
    }

    if (virtualIndex > maxVirtualIndex) {
      instantScrollRef.current = true;
      container.scrollLeft -= carouselWidth;
      setVirtualIndex((prev) => prev - totalImages);
    } else if (virtualIndex < minVirtualIndex) {
      instantScrollRef.current = true;
      container.scrollLeft += carouselWidth;
      setVirtualIndex((prev) => prev + totalImages);
    }
  }, [virtualIndex, minVirtualIndex, maxVirtualIndex, carouselWidth, totalImages]);

  useEffect(() => {
    const container = viewportRef.current;
    if (!container) {
      return;
    }

    const targetScrollLeft = Math.max(
      0,
      virtualIndex * ITEM_TOTAL - (container.clientWidth - THUMB_WIDTH) / 2,
    );

    container.scrollTo({
      left: targetScrollLeft,
      behavior: instantScrollRef.current ? "auto" : "smooth",
    });

    instantScrollRef.current = false;
  }, [virtualIndex, minVirtualIndex]);

  const scrollThumbnails = useCallback(
    (direction: "prev" | "next") => {
      markInteracting();
      setVirtualIndex((prev) => prev + (direction === "prev" ? -1 : 1));
    },
    [markInteracting],
  );

  const handleThumbnailClick = useCallback(
    (originalIndex: number) => {
      markInteracting();
      instantScrollRef.current = false;
      setVirtualIndex(minVirtualIndex + originalIndex);
    },
    [markInteracting, minVirtualIndex],
  );

  return (
    <div
      className="flex w-full flex-col gap-10"
      onMouseEnter={markInteracting}
      onMouseLeave={() => {
        clearInteractionTimeout();
        setIsInteracting(false);
      }}
      onFocusCapture={markInteracting}
      onBlurCapture={markInteracting}
    >
      <div className="relative overflow-hidden rounded-[2.75rem] border border-white/12 bg-gradient-to-br from-[#1A1B33]/85 via-[#1A1B33]/60 to-[#4B3F72]/70 p-5 shadow-[0_25px_90px_-40px_rgba(8,6,24,0.9)] backdrop-blur">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#12132b] shadow-[inset_0_0_25px_rgba(10,8,30,0.65)]">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-cover transition-transform duration-500 ease-out"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#0b0d21]/70 via-transparent to-transparent" />
        </div>
        <div className="mt-6 flex flex-col gap-2 px-2 pb-2 text-[#F0F0F5]">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#E9C46A]/85 sm:text-sm">
            {activeImage.title}
          </p>
          <p className="text-sm leading-6 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-7">
            {activeImage.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[#F0F0F5]/70">
        <span className="text-xs uppercase tracking-[0.4em] sm:text-sm">
          Pilih Momen
        </span>
        <span className="text-xs sm:text-sm">
          {String(normalizedIndex + 1).padStart(2, "0")}/{String(totalImages).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => scrollThumbnails("prev")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F0F0F5]/80 shadow-[0_12px_35px_-20px_rgba(8,6,24,0.9)] transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d21] disabled:cursor-not-allowed disabled:border-white/5 disabled:text-[#F0F0F5]/30"
          disabled={totalImages <= 1}
          aria-label="Foto sebelumnya"
        >
          <ThumbArrow direction="prev" />
        </button>

        <div
          ref={viewportRef}
          className="scrollbar-invisible grid grid-flow-col auto-cols-[120px] gap-3 overflow-x-auto"
        >
          {extendedImages.map((image) => {
            const isActive = image.virtualIndex === virtualIndex;
            return (
              <button
                key={`${image.src}-${image.virtualIndex}`}
                type="button"
                onClick={() => handleThumbnailClick(image.originalIndex)}
                className={`group relative flex-shrink-0 overflow-hidden rounded-2xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d21] ${
                  isActive
                    ? "border-[#E9C46A]/80 shadow-[0_18px_45px_-28px_rgba(233,196,106,0.55)]"
                    : "border-white/15 hover:border-[#E9C46A]/50"
                }`}
                style={{ width: `${THUMB_WIDTH}px`, height: "160px" }}
                aria-label={`Tampilkan foto ${image.title}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover transition duration-300 ${
                    isActive ? "scale-100" : "scale-105 group-hover:scale-100"
                  }`}
                  sizes="120px"
                />
                <span
                  className={`absolute inset-0 border-2 transition ${
                    isActive ? "border-[#E9C46A]/80 mix-blend-screen" : "border-transparent"
                  }`}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0d21]/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollThumbnails("next")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F0F0F5]/80 shadow-[0_12px_35px_-20px_rgba(8,6,24,0.9)] transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d21] disabled:cursor-not-allowed disabled:border-white/5 disabled:text-[#F0F0F5]/30"
          disabled={totalImages <= 1}
          aria-label="Foto selanjutnya"
        >
          <ThumbArrow direction="next" />
        </button>
      </div>
    </div>
  );
}

function ThumbArrow({ direction }: { direction: "prev" | "next" }) {
  const rotate = direction === "prev" ? "rotate-180" : "";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-4 w-4 ${rotate}`}
    >
      <path d="M8 5l8 7-8 7" />
    </svg>
  );
}


