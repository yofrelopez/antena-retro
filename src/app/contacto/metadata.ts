import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { radioConfig } from "@/lib/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Contacto - Comunícate con Nosotros",
  description: `Contáctate con ${radioConfig.name}. Envíanos tus comentarios, sugerencias o solicita información. Estamos ubicados en Lima, Perú y disponibles las 24 horas.`,
  keywords: [
    "contacto radio",
    "teléfono radio",
    "dirección radio",
    "email radio",
    "WhatsApp radio",
  ],
  url: `${radioConfig.seo.siteUrl}/contacto`,
  category: "Contacto",
  image: "/og-contacto.jpg",
});
