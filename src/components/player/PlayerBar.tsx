"use client";

import { useState, useRef, useEffect } from "react";
import { radioConfig } from "@/lib/config";
import { Container } from "@/components/ui";

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(radioConfig.streaming.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error al reproducir:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Audio element */}
          <audio
            ref={audioRef}
            src={radioConfig.streaming.url}
            preload="none"
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
          />

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-all hover:opacity-90 disabled:opacity-50"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isLoading ? (
              <svg
                className="h-6 w-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : isPlaying ? (
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Radio Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--color-secondary)] truncate">
              {radioConfig.name}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {isPlaying ? "En vivo" : radioConfig.tagline}
            </p>
          </div>

          {/* Volume Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume < 0.5 ? (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
              aria-label="Control de volumen"
            />
          </div>

          {/* Live indicator */}
          {isPlaying && (
            <div className="hidden md:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-medium text-red-600">EN VIVO</span>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
