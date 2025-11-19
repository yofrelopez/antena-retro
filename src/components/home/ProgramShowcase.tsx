"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Button } from "@/components/ui";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { dummyPrograms, dummyHosts } from "@/lib/dummy-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function ProgramShowcase() {
  const featuredPrograms = dummyPrograms.slice(0, 4);

  const getHostNames = (hostIds: string[]) => {
    return hostIds
      .map((id) => dummyHosts.find((host) => host.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Lo mejor de nuestra programación
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              Programas Destacados
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Descubre nuestros programas más populares
            </p>
          </div>

          <Link href="/programas" className="hidden md:block">
            <Button variant="outline" size="md">
              Ver todos
            </Button>
          </Link>
        </motion.div>

        {/* Programs grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8"
        >
          {featuredPrograms.map((program) => (
            <motion.div key={program.id} variants={itemVariants}>
              <ProgramCard
                program={program}
                hostNames={getHostNames(program.hosts)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: See all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="md:hidden text-center"
        >
          <Link href="/programas">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver todos los programas
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
