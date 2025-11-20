import type { Metadata } from "next";
import { LiveDashboard } from "@/components/live/LiveDashboard";

export const metadata: Metadata = {
  title: "En Vivo | Antena Retro",
  description: "Experimenta la radio en vivo con visualización de audio en tiempo real, estadísticas y metadatos del stream.",
};

export default function LivePage() {
  return <LiveDashboard />;
}
