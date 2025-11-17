import Link from "next/link";
import Image from "next/image";
import type { News } from "@/types";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui";
import { NEWS_CATEGORIES } from "@/lib/constants";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/noticias/${news.slug}`}>
      <Card hover className="h-full overflow-hidden transition-transform hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {news.category && (
            <span className="absolute top-3 right-3 bg-[var(--color-primary)] text-white text-xs font-medium px-3 py-1 rounded-full">
              {NEWS_CATEGORIES[news.category]}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-2 line-clamp-2 hover:text-[var(--color-primary)] transition-colors">
            {news.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {news.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{news.author}</span>
            <span>{formatDate(news.publishedAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
