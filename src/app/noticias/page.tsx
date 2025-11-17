import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { NewsList } from "@/components/noticias/NewsList";
import { dummyNews } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Mantente informado con las últimas noticias y novedades.",
};

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
