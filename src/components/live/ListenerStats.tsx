"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Radio, MapPin } from "lucide-react";
import CountUp from "react-countup";
import { LineChart, Line, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { dummyLiveData } from "@/lib/dummy-data/live-data";

const dummyStats = dummyLiveData.listeners;

export function ListenerStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl flex flex-col"
    >
      {/* Gradient accent - sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="p-5 flex flex-col h-full">
        {/* Header - Minimalista */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
          <div className="p-1.5 rounded-lg bg-primary/5">
            <Users className="h-3.5 w-3.5 text-primary/70" />
          </div>
          <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Audiencia en Vivo</h3>
        </div>

        {/* Stats Grid - 2 columnas balanceadas */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Current Listeners */}
          <div className="p-3 rounded-xl bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Radio className="h-3 w-3 text-primary/60" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Ahora</p>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">
              <CountUp end={dummyStats.current} duration={2} separator="," />
            </div>
          </div>

          {/* Peak */}
          <div className="p-3 rounded-xl bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="h-3 w-3 text-green-400/60" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Pico</p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white tabular-nums">
                {(dummyStats.peak / 1000).toFixed(1)}k
              </span>
              <span className="text-[9px] text-zinc-600">{dummyStats.peakTime}</span>
            </div>
          </div>
        </div>

        {/* 24h Chart - Mejorado con área */}
        <div className="mb-5">
          <h4 className="text-[10px] font-medium text-zinc-500 mb-2.5 uppercase tracking-widest">Últimas 24h</h4>
          <div className="h-28 w-full rounded-xl bg-zinc-800/50 border border-white/20 p-2 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent pointer-events-none" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyStats.history24h} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                  labelStyle={{ color: "#a1a1aa", fontSize: "10px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="listeners"
                  stroke="url(#lineGradient)"
                  fill="url(#areaGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations - Compacto y elegante */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-2.5">
            <MapPin className="h-3 w-3 text-blue-400/60" />
            <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Top 5 Países</h4>
          </div>
          <div className="space-y-1.5">
            {dummyStats.locations.map((location, i) => (
              <div 
                key={location.country} 
                className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 flex-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-md bg-white/5 text-[10px] font-mono text-zinc-600 tabular-nums group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-xs text-zinc-400 font-light group-hover:text-zinc-300 transition-colors">
                    {location.country}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white/90 tabular-nums">{location.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
