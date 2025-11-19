"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Radio, 
  Target, 
  Award, 
  Zap, 
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Container, ModernCard } from "@/components/ui";
import { radioConfig } from "@/lib/config";

// Animation variants
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

// Icon mapping
const iconMap = {
  Award,
  Zap,
  Users,
  Sparkles,
} as const;

export default function NosotrosPage() {
  const { about, contact, name } = radioConfig;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-br from-primary/5 via-background to-secondary/5">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-white/5 mask-[linear-gradient(0deg,transparent,black)]" />
        
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              <span>Conócenos</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Sobre{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nosotros
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {about.mission.description}
            </p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-border/30"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {about.stats.yearsOnAir}+
                </div>
                <div className="text-sm text-muted-foreground">Años al Aire</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">
                  {about.stats.totalPrograms}
                </div>
                <div className="text-sm text-muted-foreground">Programas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                  {about.stats.teamMembers}
                </div>
                <div className="text-sm text-muted-foreground">Miembros</div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {about.mission.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {about.mission.description}
            </p>
            <div className="h-1 w-24 bg-linear-to-r from-primary to-secondary rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <Radio className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {about.vision.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {about.vision.description}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Valores
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo diario
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {about.values.map((value) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap];
              return (
                <motion.div key={value.id} variants={itemVariants}>
                  <div className="group relative overflow-hidden rounded-2xl bg-background border border-border p-8 h-full hover:border-primary/50 transition-all duration-500">
                    {/* Decorative gradient background on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon with gradient background and pulse effect */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Icon className="h-8 w-8 text-primary relative z-10" />
                      </div>
                      {/* Small accent dot */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                    {/* Bottom decorative element */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_100%] group-hover:animate-[shimmer_2s_linear_infinite]" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Timeline/History Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestra{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Historia
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un recorrido por los momentos clave que nos han definido
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            {about.timeline.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Connecting line */}
                {index < about.timeline.length - 1 && (
                  <div className="absolute left-0 top-6 bottom-0 w-0.5 bg-linear-to-b from-primary to-secondary" />
                )}

                {/* Year badge */}
                <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <div className="w-3 h-3 rounded-full bg-background" />
                </div>

                {/* Content */}
                <div className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                  <div className="text-sm font-bold text-primary mb-2">
                    {milestone.year}
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Información de{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Contacto
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para escucharte
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {/* Email */}
            {contact.email && (
              <motion.div variants={itemVariants}>
                <ModernCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Email</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            )}

            {/* Phone */}
            {contact.phone && (
              <motion.div variants={itemVariants}>
                <ModernCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Phone className="h-7 w-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Teléfono</h3>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sm text-secondary hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            )}

            {/* Address */}
            {contact.address && (
              <motion.div variants={itemVariants}>
                <ModernCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <MapPin className="h-7 w-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Dirección</h3>
                      <p className="text-sm text-muted-foreground">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
