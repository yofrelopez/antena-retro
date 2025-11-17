import { radioConfig } from "@/lib/config";
import { Container, Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] py-20 md:py-32">
      <Container>
        <div className="relative z-10 text-center text-white">
          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            {radioConfig.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 opacity-95">
            {radioConfig.tagline}
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            {radioConfig.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto min-w-[200px]"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Escuchar en vivo
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] bg-white/10 border-white text-white hover:bg-white hover:text-[var(--color-primary)]"
            >
              Ver programación
            </Button>
          </div>

          {/* Live indicator */}
          <div className="mt-12 inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            <span className="text-sm font-medium uppercase tracking-wide">
              Transmitiendo en vivo 24/7
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
      </Container>
    </section>
  );
}
