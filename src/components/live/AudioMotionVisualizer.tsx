"use client";

import { useEffect, useRef, useState } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";

interface AudioMotionVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  preset: 'spectrum' | 'radial';
}

export function AudioMotionVisualizer({ audioRef, isPlaying, preset }: AudioMotionVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const analyzerRef = useRef<AudioMotionAnalyzer | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configuraciones de presets
  const presets = {
    spectrum: {
      mode: 5,
      gradient: 'prism',
      showPeaks: true,
      ledBars: true,
      lumiBars: true,
      radial: false,
      mirror: 1,
      reflexRatio: 0,
      barSpace: 0.25,
      smoothing: 0.7,
      linearAmplitude: false,
      linearBoost: 6.0,
      showBgColor: true,
      bgAlpha: 0.7,
      overlay: true,
      showScaleX: false,
      showScaleY: false,
    },
    radial: {
      mode: 1,
      gradient: 'rainbow',
      showPeaks: true,
      ledBars: false,
      lumiBars: true,
      radial: true,
      mirror: 0,
      reflexRatio: 0,
      barSpace: 2.05,
      smoothing: 0.5,
      linearAmplitude: true,
      linearBoost: 10.2,
      showBgColor: true,
      bgAlpha: 0.5,
      overlay: true,
      showScaleX: false,
      showScaleY: false,
      spinSpeed: 2,
      radius: isMobile ? 0.9 : 3.25,
    },
  };

  useEffect(() => {
    if (!containerRef.current || !audioRef.current) return;

    // Solo crear el analyzer una vez
    if (!analyzerRef.current) {
      try {
        // Crear AudioMotion con configuración inicial
        analyzerRef.current = new AudioMotionAnalyzer(containerRef.current, {
          height: containerRef.current.clientHeight,
          ansiBands: false,
          ...presets[preset],
        });
        
        // Conectar el audio manualmente
        try {
          analyzerRef.current.connectInput(audioRef.current);
          console.log('[AudioMotion] Analyzer created and connected');
        } catch (err) {
          console.warn('Audio source already connected, skipping');
        }
      } catch (error) {
        console.error('Error creating AudioMotion:', error);
      }
    }

    // NO destruir en cleanup - mantener conexión persistente
  }, [audioRef]);

  // Actualizar preset cuando cambie
  useEffect(() => {
    if (analyzerRef.current) {
      const config = presets[preset];
      Object.keys(config).forEach((key) => {
        if (key in analyzerRef.current!) {
          (analyzerRef.current as any)[key] = (config as any)[key];
        }
      });
    }
  }, [preset]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
