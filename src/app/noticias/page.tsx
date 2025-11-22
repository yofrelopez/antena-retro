import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { NewsList } from "@/components/noticias/NewsList";
import { dummyNews } from "@/lib/dummy-data";
import { generatePageMetadata } from "@/lib/metadata";
import { radioConfig } from "@/lib/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Noticias - Últimas Noticias de Lima y Perú",
  description: "Mantente informado con las últimas noticias de Lima y Perú. Cobertura local, nacional e internacional actualizada las 24 horas en Antena Retro.",
  keywords: [
    "noticias Perú",
    "noticias Lima",
    "actualidad Perú",
    "noticias de hoy",
    "última hora Perú",
  ],
  url: `${radioConfig.seo.siteUrl}/noticias`,
  category: "Noticias",
  image: "/og-noticias.jpg",
});

export default function NoticiasPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-secondary)] mb-4">
            Noticias
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Las últimas noticias, eventos y novedades de la ciudad y el mundo.
          </p>
        </div>

        {/* News list */}
        <NewsList news={dummyNews} />
      </Container>
    </div>
  );
}
