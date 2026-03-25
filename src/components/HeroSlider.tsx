"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  heading: string;
  subheading: string;
  description: string;
  phoneUrl: string;
  lineUrl: string;
  imageUrl: string;
  textAlign: "left" | "center" | "right";
  overlayOpacity: number;
  imageRatio?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoSlide?: boolean;
  intervalMs?: number;
}

export default function HeroSlider({ slides, autoSlide = true, intervalMs = 5000 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const total = slides.length;

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % total);
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total);
  }, [current, total, goTo]);

  useEffect(() => {
    if (!autoSlide || total <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [autoSlide, intervalMs, total, next]);

  if (total === 0) return null;

  const alignClass: Record<string, string> = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/*
        Mobile: fixed height — compact, no wasted space
        MD+: respect aspectRatio set in admin panel
      */}
      <style>{`
        .hero-slider-container { height: 340px; }
        @media (min-width: 640px) { .hero-slider-container { height: 400px; } }
        @media (min-width: 768px) {
          .hero-slider-container {
            height: auto;
            aspect-ratio: ${
              slides[0]?.imageRatio && slides[0].imageRatio !== "free"
                ? slides[0].imageRatio.replace(":", "/")
                : "16/9"
            };
            min-height: 400px;
          }
        }
      `}</style>
      <div className="hero-slider-container relative">
        {slides.map((slide, idx) => {
          const align = slide.textAlign || "center";
          const ov = Math.min(Math.max(slide.overlayOpacity ?? 50, 20), 90);

          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              {slide.imageUrl ? (
                <div className="absolute inset-0">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.heading || "Hero"}
                    fill
                    priority={idx === 0}
                    quality={85}
                    sizes="100vw"
                    className="object-cover"
                    unoptimized={slide.imageUrl.startsWith("/uploads/")}
                  />
                  {/* Overlay — uses actual overlayOpacity from data */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"
                    style={{ opacity: ov / 100 }}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-950 to-orange-900" />
              )}

              {/* Content — always bottom-aligned on mobile for clean look above image */}
              <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 md:px-10 pb-10 sm:pb-12 md:pb-16">
                <div className={`max-w-5xl w-full mx-auto flex flex-col ${alignClass[align]}`}>

                  {slide.heading && (
                    <h1 className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
                      {slide.heading}
                      {slide.subheading && (
                        <>
                          <br />
                          <span className="text-orange-400">{slide.subheading}</span>
                        </>
                      )}
                    </h1>
                  )}

                  {slide.description && (
                    <p className="text-[11px] sm:text-sm md:text-base text-white/60 mt-1.5 sm:mt-2 md:mt-3 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {slide.description}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  <div className={`flex flex-row gap-2 sm:gap-3 mt-3 sm:mt-5 w-full sm:w-auto ${align === "center" ? "sm:justify-center" : ""}`}>
                    {slide.phoneUrl && (
                      <Link
                        href={slide.phoneUrl}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-orange-500 hover:bg-orange-400 active:scale-[0.97] text-white font-bold text-[13px] sm:text-sm md:text-base h-10 sm:h-12 md:h-13 px-3 sm:px-6 md:px-7 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md shadow-orange-500/25"
                      >
                        <PhoneCall className="w-4 h-4 flex-shrink-0" />
                        โทรเรียกช่าง
                      </Link>
                    )}
                    {slide.lineUrl && (
                      <Link
                        href={slide.lineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#06C755] hover:bg-[#05b34b] active:scale-[0.97] text-white font-bold text-[13px] sm:text-sm md:text-base h-10 sm:h-12 md:h-13 px-3 sm:px-6 md:px-7 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md shadow-green-600/20"
                      >
                        <MessageCircle className="w-4 h-4 flex-shrink-0" />
                        แอดไลน์
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 top-1/3 sm:top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 top-1/3 sm:top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === current
                    ? "w-5 h-1.5 sm:w-7 sm:h-2 bg-orange-400"
                    : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
