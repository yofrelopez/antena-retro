import type { HeroSlide } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/images/hero/slide_1.png",
    title: "Tu Música, Tu Radio",
    subtitle: "Antena Retro",
    description: "La mejor música las 24 horas del día, los 7 días de la semana. Sintoniza y déjate llevar.",
    ctaPrimary: {
      text: "Escuchar en vivo",
      href: "#player",
    },
    ctaSecondary: {
      text: "Ver programación",
      href: "/programacion",
    },
    overlay: true,
  },
  {
    id: "2",
    image: "/images/hero/slide_2.png",
    title: "Evento Especial del Mes",
    subtitle: "Concierto en vivo",
    description: "No te pierdas nuestro evento especial con los mejores artistas de la ciudad. ¡Entrada gratuita!",
    ctaPrimary: {
      text: "Más información",
      href: "/noticias",
    },
    ctaSecondary: {
      text: "Ver calendario",
      href: "/programacion",
    },
    overlay: true,
  },
  {
    id: "3",
    image: "/images/hero/slide_3.jpg",
    title: "Nuevo Programa: Noches de Jazz",
    subtitle: "Martes y Jueves 21:00",
    description: "Disfruta de los mejores clásicos del jazz y descubre nuevos talentos en nuestro programa estreno.",
    ctaPrimary: {
      text: "Conocer más",
      href: "/programas",
    },
    ctaSecondary: {
      text: "Ver horarios",
      href: "/programacion",
    },
    overlay: true,
  },
  {
    id: "4",
    image: "/images/hero/slide_4.jpg",
    title: "Transmitiendo en Vivo 24/7",
    subtitle: "Desde cualquier dispositivo",
    description: "Escúchanos en tu computadora, móvil o tablet. La mejor calidad de streaming siempre contigo.",
    ctaPrimary: {
      text: "Comenzar a escuchar",
      href: "#player",
    },
    ctaSecondary: {
      text: "Contacto",
      href: "/contacto",
    },
    overlay: true,
  },
];
