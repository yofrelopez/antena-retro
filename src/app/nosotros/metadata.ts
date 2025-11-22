import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { radioConfig } from "@/lib/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Nosotros - Nuestra Historia y Misión",
  description: `Conoce la historia de ${radioConfig.name}, tu radio en Lima, Perú. Más de 15 años conectando con nuestra audiencia a través de música excepcional y contenido de calidad.`,
  keywords: [
    "sobre nosotros",
    "historia radio",
    "misión radio",
    "valores radio",
    "equipo radio",
  ],
  url: `${radioConfig.seo.siteUrl}/nosotros`,
  category: "Institucional",
  image: "/og-nosotros.jpg",
});
