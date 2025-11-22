"use client";

import { motion } from "framer-motion";
import { Video, ExternalLink } from "lucide-react";

// Video embed de cámara en vivo de Tokio, Japón (sin audio)
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/gFRtAAmiFbE?autoplay=1&mute=1&rel=0&showinfo=0&controls=0&modestbranding=1";

export function VideoEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/50">
            <Video className="h-4 w-4 text-red-500" />
          </div>
          <h3 className="text-sm font-semibold text-white">Video en Vivo</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs font-medium text-red-500">LIVE</span>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-black/40">
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
          // Placeholder cuando no hay video configurado
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-4">
              <Video className="h-12 w-12 text-zinc-500" />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Video stream no configurado</p>
            <p className="text-xs text-zinc-600">Edita VideoEmbed.tsx para añadir tu URL</p>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="p-3 border-t border-white/5">
        <p className="text-xs text-zinc-500">
          Stream de video sin audio - El audio principal viene del reproductor
        </p>
      </div>
    </motion.div>
  );
}
