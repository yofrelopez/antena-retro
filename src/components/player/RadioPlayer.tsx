"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import Image from "next/image";
import { AudioVisualizer } from "./AudioVisualizer";
import { VolumeControl } from "./VolumeControl";
import { VolumeModal } from "./VolumeModal";
import { radioConfig } from "@/lib/config";
import { dummyPrograms } from "@/lib/dummy-data/programs";
import { dummyHosts } from "@/lib/dummy-data/hosts";
import type { Program } from "@/types";

// Helper para detectar programa actual
function getCurrentProgram(): Program | null {
  const now = new Date();
  const dayNames = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const currentDay = dayNames[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (const program of dummyPrograms) {
    for (const schedule of program.schedule) {
      if (schedule.dayOfWeek !== currentDay) continue;

      const [startHour, startMin] = schedule.startTime.split(":").map(Number);
      const [endHour, endMin] = schedule.endTime.split(":").map(Number);
      
      let startMinutes = startHour * 60 + startMin;
      let endMinutes = endHour * 60 + endMin;

      // Si endTime es menor que startTime, el programa cruza medianoche
      if (endMinutes <= startMinutes) {
        endMinutes += 24 * 60;
      }

      // Verificar si estamos en el rango
      if (currentTime >= startMinutes && currentTime < endMinutes) {
        return program;
      }

      // También verificar si cruzó medianoche y estamos después de las 00:00
      if (endMinutes > 24 * 60 && currentTime < endMinutes - 24 * 60) {
        return program;
      }
    }
  }

  return null;
}

export function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(radioConfig.streaming.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(getCurrentProgram());
  const [showVolumeModal, setShowVolumeModal] = useState(false);

  // Actualizar programa actual cada minuto
  useEffect(() => {
    const updateProgram = () => {
      setCurrentProgram(getCurrentProgram());
    };

    const interval = setInterval(updateProgram, 60000); // Cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  // Sincronizar volumen con el elemento audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setError(null);
      } else {
        setIsLoading(true);
        setError(null);
        
        // Intentar play directo
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error al reproducir:", err);
      setError("Error de conexión. Verifica tu conexión a internet.");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  // Manejar errores de conexión
  useEffect(() => {
    if (error) {
      // Limpiar estado al detectar error
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [error]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      
      // Si hay volumen, quitar mute automáticamente
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audio = e.currentTarget;
    const errorCode = audio.error?.code;
    
    let errorMessage = "Error al reproducir el stream";
    
    switch (errorCode) {
      case MediaError.MEDIA_ERR_NETWORK:
        errorMessage = "Error de red. Verifica tu conexión.";
        break;
      case MediaError.MEDIA_ERR_DECODE:
        errorMessage = "Error al decodificar el audio.";
        break;
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errorMessage = "Formato de audio no soportado.";
        break;
      case MediaError.MEDIA_ERR_ABORTED:
        errorMessage = "Reproducción cancelada.";
        break;
    }
    
    setError(errorMessage);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism Container */}
      <div className="relative border-t border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-secondary to-primary opacity-50" />

        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-red-500/10 border-b border-red-500/20"
            >
              <div className="px-4 py-2 text-center">
                <p className="text-xs text-red-500 font-medium">
                  {error}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4 md:py-5">
            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={radioConfig.streaming.url}
              preload="none"
              onCanPlay={handleCanPlay}
              onPlaying={() => setIsLoading(false)}
              onError={handleError}
            />

            {/* Play/Pause Button */}
            <motion.button
              onClick={togglePlay}
              disabled={isLoading && !error}
              className="relative flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25 disabled:opacity-70 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              <AnimatePresence mode="wait">
                {isLoading && !error ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Loader2 className="h-7 w-7 md:h-8 md:w-8 animate-spin" />
                  </motion.div>
                ) : isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Pause className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Play className="h-7 w-7 md:h-8 md:w-8 ml-1" fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulse Ring when playing */}
              {isPlaying && !isLoading && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full bg-secondary"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.75, ease: "easeOut" }}
                  />
                </>
              )}
            </motion.button>

            {/* Now Playing Info */}
            <div className="flex items-center gap-3 shrink-0">
              <AnimatePresence mode="wait">
                {currentProgram && isPlaying ? (
                  <motion.div
                    key={currentProgram.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-3"
                  >
                    {/* Program Logo/Image */}
                    <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-lg overflow-hidden shrink-0 border-2 border-primary/20 shadow-lg hidden sm:block">
                      <Image
                        src={currentProgram.logoUrl || currentProgram.imageUrl}
                        alt={currentProgram.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>

                    {/* Program Details */}
                    <div className="min-w-0 max-w-xs">
                      <motion.h3
                        className="text-sm md:text-base font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent truncate"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {currentProgram.name}
                      </motion.h3>

                      {/* Hosts */}
                      <motion.div
                        className="flex items-center gap-2 mt-0.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Host Avatars */}
                        <div className="flex -space-x-2">
                          {currentProgram.hosts.slice(0, 2).map((hostId, index) => {
                            const host = dummyHosts.find((h) => h.id === hostId);
                            if (!host) return null;
                            return (
                              <div
                                key={hostId}
                                className="relative h-5 w-5 md:h-6 md:w-6 rounded-full overflow-hidden border-2 border-background shadow-sm"
                                style={{ zIndex: 10 - index }}
                              >
                                <Image
                                  src={host.imageUrl}
                                  alt={host.name}
                                  fill
                                  className="object-cover"
                                  sizes="24px"
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* Host Name */}
                        <span className="text-xs text-muted-foreground truncate">
                          {currentProgram.hosts.map((hostId) => {
                            const host = dummyHosts.find((h) => h.id === hostId);
                            return host?.name.split(" ")[0];
                          }).filter(Boolean).join(", ")}
                        </span>
                      </motion.div>

                      {/* Tags - Solo desktop */}
                      <motion.div
                        className="hidden lg:flex items-center gap-1.5 mt-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentProgram.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-w-0 max-w-xs"
                  >
                    <motion.h3
                      className="text-sm md:text-base font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent truncate"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {radioConfig.name}
                    </motion.h3>
                    <motion.p
                      className="text-xs md:text-sm text-muted-foreground truncate"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {radioConfig.tagline}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Audio Visualizer - Responsive */}
            <motion.div
              className="flex flex-1 mx-2 sm:mx-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <AudioVisualizer 
                isPlaying={isPlaying && !isLoading && !error} 
                barCount={40}
                volume={volume}
              />
            </motion.div>

            {/* Volume Controls - Desktop */}
            <div className="hidden sm:block">
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={(newVolume) => {
                  setVolume(newVolume);
                  if (audioRef.current) {
                    audioRef.current.volume = newVolume;
                    if (newVolume > 0 && isMuted) {
                      setIsMuted(false);
                      audioRef.current.muted = false;
                    }
                  }
                }}
                onMuteToggle={toggleMute}
              />
            </div>

            {/* Live Badge */}
            <AnimatePresence>
              {isPlaying && !isLoading && !error && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
                    En Vivo
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Volume Mobile - Modal trigger */}
            <motion.button
              onClick={() => setShowVolumeModal(true)}
              className="sm:hidden p-2 rounded-full hover:bg-primary/10 text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Abrir control de volumen"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Volume Modal - Mobile */}
      <VolumeModal
        isOpen={showVolumeModal}
        onClose={() => setShowVolumeModal(false)}
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={(newVolume) => {
          setVolume(newVolume);
          if (audioRef.current) {
            audioRef.current.volume = newVolume;
            if (newVolume > 0 && isMuted) {
              setIsMuted(false);
              audioRef.current.muted = false;
            }
          }
        }}
        onMuteToggle={toggleMute}
      />
    </motion.div>
  );
}
