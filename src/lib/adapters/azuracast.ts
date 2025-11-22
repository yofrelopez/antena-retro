// Funciones para adaptar datos de AzuraCast a los formatos usados en los componentes
import type { AzuraCastNowPlaying } from '@/types/azuracast';

export function getCurrentTrack(data: AzuraCastNowPlaying) {
  const { now_playing } = data;
  
  return {
    title: now_playing.song.title,
    artist: now_playing.song.artist,
    album: now_playing.song.album,
    artwork: now_playing.song.art,
    elapsed: now_playing.elapsed,
    duration: now_playing.duration,
  };
}

export function getListenerStats(data: AzuraCastNowPlaying) {
  const realListeners = data.listeners.total;
  
  // Boost de oyentes basado en la hora local de Lima, Perú (UTC-5)
  const now = new Date();
  const limaHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/Lima' })).getHours();
  
  let boost = 150; // Base mínima (madrugada)
  
  if (limaHour >= 6 && limaHour < 9) {
    boost = 280; // Mañana temprano
  } else if (limaHour >= 9 && limaHour < 12) {
    boost = 320; // Media mañana
  } else if (limaHour >= 12 && limaHour < 15) {
    boost = 350; // Mediodía/almuerzo
  } else if (limaHour >= 15 && limaHour < 18) {
    boost = 300; // Tarde
  } else if (limaHour >= 18 && limaHour < 22) {
    boost = 380; // Hora pico (tarde/noche)
  } else if (limaHour >= 22 && limaHour < 24) {
    boost = 250; // Noche
  } else if (limaHour >= 0 && limaHour < 2) {
    boost = 200; // Media noche
  }
  
  // Agregar variación aleatoria pequeña para simular cambios naturales
  const variation = Math.floor(Math.random() * 31) - 15; // -15 a +15
  const displayListeners = realListeners + boost + variation;
  
  return {
    current: Math.max(displayListeners, 100), // Mínimo 100 oyentes
    unique: data.listeners.unique,
  };
}

export function getSongHistory(data: AzuraCastNowPlaying) {
  const songs = [];
  
  // Incluir la canción actual solo si tiene metadata válida
  const currentTitle = data.now_playing.song.title;
  if (currentTitle !== 'EDITADO' && currentTitle !== 'Unknown' && currentTitle !== '') {
    songs.push({
      id: `current-${data.now_playing.song.id}`,
      title: data.now_playing.song.title,
      artist: data.now_playing.song.artist,
      album: data.now_playing.song.album,
      artwork: data.now_playing.song.art,
      playedAt: new Date(),
      duration: data.now_playing.duration,
    });
  }

  // Mapear el historial filtrando canciones sin metadata válida
  const history = data.song_history
    .filter((item) => {
      const title = item.song.title;
      return title !== 'EDITADO' && title !== 'Unknown' && title !== '';
    })
    .map((item) => ({
      id: item.song.id,
      title: item.song.title,
      artist: item.song.artist,
      album: item.song.album,
      artwork: item.song.art,
      playedAt: new Date(item.played_at * 1000),
      duration: item.duration,
    }));

  return [...songs, ...history];
}

export function getStreamStatus(data: AzuraCastNowPlaying) {
  const mount = data.station.mounts[0]; // Usar el primer mount point
  
  return {
    isOnline: data.is_online,
    bitrate: mount?.bitrate || 0,
    format: mount?.format || 'mp3',
    listeners: data.listeners.total,
  };
}

export function getLiveInfo(data: AzuraCastNowPlaying) {
  return {
    isLive: data.live.is_live,
    streamerName: data.live.streamer_name,
    broadcastStart: data.live.broadcast_start ? new Date(data.live.broadcast_start * 1000) : null,
    art: data.live.art,
  };
}
