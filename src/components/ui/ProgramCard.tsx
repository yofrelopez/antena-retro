"use client";

import Image from "next/image";
import { Clock, User } from "lucide-react";
import { ModernCard } from "./ModernCard";
import type { Program } from "@/types";

interface ProgramCardProps {
  program: Program;
  hostNames: string;
}

export function ProgramCard({ program, hostNames }: ProgramCardProps) {
  return (
    <ModernCard href="/programas">
      {/* Program Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={program.imageUrl}
          alt={program.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {program.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {program.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {/* Host */}
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{hostNames}</span>
          </div>

          {/* Schedule */}
          {program.schedule[0] && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-secondary" />
              <span>
                {program.schedule[0].startTime} - {program.schedule[0].endTime}
              </span>
            </div>
          )}
        </div>

        {/* Decorative line */}
        <div className="h-1 w-20 bg-linear-to-r from-primary to-secondary rounded-full" />
      </div>
    </ModernCard>
  );
}
