"use client";

import { motion } from "framer-motion";
import { Mic2, Clock, Calendar, Video } from "lucide-react";
import Image from "next/image";

// Importar datos dummy de programas y hosts existentes
import { dummyPrograms } from "@/lib/dummy-data/programs";
import { dummyHosts } from "@/lib/dummy-data/hosts";

// Simular programa actual (6:00 AM - Lunes - "Buenos Días Antena")
const currentProgram = dummyPrograms[2]; // "Buenos Días Antena"
const nextProgram = dummyPrograms[3]; // Siguiente en schedule

// Obtener hosts del programa actual
const currentHosts = currentProgram.hosts
  .map(id => dummyHosts.find(h => h.id === id))
  .filter(Boolean);

// Simular progreso del programa (45% completado)
const programProgress = 45;

// Video embed de cámara en vivo de Tokio, Japón (sin audio)
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/gFRtAAmiFbE?autoplay=1&mute=1&rel=0&showinfo=0&controls=0&modestbranding=1";

// Formatear horario
const formatSchedule = (schedule: any) => {
  if (schedule.length === 0) return "";
  const first = schedule[0];
  return `${first.startTime} - ${first.endTime}`;
};

// Formatear días
const formatDays = (schedule: any) => {
  const days = schedule.map((s: any) => {
    const dayMap: any = {
      lunes: "Lun", martes: "Mar", miercoles: "Mié",
      jueves: "Jue", viernes: "Vie", sabado: "Sáb", domingo: "Dom"
    };
    return dayMap[s.dayOfWeek] || s.dayOfWeek;
  });
  return days.join(", ");
};

interface ProgramInfoProps {
  showNextOnly?: boolean;
}

export function ProgramInfo({ showNextOnly = false }: ProgramInfoProps) {
  if (showNextOnly) {
    // Modo compacto: Solo mostrar "A Continuación"
    const nextHosts = nextProgram.hosts
      .map(id => dummyHosts.find(h => h.id === id))
      .filter(Boolean);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl h-full flex flex-col"
      >
        {/* Gradient accent - sutil */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
        
        <div className="p-5 flex flex-col h-full">
          {/* Header - Minimalista */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
            <div className="p-1.5 rounded-lg bg-secondary/5">
              <Clock className="h-3.5 w-3.5 text-secondary/70" />
            </div>
            <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">A Continuación</h3>
          </div>

          {/* Program Info */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-secondary mb-2">{nextProgram.name}</h2>
            <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{nextProgram.description}</p>

            {/* Schedule */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                <Clock className="h-2.5 w-2.5 text-zinc-500" />
                <span className="text-[10px] font-mono text-zinc-300 tabular-nums">{formatSchedule(nextProgram.schedule)}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                <Calendar className="h-2.5 w-2.5 text-zinc-500" />
                <span className="text-[10px] text-zinc-300">{formatDays(nextProgram.schedule)}</span>
              </div>
            </div>

            {/* Hosts - Layout vertical igual que Programa Actual */}
            <div>
              <p className="text-[10px] text-zinc-500 mb-2">Con</p>
              <div className="flex flex-wrap gap-3">
                {nextHosts.map((host) => (
                  <div key={host!.id} className="flex flex-col items-center gap-1.5 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/50 ring-2 ring-secondary/20">
                      <Image
                        src={host!.imageUrl}
                        alt={host!.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-white text-center">{host!.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Modo completo: Video + Programa Actual
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl h-full flex flex-col"
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black/40 border-b border-white/5">
        {/* Live Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-red-500/50">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs font-medium text-red-500">LIVE</span>
        </div>

        {VIDEO_EMBED_URL ? (
          <iframe
            src={VIDEO_EMBED_URL}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ border: 0 }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-2">
              <Video className="h-8 w-8 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-500">Video no configurado</p>
          </div>
        )}
      </div>

      {/* Program Info */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Mic2 className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-wide">Programa Actual</h3>
        </div>

        {/* Program Details */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary mb-2">{currentProgram.name}</h2>
          <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{currentProgram.description}</p>

          {/* Schedule */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              <Clock className="h-2.5 w-2.5 text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-300">{formatSchedule(currentProgram.schedule)}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              <Calendar className="h-2.5 w-2.5 text-zinc-500" />
              <span className="text-[10px] text-zinc-300">{formatDays(currentProgram.schedule)}</span>
            </div>
          </div>

          {/* Hosts compactos */}
          <div className="mb-2">
            <p className="text-[10px] text-zinc-500 mb-2">Con</p>
            <div className="flex flex-wrap gap-3">
              {currentHosts.map((host) => (
                <div key={host!.id} className="flex flex-col items-center gap-1.5 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 ring-2 ring-primary/20">
                    <Image
                      src={host!.imageUrl}
                      alt={host!.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-white text-center">{host!.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-zinc-500">Progreso</span>
              <span className="text-[10px] font-mono text-zinc-400 tabular-nums">{programProgress}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${programProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
