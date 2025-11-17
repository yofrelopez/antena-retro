import type { News } from "@/types";

export const dummyNews: News[] = [
  {
    id: "1",
    slug: "festival-musica-verano-2024",
    title: "Gran Festival de Música de Verano 2024",
    excerpt:
      "Este fin de semana se celebrará el Festival de Música de Verano con artistas locales e internacionales.",
    content: `
      <p>El próximo sábado 15 de junio se llevará a cabo la décima edición del Festival de Música de Verano en el parque central de la ciudad.</p>

      <p>El evento contará con la participación de más de 20 artistas locales e internacionales, ofreciendo una variedad de géneros musicales que van desde el rock hasta la música electrónica.</p>

      <p>Las puertas abrirán a las 16:00 horas y la entrada será gratuita para todos los asistentes. Se espera una asistencia de más de 10,000 personas.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    author: "Redacción",
    publishedAt: "2024-06-10T10:00:00Z",
    category: "entretenimiento",
    tags: ["música", "festival", "eventos"],
  },
  {
    id: "2",
    slug: "equipo-local-campeonato",
    title: "Equipo local gana el campeonato regional",
    excerpt:
      "El equipo de fútbol de la ciudad se proclama campeón tras una emocionante final.",
    content: `
      <p>En un partido emocionante que se decidió en los últimos minutos, el equipo local consiguió alzarse con el campeonato regional de fútbol.</p>

      <p>El marcador final fue de 2-1 a favor del equipo local, con goles de Martínez y López. Miles de aficionados celebraron en las calles de la ciudad.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    author: "Juan Pérez",
    publishedAt: "2024-06-09T18:30:00Z",
    category: "deportes",
    tags: ["fútbol", "deportes", "campeonato"],
  },
  {
    id: "3",
    slug: "nueva-biblioteca-municipal",
    title: "Inauguran nueva biblioteca municipal",
    excerpt:
      "La alcaldía inaugura un moderno espacio cultural con más de 50,000 libros.",
    content: `
      <p>Este lunes fue inaugurada la nueva biblioteca municipal, un moderno edificio de tres plantas que albergará más de 50,000 títulos.</p>

      <p>El proyecto, que llevó dos años de construcción, incluye salas de lectura, espacios para eventos culturales y una zona infantil equipada con tecnología de última generación.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    author: "María García",
    publishedAt: "2024-06-08T12:00:00Z",
    category: "cultura",
    tags: ["cultura", "biblioteca", "educación"],
  },
  {
    id: "4",
    slug: "tecnologia-5g-ciudad",
    title: "Llega la tecnología 5G a la ciudad",
    excerpt:
      "Las principales operadoras activan sus redes de quinta generación en toda la zona metropolitana.",
    content: `
      <p>A partir de hoy, los habitantes de la ciudad podrán disfrutar de la velocidad de la tecnología 5G, con todas las operadoras principales activando sus antenas.</p>

      <p>Esta mejora permitirá descargas hasta 10 veces más rápidas y abrirá nuevas posibilidades para el Internet de las Cosas y servicios digitales avanzados.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
    author: "Carlos López",
    publishedAt: "2024-06-07T09:00:00Z",
    category: "tecnologia",
    tags: ["tecnología", "5G", "telecomunicaciones"],
  },
  {
    id: "5",
    slug: "concierto-benefico-hospital",
    title: "Concierto benéfico recauda fondos para el hospital infantil",
    excerpt:
      "Artistas locales se unen en un evento solidario que recaudó más de 50,000 euros.",
    content: `
      <p>El pasado viernes se celebró un concierto benéfico en el teatro municipal que logró recaudar más de 50,000 euros destinados al hospital infantil de la ciudad.</p>

      <p>Más de 15 artistas locales participaron de forma altruista en el evento, que contó con la asistencia de más de 1,000 personas.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800",
    author: "Ana Martínez",
    publishedAt: "2024-06-06T16:00:00Z",
    category: "local",
    tags: ["beneficencia", "música", "solidaridad"],
  },
  {
    id: "6",
    slug: "mercado-agricola-organico",
    title: "Nuevo mercado agrícola de productos orgánicos",
    excerpt:
      "Agricultores locales abren mercado permanente con productos frescos y ecológicos.",
    content: `
      <p>Los agricultores de la región han inaugurado un mercado permanente donde ofrecen productos orgánicos directamente al consumidor.</p>

      <p>El mercado estará abierto todos los sábados de 8:00 a 14:00 horas y contará con más de 30 productores locales.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
    author: "Pedro Sánchez",
    publishedAt: "2024-06-05T08:00:00Z",
    category: "local",
    tags: ["agricultura", "orgánico", "mercado"],
  },
];
