// Tipos relacionados con la radio y programación

export interface Program {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // Imagen principal del programa
  logoUrl?: string; // Logo del programa
  hosts: string[]; // IDs de los hosts/locutores
  schedule: ProgramSchedule[];
  tags?: string[]; // Géneros, categorías, etc.
}

export interface ProgramSchedule {
  dayOfWeek: DayOfWeek;
  startTime: string; // Formato "HH:mm"
  endTime: string;   // Formato "HH:mm"
}

export interface Host {
  id: string;
  name: string;
  role?: string; // DJ, Conductor, Locutor, etc.
  bio: string;
  imageUrl: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Schedule {
  dayOfWeek: DayOfWeek;
  programs: ScheduleSlot[];
}

export interface ScheduleSlot {
  startTime: string;
  endTime: string;
  programId: string;
}

export type DayOfWeek =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo';
