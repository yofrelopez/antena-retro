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
    url: "https://panel.foxradios.com:8100/radioantena9retro?xlms-icecast",
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

  // About page data
  about: {
    // Stats/Metrics
    stats: {
      yearsOnAir: 15,
      totalPrograms: 24,
      teamMembers: 12,
      listeners: "50K+",
    },

    // Mission & Vision
    mission: {
      title: "Nuestra Misión",
      description: "Conectar con nuestra audiencia a través de música excepcional, noticias relevantes y programas que inspiran, entretienen e informan a nuestra comunidad las 24 horas del día.",
    },

    vision: {
      title: "Nuestra Visión",
      description: "Ser la radio online de referencia, reconocida por la calidad de nuestra programación y nuestro compromiso con la excelencia en la radiodifusión.",
    },

    // Core Values
    values: [
      {
        id: "quality",
        icon: "Award",
        title: "Calidad",
        description: "Nos comprometemos a ofrecer contenido de la más alta calidad, cuidadosamente seleccionado para nuestra audiencia.",
      },
      {
        id: "innovation",
        icon: "Zap",
        title: "Innovación",
        description: "Adoptamos las últimas tecnologías para brindar la mejor experiencia de radio online a nuestros oyentes.",
      },
      {
        id: "community",
        icon: "Users",
        title: "Comunidad",
        description: "Valoramos a nuestra comunidad de oyentes y nos esforzamos por ser su voz y compañía diaria.",
      },
      {
        id: "diversity",
        icon: "Sparkles",
        title: "Diversidad",
        description: "Celebramos la diversidad musical y cultural, ofreciendo una programación variada e inclusiva.",
      },
    ],

    // Timeline/History
    timeline: [
      {
        year: 2010,
        title: "Nuestros Inicios",
        description: "Comenzamos como una pequeña radio online con la pasión por compartir buena música y contenido de calidad.",
      },
      {
        year: 2014,
        title: "Expansión Digital",
        description: "Implementamos streaming de alta calidad y lanzamos nuestras plataformas en redes sociales, multiplicando nuestra audiencia.",
      },
      {
        year: 2018,
        title: "Renovación Total",
        description: "Rediseñamos completamente nuestra imagen, programación y plataforma web, estableciendo nuevos estándares de calidad.",
      },
      {
        year: 2022,
        title: "Reconocimiento Nacional",
        description: "Alcanzamos 50,000 oyentes mensuales y recibimos premios por nuestra innovación en radiodifusión digital.",
      },
      {
        year: 2025,
        title: "Presente y Futuro",
        description: "Continuamos innovando con tecnología de vanguardia, manteniéndonos como referente en radio online.",
      },
    ],
  },
} as const;

export type RadioConfig = typeof radioConfig;
