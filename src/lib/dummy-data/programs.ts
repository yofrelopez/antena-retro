import type { Program } from "@/types";

export const dummyPrograms: Program[] = [
  {
    id: "1",
    name: "Buenos Días Radio",
    description:
      "Comenzamos el día con las mejores noticias, entrevistas y la música que te activa.",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600",
    hosts: ["1"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "07:00", endTime: "10:00" },
      { dayOfWeek: "martes", startTime: "07:00", endTime: "10:00" },
      { dayOfWeek: "miercoles", startTime: "07:00", endTime: "10:00" },
      { dayOfWeek: "jueves", startTime: "07:00", endTime: "10:00" },
      { dayOfWeek: "viernes", startTime: "07:00", endTime: "10:00" },
    ],
  },
  {
    id: "2",
    name: "Rock al Mediodía",
    description:
      "El mejor rock clásico y moderno para acompañarte en el almuerzo. Clásicos que nunca mueren.",
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600",
    hosts: ["1"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "martes", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "miercoles", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "jueves", startTime: "12:00", endTime: "14:00" },
      { dayOfWeek: "viernes", startTime: "12:00", endTime: "14:00" },
    ],
  },
  {
    id: "3",
    name: "Zona Electrónica",
    description:
      "House, techno, trance y todo lo mejor de la música electrónica. Déjate llevar por el ritmo.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
    hosts: ["2"],
    schedule: [
      { dayOfWeek: "viernes", startTime: "22:00", endTime: "00:00" },
      { dayOfWeek: "sabado", startTime: "22:00", endTime: "00:00" },
    ],
  },
  {
    id: "4",
    name: "Deportes en Vivo",
    description:
      "Análisis deportivo, entrevistas con protagonistas y la mejor cobertura del deporte local y nacional.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
    hosts: ["3"],
    schedule: [
      { dayOfWeek: "lunes", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "miercoles", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: "viernes", startTime: "18:00", endTime: "20:00" },
    ],
  },
  {
    id: "5",
    name: "Cultura y Más",
    description:
      "Entrevistas, reseñas de libros, cine, teatro y todo sobre la escena cultural de la ciudad.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    hosts: ["4"],
    schedule: [
      { dayOfWeek: "martes", startTime: "16:00", endTime: "18:00" },
      { dayOfWeek: "jueves", startTime: "16:00", endTime: "18:00" },
    ],
  },
  {
    id: "6",
    name: "Noches de Jazz",
    description:
      "Los mejores clásicos del jazz y lo más nuevo de la escena internacional. Relájate con las mejores melodías.",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600",
    hosts: ["1", "4"],
    schedule: [
      { dayOfWeek: "martes", startTime: "21:00", endTime: "23:00" },
      { dayOfWeek: "jueves", startTime: "21:00", endTime: "23:00" },
    ],
  },
];
