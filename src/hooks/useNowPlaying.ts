'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AzuraCastNowPlaying } from '@/types/azuracast';

interface UseNowPlayingReturn {
  data: AzuraCastNowPlaying | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNowPlaying(refreshInterval: number = 15000): UseNowPlayingReturn {
  const [data, setData] = useState<AzuraCastNowPlaying | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/nowplaying');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Verificar si hay un error en la respuesta
      if (result.error) {
        throw new Error(result.message || 'Failed to fetch data');
      }
      
      setData(result);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching now playing data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch inicial
    fetchData();

    // Configurar intervalo de actualización
    const interval = setInterval(fetchData, refreshInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}
