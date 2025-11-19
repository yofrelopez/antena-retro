"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { Container, ModernCard, Button } from "@/components/ui";
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

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: En producción, enviar a un backend o servicio de email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset submitted message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="h-4 w-4" />
              <span>Hablemos</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              ¿Tienes algo que{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Decirnos?
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para escucharte. Comparte tus ideas, sugerencias o
              simplemente saluda.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Envíanos un{" "}
                  <span className="text-primary">Mensaje</span>
                </h2>
                <p className="text-muted-foreground">
                  Completa el formulario y te responderemos lo antes posible
                </p>
              </div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-success/10 border border-success/30 flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-success mb-1">
                      ¡Mensaje enviado con éxito!
                    </p>
                    <p className="text-sm text-success/80">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nombre completo <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 outline-none"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Correo electrónico <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 outline-none"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Asunto <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 outline-none"
                    placeholder="¿De qué quieres hablar?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Mensaje <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 outline-none resize-none"
                    placeholder="Cuéntanos lo que tienes en mente..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Información de{" "}
                  <span className="text-secondary">Contacto</span>
                </h2>
                <p className="text-muted-foreground">
                  También puedes comunicarte con nosotros por estos medios
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4"
              >
                {/* Email */}
                {radioConfig.contact.email && (
                  <motion.div variants={itemVariants}>
                    <ModernCard className="p-6 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">
                            Email
                          </h3>
                          <a
                            href={`mailto:${radioConfig.contact.email}`}
                            className="text-sm text-primary hover:underline break-all"
                          >
                            {radioConfig.contact.email}
                          </a>
                        </div>
                      </div>
                    </ModernCard>
                  </motion.div>
                )}

                {/* Phone */}
                {radioConfig.contact.phone && (
                  <motion.div variants={itemVariants}>
                    <ModernCard className="p-6 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">
                            Teléfono
                          </h3>
                          <a
                            href={`tel:${radioConfig.contact.phone}`}
                            className="text-sm text-secondary hover:underline"
                          >
                            {radioConfig.contact.phone}
                          </a>
                        </div>
                      </div>
                    </ModernCard>
                  </motion.div>
                )}

                {/* WhatsApp */}
                {radioConfig.contact.whatsapp && (
                  <motion.div variants={itemVariants}>
                    <ModernCard className="p-6 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <MessageSquare className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">
                            WhatsApp
                          </h3>
                          <a
                            href={`https://wa.me/${radioConfig.contact.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-success hover:underline inline-flex items-center gap-1"
                          >
                            {radioConfig.contact.whatsapp}
                            <span className="text-xs">↗</span>
                          </a>
                        </div>
                      </div>
                    </ModernCard>
                  </motion.div>
                )}

                {/* Address */}
                {radioConfig.contact.address && (
                  <motion.div variants={itemVariants}>
                    <ModernCard className="p-6 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">
                            Dirección
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {radioConfig.contact.address}
                          </p>
                        </div>
                      </div>
                    </ModernCard>
                  </motion.div>
                )}
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8"
              >
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-background to-secondary/10 p-8 border border-border">
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Radio className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      ¿Quieres colaborar?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Si tienes una propuesta de colaboración, programa o
                      patrocinio, nos encantaría conocerte.
                    </p>
                    <a
                      href={`mailto:${radioConfig.contact.email}?subject=Propuesta de Colaboración`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
                    >
                      Contáctanos →
                    </a>
                  </div>
                  {/* Decorative gradient */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
