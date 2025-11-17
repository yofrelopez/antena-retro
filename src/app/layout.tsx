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
    icon: radioConfig.branding.favicon,
  },
};

import { Header, Footer } from "@/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={radioConfig.seo.lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
