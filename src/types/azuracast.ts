// Tipos para la API de AzuraCast
export interface AzuraCastNowPlaying {
  station: {
    id: number;
    name: string;
    shortcode: string;
    listen_url: string;
    is_public: boolean;
    mounts: Array<{
      id: number;
      name: string;
      url: string;
      bitrate: number;
      format: string;
      listeners: {
        total: number;
        unique: number;
        current: number;
      };
    }>;
  };
  listeners: {
    total: number;
    unique: number;
    current: number;
  };
  live: {
    is_live: boolean;
    streamer_name: string;
    broadcast_start: number | null;
    art: string | null;
  };
  now_playing: {
    sh_id: number;
    played_at: number;
    duration: number;
    playlist: string | null;
    streamer: string | null;
    is_request: boolean;
    song: {
      id: string;
      art: string;
      text: string;
      artist: string;
      title: string;
      album: string;
      genre: string;
    };
    elapsed: number;
    remaining: number;
  };
  playing_next: {
    song: {
      artist: string;
      title: string;
    };
  } | null;
  song_history: Array<{
    sh_id: number;
    played_at: number;
    duration: number;
    song: {
      id: string;
      art: string;
      text: string;
      artist: string;
      title: string;
      album: string;
    };
  }>;
  is_online: boolean;
}
