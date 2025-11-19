export default function TestPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Test de Gradientes Tailwind v4</h1>

      {/* Test 1: bg-linear-to-r básico */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Gradiente lineal básico (bg-linear-to-r)</h2>
        <div className="h-32 bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
          <p className="text-white font-bold">bg-linear-to-r from-cyan-500 to-blue-500</p>
        </div>
      </div>

      {/* Test 2: bg-linear-to-br */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Gradiente diagonal (bg-linear-to-br)</h2>
        <div className="h-32 bg-linear-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-border">
          <p className="font-bold">bg-linear-to-br from-primary/20 to-accent/20</p>
        </div>
      </div>

      {/* Test 3: bg-linear-to-tr */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Gradiente diagonal inverso (bg-linear-to-tr)</h2>
        <div className="h-32 bg-linear-to-tr from-secondary/15 to-primary/15 rounded-lg flex items-center justify-center border border-border">
          <p className="font-bold">bg-linear-to-tr from-secondary/15 to-primary/15</p>
        </div>
      </div>

      {/* Test 4: Con via */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Gradiente con punto intermedio (via)</h2>
        <div className="h-32 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <p className="text-white font-bold">bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500</p>
        </div>
      </div>

      {/* Test 5: Gradiente del footer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Gradiente del footer (simulación)</h2>
        <div className="h-32 bg-linear-to-br from-background via-muted/40 to-background rounded-lg flex items-center justify-center border border-border">
          <p className="font-bold">bg-linear-to-br from-background via-muted/40 to-background</p>
        </div>
      </div>

      {/* Test 6: Blur effect como en footer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Blob con blur (como en footer)</h2>
        <div className="relative h-64 bg-background rounded-lg overflow-hidden border border-border">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl bg-linear-to-br from-primary/20 to-accent/20" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <p className="font-bold">Blob con blur-3xl</p>
          </div>
        </div>
      </div>

      {/* Test 7: Radial gradient */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Gradiente radial (bg-radial)</h2>
        <div className="h-32 bg-radial from-pink-400 from-40% to-fuchsia-700 rounded-lg flex items-center justify-center">
          <p className="text-white font-bold">bg-radial from-pink-400 from-40% to-fuchsia-700</p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-muted/50 border border-border rounded-lg">
        <p className="text-sm">
          <strong>Instrucciones:</strong> Si NO ves los gradientes arriba, significa que hay un problema con la configuración de Tailwind v4.
          Abre DevTools (F12) e inspecciona los elementos para ver qué CSS se está aplicando.
        </p>
      </div>
    </div>
  );
}
