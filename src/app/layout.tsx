import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { radioConfig } from "@/lib/config";
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
  title: {
    default: `${radioConfig.name} - ${radioConfig.tagline}`,
    template: `%s | ${radioConfig.name}`,
  },
  description: radioConfig.description,
  keywords: radioConfig.seo.keywords,
  authors: [{ name: radioConfig.name }],
  creator: radioConfig.name,
  openGraph: {
    type: "website",
    locale: radioConfig.seo.lang,
    url: radioConfig.seo.siteUrl,
    siteName: radioConfig.name,
    title: radioConfig.name,
    description: radioConfig.description,
    images: [
      {
        url: radioConfig.branding.ogImage,
        width: 1200,
        height: 630,
        alt: radioConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: radioConfig.name,
    description: radioConfig.description,
    images: [radioConfig.branding.ogImage],
  },
  icons: {
    icon: [
      { url: radioConfig.branding.favicon },
      { url: radioConfig.branding.logoIcon, type: "image/png" },
    ],
    apple: radioConfig.branding.logoIcon,
  },
};

import { Header, Footer } from "@/components/layout";
import { RadioPlayer } from "@/components/player";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { HeroUIProvider } from "@/components/providers/heroui-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={radioConfig.seo.lang} suppressHydrationWarning>
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
            <RadioPlayer />
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
