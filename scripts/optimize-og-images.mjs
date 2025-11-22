#!/usr/bin/env node
/**
 * Script para optimizar imágenes Open Graph
 * Genera versiones 1200x630px optimizadas para redes sociales
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

// Mapeo de imágenes fuente a imágenes OG optimizadas
const imageMap = [
  {
    source: 'images/hero/silede_5.png',
    output: 'og-home.jpg',
    description: 'Home / Default'
  },
  {
    source: 'images/hero/slide_6.jpeg',
    output: 'og-live.jpg',
    description: 'Página Live'
  },
  {
    source: 'images/hero/slide_3.jpg',
    output: 'og-noticias.jpg',
    description: 'Lista de Noticias'
  },
  {
    source: 'images/hero/slide_4.jpg',
    output: 'og-programacion.jpg',
    description: 'Programación'
  },
  {
    source: 'images/hero/slide_2.png',
    output: 'og-nosotros.jpg',
    description: 'Nosotros'
  },
  {
    source: 'logos/logo_completo.png',
    output: 'og-contacto.jpg',
    description: 'Contacto'
  },
];

async function optimizeImage(sourcePath, outputPath, description) {
  const fullSourcePath = path.join(publicDir, sourcePath);
  const fullOutputPath = path.join(publicDir, outputPath);

  try {
    console.log(`\n📸 Procesando: ${description}`);
    console.log(`   Origen: ${sourcePath}`);

    const metadata = await sharp(fullSourcePath).metadata();
    console.log(`   Tamaño original: ${metadata.width}x${metadata.height}`);

    // Optimizar a 1200x630 con calidad alta
    await sharp(fullSourcePath)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(fullOutputPath);

    // Verificar tamaño del archivo
    const stats = await fs.stat(fullOutputPath);
    const sizeKB = Math.round(stats.size / 1024);
    const sizeOK = sizeKB < 300 ? '✅' : '⚠️';
    
    console.log(`   ✓ Generado: ${outputPath}`);
    console.log(`   ✓ Tamaño: 1200x630px`);
    console.log(`   ${sizeOK} Peso: ${sizeKB}KB ${sizeKB < 300 ? '(OK para WhatsApp)' : '(>300KB, puede ser rechazado)'}`);

  } catch (error) {
    console.error(`   ❌ Error procesando ${sourcePath}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Optimizador de Imágenes Open Graph');
  console.log('=====================================\n');
  console.log('Especificaciones:');
  console.log('  • Tamaño: 1200x630px (ratio 1.91:1)');
  console.log('  • Formato: JPEG progresivo');
  console.log('  • Calidad: 85%');
  console.log('  • Peso objetivo: <300KB (WhatsApp)');
  console.log('=====================================');

  for (const image of imageMap) {
    await optimizeImage(image.source, image.output, image.description);
  }

  console.log('\n✨ Proceso completado!');
  console.log('\n📁 Imágenes generadas en /public/:');
  imageMap.forEach(img => {
    console.log(`   • ${img.output} → ${img.description}`);
  });
}

main().catch(console.error);
