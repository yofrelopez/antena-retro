// Tipos relacionados con contenido (noticias, artículos)

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string; // ISO date string
  category?: NewsCategory;
  tags?: string[];
}

export type NewsCategory =
  | 'local'
  | 'nacional'
  | 'internacional'
  | 'deportes'
  | 'entretenimiento'
  | 'cultura'
  | 'tecnologia'
  | 'otros';
