// Funciones utilitarias

/**
 * Genera un slug a partir de un texto
 * Ejemplo: "Hola Mundo!" -> "hola-mundo"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
    .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-'); // Múltiples guiones a uno solo
}

/**
 * Formatea una fecha ISO a formato legible en español
 * Ejemplo: "2024-01-15" -> "15 de enero de 2024"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formatea una hora de 24h a formato legible
 * Ejemplo: "14:30" -> "2:30 PM"
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat('es-ES', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Trunca un texto a una longitud máxima y agrega "..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Combina clases de CSS (útil con Tailwind)
 * Acepta strings, arrays, objetos y valores falsy
 */
export function cn(
  ...inputs: (
    | string
    | undefined
    | null
    | false
    | Record<string, boolean | undefined | null>
    | (string | undefined | null | false)[]
  )[]
): string {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (!input) return;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });

  return classes.join(' ');
}
