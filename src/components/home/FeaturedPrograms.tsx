import Link from "next/link";
import Image from "next/image";
import { Container, Button, Card } from "@/components/ui";
import { dummyPrograms, dummyHosts } from "@/lib/dummy-data";

export function FeaturedPrograms() {
  // Mostrar los 4 primeros programas
  const featuredPrograms = dummyPrograms.slice(0, 4);

  const getHostNames = (hostIds: string[]) => {
    return hostIds
      .map((id) => dummyHosts.find((host) => host.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-2">
              Programas Destacados
            </h2>
            <p className="text-lg text-gray-600">
              Descubre nuestros programas más populares
            </p>
          </div>

          <Link href="/programas" className="hidden md:block">
            <Button variant="outline">Ver todos</Button>
          </Link>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredPrograms.map((program) => (
            <Card key={program.id} hover className="overflow-hidden">
              {/* Program image */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={program.imageUrl}
                  alt={program.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">
                  {program.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {program.description}
                </p>

                {/* Host info */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="truncate">{getHostNames(program.hosts)}</span>
                </div>

                {/* Schedule */}
                {program.schedule.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 text-xs text-[var(--color-primary)] font-medium">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      <span>
                        {program.schedule[0].startTime} -{" "}
                        {program.schedule[0].endTime}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile: See all button */}
        <div className="md:hidden text-center">
          <Link href="/programas">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver todos los programas
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
