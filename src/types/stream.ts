// Types para stream metadata y estadísticas

export interface StreamMetadata {
  title: string;
  artist: string;
  album?: string;
  artwork?: string;
  listeners: number;
  bitrate: number;
  codec: string;
  sampleRate: number;
  serverUptime: number;
}

export interface TrackHistory {
  id: string;
  title: string;
  artist: string;
  playedAt: Date;
  duration?: number;
}

export interface ListenerStats {
  current: number;
  peak: number;
  peakTime?: Date;
  history24h: {
    hour: string;
    listeners: number;
  }[];
  locations: {
    country: string;
    listeners: number;
  }[];
}

export interface StreamQuality {
  bitrate: number;
  codec: string;
  sampleRate: number;
  channels: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  ping?: number;
}
