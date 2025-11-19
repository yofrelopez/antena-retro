"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

export function VolumeControl({ volume, isMuted, onVolumeChange, onMuteToggle }: VolumeControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <motion.div
      className="relative flex items-center gap-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => !isDragging && setIsExpanded(false)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Mute Button */}
      <motion.button
        onClick={onMuteToggle}
        className="p-2 rounded-full hover:bg-primary/10 text-foreground transition-colors relative z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        <AnimatePresence mode="wait">
          {isMuted || volume === 0 ? (
            <motion.div
              key="muted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <VolumeX className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Volume2 className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Expandable Volume Slider */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 px-2">
              {/* Volume Slider */}
              <div className="relative w-24 h-1.5 bg-border/50 rounded-full overflow-hidden group cursor-pointer">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-secondary rounded-full"
                  animate={{ width: `${volume * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleSliderChange}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  aria-label="Control de volumen"
                />

                {/* Animated Thumb */}
                <motion.div
                  className="absolute inset-y-0 w-3 h-3 -top-1 bg-white border-2 border-primary rounded-full shadow-lg pointer-events-none"
                  style={{ left: `calc(${volume * 100}% - 6px)` }}
                  animate={{
                    scale: isDragging ? 1.3 : 1,
                    boxShadow: isDragging
                      ? "0 0 0 4px rgba(245, 99, 41, 0.2)"
                      : "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              </div>

              {/* Volume Percentage */}
              <motion.span
                className="text-xs text-muted-foreground w-8 text-right font-medium tabular-nums"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {Math.round(volume * 100)}%
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Volume Indicator */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-1"
        >
          {/* Volume Level Bars */}
          <div className="flex items-end gap-0.5 h-4">
            {[0.25, 0.5, 0.75, 1].map((level, index) => (
              <motion.div
                key={index}
                className={`w-0.5 rounded-full transition-colors ${
                  volume >= level && !isMuted
                    ? "bg-primary"
                    : "bg-border/50"
                }`}
                style={{ height: `${(index + 1) * 4}px` }}
                animate={{
                  opacity: volume >= level && !isMuted ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
