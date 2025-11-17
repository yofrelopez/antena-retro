# RadioWebPro – Plantilla para radios (Next.js 16)

## Qué es este proyecto

RadioWebPro es una **plantilla web profesional para emisoras de radio**, construida con **Next.js 16, TypeScript y Tailwind CSS**.

Objetivo:
- Proveer una base reutilizable para radios locales / online.
- Incluir secciones típicas: Home con reproductor en vivo, Programación, Noticias, Programas/Locutores, Nosotros, Contacto.
- Código limpio, modular y fácil de adaptar a nuevos clientes.

## Tecnologías principales

- Next.js 16 (App Router, `app/`)
- React + TypeScript
- Tailwind CSS
- Turbopack
- (Más adelante) integración con proveedor de streaming y CMS.

## Estructura esperada (versión inicial)

- `app/`
  - `page.tsx` → Home
  - `programacion/page.tsx`
  - `noticias/page.tsx`
  - `noticias/[slug]/page.tsx`
  - `programas/page.tsx` (o `locutores/page.tsx`)
  - `nosotros/page.tsx`
  - `contacto/page.tsx`
- `components/`
  - `layout/` (Header, Footer, MainLayout)
  - `player/` (PlayerBar, NowPlaying)
  - `home/` (secciones de la Home)
  - `noticias/` (NewsCard, NewsList)
- `lib/`
  - `config.ts` (datos de la radio, colores, links)
  - `dummy-data/` (programación y noticias de prueba al inicio)

## Cómo quiero que trabajes (Claude Code)

- Antes de modificar archivos, **propón un plan breve** y espera mi aprobación.
- Prefiero cambios **pequeños y bien aislados** (por ejemplo: “crear solo las rutas vacías”).
- No ejecutes comandos ni borres archivos sin que yo lo pida explícitamente.
- Sigue convenciones de:
  - Componentes en TypeScript (`.tsx`).
  - Estilos con Tailwind.
  - Mantener el layout limpio y reutilizable.

## Comandos de desarrollo

- `npm run dev` → servidor de desarrollo
- `npm run build` → build de producción
- `npm run lint` → lint

