// Constantes del proyecto

import type { DayOfWeek } from '@/types';

// Días de la semana en orden
export const DAYS_OF_WEEK: DayOfWeek[] = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
];

// Mapeo de días en español a nombres completos
export const DAY_NAMES: Record<DayOfWeek, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
};

// Categorías de noticias
export const NEWS_CATEGORIES = {
  local: 'Local',
  nacional: 'Nacional',
  internacional: 'Internacional',
  deportes: 'Deportes',
  entretenimiento: 'Entretenimiento',
  cultura: 'Cultura',
  tecnologia: 'Tecnología',
  otros: 'Otros',
} as const;
