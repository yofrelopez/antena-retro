"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { useState, useEffect } from "react";

interface VolumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

export function VolumeModal({
  isOpen,
  onClose,
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: VolumeModalProps) {
  const [localVolume, setLocalVolume] = useState(volume);

  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-70 bg-background/95 backdrop-blur-xl border-t border-border/50 rounded-t-3xl shadow-2xl max-h-[70vh]"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-border/50 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-3 pt-2">
              <h3 className="text-base font-bold">Volumen</h3>
              <motion.button
                onClick={onClose}
                className="p-2.5 rounded-full bg-border/20 hover:bg-primary/10 transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Cerrar"
              >
                <X className="h-5 w-5 text-foreground" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 pb-8">
              {/* Volume Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  className="p-4 rounded-full bg-linear-to-br from-primary/20 to-secondary/20"
                  animate={{
                    scale: isMuted || localVolume === 0 ? 1 : [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: isMuted || localVolume === 0 ? 0 : Infinity,
                    duration: 2,
                  }}
                >
                  {isMuted || localVolume === 0 ? (
                    <VolumeX className="h-10 w-10 text-muted-foreground" />
                  ) : (
                    <Volume2 className="h-10 w-10 text-primary" />
                  )}
                </motion.div>
              </div>

              {/* Volume Percentage */}
              <div className="text-center mb-6">
                <motion.div
                  className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
                  key={Math.round(localVolume * 100)}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {Math.round(localVolume * 100)}%
                </motion.div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isMuted
                    ? "Silenciado"
                    : localVolume === 0
                    ? "Mínimo"
                    : localVolume === 1
                    ? "Máximo"
                    : "Volumen actual"}
                </p>
              </div>

              {/* Horizontal Slider */}
              <div className="mb-6 px-2">
                <div className="relative h-2 bg-border/50 rounded-full overflow-hidden">
                  {/* Fill */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-linear-to-r from-primary to-secondary rounded-full"
                    animate={{ width: `${localVolume * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* Slider Input */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={localVolume}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                    aria-label="Ajustar volumen"
                  />

                  {/* Thumb Indicator */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-3 border-primary rounded-full shadow-lg pointer-events-none"
                    style={{ left: `calc(${localVolume * 100}% - 10px)` }}
                  />
                </div>

                {/* Volume Markers */}
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <span className="text-xs text-muted-foreground">50%</span>
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
              </div>

              {/* Mute Button */}
              <div className="flex justify-center">
                <motion.button
                  onClick={onMuteToggle}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? (
                    <>
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Activar Sonido</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4" />
                      <span className="text-sm font-medium">Silenciar</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
