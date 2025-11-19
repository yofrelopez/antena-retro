'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react'
import { ChevronDown, Menu, X, Play } from 'lucide-react'
import { radioConfig } from '@/lib/config'
import { navigationItems } from '@/lib/navigation'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { useTheme } from 'next-themes'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      height="80px"
      classNames={{
        base: `sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? `${resolvedTheme === 'dark' ? 'bg-zinc-900/60' : 'bg-white/60'} shadow-lg`
            : 'bg-background/0 border-b border-border/50'
        }`,
        wrapper: 'px-4 sm:px-6 lg:px-8 h-20 max-w-7xl mx-auto',
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-full',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      {/* Logo */}
      <NavbarBrand>
        <Link href="/" className="flex items-center">
          {!mounted ? (
            <div className="h-10 w-[180px]" />
          ) : (
            <Image
              src={resolvedTheme === 'dark' ? radioConfig.branding.logoWhite : radioConfig.branding.logo}
              alt={radioConfig.branding.logoAlt}
              width={180}
              height={50}
              className="h-10 w-auto"
              priority
            />
          )}
        </Link>
      </NavbarBrand>

      {/* Mobile Live Button - Between logo and hamburger */}
      <NavbarContent className="md:hidden grow" justify="center">
        <NavbarItem>
          <Button
            as={Link}
            href="/#player"
            color="primary"
            variant="flat"
            size="sm"
            className="font-medium text-xs px-2 max-w-[140px] h-auto py-1.5 whitespace-normal leading-tight"
            startContent={<Play size={18} className="text-primary" fill="currentColor" strokeWidth={0} />}
          >
            <span className="text-secondary">{radioConfig.name}</span>
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        {navigationItems.map((item) => {
          // Items with dropdown children
          if (item.children && item.children.length > 0) {
            return (
              <Dropdown key={item.label}>
                <NavbarItem isActive={isActive(item.href)}>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                      endContent={
                        <ChevronDown className="h-3.5 w-3.5 ml-1" />
                      }
                      radius="sm"
                      variant="light"
                    >
                      {item.label}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={`${item.label} menu`}
                  className="w-[200px]"
                  itemClasses={{
                    base: 'gap-4',
                  }}
                >
                  {item.children.map((child) => (
                    <DropdownItem
                      key={child.href}
                      as={Link}
                      href={child.href}
                      className={
                        isActive(child.href) ? 'text-primary' : ''
                      }
                    >
                      {child.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )
          }

          // Regular nav items
          return (
            <NavbarItem key={item.label} isActive={isActive(item.href)}>
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary"
              >
                {item.label}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      {/* Right side: Theme Toggle + CTA */}
      <NavbarContent justify="end">
        <NavbarItem>
          <AnimatedThemeToggler />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            href="/#player"
            color="primary"
            variant="flat"
            size="sm"
            className="font-medium"
            startContent={
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            }
          >
            En Vivo
          </Button>
        </NavbarItem>
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden"
          icon={isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu 
        className={`pt-6 backdrop-blur-xl ${
          resolvedTheme === 'dark' ? 'bg-zinc-900/95' : 'bg-white/95'
        }`}
      >
        {navigationItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            {item.children && item.children.length > 0 ? (
              // Mobile: render parent + children as nested list
              <div className="w-full">
                <Link
                  href={item.href}
                  className={`block w-full py-3 text-lg font-semibold ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ transition: 'none' }}
                >
                  {item.label}
                </Link>
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary/20 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block py-2 text-sm ${
                        isActive(child.href)
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ transition: 'none' }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                className={`block w-full py-3 text-lg font-semibold ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ transition: 'none' }}
              >
                {item.label}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
        
        {/* En Vivo Button in Mobile Menu */}
        <NavbarMenuItem>
          <Button
            as={Link}
            href="/#player"
            color="primary"
            variant="shadow"
            size="lg"
            className="font-semibold w-full"
            startContent={
              <div className="h-2.5 w-2.5 bg-white rounded-full animate-pulse" />
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Escuchar en Vivo
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
