// Configuración global de la radio
// NOTA: En V2, este archivo leerá de variables de entorno
// Por ahora (V1), los valores están hardcodeados para desarrollo

export const radioConfig = {
  // Información básica
  name: "Radio Ejemplo",
  tagline: "Tu música, tu radio",
  description: "La mejor música de tu ciudad las 24 horas del día",

  // Streaming
  streaming: {
    url: "https://streaming.ejemplo.com/radio.mp3",
    format: "mp3" as const,
    autoplay: false,
    defaultVolume: 0.7,
  },

  // Branding
  branding: {
    logo: "/logo.svg",
    logoAlt: "Logo de Radio Ejemplo",
    favicon: "/favicon.ico",
    ogImage: "/og-image.jpg",
  },

  // Colores (tema principal)
  colors: {
    primary: "#FF6B00",
    secondary: "#1A1A1A",
    accent: "#FFC107",
    background: "#FFFFFF",
    text: "#171717",
  },

  // Redes sociales
  social: {
    facebook: "https://facebook.com/radioejemplo",
    instagram: "https://instagram.com/radioejemplo",
    twitter: "https://twitter.com/radioejemplo",
    youtube: "",
    tiktok: "",
    linkedin: "",
  },

  // Información de contacto
  contact: {
    email: "info@radioejemplo.com",
    phone: "+34 123 456 789",
    whatsapp: "+34123456789",
    address: "Calle Principal 123, 28001 Madrid, España",
    location: {
      lat: 40.416775,
      lng: -3.70379,
    },
  },

  // SEO y metadatos
  seo: {
    siteUrl: "https://radioejemplo.com",
    lang: "es",
    timezone: "Europe/Madrid",
    keywords: [
      "radio online",
      "música en vivo",
      "radio streaming",
      "radio local",
    ] as string[],
  },

  // Integraciones (vacías por defecto)
  integrations: {
    googleAnalytics: "",
    facebookPixel: "",
    nowPlayingApi: "",
  },

  // Features
  features: {
    darkMode: true,
  },
} as const;

export type RadioConfig = typeof radioConfig;
