"use client";

import { motion } from "framer-motion";
import { Activity, Zap, Server } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { dummyLiveData } from "@/lib/dummy-data/live-data";

const dummyMetrics = dummyLiveData.metrics;

const bitrateData = [
  {
    name: "Bitrate",
    value: (dummyMetrics.bitrate / dummyMetrics.maxBitrate) * 100,
    fill: "url(#bitrateGradient)",
  },
];

const statusColors = {
  excellent: { text: "text-green-400" },
  good: { text: "text-blue-400" },
  fair: { text: "text-yellow-400" },
  poor: { text: "text-red-400" },
};

const statusLabels = {
  excellent: "Excelente",
  good: "Buena",
  fair: "Regular",
  poor: "Deficiente",
};

export function StreamMetrics() {
  const colors = statusColors[dummyMetrics.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl h-full flex flex-col"
    >
      {/* Gradient accent - sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="p-5 flex flex-col h-full">
        {/* Header - Minimalista */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
          <div className="p-1.5 rounded-lg bg-primary/5">
            <Activity className="h-3.5 w-3.5 text-primary/70" />
          </div>
          <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Calidad del Stream</h3>
        </div>

        {/* Bitrate Gauge - Compacto */}
        <div className="mb-3">
          <div className="h-24 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={bitrateData}
                startAngle={90}
                endAngle={-270}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="bitrateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                <RadialBar dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-white tabular-nums">{dummyMetrics.bitrate}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">kbps</span>
            </div>
          </div>
        </div>

        {/* Status Badge - Minimalista */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/3 border border-white/5 mb-3">
          <Zap className="h-3 w-3 text-primary/60" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Estado</p>
            <p className={`text-xs font-semibold ${colors.text} tabular-nums`}>
              {statusLabels[dummyMetrics.status]} · {dummyMetrics.ping}ms
            </p>
          </div>
        </div>

        {/* Technical Specs - Compacto */}
        <div className="space-y-1.5 mb-3">
          <div className="group flex items-center justify-between p-2 rounded-lg bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-200">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Codec</span>
            <span className="text-xs font-mono text-white/90">{dummyMetrics.codec}</span>
          </div>
          <div className="group flex items-center justify-between p-2 rounded-lg bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-200">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Sample Rate</span>
            <span className="text-xs font-mono text-white/90 tabular-nums">{dummyMetrics.sampleRate / 1000} kHz</span>
          </div>
          <div className="group flex items-center justify-between p-2 rounded-lg bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-200">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Canales</span>
            <span className="text-xs font-mono text-white/90">{dummyMetrics.channels === 2 ? "Estéreo" : "Mono"}</span>
          </div>
        </div>

        {/* Server Uptime - Flex-1 para ocupar espacio restante */}
        <div className="flex-1 flex items-end">
          <div className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-black/30 border border-white/5">
            <Server className="h-3 w-3 text-zinc-500" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Uptime</p>
              <p className="text-xs font-mono text-white/90">{dummyMetrics.uptime}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
