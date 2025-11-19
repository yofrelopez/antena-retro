"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container, Button } from "@/components/ui";
import { heroSlides } from "@/lib/dummy-data";

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="embla__slide flex-[0_0_100%] relative">
              {/* Background Image */}
              <div className="relative h-[50vh] md:h-[600px] lg:h-[700px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === "1"}
                  sizes="100vw"
                />

                {/* Overlay - solo en desktop */}
                {slide.overlay && (
                  <div className="hidden md:block absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
                )}
                
                {/* Content overlay for desktop */}
                <div className="hidden md:flex absolute inset-0 items-center">
                  <Container>
                    <div className="max-w-2xl text-white">
                      {/* Subtitle */}
                      {slide.subtitle && (
                        <p className="text-lg lg:text-xl font-medium mb-2 text-accent">
                          {slide.subtitle}
                        </p>
                      )}

                      {/* Title */}
                      <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      {slide.description && (
                        <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-xl">
                          {slide.description}
                        </p>
                      )}

                      {/* CTA Buttons */}
                      <div className="flex flex-row gap-4">
                        {slide.ctaPrimary && (
                          <Link href={slide.ctaPrimary.href}>
                            <Button
                              size="md"
                              className="w-auto min-w-[180px] whitespace-nowrap"
                            >
                              {slide.ctaPrimary.text}
                            </Button>
                          </Link>
                        )}

                        {slide.ctaSecondary && (
                          <Link href={slide.ctaSecondary.href}>
                            <Button
                              size="md"
                              variant="secondary"
                              className="w-auto min-w-[180px] whitespace-nowrap"
                            >
                              {slide.ctaSecondary.text}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Container>
                </div>
                
                {/* Content overlay for mobile - bottom */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                  <div className="text-white">
                    {/* Subtitle */}
                    {slide.subtitle && (
                      <p className="text-xs font-medium mb-1 text-accent uppercase tracking-wide">
                        {slide.subtitle}
                      </p>
                    )}

                    {/* Title */}
                    <h1 className="text-xl font-bold mb-2 leading-tight">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    {slide.description && (
                      <p className="text-sm mb-3 opacity-90">
                        {slide.description}
                      </p>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-row gap-2">
                      {slide.ctaPrimary && (
                        <Link href={slide.ctaPrimary.href}>
                          <Button
                            size="sm"
                            className="whitespace-nowrap text-xs"
                          >
                            {slide.ctaPrimary.text}
                          </Button>
                        </Link>
                      )}
                      
                      {slide.ctaSecondary && (
                        <Link href={slide.ctaSecondary.href}>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="whitespace-nowrap text-xs"
                          >
                            {slide.ctaSecondary.text}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label="Slide anterior"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label="Siguiente slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Live indicator */}
      <div className="hidden md:inline-flex absolute top-6 right-6 z-10 items-center gap-2 bg-red-600/90 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-white">
          EN VIVO
        </span>
      </div>
    </section>
  );
}
