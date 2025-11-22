import type { Metadata } from "next";
import { HeroSection, ProgramShowcase, NewsHighlights } from "@/components/home";
import { generatePageMetadata } from "@/lib/metadata";
import { radioConfig } from "@/lib/config";

export const metadata: Metadata = generatePageMetadata({
  title: `${radioConfig.name} - ${radioConfig.tagline}`,
  description: `${radioConfig.description}. Escucha música retro, noticias y programas en vivo desde Lima, Perú. Radio online 24/7 con la mejor programación.`,
  keywords: [
    "radio online",
    "radio en vivo",
    "música retro",
    "radio Perú",
    "radio Lima",
    "streaming radio",
    "radio 24/7",
  ],
  url: radioConfig.seo.siteUrl,
  category: "Radio Online",
  image: "/og-default.jpg",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProgramShowcase />
      <NewsHighlights />
    </>
  );
}
