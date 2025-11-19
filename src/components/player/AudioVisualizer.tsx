"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  volume?: number;
}

export function AudioVisualizer({ isPlaying, barCount = 40, volume = 0.7 }: AudioVisualizerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const actualBarCount = isMobile ? 20 : barCount;

  // Generar patrones aleatorios únicos para cada barra
  const barPatterns = useMemo(() => {
    return Array.from({ length: actualBarCount }).map((_, index) => {
      // Efecto espejo desde el centro
      const distanceFromCenter = Math.abs(index - actualBarCount / 2) / (actualBarCount / 2);
      
      // Frecuencias más altas en el centro, más bajas en los extremos
      const baseFrequency = 1 - distanceFromCenter * 0.4;
      
      // Altura base y variación
      const minHeight = 15 + distanceFromCenter * 10;
      const maxHeight = 85 - distanceFromCenter * 20;
      
      // Duración variable para efecto orgánico
      const duration = 0.4 + Math.random() * 0.4;
      
      // Delay escalonado desde el centro
      const delay = distanceFromCenter * 0.1;
      
      // Patrones de altura aleatorios
      const heights = [
        minHeight,
        maxHeight * (0.6 + Math.random() * 0.4),
        minHeight + (maxHeight - minHeight) * 0.3,
        maxHeight * (0.7 + Math.random() * 0.3),
        minHeight + (maxHeight - minHeight) * 0.5,
        maxHeight,
        minHeight,
      ];
      
      return {
        heights: heights.map(h => `${h}%`),
        duration,
        delay,
        baseFrequency,
      };
    });
  }, [actualBarCount]);

  return (
    <div className="flex items-center justify-center h-8 sm:h-10 w-full">
      {barPatterns.map((pattern, index) => (
        <motion.div
          key={index}
          className="flex-1 bg-linear-to-t from-primary via-secondary to-primary rounded-full mx-px"
          style={{
            opacity: 0.6 + pattern.baseFrequency * 0.4,
          }}
          initial={{ height: "15%" }}
          animate={{
            height: isPlaying ? pattern.heights : "15%",
            scaleY: isPlaying ? [1, 1.1, 0.9, 1.05, 1] : 1,
          }}
          transition={{
            height: {
              duration: pattern.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pattern.delay,
            },
            scaleY: {
              duration: pattern.duration * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pattern.delay * 0.5,
            },
          }}
        />
      ))}
    </div>
  );
}
