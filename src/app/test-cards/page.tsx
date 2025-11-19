"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { dummyPrograms, dummyHosts } from "@/lib/dummy-data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, Play, Radio, Heart } from "lucide-react";

export default function TestCardsPage() {
  const program = dummyPrograms[0];
  const hostNames = program.hosts
    .map((id) => dummyHosts.find((host) => host.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen py-20 bg-background">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3 text-foreground">Test de Diseño de Cards</h1>
          <p className="text-muted-foreground">Prueba del nuevo diseño inspirado en Dribbble</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mb-12">
          {/* Nueva Card con diseño moderno */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Nuevo Diseño</h2>
            <Link href="/programas">
              <motion.div
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-background to-secondary/10 p-0.5 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-500"
              >
                <div className="relative overflow-hidden rounded-2xl bg-background/95 backdrop-blur-sm">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={program.imageUrl}
                      alt={program.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="relative p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {program.name}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {program.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-primary" />
                        <span className="line-clamp-1">{hostNames}</span>
                      </div>
                      {program.schedule[0] && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span>
                            {program.schedule[0].startTime} - {program.schedule[0].endTime}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="h-1 w-20 bg-linear-to-r from-primary to-secondary rounded-full" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Características</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3 text-sm text-foreground">
              <p> Borde gradiente sutil (primary  secondary)</p>
              <p> Sombra con glow effect en hover</p>
              <p> Lift effect (-8px) suave</p>
              <p> Zoom de imagen al 110%</p>
              <p> Título cambia a color primary</p>
              <p> Iconos con colores de tema</p>
              <p> Línea decorativa gradiente</p>
              <p> Sin bordes duros</p>
              <p> Adaptable dark/light mode</p>
            </div>
          </div>
        </div>

        {/* Nueva sección de botones */}
        <div className="border-t border-border/50 pt-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Botones Mejorados</h2>
          
          <div className="space-y-8">
            {/* Primary & Secondary */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Primarios</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">
                  <Play className="h-4 w-4" />
                  Reproducir
                </Button>
                <Button variant="primary" size="md">
                  <Radio className="h-5 w-5" />
                  Escuchar Ahora
                </Button>
                <Button variant="primary" size="lg">
                  Botón Grande
                </Button>
                <Button variant="primary" size="md" rounded="full">
                  <Heart className="h-5 w-5" />
                  Me Gusta
                </Button>
              </div>
            </div>

            {/* Secondary */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Secundarios</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">Pequeño</Button>
                <Button variant="secondary" size="md">Mediano</Button>
                <Button variant="secondary" size="lg">Grande</Button>
                <Button variant="secondary" size="md" rounded="full">
                  Redondeado
                </Button>
              </div>
            </div>

            {/* Outline & Ghost */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Outline & Ghost</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">Outline Pequeño</Button>
                <Button variant="outline" size="md">Outline Mediano</Button>
                <Button variant="ghost" size="md">Ghost</Button>
                <Button variant="outline" size="md" rounded="full">
                  Outline Full
                </Button>
              </div>
            </div>

            {/* Destructive */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Destructivo</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" size="sm">Eliminar</Button>
                <Button variant="destructive" size="md">Borrar Permanentemente</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
