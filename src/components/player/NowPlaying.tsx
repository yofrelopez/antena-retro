"use client";

import { useState, useEffect } from "react";

interface NowPlayingData {
  artist: string;
  title: string;
  album?: string;
  coverUrl?: string;
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData>({
    artist: "Radio en vivo",
    title: "Sintoniza para escuchar",
  });

  // TODO: En V2, conectar con API de metadata de canciones
  // useEffect(() => {
  //   const fetchNowPlaying = async () => {
  //     try {
  //       const response = await fetch(radioConfig.integrations.nowPlayingApi);
  //       const data = await response.json();
  //       setNowPlaying(data);
  //     } catch (error) {
  //       console.error("Error fetching now playing:", error);
  //     }
  //   };
  //
  //   fetchNowPlaying();
  //   const interval = setInterval(fetchNowPlaying, 30000); // Actualizar cada 30s
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex items-center gap-3">
      {/* Cover art */}
      {nowPlaying.coverUrl ? (
        <img
          src={nowPlaying.coverUrl}
          alt={`${nowPlaying.title} - ${nowPlaying.artist}`}
          className="h-12 w-12 rounded object-cover"
        />
      ) : (
        <div className="h-12 w-12 rounded bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center">
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      )}

      {/* Song info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-(--color-secondary) truncate">
          {nowPlaying.title}
        </p>
        <p className="text-xs text-gray-600 truncate">{nowPlaying.artist}</p>
        {nowPlaying.album && (
          <p className="text-xs text-gray-500 truncate">{nowPlaying.album}</p>
        )}
      </div>
    </div>
  );
}
