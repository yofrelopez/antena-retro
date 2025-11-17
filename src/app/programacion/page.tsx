import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ScheduleGrid } from "@/components/programacion/ScheduleGrid";

export const metadata: Metadata = {
  title: "Programación",
  description: "Conoce nuestra programación semanal con los mejores programas y shows.",
};

export default function ProgramacionPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-secondary)] mb-4">
            Programación Semanal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre todos nuestros programas y sus horarios. Nunca te pierdas
            tu show favorito.
          </p>
        </div>

        {/* Schedule */}
        <ScheduleGrid />
      </Container>
    </div>
  );
}
