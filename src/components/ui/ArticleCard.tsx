"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { ModernCard } from "./ModernCard";
import { formatDate } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";
import type { News } from "@/types";

interface ArticleCardProps {
  news: News;
}

export function ArticleCard({ news }: ArticleCardProps) {
  return (
    <ModernCard href={`/noticias/${news.slug}`} className="h-full">
      {/* Article Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        {news.category && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
              {NEWS_CATEGORIES[news.category]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4 flex flex-col h-[calc(100%-13rem)]">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {news.excerpt}
        </p>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/30">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-semibold text-primary">
              {news.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-secondary">
              {news.author}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-light">{formatDate(news.publishedAt)}</span>
          </div>
        </div>
      </div>
    </ModernCard>
  );
}
