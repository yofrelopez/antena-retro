import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ProgramSchedule } from "@/components/programacion/ProgramSchedule";
import { Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Programación",
  description: "Conoce nuestra programación semanal con los mejores programas y shows.",
};

export default function ProgramacionPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Programación 24/7
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Nuestra Programación
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubre todos nuestros programas y sus horarios. La mejor música y 
            entretenimiento las 24 horas del día, los 7 días de la semana.
          </p>
        </div>

        {/* Schedule */}
        <ProgramSchedule />
      </Container>
    </div>
  );
}
