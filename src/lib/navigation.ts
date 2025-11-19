export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const navigationItems: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Programación',
    href: '/programacion',
    children: [
      { label: 'Horarios', href: '/programacion#horarios' },
      { label: 'Programas', href: '/programas' },
      { label: 'Podcast', href: '/programacion#podcast' },
    ],
  },
  {
    label: 'Noticias',
    href: '/noticias',
    children: [
      { label: 'Eventos', href: '/noticias?category=eventos' },
      { label: 'Entretenimiento', href: '/noticias?category=entretenimiento' },
      { label: 'Deporte', href: '/noticias?category=deporte' },
    ],
  },
  {
    label: 'Nosotros',
    href: '/nosotros',
  },
  {
    label: 'Contacto',
    href: '/contacto',
  },
]
