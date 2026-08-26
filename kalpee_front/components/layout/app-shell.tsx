'use client'

import {
  LayoutDashboard,
  PiggyBank,
  Settings,
  ShoppingBag,
  Target,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/components/store'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Dashboard', shortLabel: 'Accueil', icon: LayoutDashboard },
  { href: '/achats', label: 'Mes achats', shortLabel: 'Achats', icon: ShoppingBag },
  { href: '/tirelire', label: 'Ma tirelire', shortLabel: 'Tirelire', icon: PiggyBank },
  { href: '/objectifs', label: 'Objectifs', shortLabel: 'Objectifs', icon: Target },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Navigation desktop : liste verticale dans la sidebar fixe. */
function DesktopNavLinks() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Principal
      </p>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-sidebar-accent',
            )}
          >
            <Icon size={20} strokeWidth={2} />
            {label}
          </Link>
        )
      })}
      <div className="my-3 h-px bg-sidebar-border" />
      <Link
        href="/parametres"
        className={cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          isActive(pathname, '/parametres')
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-sidebar-accent',
        )}
      >
        <Settings size={20} strokeWidth={2} />
        Paramètres
      </Link>
    </nav>
  )
}

/**
 * Navigation mobile : barre fixe en bas de l'écran, à portée du pouce.
 * C'est le point d'entrée principal sur mobile (pas de menu caché) — les 4
 * sections clés + le profil, exactement comme les apps natives (Instagram,
 * apps bancaires...). `env(safe-area-inset-bottom)` evite que la barre soit
 * masquee par la zone d'accueil des iPhone recents.
 */
function MobileTabBar() {
  const pathname = usePathname()
  const items = [
    ...NAV.map((n) => ({ href: n.href, label: n.shortLabel, icon: n.icon })),
    { href: '/parametres', label: 'Profil', icon: Settings },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-sidebar-border bg-sidebar/95 shadow-[0_-8px_24px_rgba(62,39,35,0.08)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium"
          >
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-xl transition-colors',
                active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
              )}
            >
              <Icon size={20} strokeWidth={2.2} />
            </span>
            <span className={active ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Wallet size={20} />
      </span>
      <span className="font-serif text-xl text-foreground">Kalpee</span>
    </Link>
  )
}

function UserCard() {
  const { utilisateur } = useStore()
  const initiales = `${utilisateur.prenom[0] ?? ''}${utilisateur.nom[0] ?? ''}`
  return (
    <Link
      href="/parametres"
      className="flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/60 p-3 transition-colors hover:bg-sidebar-accent"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {initiales}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-foreground">{utilisateur.prenom}</span>
        <span className="text-xs text-muted-foreground">Mon compte</span>
      </span>
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { utilisateur } = useStore()
  const initiales = `${utilisateur.prenom[0] ?? ''}${utilisateur.nom[0] ?? ''}`

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="flex flex-col gap-6">
          <div className="pt-2">
            <Brand />
          </div>
          <DesktopNavLinks />
        </div>
        <UserCard />
      </aside>

      {/* Mobile top bar : marque + raccourci profil (la nav principale est en bas) */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <Brand />
        <Link
          href="/parametres"
          aria-label="Mon profil"
          className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
        >
          {initiales}
        </Link>
      </header>

      <MobileTabBar />

      {/* Main content */}
      <div className="flex min-h-screen w-full flex-col lg:pl-64">
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-[4.5rem] pb-24 sm:px-6 lg:px-10 lg:pt-10 lg:pb-16">
          {children}
        </main>
      </div>
    </div>
  )
}
