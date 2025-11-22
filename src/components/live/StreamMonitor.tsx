"use client";

import { motion } from "framer-motion";
import { Radio, Play, Pause, Volume2, VolumeX, Loader2, BarChart3, Waves } from "lucide-react";
import { dummyLiveData } from "@/lib/dummy-data/live-data";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { getCurrentTrack, getStreamStatus } from "@/lib/adapters/azuracast";
import { radioConfig } from "@/lib/config";
import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const AudioMotionVisualizer = dynamic(() => import("./AudioMotionVisualizer").then(mod => ({ default: mod.AudioMotionVisualizer })), { ssr: false });

const dummyMetadata = dummyLiveData.currentTrack;

export function StreamMonitor() {
  const { data, loading, error } = useNowPlaying();
  
  // Audio player states
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [visualMode, setVisualMode] = useState<'spectrum' | 'radial'>('spectrum');
  
  // Usar datos reales si están disponibles, sino usar dummy
  const currentTrack = data ? getCurrentTrack(data) : dummyMetadata;
  const streamStatus = data ? getStreamStatus(data) : { isOnline: true, bitrate: 128, format: 'MP3' };
  
  // Audio handlers
  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setAudioError(null);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setAudioError('Error al reproducir el stream');
      setIsLoading(false);
      setIsPlaying(false);
      console.error('Error playing audio:', err);
    }
  }, [isPlaying]);
  
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  }, [isMuted]);
  
  const handleVolumeChange = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  }, [isMuted]);
  
  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  const handleAudioError = useCallback(() => {
    setAudioError('Error al cargar el stream');
    setIsLoading(false);
    setIsPlaying(false);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10"
    >
      {/* AudioMotion Visualizer - Fondo completo */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <AudioMotionVisualizer audioRef={audioRef} isPlaying={isPlaying} preset={visualMode} />
      </div>

      {/* Overlay gradient para mejor legibilidad */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
      
      {/* Gradient accent - sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
      
      <div className="relative p-4 md:p-6">
        {/* Header - Simplificado */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <Radio className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-xs text-zinc-500 uppercase tracking-widest">Transmitiendo En Vivo</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-xs text-red-500 font-medium">LIVE</span>
              </div>
            </div>
          </div>

          {/* Stream Info Badges & Visualizer Selector */}
          <div className="flex items-center gap-2">
            {/* Visualizer Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
              <button
                onClick={() => setVisualMode('spectrum')}
                className={`p-1.5 rounded transition-all ${
                  visualMode === 'spectrum'
                    ? 'bg-primary/20 text-primary'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                aria-label="Modo espectro"
                title="Espectro LED"
              >
                <BarChart3 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setVisualMode('radial')}
                className={`p-1.5 rounded transition-all ${
                  visualMode === 'radial'
                    ? 'bg-primary/20 text-primary'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                aria-label="Modo radial"
                title="Visualización radial"
              >
                <Radio className="h-3.5 w-3.5" />
              </button>
            </div>
            
            {/* Stream Info - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-zinc-400 tabular-nums">{streamStatus.format.toUpperCase()} • {streamStatus.bitrate}kbps</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-zinc-400 tabular-nums">44.1kHz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center play button - Ahora sobre el visualizador de fondo */}
        <div className="flex items-center justify-center mb-5">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:border-primary/50 hover:bg-black/80 transition-all duration-300 group"
          >
            {isLoading ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            )}
          </motion.button>
        </div>

        {/* Now Playing Info - Refinado y Responsive */}
        <div className="text-center">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-primary/90 to-secondary/80 bg-clip-text text-transparent mb-2 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            key={currentTrack.title} // Animar cuando cambie la canción
          >
            {currentTrack.title || 'Sin título'}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-zinc-400 font-light mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            key={currentTrack.artist} // Animar cuando cambie el artista
          >
            {currentTrack.artist || 'Artista desconocido'}
          </motion.p>
          
          {/* Volume Control */}
          <motion.div 
            className="flex items-center justify-center gap-3 pt-3 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-zinc-400" />
              ) : (
                <Volume2 className="h-5 w-5 text-zinc-400" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-32 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
              aria-label="Volume"
            />
            
            <span className="text-xs text-zinc-500 font-mono w-8 text-right tabular-nums">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </motion.div>
          
          {/* Error message */}
          {audioError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-3"
            >
              {audioError}
            </motion.p>
          )}
        </div>
        
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={radioConfig.streaming.url}
          crossOrigin="anonymous"
          preload="none"
          onCanPlay={handleCanPlay}
          onPlaying={() => setIsLoading(false)}
          onError={handleAudioError}
        />
      </div>
    </motion.div>
  );
}
