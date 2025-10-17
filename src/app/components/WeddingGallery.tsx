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
      className="flex w-full flex-col gap-8"
      onMouseEnter={markInteracting}
      onMouseLeave={() => {
        clearInteractionTimeout();
        setIsInteracting(false);
      }}
      onFocusCapture={markInteracting}
      onBlurCapture={markInteracting}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-300 bg-white/40 p-4 shadow-lg backdrop-blur">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-200">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-cover transition-transform duration-500 ease-out"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
          />
        </div>
        <div className="mt-6 flex flex-col gap-2 px-2 pb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
            {activeImage.title}
          </p>
          <p className="text-sm leading-6 text-gray-600">{activeImage.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Pilih Momen
        </span>
        <span className="text-xs text-gray-400">
          {String(normalizedIndex + 1).padStart(2, "0")}/{String(totalImages).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => scrollThumbnails("prev")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-gray-700 shadow transition hover:border-gray-400 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
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
                className={`group relative flex-shrink-0 overflow-hidden rounded-2xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${
                  isActive
                    ? "border-gray-900"
                    : "border-gray-200 hover:border-gray-400"
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
                    isActive ? "border-gray-900 mix-blend-screen" : "border-transparent"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollThumbnails("next")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-gray-700 shadow transition hover:border-gray-400 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
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
