"use client";

import { motion } from "framer-motion";
import { Music2, Radio } from "lucide-react";
import { dummyLiveData } from "@/lib/dummy-data/live-data";

const dummyMetadata = dummyLiveData.currentTrack;

export function StreamMonitor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl"
    >
      {/* Gradient accent - sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
      
      <div className="p-4 md:p-6">
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

          {/* Stream Info Badges - Ocultos en mobile */}
          <div className="hidden md:flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 tabular-nums">{dummyMetadata.codec} • {dummyMetadata.bitrate}kbps</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 tabular-nums">{dummyMetadata.sampleRate / 1000}kHz</span>
            </div>
          </div>
        </div>

        {/* Waveform Visualizer */}
        <div 
          className="relative h-36 rounded-xl bg-black/40 border border-white/5 mb-5 overflow-hidden"
        >
          {/* Simulated waveform bars */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
            {dummyLiveData.waveformHeights.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-linear-to-t from-primary to-secondary rounded-full"
                initial={{ height: `${height}%` }}
                animate={{
                  height: [`${height}%`, `${Math.min(height + 15, 85)}%`, `${height}%`],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.02,
                }}
              />
            ))}
          </div>
          
          {/* Center play indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
              <Music2 className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Now Playing Info - Refinado y Responsive */}
        <div className="text-center">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-primary/90 to-secondary/80 bg-clip-text text-transparent mb-2 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {dummyMetadata.title}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-zinc-400 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {dummyMetadata.artist}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
