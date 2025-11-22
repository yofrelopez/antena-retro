# API de Now Playing

Endpoint proxy para obtener datos en tiempo real de AzuraCast.

## Endpoint

```
GET /api/nowplaying
```

## Respuesta

Devuelve la estructura completa de AzuraCast con información de:
- Estación actual
- Oyentes (total, únicos, actuales)
- Canción en reproducción (con artwork, artista, título)
- Historial de canciones
- Estado del streamer en vivo
- Estado online/offline

## Configuración

El endpoint de AzuraCast está configurado en `route.ts`:
```typescript
const AZURACAST_API_URL = 'https://panel.foxradios.com/api/nowplaying/antena_retro';
```

## Uso

Usar el hook `useNowPlaying()` en componentes:

```typescript
import { useNowPlaying } from '@/hooks/useNowPlaying';

function MyComponent() {
  const { data, loading, error } = useNowPlaying();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data.now_playing.song.title}</div>;
}
```

## Actualización automática

Los datos se actualizan cada **15 segundos** por defecto.
