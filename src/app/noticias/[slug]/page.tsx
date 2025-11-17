import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { dummyNews } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = dummyNews.find((n) => n.slug === slug);

  if (!news) {
    return {
      title: "Noticia no encontrada",
    };
  }

  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: [news.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return dummyNews.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = dummyNews.find((n) => n.slug === slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="py-16 md:py-24">
      <Container size="narrow">
        {/* Back button */}
        <Link href="/noticias" className="inline-block mb-8">
          <Button variant="ghost" size="sm">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a noticias
          </Button>
        </Link>

        {/* Category */}
        {news.category && (
          <div className="mb-4">
            <span className="inline-block bg-[var(--color-primary)] text-white text-sm font-medium px-4 py-1 rounded-full">
              {NEWS_CATEGORIES[news.category]}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-secondary)] mb-4">
          {news.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
          <span className="font-medium">{news.author}</span>
          <span>•</span>
          <time dateTime={news.publishedAt}>{formatDate(news.publishedAt)}</time>
        </div>

        {/* Featured image */}
        <div className="relative h-[400px] md:h-[500px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Excerpt */}
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          {news.excerpt}
        </p>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Etiquetas:
            </h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share buttons (placeholder) */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Compartir:
          </h3>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Facebook
            </Button>
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
