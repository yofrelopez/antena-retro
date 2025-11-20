"use client";

import { usePathname } from "next/navigation";
import { RadioPlayer } from "./RadioPlayer";

export function ConditionalRadioPlayer() {
  const pathname = usePathname();
  
  // Ocultar el reproductor en la página /live
  if (pathname === "/live") {
    return null;
  }

  return <RadioPlayer />;
}
