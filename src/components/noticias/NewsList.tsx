import type { News } from "@/types";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  news: News[];
}

export function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No hay noticias disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
