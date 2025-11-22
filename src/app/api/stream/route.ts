import { NextRequest } from 'next/server';

// Configuración
const STREAM_URL = 'https://panel.foxradios.com:8070/live';
const CONNECTION_TIMEOUT = 30000; // 30 segundos
const READ_TIMEOUT = 60000; // 60 segundos

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const abortController = new AbortController();
  
  // Timeout para la conexión
  const connectionTimeout = setTimeout(() => {
    abortController.abort();
  }, CONNECTION_TIMEOUT);

  try {
    console.log('[STREAM] Attempting to connect to:', STREAM_URL);
    
    // Fetch del stream upstream con headers para metadata
    const upstreamResponse = await fetch(STREAM_URL, {
      headers: {
        'Icy-MetaData': '1', // Solicitar metadata de Icecast
        'User-Agent': 'Antena Retro Web Player',
      },
      signal: abortController.signal,
    });

    clearTimeout(connectionTimeout);

    console.log('[STREAM] Connected! Status:', upstreamResponse.status);
    console.log('[STREAM] Content-Type:', upstreamResponse.headers.get('content-type'));

    // Validar respuesta
    if (!upstreamResponse.ok) {
      return new Response('Stream not available', { 
        status: 502,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Obtener Content-Type (usar audio/mpeg por defecto si no viene)
    const contentType = upstreamResponse.headers.get('content-type') || 'audio/mpeg';
    console.log('[STREAM] Using Content-Type:', contentType);

    // Headers de respuesta con CORS completo
    const responseHeaders = new Headers({
      // CORS headers
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type, Accept-Encoding',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type',
      
      // Streaming headers
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      
      // Connection headers
      'Connection': 'keep-alive',
    });

    // Copiar headers ICY si existen (metadata de Icecast)
    const icyName = upstreamResponse.headers.get('icy-name');
    const icyMetaint = upstreamResponse.headers.get('icy-metaint');
    const icyGenre = upstreamResponse.headers.get('icy-genre');
    
    if (icyName) responseHeaders.set('icy-name', icyName);
    if (icyMetaint) responseHeaders.set('icy-metaint', icyMetaint);
    if (icyGenre) responseHeaders.set('icy-genre', icyGenre);

    // Manejar desconexión del cliente
    request.signal.addEventListener('abort', () => {
      abortController.abort();
      console.log('[STREAM] Client disconnected');
    });

    console.log('[STREAM] Client connected, proxying stream');

    // Streaming directo sin buffering
    return new Response(upstreamResponse.body, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error: any) {
    clearTimeout(connectionTimeout);
    
    // Manejar diferentes tipos de error
    if (error.name === 'AbortError') {
      // Cliente desconectado o timeout - no enviar respuesta
      console.log('[STREAM] Connection aborted');
      return new Response(null, { status: 499 }); // Client Closed Request
    }

    console.error('[STREAM] Error proxying stream:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    
    return new Response(`Stream connection failed: ${error.message}`, {
      status: 503,
      headers: {
        'Content-Type': 'text/plain',
        'Retry-After': '5',
      }
    });
  }
}

// Manejar preflight CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type, Accept-Encoding',
      'Access-Control-Max-Age': '86400', // 24 horas
    },
  });
}
