// Configuración global de la radio
// NOTA: En V2, este archivo leerá de variables de entorno
// Por ahora (V1), los valores están hardcodeados para desarrollo

export const radioConfig = {
  // Información básica
  name: "Antena Retro",
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
    logo: "/logos/logo_1.png",        // Logo principal (header, fondos claros)
    logoWhite: "/logos/logo_1_reverse.png", // Logo invertido (footer, fondos oscuros)
    logoIcon: "/logos/logo_icon.png",        // Solo ícono (favicon, mobile)
    logoAlt: "Logo de Antena Retro",
    favicon: "/favicon.ico",
    ogImage: "/og-image.jpg",
  },

  // Colores (tema principal)
  colors: {
    primary: "#F56329",    // Naranja vibrante
    secondary: "#6329F5",  // Violeta/Púrpura
    accent: "#29BBF5",     // Azul cielo
    success: "#BBF529",    // Lima/Verde claro
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
