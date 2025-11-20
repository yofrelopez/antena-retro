// Datos dummy estáticos para el dashboard live
// Generados una vez para evitar problemas de hidratación SSR

export const dummyLiveData = {
  // Current track metadata
  currentTrack: {
    title: "Bailando",
    artist: "Enrique Iglesias ft. Descemer Bueno",
    bitrate: 128,
    codec: "MP3",
    sampleRate: 44100,
  },

  // Listener statistics
  listeners: {
    current: 1247,
    peak: 2156,
    peakTime: "14:30",
    history24h: [
      { hour: "0:00", listeners: 823 },
      { hour: "1:00", listeners: 654 },
      { hour: "2:00", listeners: 532 },
      { hour: "3:00", listeners: 498 },
      { hour: "4:00", listeners: 512 },
      { hour: "5:00", listeners: 687 },
      { hour: "6:00", listeners: 945 },
      { hour: "7:00", listeners: 1234 },
      { hour: "8:00", listeners: 1567 },
      { hour: "9:00", listeners: 1789 },
      { hour: "10:00", listeners: 1923 },
      { hour: "11:00", listeners: 2056 },
      { hour: "12:00", listeners: 2156 },
      { hour: "13:00", listeners: 2089 },
      { hour: "14:00", listeners: 1956 },
      { hour: "15:00", listeners: 1834 },
      { hour: "16:00", listeners: 1723 },
      { hour: "17:00", listeners: 1656 },
      { hour: "18:00", listeners: 1589 },
      { hour: "19:00", listeners: 1467 },
      { hour: "20:00", listeners: 1345 },
      { hour: "21:00", listeners: 1234 },
      { hour: "22:00", listeners: 1123 },
      { hour: "23:00", listeners: 967 },
    ],
    locations: [
      { country: "Argentina", count: 423 },
      { country: "México", count: 312 },
      { country: "España", count: 189 },
      { country: "Colombia", count: 156 },
      { country: "Chile", count: 134 },
    ],
  },

  // Play history
  history: [
    { id: "track-0", title: "Bailando", artist: "Enrique Iglesias", playedAt: "14:52" },
    { id: "track-1", title: "La Camisa Negra", artist: "Juanes", playedAt: "14:48" },
    { id: "track-2", title: "Vivir Mi Vida", artist: "Marc Anthony", playedAt: "14:44" },
    { id: "track-3", title: "Corazón Espinado", artist: "Santana", playedAt: "14:40" },
    { id: "track-4", title: "Livin' La Vida Loca", artist: "Ricky Martin", playedAt: "14:36" },
    { id: "track-5", title: "Smooth", artist: "Santana ft. Rob Thomas", playedAt: "14:32" },
    { id: "track-6", title: "El Perdón", artist: "Nicky Jam", playedAt: "14:28" },
    { id: "track-7", title: "Danza Kuduro", artist: "Don Omar", playedAt: "14:24" },
    { id: "track-8", title: "Waka Waka", artist: "Shakira", playedAt: "14:20" },
    { id: "track-9", title: "La Bicicleta", artist: "Carlos Vives", playedAt: "14:16" },
    { id: "track-10", title: "Bailando", artist: "Enrique Iglesias", playedAt: "14:12" },
    { id: "track-11", title: "La Camisa Negra", artist: "Juanes", playedAt: "14:08" },
    { id: "track-12", title: "Vivir Mi Vida", artist: "Marc Anthony", playedAt: "14:04" },
    { id: "track-13", title: "Corazón Espinado", artist: "Santana", playedAt: "14:00" },
    { id: "track-14", title: "Livin' La Vida Loca", artist: "Ricky Martin", playedAt: "13:56" },
  ],

  // Stream metrics
  metrics: {
    bitrate: 128,
    maxBitrate: 320,
    codec: "MP3",
    sampleRate: 44100,
    channels: 2,
    status: "excellent" as const,
    ping: 45,
    uptime: "12d 4h 23m",
  },

  // Waveform animation heights (pre-generados para consistencia SSR)
  waveformHeights: [
    42, 68, 55, 73, 45, 61, 78, 52, 66, 71, 58, 64, 49, 75, 62, 
    54, 69, 47, 72, 59, 65, 51, 76, 63, 57, 70, 48, 74, 60, 67,
    53, 77, 56, 68, 50, 72, 61, 65, 46, 73, 58, 69, 52, 75, 62,
    55, 71, 49, 76, 64, 59, 68, 51, 74, 63, 57, 72, 48, 77, 60,
  ],
};
