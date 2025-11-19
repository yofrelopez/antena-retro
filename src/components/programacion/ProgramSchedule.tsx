"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Radio } from "lucide-react";
import type { DayOfWeek } from "@/types";
import { DAYS_OF_WEEK, DAY_NAMES } from "@/lib/constants";
import { dummyPrograms, dummyHosts } from "@/lib/dummy-data";

// Función helper para verificar si un programa está en vivo
function isProgramLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  // Manejar programas que cruzan medianoche
  if (endTime < startTime) {
    return currentTime >= startTime || currentTime < endTime;
  }
  
  return currentTime >= startTime && currentTime < endTime;
}

export function ProgramSchedule() {
  // Estado: día seleccionado (por defecto, hoy)
  const today = new Date().getDay();
  const todayKey = DAYS_OF_WEEK[today === 0 ? 6 : today - 1];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(todayKey);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Actualizar hora actual cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 segundos

    return () => clearInterval(timer);
  }, []);

  // Obtener programas del día seleccionado
  const dayPrograms = dummyPrograms
    .filter((program) =>
      program.schedule.some((schedule) => schedule.dayOfWeek === selectedDay)
    )
    .map((program) => {
      const schedule = program.schedule.find((s) => s.dayOfWeek === selectedDay)!;
      return {
        ...program,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      };
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-10">
      {/* Selector de Días - Pills Animados (Sticky) */}
      <div className={`sticky top-20 z-30 -mx-4 px-4 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-6'
      }`}>
        <div className="flex gap-1.5 md:gap-3 justify-center overflow-x-auto scrollbar-hide">
          {DAYS_OF_WEEK.map((day) => {
            const isActive = selectedDay === day;
            const dayName = DAY_NAMES[day];
            // Abreviar en mobile: Lun, Mar, Mié, etc.
            const shortName = dayName.slice(0, 3);
            
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shrink-0 ${
                  scrolled 
                    ? 'px-3 md:px-5 py-2 text-xs font-medium hover:scale-105' 
                    : 'px-4 md:px-8 py-2.5 md:py-3.5 text-xs md:text-sm font-bold hover:scale-105'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDay"
                    className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-2xl shadow-lg shadow-primary/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className={`relative z-10 whitespace-nowrap ${
                  isActive 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                  {/* Mobile: abreviado, Desktop: completo */}
                  <span className="md:hidden">{shortName}</span>
                  <span className="hidden md:inline">{dayName}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline de Programas */}
      <div className="relative max-w-6xl mx-auto">
        {dayPrograms.length > 0 ? (
          <div className="relative">
            {/* Línea Vertical del Timeline */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-linear-to-b from-primary/30 via-secondary/30 to-primary/30 hidden md:block" />

            {/* Programas */}
            <div className="space-y-8">
              {dayPrograms.map((program, idx) => {
                const isLive = isProgramLive(program.startTime, program.endTime);
                
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.01 }}
                    className="group relative"
                  >
                  {/* Punto del Timeline */}
                  <div className="absolute left-8 top-10 -translate-x-1/2 hidden md:block z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.08 + 0.2, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      {/* Punto exterior */}
                      <div className="w-6 h-6 rounded-full bg-background border-2 border-primary group-hover:border-secondary transition-colors duration-300 flex items-center justify-center">
                        {/* Punto interior */}
                        <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover:bg-secondary transition-colors duration-300" />
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-6 h-6 rounded-full bg-primary/20 group-hover:bg-secondary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  {/* Card del Programa */}
                  <div className="md:ml-20 relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-background to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    {/* Badge EN VIVO */}
                    {isLive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-3 -right-3 z-20"
                      >
                        <div className="relative">
                          <div className="px-4 py-2 bg-linear-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50 border-2 border-background">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                              <span className="text-xs font-black text-white uppercase tracking-wider">
                                EN VIVO
                              </span>
                            </div>
                          </div>
                          {/* Glow pulsante */}
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-red-500 rounded-full blur-xl"
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Accent Bar Superior */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Contenedor Grid: Imagen + Contenido */}
                    <div className="grid md:grid-cols-[200px_1fr] gap-6">
                      {/* Imagen del Programa */}
                      {program.imageUrl && (
                        <div className="relative h-48 md:h-full overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                          <motion.img
                            src={program.imageUrl}
                            alt={program.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          {/* Overlay con gradiente */}
                          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-background/80 via-background/20 to-transparent" />
                          
                          {/* Logo del Programa (si existe) */}
                          {program.logoUrl && (
                            <div className="absolute bottom-3 left-3 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-lg p-1.5 border border-border/50">
                              <img
                                src={program.logoUrl}
                                alt={`${program.name} logo`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="p-6 md:p-8 md:pl-0">
                        {/* Header: Horario y Tags */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                          {/* Horario Badge */}
                          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 group-hover:border-primary/40 transition-colors duration-300 w-fit">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-base font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {program.startTime} - {program.endTime}
                            </span>
                          </div>

                          {/* Tags */}
                          {program.tags && program.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {program.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1.5 text-xs font-bold bg-secondary/10 text-secondary rounded-lg border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Título con Icono */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Radio className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                            {program.name}
                          </h3>
                        </div>

                        {/* Descripción */}
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                          {program.description}
                        </p>

                        {/* Footer: Conductores con Avatares */}
                        {program.hosts && program.hosts.length > 0 && (
                          <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                              Conducen:
                            </span>
                            <div className="flex items-center gap-3">
                              {/* Avatares apilados */}
                              <div className="flex -space-x-3">
                                {program.hosts.slice(0, 4).map((hostId) => {
                                  const host = dummyHosts.find(h => h.id === hostId);
                                  if (!host) return null;
                                  
                                  return (
                                    <motion.div
                                      key={host.id}
                                      className="relative group/avatar"
                                      title={host.name}
                                      whileHover={{ scale: 1.15, zIndex: 10 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      {host.imageUrl ? (
                                        <img
                                          src={host.imageUrl}
                                          alt={host.name}
                                          className="w-10 h-10 rounded-full border-2 border-background object-cover ring-2 ring-primary/20 group-hover/avatar:ring-primary/80 transition-all duration-200 cursor-pointer"
                                        />
                                      ) : (
                                        <div className="w-10 h-10 rounded-full border-2 border-background bg-linear-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white ring-2 ring-primary/20 group-hover/avatar:ring-primary/80 transition-all duration-200 cursor-pointer">
                                          {host.name.charAt(0)}
                                        </div>
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </div>

                              {/* Nombres */}
                              <div className="flex flex-wrap gap-2">
                                {program.hosts.slice(0, 2).map((hostId) => {
                                  const host = dummyHosts.find(h => h.id === hostId);
                                  if (!host) return null;
                                  
                                  return (
                                    <span
                                      key={host.id}
                                      className="text-sm font-medium text-foreground"
                                    >
                                      {host.name}
                                    </span>
                                  );
                                })}
                                {program.hosts.length > 2 && (
                                  <span className="text-sm text-muted-foreground">
                                    +{program.hosts.length - 2} más
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Radio className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No hay programas para {DAY_NAMES[selectedDay]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
