"use client";

import { motion } from "framer-motion";
import { History, Clock } from "lucide-react";
import { dummyLiveData } from "@/lib/dummy-data/live-data";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { getSongHistory } from "@/lib/adapters/azuracast";

const dummyHistory = dummyLiveData.history;

export function PlayHistory() {
  const { data } = useNowPlaying();
  
  // Usar datos reales si están disponibles, sino usar dummy
  const historyData = data ? getSongHistory(data) : dummyHistory;
  
  // Formatear tiempo
  const formatTime = (date: Date | string) => {
    if (typeof date === 'string') return date;
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl flex flex-col"
    >
      {/* Gradient accent - sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
      
      <div className="p-5 flex flex-col h-full">
        {/* Header - Minimalista */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
          <div className="p-1.5 rounded-lg bg-secondary/5">
            <History className="h-3.5 w-3.5 text-secondary/70" />
          </div>
          <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Historial de Reproducción</h3>
        </div>

        {/* Scrollable Track List */}
        <div className="overflow-y-auto pr-2 space-y-2 max-h-60 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/10">
          {historyData.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-start gap-2.5 p-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-200"
            >
              {/* Time Badge */}
              <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-black/40 border border-white/10 shrink-0">
                <Clock className="h-2.5 w-2.5 text-zinc-500" />
                <span className="text-[10px] font-mono text-zinc-400 tabular-nums">{formatTime(track.playedAt)}</span>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate group-hover:text-white/90 transition-colors">
                  {track.title}
                </p>
                <p className="text-[10px] text-zinc-500 truncate group-hover:text-zinc-400 transition-colors">
                  {track.artist}
                </p>
              </div>

              {/* Position Indicator */}
              {i === 0 && (
                <div className="px-1.5 py-0.5 rounded-full bg-primary/20 border border-primary/50 shrink-0">
                  <span className="text-[9px] font-medium text-primary uppercase tracking-wider">Actual</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
