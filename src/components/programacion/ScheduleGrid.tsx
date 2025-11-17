import type { DayOfWeek } from "@/types";
import { DAYS_OF_WEEK, DAY_NAMES } from "@/lib/constants";
import { dummyPrograms } from "@/lib/dummy-data";
import { Card } from "@/components/ui";

export function ScheduleGrid() {
  // Organizar programas por día
  const programsByDay = DAYS_OF_WEEK.map((day) => {
    const dayPrograms = dummyPrograms
      .filter((program) =>
        program.schedule.some((schedule) => schedule.dayOfWeek === day)
      )
      .map((program) => {
        const schedule = program.schedule.find((s) => s.dayOfWeek === day)!;
        return {
          ...program,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        };
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return {
      day,
      programs: dayPrograms,
    };
  });

  return (
    <div className="space-y-6">
      {/* Desktop: Table view */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="grid grid-cols-8 gap-4 min-w-[1000px]">
          {/* Header - Hours column */}
          <div className="font-semibold text-[var(--color-secondary)]">
            Horario
          </div>

          {/* Header - Days */}
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="font-semibold text-center text-[var(--color-secondary)]"
            >
              {DAY_NAMES[day]}
            </div>
          ))}

          {/* Time slots (simplified - showing programs as they are) */}
          <div className="col-span-8 grid grid-cols-8 gap-4">
            {programsByDay.map(({ day, programs }) => (
              <div key={day} className="space-y-2">
                {programs.map((program) => (
                  <Card
                    key={`${program.id}-${day}`}
                    className="p-3 bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)]"
                  >
                    <div className="text-xs font-medium text-[var(--color-primary)] mb-1">
                      {program.startTime} - {program.endTime}
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-secondary)] line-clamp-2">
                      {program.name}
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Accordion view */}
      <div className="lg:hidden space-y-4">
        {programsByDay.map(({ day, programs }) => (
          <Card key={day} className="overflow-hidden">
            <div className="bg-[var(--color-primary)] text-white p-4 font-semibold">
              {DAY_NAMES[day]}
            </div>
            <div className="p-4 space-y-3">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <div
                    key={`${program.id}-${day}`}
                    className="border-l-4 border-[var(--color-primary)] pl-4 py-2"
                  >
                    <div className="text-sm font-medium text-[var(--color-primary)] mb-1">
                      {program.startTime} - {program.endTime}
                    </div>
                    <div className="text-base font-semibold text-[var(--color-secondary)]">
                      {program.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {program.description}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No hay programas programados para este día
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
