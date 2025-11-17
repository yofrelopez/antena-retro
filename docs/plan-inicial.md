# Plan de Arquitectura Inicial - RadioWebPro

## 📋 Contexto
Proyecto Next.js 16 + TypeScript + Tailwind CSS v4, base limpia con solo layout y page inicial.

---

## 🗂️ FASE 1: Estructura de Carpetas

### 1.1 Carpetas en `src/`
```
src/
├── app/                    (ya existe - App Router)
├── components/             (crear - componentes reutilizables)
├── lib/                    (crear - utilidades, config, datos)
└── types/                  (crear - tipos TypeScript compartidos)
```

### 1.2 Estructura completa de `components/`
```
components/
├── layout/
│   ├── Header.tsx         (navegación principal)
│   ├── Footer.tsx         (pie de página con redes sociales)
│   └── MainLayout.tsx     (wrapper opcional si se necesita lógica extra)
├── player/
│   ├── PlayerBar.tsx      (barra reproductora sticky)
│   └── NowPlaying.tsx     (información de canción/programa actual)
├── home/
│   ├── HeroSection.tsx    (sección principal con CTA)
│   ├── FeaturedPrograms.tsx
│   ├── LatestNews.tsx
│   └── ContactCTA.tsx
├── noticias/
│   ├── NewsCard.tsx       (tarjeta individual)
│   ├── NewsList.tsx       (grid de noticias)
│   └── NewsDetail.tsx     (componente para detalle)
├── programacion/
│   ├── ScheduleGrid.tsx   (grilla semanal)
│   └── ProgramCard.tsx    (tarjeta de programa)
└── ui/                    (componentes básicos reutilizables)
    ├── Button.tsx
    ├── Card.tsx
    └── Container.tsx
```

### 1.3 Estructura de `lib/`
```
lib/
├── config.ts              (configuración global de la radio)
├── constants.ts           (constantes: días, horarios, etc.)
├── utils.ts               (helpers: formateo de fechas, slugs, etc.)
├── dummy-data/
│   ├── programs.ts        (datos de programación dummy)
│   ├── news.ts            (noticias de prueba)
│   ├── hosts.ts           (locutores/conductores)
│   └── schedule.ts        (grilla horaria semanal)
└── types.ts               (o mover a src/types/)
```

### 1.4 Estructura de `types/`
```
types/
├── index.ts               (exportaciones principales)
├── radio.ts               (tipos: Program, Host, Schedule)
└── content.ts             (tipos: News, Article)
```

---

## 🛣️ FASE 2: Rutas en `app/`

### 2.1 Rutas principales a crear
```
app/
├── layout.tsx             (✅ existe - actualizar metadata y fuentes)
├── page.tsx               (✅ existe - reemplazar con Home de radio)
├── programacion/
│   └── page.tsx           (programación semanal)
├── noticias/
│   ├── page.tsx           (listado de noticias)
│   └── [slug]/
│       └── page.tsx       (detalle de noticia dinámica)
├── programas/             (o "locutores" según preferencia)
│   └── page.tsx           (programas y conductores)
├── nosotros/
│   └── page.tsx           (sobre la radio)
└── contacto/
    └── page.tsx           (formulario de contacto)
```

### 2.2 Metadata y SEO
- Actualizar `metadata` en cada `page.tsx` con info específica
- Usar `generateMetadata` para páginas dinámicas ([slug])
- Configurar Open Graph y Twitter Cards

---

## ⚙️ FASE 3: Configuraciones Específicas Next.js 16

### 3.1 Actualizar `src/app/layout.tsx`
- Cambiar metadata global (título, descripción de RadioWebPro)
- Integrar Header y Footer
- Configurar PlayerBar sticky (siempre visible)
- Mantener fuentes Geist o cambiar según diseño

### 3.2 Crear `lib/config.ts`
```typescript
export const radioConfig = {
  name: "Radio [Nombre]",
  tagline: "Tu música, tu radio",
  streamUrl: "https://streaming.ejemplo.com/radio.mp3",
  social: {
    facebook: "...",
    instagram: "...",
    twitter: "...",
  },
  contact: {
    email: "info@radio.com",
    phone: "+123456789",
    address: "..."
  },
  colors: {
    primary: "#FF6B00",  // ejemplo
    secondary: "#1A1A1A"
  }
}
```

### 3.3 Ajustes en `next.config.ts` (si necesario)
- Configurar `images.domains` si se usan URLs externas
- Habilitar `experimental.reactCompiler` si se quiere usar React Compiler
- (Opcional) `experimental.ppr` para Partial Prerendering

### 3.4 Tailwind CSS v4 - Customización
- Actualizar `globals.css` con variables de color de la radio
- Usar `@theme inline` para definir paleta personalizada
- Configurar dark mode si se requiere

---

## 📦 FASE 4: Componentes Base Iniciales

### 4.1 Orden de creación recomendado

1. **UI básicos** (`components/ui/`)
   - Container.tsx, Button.tsx, Card.tsx

2. **Layout** (`components/layout/`)
   - Header.tsx (con navegación)
   - Footer.tsx

3. **Player** (`components/player/`)
   - PlayerBar.tsx (reproductor HTML5 audio)
   - NowPlaying.tsx

4. **Home** (`components/home/`)
   - HeroSection.tsx
   - LatestNews.tsx
   - FeaturedPrograms.tsx

5. **Noticias** (`components/noticias/`)
   - NewsCard.tsx
   - NewsList.tsx

6. **Programación** (`components/programacion/`)
   - ScheduleGrid.tsx
   - ProgramCard.tsx

### 4.2 Datos dummy iniciales
- Crear 5-10 programas de ejemplo
- Crear 6-8 noticias con slug, título, extracto, imagen
- Crear grilla horaria semanal básica
- 3-4 locutores/conductores

---

## 🎨 FASE 5: Consideraciones de Diseño

### 5.1 Responsive
- Mobile-first approach con Tailwind
- Breakpoints: sm, md, lg, xl, 2xl
- PlayerBar sticky en mobile (bottom) y desktop (bottom o top)

### 5.2 Accesibilidad
- Controles del player accesibles (ARIA labels)
- Navegación keyboard-friendly
- Contraste de colores WCAG AA

### 5.3 Performance
- Optimizar imágenes con next/image
- Lazy loading para noticias
- Streaming eficiente del audio

---

## 🚀 FASE 6: Orden de Implementación Propuesto

### Sprint 1: Fundamentos
1. Crear estructura de carpetas completa (vacías)
2. Crear `lib/config.ts` con datos de configuración
3. Crear tipos TypeScript básicos
4. Actualizar `app/layout.tsx` con metadata correcta

### Sprint 2: Layout y Navegación
5. Componentes UI básicos (Container, Button, Card)
6. Header con navegación
7. Footer con redes sociales
8. Integrar Header/Footer en layout.tsx

### Sprint 3: Reproductor
9. PlayerBar básico (HTML5 audio)
10. NowPlaying component
11. Integrar en layout como sticky

### Sprint 4: Home
12. Datos dummy (programs, news, schedule)
13. HeroSection
14. LatestNews con NewsCard
15. FeaturedPrograms
16. Actualizar `app/page.tsx` con componentes de Home

### Sprint 5: Rutas Restantes
17. `/programacion` con ScheduleGrid
18. `/noticias` con NewsList
19. `/noticias/[slug]` con NewsDetail
20. `/programas`, `/nosotros`, `/contacto` (versiones básicas)

---

## ✅ Checklist Final

- [ ] Todas las carpetas creadas
- [ ] Tipos TypeScript definidos
- [ ] Configuración global (`lib/config.ts`)
- [ ] Datos dummy listos
- [ ] Layout completo (Header, Footer, Player)
- [ ] Home funcional con secciones
- [ ] Todas las rutas creadas y navegables
- [ ] Responsive en mobile y desktop
- [ ] Metadata y SEO básico configurado
- [ ] Player de audio funcional
- [ ] Build exitoso (`npm run build`)
- [ ] Sin errores de TypeScript ni ESLint

---

## 📝 Notas Importantes

- **No instalar dependencias nuevas** en esta fase (solo usar lo que ya está)
- Reproductor inicial será HTML5 `<audio>` nativo (sin librerías externas)
- Imágenes placeholder usando placeholders online o SVGs
- Formulario de contacto sin backend inicialmente (solo UI)
- Todo el contenido es dummy/estático hasta integrar CMS

---

## 🔄 Próximos Pasos

Una vez completada esta arquitectura base, se podrán agregar:
- Integración con API de streaming real
- CMS headless (Strapi, Contentful, etc.)
- Backend para formulario de contacto
- Analytics y métricas
- PWA capabilities
- Notificaciones push
- Player avanzado con controles extra

---
---

# 🚀 VERSIÓN 2.0: Sistema de Configuración Avanzado

## 📋 Objetivo de la V2

Convertir la plantilla en un producto **plug & play** que cualquier cliente (técnico o no técnico) pueda configurar sin tocar código.

**Problema actual (V1):**
- Los datos de la radio están hardcodeados en `lib/config.ts`
- El cliente debe editar código TypeScript
- Hay que recompilar tras cada cambio
- No es práctico para usuarios no técnicos

**Solución (V2):**
- Sistema de configuración basado en variables de entorno
- Wizard CLI interactivo (`npm run setup`)
- Panel de administración web opcional (`/admin`)
- Cero edición de código necesaria

---

## 🏗️ Arquitectura del Sistema de Configuración

### Opción A: Variables de Entorno + Wizard CLI (Recomendado para V2.0)

#### Estructura de archivos adicionales:
```
├── .env.example                    (plantilla de configuración)
├── .env.local                      (archivo real, git-ignored)
├── lib/
│   ├── config.ts                   (actualizado: lee env vars)
│   └── validation/
│       └── config-schema.ts        (validación con Zod)
├── scripts/
│   └── setup.js                    (wizard CLI interactivo)
└── docs/
    └── configuracion.md            (guía de configuración)
```

---

## 📝 Variables de Entorno Necesarias

### Archivo `.env.example`
```bash
# ========================================
# CONFIGURACIÓN RADIOWBPRO V2.0
# ========================================
# Copia este archivo a .env.local y personaliza los valores
# o ejecuta: npm run setup

# ========================================
# 1. INFORMACIÓN BÁSICA
# ========================================
NEXT_PUBLIC_RADIO_NAME="Radio Ejemplo"
NEXT_PUBLIC_RADIO_TAGLINE="Tu música, tu radio"
NEXT_PUBLIC_RADIO_DESCRIPTION="La mejor música de tu ciudad las 24 horas del día"

# ========================================
# 2. STREAMING
# ========================================
NEXT_PUBLIC_STREAM_URL="https://streaming.ejemplo.com/radio.mp3"
# Formato alternativo (opcional): .aac, .ogg, etc.
NEXT_PUBLIC_STREAM_FORMAT="mp3"

# ========================================
# 3. BRANDING
# ========================================
# Logo principal (recomendado: SVG o PNG transparente)
NEXT_PUBLIC_LOGO_URL="/logo.svg"
NEXT_PUBLIC_LOGO_ALT="Logo de Radio Ejemplo"

# Favicon
NEXT_PUBLIC_FAVICON_URL="/favicon.ico"

# Imagen para Open Graph (compartir en redes)
NEXT_PUBLIC_OG_IMAGE="/og-image.jpg"

# ========================================
# 4. COLORES (Formato HEX)
# ========================================
NEXT_PUBLIC_COLOR_PRIMARY="#FF6B00"
NEXT_PUBLIC_COLOR_SECONDARY="#1A1A1A"
NEXT_PUBLIC_COLOR_ACCENT="#FFC107"
NEXT_PUBLIC_COLOR_BACKGROUND="#FFFFFF"
NEXT_PUBLIC_COLOR_TEXT="#171717"

# ========================================
# 5. REDES SOCIALES
# ========================================
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/turadio"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/turadio"
NEXT_PUBLIC_TWITTER_URL="https://twitter.com/turadio"
NEXT_PUBLIC_YOUTUBE_URL=""
NEXT_PUBLIC_TIKTOK_URL=""
NEXT_PUBLIC_LINKEDIN_URL=""

# ========================================
# 6. INFORMACIÓN DE CONTACTO
# ========================================
NEXT_PUBLIC_EMAIL="info@radioejemplo.com"
NEXT_PUBLIC_PHONE="+34 123 456 789"
NEXT_PUBLIC_WHATSAPP="+34123456789"
NEXT_PUBLIC_ADDRESS="Calle Principal 123, 28001 Madrid, España"

# Coordenadas para mapa (opcional)
NEXT_PUBLIC_MAP_LAT="40.416775"
NEXT_PUBLIC_MAP_LNG="-3.703790"

# ========================================
# 7. SEO Y METADATOS
# ========================================
NEXT_PUBLIC_SITE_URL="https://radioejemplo.com"
NEXT_PUBLIC_SITE_LANG="es"
NEXT_PUBLIC_TIMEZONE="Europe/Madrid"

# Keywords (separadas por coma)
NEXT_PUBLIC_SEO_KEYWORDS="radio online,música en vivo,radio streaming,radio local"

# ========================================
# 8. INTEGRACIONES (Opcional)
# ========================================
# Google Analytics
NEXT_PUBLIC_GA_ID=""

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=""

# API de Metadatos de canción (si aplica)
NEXT_PUBLIC_NOWPLAYING_API=""

# ========================================
# 9. CONFIGURACIÓN AVANZADA
# ========================================
# Mostrar reproductor al cargar la página
NEXT_PUBLIC_AUTOPLAY="false"

# Volumen inicial (0.0 a 1.0)
NEXT_PUBLIC_DEFAULT_VOLUME="0.7"

# Habilitar modo oscuro
NEXT_PUBLIC_DARK_MODE_ENABLED="true"
```

---

## 🛠️ Actualización de `lib/config.ts`

```typescript
// lib/config.ts
import { validateConfig } from './validation/config-schema';

const rawConfig = {
  // Información básica
  name: process.env.NEXT_PUBLIC_RADIO_NAME || "Radio Sin Configurar",
  tagline: process.env.NEXT_PUBLIC_RADIO_TAGLINE || "",
  description: process.env.NEXT_PUBLIC_RADIO_DESCRIPTION || "",

  // Streaming
  streaming: {
    url: process.env.NEXT_PUBLIC_STREAM_URL || "",
    format: process.env.NEXT_PUBLIC_STREAM_FORMAT || "mp3",
    autoplay: process.env.NEXT_PUBLIC_AUTOPLAY === "true",
    defaultVolume: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_VOLUME || "0.7"),
  },

  // Branding
  branding: {
    logo: process.env.NEXT_PUBLIC_LOGO_URL || "/logo.svg",
    logoAlt: process.env.NEXT_PUBLIC_LOGO_ALT || "",
    favicon: process.env.NEXT_PUBLIC_FAVICON_URL || "/favicon.ico",
    ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || "/og-image.jpg",
  },

  // Colores
  colors: {
    primary: process.env.NEXT_PUBLIC_COLOR_PRIMARY || "#FF6B00",
    secondary: process.env.NEXT_PUBLIC_COLOR_SECONDARY || "#1A1A1A",
    accent: process.env.NEXT_PUBLIC_COLOR_ACCENT || "#FFC107",
    background: process.env.NEXT_PUBLIC_COLOR_BACKGROUND || "#FFFFFF",
    text: process.env.NEXT_PUBLIC_COLOR_TEXT || "#171717",
  },

  // Redes sociales
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  },

  // Contacto
  contact: {
    email: process.env.NEXT_PUBLIC_EMAIL || "",
    phone: process.env.NEXT_PUBLIC_PHONE || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
    address: process.env.NEXT_PUBLIC_ADDRESS || "",
    location: {
      lat: parseFloat(process.env.NEXT_PUBLIC_MAP_LAT || "0"),
      lng: parseFloat(process.env.NEXT_PUBLIC_MAP_LNG || "0"),
    }
  },

  // SEO
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
    lang: process.env.NEXT_PUBLIC_SITE_LANG || "es",
    timezone: process.env.NEXT_PUBLIC_TIMEZONE || "UTC",
    keywords: process.env.NEXT_PUBLIC_SEO_KEYWORDS?.split(',') || [],
  },

  // Integraciones
  integrations: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID || "",
    facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
    nowPlayingApi: process.env.NEXT_PUBLIC_NOWPLAYING_API || "",
  },

  // Features
  features: {
    darkMode: process.env.NEXT_PUBLIC_DARK_MODE_ENABLED === "true",
  }
};

// Validar y exportar
export const radioConfig = validateConfig(rawConfig);
```

---

## ✅ Validación con Zod

```typescript
// lib/validation/config-schema.ts
import { z } from 'zod';

const hexColorSchema = z.string().regex(/^#[0-9A-F]{6}$/i, {
  message: "El color debe ser un código hexadecimal válido (ej: #FF6B00)"
});

const urlSchema = z.string().url().or(z.literal(""));

export const configSchema = z.object({
  name: z.string().min(1, "El nombre de la radio es obligatorio"),
  tagline: z.string(),
  description: z.string(),

  streaming: z.object({
    url: z.string().url("La URL de streaming debe ser válida"),
    format: z.enum(["mp3", "aac", "ogg"]),
    autoplay: z.boolean(),
    defaultVolume: z.number().min(0).max(1),
  }),

  branding: z.object({
    logo: z.string(),
    logoAlt: z.string(),
    favicon: z.string(),
    ogImage: z.string(),
  }),

  colors: z.object({
    primary: hexColorSchema,
    secondary: hexColorSchema,
    accent: hexColorSchema,
    background: hexColorSchema,
    text: hexColorSchema,
  }),

  social: z.object({
    facebook: urlSchema,
    instagram: urlSchema,
    twitter: urlSchema,
    youtube: urlSchema,
    tiktok: urlSchema,
    linkedin: urlSchema,
  }),

  contact: z.object({
    email: z.string().email().or(z.literal("")),
    phone: z.string(),
    whatsapp: z.string(),
    address: z.string(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),

  seo: z.object({
    siteUrl: urlSchema,
    lang: z.string(),
    timezone: z.string(),
    keywords: z.array(z.string()),
  }),

  integrations: z.object({
    googleAnalytics: z.string(),
    facebookPixel: z.string(),
    nowPlayingApi: urlSchema,
  }),

  features: z.object({
    darkMode: z.boolean(),
  }),
});

export type RadioConfig = z.infer<typeof configSchema>;

export function validateConfig(config: unknown): RadioConfig {
  try {
    return configSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Error en la configuración:");
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error("La configuración de la radio contiene errores. Revisa el archivo .env.local");
    }
    throw error;
  }
}
```

---

## 🧙 Script de Setup Interactivo

```javascript
// scripts/setup.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('\n🎙️  RADIOWBPRO - Configurador Interactivo\n');
  console.log('Este asistente te ayudará a configurar tu radio.\n');

  const config = {};

  // 1. Información básica
  console.log('📋 1. INFORMACIÓN BÁSICA\n');
  config.NEXT_PUBLIC_RADIO_NAME = await question('Nombre de la radio: ');
  config.NEXT_PUBLIC_RADIO_TAGLINE = await question('Eslogan: ');
  config.NEXT_PUBLIC_RADIO_DESCRIPTION = await question('Descripción breve: ');

  // 2. Streaming
  console.log('\n🎵 2. STREAMING\n');
  config.NEXT_PUBLIC_STREAM_URL = await question('URL del stream de audio: ');

  // 3. Colores
  console.log('\n🎨 3. COLORES (formato #RRGGBB)\n');
  config.NEXT_PUBLIC_COLOR_PRIMARY = await question('Color primario [#FF6B00]: ') || '#FF6B00';
  config.NEXT_PUBLIC_COLOR_SECONDARY = await question('Color secundario [#1A1A1A]: ') || '#1A1A1A';

  // 4. Contacto
  console.log('\n📞 4. CONTACTO\n');
  config.NEXT_PUBLIC_EMAIL = await question('Email: ');
  config.NEXT_PUBLIC_PHONE = await question('Teléfono: ');
  config.NEXT_PUBLIC_ADDRESS = await question('Dirección física: ');

  // 5. Redes sociales
  console.log('\n📱 5. REDES SOCIALES (dejar vacío si no aplica)\n');
  config.NEXT_PUBLIC_FACEBOOK_URL = await question('Facebook: ');
  config.NEXT_PUBLIC_INSTAGRAM_URL = await question('Instagram: ');
  config.NEXT_PUBLIC_TWITTER_URL = await question('Twitter/X: ');

  // Generar .env.local
  let envContent = '# Configuración generada por npm run setup\n\n';

  for (const [key, value] of Object.entries(config)) {
    if (value) {
      envContent += `${key}="${value}"\n`;
    }
  }

  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);

  console.log('\n✅ ¡Configuración completada!');
  console.log(`📄 Archivo creado: .env.local`);
  console.log('\n💡 Próximos pasos:');
  console.log('   1. Edita .env.local si necesitas ajustar algo');
  console.log('   2. Coloca tu logo en public/logo.svg');
  console.log('   3. Ejecuta: npm run dev\n');

  rl.close();
}

setup().catch(console.error);
```

### Agregar al `package.json`:
```json
{
  "scripts": {
    "setup": "node scripts/setup.js"
  }
}
```

---

## 🌐 VERSIÓN 2.1: Panel de Administración Web (Futuro)

### Objetivo
Interfaz web visual para que usuarios no técnicos configuren la radio sin CLI.

### Ruta: `/admin`

```
app/
└── admin/
    ├── layout.tsx              (layout con auth simple)
    ├── page.tsx                (dashboard con overview)
    ├── configuracion/
    │   ├── page.tsx            (formulario de configuración)
    │   └── components/
    │       ├── ConfigForm.tsx
    │       ├── ColorPicker.tsx
    │       └── LogoUploader.tsx
    ├── middleware.ts           (protección con password)
    └── api/
        ├── save-config/
        │   └── route.ts        (guarda en .env.local)
        └── upload-logo/
            └── route.ts        (sube archivos a /public)
```

### Características del Panel:

1. **Autenticación simple**
   - Password configurado en variable de entorno
   - Sin base de datos (stateless)

2. **Formulario visual**
   - Inputs validados en tiempo real
   - Color picker visual
   - Preview de cambios en vivo
   - Uploader de logo/imágenes

3. **API Routes**
   ```typescript
   // app/admin/api/save-config/route.ts
   export async function POST(request: Request) {
     // Validar auth
     // Leer datos del formulario
     // Validar con Zod
     // Escribir en .env.local
     // Retornar success
   }
   ```

4. **Preview en tiempo real**
   - iframe o modal con preview de la home
   - Aplica colores y datos sin guardar

### Seguridad:
- Password en `ADMIN_PASSWORD` (env var)
- Solo accesible en producción si se configura
- Rate limiting para prevenir brute force
- No expone archivos sensibles

---

## 📚 Documentación para V2

### Archivo `docs/configuracion.md`

```markdown
# Guía de Configuración - RadioWebPro V2

## Opción 1: Setup Automático (Recomendado)

1. Ejecuta el asistente:
   ```bash
   npm run setup
   ```

2. Responde las preguntas

3. ¡Listo! Tu radio está configurada

## Opción 2: Configuración Manual

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` con tus datos

3. Guarda y reinicia el servidor de desarrollo

## Variables Obligatorias

- `NEXT_PUBLIC_RADIO_NAME`: Nombre de tu radio
- `NEXT_PUBLIC_STREAM_URL`: URL del streaming
- `NEXT_PUBLIC_EMAIL`: Email de contacto

## Variables Opcionales

[Lista completa con descripciones...]

## Troubleshooting

### Error: "La URL de streaming no es válida"
- Verifica que la URL comience con http:// o https://
- Asegúrate de que sea accesible públicamente

[Más casos...]
```

---

## ✅ Checklist V2.0

- [ ] Crear archivo `.env.example` completo
- [ ] Actualizar `lib/config.ts` para leer env vars
- [ ] Instalar Zod: `npm install zod`
- [ ] Crear `lib/validation/config-schema.ts`
- [ ] Crear script `scripts/setup.js`
- [ ] Agregar comando `setup` a package.json
- [ ] Actualizar `.gitignore` (asegurar que .env.local esté ignorado)
- [ ] Crear documentación `docs/configuracion.md`
- [ ] Actualizar README con instrucciones de setup
- [ ] Probar wizard CLI end-to-end
- [ ] Validar que todos los componentes lean de `radioConfig`

---

## 🎯 Beneficios de V2

### Para el Cliente:
✅ No necesita conocimientos técnicos
✅ Setup en menos de 5 minutos
✅ No toca código
✅ Cambios sin recompilar (en desarrollo)

### Para el Desarrollador:
✅ Configuración centralizada y tipada
✅ Validación automática con Zod
✅ Fácil de mantener
✅ Menos bugs por config incorrecta

### Para la Plantilla:
✅ Más profesional
✅ Fácil de vender/distribuir
✅ Menor soporte necesario
✅ Base para futuras mejoras (panel admin)

---

## 📦 Dependencias Nuevas para V2

```json
{
  "dependencies": {
    "zod": "^3.22.4"
  }
}
```

Solo Zod es necesario (validación). El resto usa APIs nativas de Node.js.

---

## 🚦 Roadmap V2

### V2.0 (MVP Configuración)
- ✅ Variables de entorno
- ✅ Wizard CLI
- ✅ Validación con Zod
- ✅ Documentación

### V2.1 (Panel Admin)
- Panel web `/admin`
- Color picker visual
- Uploader de logos
- Preview en tiempo real

### V2.2 (Integraciones)
- Setup de Google Analytics automático
- Integración con APIs de metadata de canciones
- Importar/exportar configuración

---

**Este plan de V2 se implementará una vez completada la V1 (arquitectura base).**
