import type { Metadata } from "next";
import { Container, Card } from "@/components/ui";
import { radioConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce más sobre nuestra historia, misión y el equipo que hace posible la radio.",
};

export default function NosotrosPage() {
  return (
    <div className="py-16 md:py-24">
      <Container size="narrow">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-secondary)] mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {radioConfig.description}
          </p>
        </div>

        {/* Mission section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">
            Nuestra Misión
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            En <strong>{radioConfig.name}</strong>, nos dedicamos a ofrecer la
            mejor programación musical y contenido de calidad las 24 horas del
            día, los 7 días de la semana.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nuestra misión es conectar con nuestra audiencia a través de música
            excepcional, noticias relevantes y programas que inspiran, entretienen
            e informan a nuestra comunidad.
          </p>
        </section>

        {/* Values section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                Calidad
              </h3>
              <p className="text-gray-700">
                Nos comprometemos a ofrecer contenido de la más alta calidad,
                cuidadosamente seleccionado para nuestra audiencia.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                Innovación
              </h3>
              <p className="text-gray-700">
                Adoptamos las últimas tecnologías para brindar la mejor
                experiencia de radio online a nuestros oyentes.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                Comunidad
              </h3>
              <p className="text-gray-700">
                Valoramos a nuestra comunidad de oyentes y nos esforzamos por
                ser su voz y compañía diaria.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                Diversidad
              </h3>
              <p className="text-gray-700">
                Celebramos la diversidad musical y cultural, ofreciendo una
                programación variada y inclusiva.
              </p>
            </Card>
          </div>
        </section>

        {/* History section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">
            Nuestra Historia
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Desde nuestros inicios, {radioConfig.name} se ha caracterizado por
              su pasión por la música y el compromiso con la excelencia en la
              radiodifusión.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              A lo largo de los años, hemos evolucionado constantemente,
              adaptándonos a las nuevas tecnologías y tendencias, pero siempre
              manteniendo nuestro espíritu original: conectar con las personas a
              través de la música y el entretenimiento de calidad.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Hoy, nos enorgullece ser una de las radios online más escuchadas,
              con una comunidad de oyentes leales que nos acompañan día a día.
            </p>
          </div>
        </section>

        {/* Contact info */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6">
            Información de Contacto
          </h2>
          <div className="space-y-3 text-gray-700">
            {radioConfig.contact.email && (
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${radioConfig.contact.email}`}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  {radioConfig.contact.email}
                </a>
              </p>
            )}
            {radioConfig.contact.phone && (
              <p>
                <strong>Teléfono:</strong>{" "}
                <a
                  href={`tel:${radioConfig.contact.phone}`}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  {radioConfig.contact.phone}
                </a>
              </p>
            )}
            {radioConfig.contact.address && (
              <p>
                <strong>Dirección:</strong> {radioConfig.contact.address}
              </p>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
