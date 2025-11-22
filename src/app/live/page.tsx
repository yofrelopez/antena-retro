import type { Metadata } from "next";
import { LiveDashboard } from "@/components/live/LiveDashboard";
import { generatePageMetadata } from "@/lib/metadata";
import { radioConfig } from "@/lib/config";

export const metadata: Metadata = generatePageMetadata({
  title: `En Vivo - ${radioConfig.name}`,
  description: `Escucha ${radioConfig.name} en vivo las 24 horas. Música, noticias y entretenimiento desde Lima, Perú. Stream de alta calidad con visualización de audio en tiempo real.`,
  keywords: [
    "radio en vivo",
    "streaming en vivo",
    "radio online Perú",
    "música en vivo",
    "radio Lima",
    "escuchar radio online",
  ],
  url: `${radioConfig.seo.siteUrl}/live`,
  category: "Radio en Vivo",
  image: "/og-live.jpg",
});

export default function LivePage() {
  return <LiveDashboard />;
}
