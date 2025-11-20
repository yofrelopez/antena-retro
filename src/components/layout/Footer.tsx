'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { radioConfig } from "@/lib/config";
import { Container } from "@/components/ui";

const navigation = {
  main: [
    { name: "Inicio", href: "/" },
    { name: "Programación", href: "/programacion" },
    { name: "Noticias", href: "/noticias" },
  ],
  programs: [
    { name: "Programas", href: "/programas" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Privacidad", href: "/privacidad" },
    { name: "Términos", href: "/terminos" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: radioConfig.social.facebook,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: radioConfig.social.instagram,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: radioConfig.social.twitter,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: radioConfig.social.youtube,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // En /live no hay player, no necesitamos padding inferior
  const isLivePage = pathname === '/live'

  return (
    <footer className={`relative bg-muted/20 ${isLivePage ? 'pb-0' : 'pb-22 md:pb-26'}`}>
      <Container>
        <div className="pt-16 pb-4">

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-4 col-span-full">
              <div className="mb-6">
                {!mounted ? (
                  <div className="h-9 w-44 bg-muted/50 rounded animate-pulse" />
                ) : (
                  <Image
                    src={resolvedTheme === 'dark' ? radioConfig.branding.logoWhite : radioConfig.branding.logo}
                    alt={radioConfig.branding.logoAlt}
                    width={176}
                    height={44}
                    className="h-9 w-auto"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-8">
                {radioConfig.description}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((item) => {
                  if (!item.href) return null;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-full
                                text-muted-foreground hover:text-foreground
                                transition-colors duration-200"
                      aria-label={item.name}
                    >
                      {item.icon}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Grid - 2 columns on mobile, stays in layout on desktop */}
            <div className="col-span-full grid grid-cols-2 gap-8 sm:gap-12 md:col-span-2 md:grid-cols-3 lg:col-span-6 lg:col-start-6 lg:gap-8">
              {/* Navigation Links */}
              <div>
                <h3 className="text-sm font-medium mb-5 text-foreground">
                  Navegación
                </h3>
                <ul className="space-y-3.5">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Links */}
              <div>
                <h3 className="text-sm font-medium mb-5 text-foreground">
                  Información
                </h3>
                <ul className="space-y-3.5">
                  {navigation.programs.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-sm font-medium mb-5 text-foreground">
                  Legal
                </h3>
                <ul className="space-y-3.5">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Bottom Bar - Full Width */}
      <div className="mt-12 pt-2 pb-2 bg-zinc-200/20">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
            
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {currentYear} {radioConfig.name}
            </p>

            {/* Credits */}
            <p className="text-sm text-muted-foreground text-right sm:text-left">
              Diseñado por{' '}
              <a
                href="https://idev.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-2"
              >
                iDev
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
