import { NextResponse } from 'next/server';

// Deshabilitar cache para obtener datos en tiempo real
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const AZURACAST_API_URL = 'https://panel.foxradios.com/api/nowplaying/antena_retro';

export async function GET() {
  try {
    const response = await fetch(AZURACAST_API_URL, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`AzuraCast API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching now playing data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch now playing data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
