import type { Program } from "@/types";

export const dummyPrograms: Program[] = [
  // MADRUGADA (00:00 - 06:00)
  {
    id: "1",
    name: "Noches sin Fin",
    description:
      "Música relajante para acompañar tus noches. Chill-out, ambient y lounge para los noctámbulos.",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600",
    logoUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=200",
    hosts: ["5"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "00:00", endTime: "06:00" },
      { dayOfWeek: "martes", startTime: "00:00", endTime: "06:00" },
      { dayOfWeek: "miercoles", startTime: "00:00", endTime: "06:00" },
      { dayOfWeek: "jueves", startTime: "00:00", endTime: "06:00" },
      { dayOfWeek: "viernes", startTime: "00:00", endTime: "06:00" },
    ],
    tags: ["Chill-out", "Ambient", "Lounge", "Electrónica", "Relajación"],
  },

  {
    id: "15",
    name: "Madrugada del Fin de Semana",
    description:
      "La mejor selección musical para las madrugadas del fin de semana. Deep house, nu-disco y vibes relajados.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
    logoUrl: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=200",
    hosts: ["5", "2"],
    schedule: [
      { dayOfWeek: "sabado", startTime: "02:00", endTime: "06:00" },
      { dayOfWeek: "domingo", startTime: "02:00", endTime: "06:00" },
    ],
    tags: ["Deep House", "Nu-Disco", "Chill", "Electrónica", "Weekend"],
  },

  // MAÑANA (06:00 - 12:00)
  {
    id: "2",
    name: "Buenos Días Antena",
    description:
      "¡Despierta con energía! Noticias frescas, entrevistas del día y la mejor música para comenzar tu mañana.",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600",
    logoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
    hosts: ["6", "1"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "06:00", endTime: "10:00" },
      { dayOfWeek: "martes", startTime: "06:00", endTime: "10:00" },
      { dayOfWeek: "miercoles", startTime: "06:00", endTime: "10:00" },
      { dayOfWeek: "jueves", startTime: "06:00", endTime: "10:00" },
      { dayOfWeek: "viernes", startTime: "06:00", endTime: "10:00" },
    ],
    tags: ["Noticias", "Entrevistas", "Mañana", "Actualidad", "Pop"],
  },

  {
    id: "3",
    name: "Música sin Parar",
    description:
      "Dos horas de música continua con los mejores éxitos actuales y clásicos que nunca pasan de moda.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
    logoUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200",
    hosts: ["6"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "10:00", endTime: "12:00" },
      { dayOfWeek: "martes", startTime: "10:00", endTime: "12:00" },
      { dayOfWeek: "miercoles", startTime: "10:00", endTime: "12:00" },
      { dayOfWeek: "jueves", startTime: "10:00", endTime: "12:00" },
      { dayOfWeek: "viernes", startTime: "10:00", endTime: "12:00" },
      { dayOfWeek: "sabado", startTime: "06:00", endTime: "10:00" },
      { dayOfWeek: "domingo", startTime: "06:00", endTime: "10:00" },
    ],
    tags: ["Pop", "Rock", "Éxitos", "Clásicos", "Variado"],
  },

  // MEDIODÍA (12:00 - 14:00)
  {
    id: "4",
    name: "Rock al Mediodía",
    description:
      "El mejor rock clásico y moderno para acompañarte en el almuerzo. De Led Zeppelin a Foo Fighters.",
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600",
    logoUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200",
    hosts: ["1"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "martes", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "miercoles", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "jueves", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "viernes", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "sabado", startTime: "10:00", endTime: "14:00" },
      { dayOfWeek: "domingo", startTime: "10:00", endTime: "14:00" },
    ],
    tags: ["Rock", "Rock Clásico", "Rock Alternativo", "Metal", "Grunge"],
  },

  // TARDE (14:00 - 18:00)
  {
    id: "5",
    name: "Tarde de Éxitos",
    description:
      "Los mejores éxitos del momento y los clásicos que marcaron una época. Música para todas las edades.",
    imageUrl: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600",
    logoUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200",
    hosts: ["4"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "14:00", endTime: "16:00" },
      { dayOfWeek: "martes", startTime: "14:00", endTime: "16:00" },
      { dayOfWeek: "miercoles", startTime: "14:00", endTime: "16:00" },
      { dayOfWeek: "jueves", startTime: "14:00", endTime: "16:00" },
      { dayOfWeek: "viernes", startTime: "14:00", endTime: "16:00" },
      { dayOfWeek: "sabado", startTime: "14:00", endTime: "16:00" },
      { dayOfWeek: "domingo", startTime: "14:00", endTime: "16:00" },
    ],
    tags: ["Pop", "Éxitos", "Top 40", "Internacional", "Latino"],
  },

  {
    id: "6",
    name: "Cultura y Más",
    description:
      "Entrevistas, reseñas de libros, cine, teatro y todo sobre la escena cultural local e internacional.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    logoUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200",
    hosts: ["4"],
    schedule: [
      { dayOfWeek: "martes", startTime: "16:00", endTime: "18:00" },
      { dayOfWeek: "jueves", startTime: "16:00", endTime: "18:00" },
      { dayOfWeek: "sabado", startTime: "16:00", endTime: "18:00" },
    ],
    tags: ["Cultura", "Entrevistas", "Arte", "Libros", "Cine", "Teatro"],
  },

  {
    id: "7",
    name: "Ritmos Urbanos",
    description:
      "Hip-hop, R&B, trap y reggaeton. Lo mejor de la música urbana desde los clásicos del rap hasta lo más nuevo.",
    imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600",
    logoUrl: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=200",
    hosts: ["7"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "16:00", endTime: "18:00" },
      { dayOfWeek: "miercoles", startTime: "16:00", endTime: "18:00" },
      { dayOfWeek: "viernes", startTime: "16:00", endTime: "18:00" },
      { dayOfWeek: "domingo", startTime: "16:00", endTime: "18:00" },
    ],
    tags: ["Hip-Hop", "R&B", "Trap", "Reggaeton", "Urbana", "Rap"],
  },

  // NOCHE (18:00 - 22:00)
  {
    id: "8",
    name: "Deportes en Vivo",
    description:
      "Análisis deportivo, entrevistas con protagonistas y la mejor cobertura del deporte local y nacional.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
    logoUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200",
    hosts: ["3"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "miercoles", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "viernes", startTime: "18:00", endTime: "20:00" },
    ],
    tags: ["Deportes", "Fútbol", "Análisis", "Entrevistas", "Actualidad Deportiva"],
  },

  {
    id: "9",
    name: "Pop & Dance Night",
    description:
      "La mejor música pop y dance para animar tu noche. Éxitos actuales y clásicos de la pista de baile.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600",
    logoUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200",
    hosts: ["8"],
    schedule: [
      { dayOfWeek: "martes", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "jueves", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "sabado", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "domingo", startTime: "18:00", endTime: "20:00" },
    ],
    tags: ["Pop", "Dance", "EDM", "Electro Pop", "House Pop"],
  },

  {
    id: "10",
    name: "Indie & Alternativo",
    description:
      "Música indie, alternativa y underground. Descubre nuevas bandas y disfruta de los clásicos del indie.",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
    logoUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200",
    hosts: ["4"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "20:00", endTime: "22:00" },
      { dayOfWeek: "miercoles", startTime: "20:00", endTime: "22:00" },
      { dayOfWeek: "viernes", startTime: "20:00", endTime: "22:00" },
    ],
    tags: ["Indie", "Alternativo", "Rock Alternativo", "Indie Pop", "Underground"],
  },

  {
    id: "11",
    name: "Noches de Jazz",
    description:
      "Los mejores clásicos del jazz y lo más nuevo de la escena internacional. Relájate con las mejores melodías.",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600",
    logoUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200",
    hosts: ["1", "4"],
    schedule: [
      { dayOfWeek: "martes", startTime: "20:00", endTime: "22:00" },
      { dayOfWeek: "jueves", startTime: "20:00", endTime: "22:00" },
      { dayOfWeek: "domingo", startTime: "20:00", endTime: "22:00" },
    ],
    tags: ["Jazz", "Blues", "Swing", "Bossa Nova", "Jazz Contemporáneo"],
  },

  {
    id: "12",
    name: "Sábado Noche Pop",
    description:
      "Los mejores éxitos pop para arrancar el fin de semana. Dance, pop y todo lo que suena en las radios del mundo.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
    logoUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200",
    hosts: ["8"],
    schedule: [
      { dayOfWeek: "sabado", startTime: "20:00", endTime: "22:00" },
    ],
    tags: ["Pop", "Dance", "Éxitos", "Top 40", "Fiesta"],
  },

  // NOCHE/MADRUGADA (22:00 - 00:00)
  {
    id: "13",
    name: "Zona Electrónica",
    description:
      "House, techno, trance y todo lo mejor de la música electrónica. Déjate llevar por el ritmo de la noche.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
    logoUrl: "https://images.unsplash.com/photo-1571266028243-d220a6a10e1c?w=200",
    hosts: ["2"],
    schedule: [
      { dayOfWeek: "viernes", startTime: "22:00", endTime: "00:00" },
      { dayOfWeek: "sabado", startTime: "22:00", endTime: "02:00" },
      { dayOfWeek: "domingo", startTime: "22:00", endTime: "02:00" },
    ],
    tags: ["Electrónica", "House", "Techno", "Trance", "EDM", "Progressive"],
  },

  {
    id: "14",
    name: "Rock de Media Noche",
    description:
      "Rock pesado, metal y todo lo que suena fuerte. La dosis perfecta de adrenalina para cerrar el día.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
    logoUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=200",
    hosts: ["1"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "22:00", endTime: "00:00" },
      { dayOfWeek: "martes", startTime: "22:00", endTime: "00:00" },
      { dayOfWeek: "miercoles", startTime: "22:00", endTime: "00:00" },
      { dayOfWeek: "jueves", startTime: "22:00", endTime: "00:00" },
    ],
    tags: ["Rock", "Metal", "Hard Rock", "Heavy Metal", "Rock Pesado"],
  },
];
