import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { radioConfig } from "@/lib/config";
import { generatePageMetadata, generateRadioStationSchema, generateBroadcastServiceSchema } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...generatePageMetadata(),
  metadataBase: new URL(radioConfig.seo.siteUrl),
  title: {
    default: `${radioConfig.name} - ${radioConfig.tagline}`,
    template: `%s | ${radioConfig.name}`,
  },
  icons: {
    icon: [
      { url: radioConfig.branding.favicon },
      { url: radioConfig.branding.logoIcon, type: "image/png" },
    ],
    apple: radioConfig.branding.logoIcon,
  },
  other: {
    "theme-color": radioConfig.colors.primary,
    "bingbot": "index, follow",
    "googlebot": "index, follow",
    "distribution": "Global",
    "language": "es",
    "lang": "es",
  },
  verification: {
    // Agregar cuando tengas los códigos de verificación
    // google: "tu-codigo-google",
    // facebook: radioConfig.integrations.facebookPixel,
  },
};

import { Header, Footer } from "@/components/layout";
import { ConditionalRadioPlayer } from "@/components/player";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { HeroUIProvider } from "@/components/providers/heroui-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const radioStationSchema = generateRadioStationSchema();
  const broadcastServiceSchema = generateBroadcastServiceSchema();

  return (
    <html lang={radioConfig.seo.lang} suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(radioStationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(broadcastServiceSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <HeroUIProvider>
            <Header />
            <main className="bg-background">{children}</main>
            <Footer />
            <ConditionalRadioPlayer />
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
