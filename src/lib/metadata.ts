import type { Metadata } from "next";
import { radioConfig } from "./config";

/**
 * Configuración base de metadata SEO y Open Graph
 * Basado en estructura de RPP para máxima compatibilidad con redes sociales
 */

interface PageMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  category?: string;
  url?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  type = "website",
  author,
  publishedTime,
  category,
  url,
}: PageMetadataProps = {}): Metadata {
  const pageTitle = title || `${radioConfig.name} - ${radioConfig.tagline}`;
  const pageDescription = description || radioConfig.description;
  const pageImage = image || radioConfig.branding.ogImage;
  const pageUrl = url || radioConfig.seo.siteUrl;
  const pageKeywords = keywords || radioConfig.seo.keywords;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: author ? [{ name: author }] : [{ name: radioConfig.name }],
    creator: radioConfig.name,
    publisher: radioConfig.name,
    
    // Open Graph
    openGraph: {
      type: type,
      locale: "es_PE",
      url: pageUrl,
      siteName: radioConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(type === "article" && publishedTime && {
        publishedTime,
      }),
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: radioConfig.social.twitter ? `@${radioConfig.social.twitter.split('/').pop()}` : undefined,
      creator: radioConfig.social.twitter ? `@${radioConfig.social.twitter.split('/').pop()}` : undefined,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },

    // Adicional
    category: category,
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * Metadata específica para páginas de noticias/artículos
 */
export function generateArticleMetadata({
  title,
  description,
  image,
  author = "Redacción Antena Retro",
  publishedTime,
  category = "Noticias",
  tags,
  url,
}: PageMetadataProps & { tags?: string[] } = {}): Metadata {
  return generatePageMetadata({
    title,
    description,
    keywords: tags,
    image,
    type: "article",
    author,
    publishedTime,
    category,
    url,
  });
}

/**
 * JSON-LD para SEO estructurado
 */
export function generateRadioStationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    name: radioConfig.name,
    description: radioConfig.description,
    url: radioConfig.seo.siteUrl,
    logo: radioConfig.branding.logo,
    image: radioConfig.branding.ogImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    sameAs: [
      radioConfig.social.facebook,
      radioConfig.social.instagram,
      radioConfig.social.twitter,
      radioConfig.social.youtube,
    ].filter(Boolean),
  };
}

export function generateBroadcastServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BroadcastService",
    name: radioConfig.name,
    broadcastDisplayName: radioConfig.name,
    description: radioConfig.description,
    url: radioConfig.seo.siteUrl,
    logo: radioConfig.branding.logo,
    image: radioConfig.branding.ogImage,
    inLanguage: "es-PE",
    broadcastTimezone: radioConfig.seo.timezone,
    potentialAction: {
      "@type": "ListenAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${radioConfig.seo.siteUrl}/live`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}
