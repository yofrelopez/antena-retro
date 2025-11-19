# Guía de Personalización de Logos

## Archivos de logos necesarios

Para personalizar los logos de tu radio, necesitas preparar **3 archivos** principales:

### 1. **Logo completo** (para fondos claros)
- **Ubicación**: `public/logos/logo_completo.png`
- **Uso**: Header, secciones con fondo claro
- **Tamaño recomendado**: 180-200px de ancho, altura proporcional
- **Formato**: PNG con transparencia
- **Características**: Logo completo con texto, optimizado para fondos blancos/claros

### 2. **Logo completo invertido** (para fondos oscuros)
- **Ubicación**: `public/logos/logo_completo_reverse.png`
- **Uso**: Footer, secciones con fondo oscuro
- **Tamaño recomendado**: 160-180px de ancho, altura proporcional
- **Formato**: PNG con transparencia
- **Características**: Logo completo en colores claros/blancos, optimizado para fondos oscuros

### 3. **Logo icono** (solo símbolo)
- **Ubicación**: `public/logos/logo_icon.png`
- **Uso**: Favicon, app icons, redes sociales
- **Tamaño recomendado**: 512x512px (cuadrado)
- **Formato**: PNG con transparencia
- **Características**: Solo el símbolo/isotipo sin texto, versión simplificada

---

## Paso a paso para personalizar

### Paso 1: Preparar tus logos

1. Diseña o adapta tus logos en los 3 formatos mencionados
2. Exporta en formato PNG con fondo transparente
3. Optimiza el tamaño de los archivos (puedes usar [TinyPNG](https://tinypng.com/))

### Paso 2: Subir los archivos

1. Copia tus logos a la carpeta `public/logos/`
2. Renombra los archivos para que coincidan con:
   - `logo_completo.png`
   - `logo_completo_reverse.png`
   - `logo_icon.png`

**O bien**, mantén tus nombres de archivo y actualiza las rutas en el siguiente paso.

### Paso 3: Actualizar la configuración

Abre el archivo `src/lib/config.ts` y localiza la sección `branding`:

```typescript
branding: {
  logo: "/logos/logo_completo.png",              // Logo para fondos claros
  logoWhite: "/logos/logo_completo_reverse.png", // Logo para fondos oscuros
  logoIcon: "/logos/logo_icon.png",              // Icono/favicon
  logoAlt: "Logo de Radio Ejemplo",              // Texto alternativo (cámbialo)
  favicon: "/favicon.ico",
  ogImage: "/og-image.jpg",
},
```

**Cambia**:
- Las rutas si usaste nombres de archivo diferentes
- El `logoAlt` con el nombre de tu radio
- Opcionalmente, actualiza `favicon` y `ogImage` si tienes versiones personalizadas

### Paso 4: Verificar la integración

Los logos se usan automáticamente en:

✅ **Header** ([src/components/layout/Header.tsx](../src/components/layout/Header.tsx)) - Logo principal
✅ **Footer** ([src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx)) - Logo invertido
✅ **Favicon** ([src/app/layout.tsx](../src/app/layout.tsx)) - Icono en la pestaña del navegador
✅ **Apple Touch Icon** - Icono para dispositivos iOS

---

## Tamaños y especificaciones técnicas

| Archivo | Dimensiones recomendadas | Peso máximo | Uso |
|---------|-------------------------|-------------|-----|
| `logo_completo.png` | 180-200px ancho × altura proporcional | 50KB | Header, secciones claras |
| `logo_completo_reverse.png` | 160-180px ancho × altura proporcional | 50KB | Footer, secciones oscuras |
| `logo_icon.png` | 512×512px (cuadrado) | 100KB | Favicon, app icons |

---

## Recomendaciones de diseño

### Logo completo
- **Incluye**: Isotipo + logotipo (símbolo + texto)
- **Colores**: Versión principal de tu marca
- **Fondo**: Transparente
- **Contraste**: Debe verse bien sobre fondo blanco/claro

### Logo completo invertido
- **Incluye**: Isotipo + logotipo (símbolo + texto)
- **Colores**: Versión en blanco/colores claros
- **Fondo**: Transparente
- **Contraste**: Debe verse bien sobre fondo gris/oscuro

### Logo icono
- **Incluye**: Solo el símbolo/isotipo (SIN texto)
- **Forma**: Preferiblemente cuadrada o circular
- **Simplicidad**: Versión simplificada que se vea bien en tamaños pequeños
- **Colores**: Versión principal de tu marca

---

## Solución de problemas

### ❌ El logo no se ve en el navegador

1. **Verifica las rutas**: Asegúrate de que los archivos están en `public/logos/`
2. **Revisa los nombres**: Deben coincidir exactamente con `config.ts`
3. **Limpia la caché**: Recarga la página con `Ctrl + Shift + R` (Windows/Linux) o `Cmd + Shift + R` (Mac)
4. **Reinicia el servidor**: Detén `npm run dev` y vuelve a ejecutarlo

### ❌ El logo se ve pixelado

- Asegúrate de usar archivos PNG de alta resolución
- El logo completo debería tener al menos 360px de ancho para pantallas Retina
- El logo icono debería ser 512×512px

### ❌ El logo ocupa demasiado espacio

Ajusta los tamaños en los componentes:

**Header** ([Header.tsx:31-32](../src/components/layout/Header.tsx#L31-L32)):
```typescript
width={180}  // Reduce este valor
height={50}  // Ajusta proporcionalmente
```

**Footer** ([Footer.tsx:70-71](../src/components/layout/Footer.tsx#L70-L71)):
```typescript
width={160}  // Reduce este valor
height={45}  // Ajusta proporcionalmente
```

---

## Recursos útiles

- **Optimizar imágenes PNG**: [TinyPNG](https://tinypng.com/)
- **Convertir formatos**: [CloudConvert](https://cloudconvert.com/)
- **Generar favicons**: [RealFaviconGenerator](https://realfavicongenerator.net/)
- **Verificar contraste**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Notas adicionales

- Todos los logos se cargan con **optimización automática** gracias a `next/image`
- El atributo `priority` en el Header garantiza que el logo principal cargue rápido
- Los logos usan lazy loading en el Footer para mejor rendimiento
- El favicon se actualiza automáticamente en todas las páginas

---

¿Necesitas ayuda? Revisa la documentación de Next.js sobre [optimización de imágenes](https://nextjs.org/docs/app/building-your-application/optimizing/images).
