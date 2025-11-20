"use client";

import { StreamMonitor } from "./StreamMonitor";
import { ListenerStats } from "./ListenerStats";
import { PlayHistory } from "./PlayHistory";
import { StreamMetrics } from "./StreamMetrics";
import { ProgramInfo } from "./ProgramInfo";
import { TopCountries } from "./TopCountries";
import { QuotesTicker } from "./QuotesTicker";

export function LiveDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-black">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse" 
           style={{ animationDuration: '10s' }} />
      
      {/* Content - Optimizado para 1920×1080 */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        
        {/* Grid 3×3 - Desktop optimizado */}
        <div className="hidden xl:grid xl:grid-cols-12 gap-4 auto-rows-auto">
          
          {/* FILA 1 - Info Principal */}
          {/* Audiencia en Vivo + Frases Musicales */}
          <div className="col-span-3 space-y-4">
            <div>
              <ListenerStats />
            </div>
            <div className="min-h-60">
              <QuotesTicker />
            </div>
          </div>
          
          {/* Transmisión en Vivo (Hero) + Historial + Calidad */}
          <div className="col-span-6 space-y-4">
            {/* Transmisión en Vivo */}
            <div className="min-h-[340px]">
              <StreamMonitor />
            </div>
            
            {/* Historial + Calidad - 2 columnas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="min-h-80">
                <PlayHistory />
              </div>
              <div className="min-h-80">
                <StreamMetrics />
              </div>
            </div>
          </div>
          
          {/* Programa Actual + A Continuación */}
          <div className="col-span-3 space-y-4">
            <div className="min-h-[340px]">
              <ProgramInfo />
            </div>
            <div className="min-h-[280px]">
              <ProgramInfo showNextOnly />
            </div>
          </div>
        </div>

        {/* Layout Responsivo - Tablets y Mobile (con scroll) */}
        <div className="xl:hidden space-y-6">
          <StreamMonitor />
          
          <ProgramInfo />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListenerStats />
            <ProgramInfo showNextOnly />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlayHistory />
            <StreamMetrics />
          </div>
          
          <QuotesTicker />
        </div>
      </div>
    </div>
  );
}
