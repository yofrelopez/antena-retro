import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { NewsCard } from "@/components/noticias/NewsCard";
import { dummyNews } from "@/lib/dummy-data";

export function LatestNews() {
  // Mostrar solo las 3 últimas noticias
  const latestNews = dummyNews.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-2">
              Últimas Noticias
            </h2>
            <p className="text-lg text-gray-600">
              Mantente informado con las noticias más recientes
            </p>
          </div>

          <Link href="/noticias" className="hidden md:block">
            <Button variant="outline">Ver todas</Button>
          </Link>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* Mobile: See all button */}
        <div className="md:hidden text-center">
          <Link href="/noticias">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver todas las noticias
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
