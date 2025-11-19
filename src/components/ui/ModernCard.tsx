"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

interface ModernCardProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export function ModernCard({ children, href, className = "" }: ModernCardProps) {
  const cardContent = (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-background to-secondary/10 p-0.5 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-background/95 backdrop-blur-sm h-full">
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
