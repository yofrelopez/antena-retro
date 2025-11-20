"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { dummyLiveData } from "@/lib/dummy-data/live-data";

// Mapeo de países a sus banderas emoji
const countryFlags: Record<string, string> = {
  "Argentina": "🇦🇷",
  "México": "🇲🇽",
  "España": "🇪🇸",
  "Colombia": "🇨🇴",
  "Chile": "🇨🇱",
  "Perú": "🇵🇪",
  "Uruguay": "🇺🇾",
  "Venezuela": "🇻🇪",
  "Ecuador": "🇪🇨",
  "Bolivia": "🇧🇴",
};

export function TopCountries() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/50">
          <Globe className="h-4 w-4 text-blue-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Top Países</h3>
      </div>

      {/* Countries List */}
      <div className="flex-1 p-4 space-y-2">
        {dummyLiveData.listeners.locations.map((location, index) => (
          <motion.div
            key={location.country}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Position Badge */}
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                  index === 1 ? 'bg-zinc-400/20 text-zinc-300 border border-zinc-400/30' :
                  index === 2 ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' :
                  'bg-white/5 text-zinc-500 border border-white/10'}
              `}>
                {index + 1}
              </div>

              {/* Flag + Country */}
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">
                  {countryFlags[location.country] || "🌎"}
                </span>
                <span className="text-sm font-medium text-white">
                  {location.country}
                </span>
              </div>
            </div>

            {/* Count */}
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-primary">
                {location.count}
              </span>
              <span className="text-xs text-zinc-500">oyentes</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total Footer */}
      <div className="p-3 border-t border-white/5 bg-black/20">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Total global</span>
          <span className="text-sm font-bold text-white">
            {dummyLiveData.listeners.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} oyentes
          </span>
        </div>
      </div>
    </motion.div>
  );
}
