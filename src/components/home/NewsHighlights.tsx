"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Button } from "@/components/ui";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { dummyNews } from "@/lib/dummy-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function NewsHighlights() {
  const latestNews = dummyNews.slice(0, 3);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
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
              Lo más reciente
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              Últimas Noticias
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Mantente informado con las noticias más recientes
            </p>
          </div>

          <Link href="/noticias" className="hidden md:block">
            <Button variant="outline" size="md">
              Ver todas
            </Button>
          </Link>
        </motion.div>

        {/* News grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
        >
          {latestNews.map((news) => (
            <motion.div key={news.id} variants={itemVariants}>
              <ArticleCard news={news} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: See all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="md:hidden text-center"
        >
          <Link href="/noticias">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver todas las noticias
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
