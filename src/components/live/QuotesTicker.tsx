"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  "La música es el lenguaje del espíritu. Abre el secreto de la vida trayendo paz, aboliendo la lucha. - Kahlil Gibran",
  "Donde las palabras fallan, la música habla. - Hans Christian Andersen",
  "La música puede cambiar el mundo porque puede cambiar a las personas. - Bono",
  "Sin música, la vida sería un error. - Friedrich Nietzsche",
  "La música es la banda sonora de tu vida. - Dick Clark",
  "La música es el arte más directo, entra por el oído y va al corazón. - Magdalena Martínez",
  "La música es para el alma lo que la gimnasia para el cuerpo. - Platón",
  "La música es el único idioma universal, el único lenguaje que no necesita traducción. - Anónimo",
];

export function QuotesTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000); // Cambiar cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl h-full flex flex-col"
    >
      {/* Gradient accent - sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="p-5 flex flex-col h-full">
        {/* Header - Minimalista */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
          <div className="p-1.5 rounded-lg bg-purple-500/5">
            <Quote className="h-3.5 w-3.5 text-purple-400/70" />
          </div>
          <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Frases Musicales</h3>
        </div>

        {/* Quote Display */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4"
          >
            {/* Quote Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-zinc-400 leading-relaxed italic"
            >
              "{quotes[currentIndex]}"
            </motion.p>
          </motion.div>
        </div>

        {/* Progress Indicator - Minimalista */}
        <div className="flex items-center gap-1 justify-center pt-3">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-6 bg-purple-500/70"
                  : "w-1 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
