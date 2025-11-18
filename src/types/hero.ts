// Tipos relacionados con el Hero Slider

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  overlay?: boolean; // Overlay oscuro sobre la imagen
}
