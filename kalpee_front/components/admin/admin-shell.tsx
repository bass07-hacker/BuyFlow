'use client'

import { LayoutDashboard, LogOut, ShieldCheck, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import { cn } from '@/lib/utils'

const ADMIN_NAV = [
  { href: '/admin', label: 'Statistiques', icon: LayoutDashboard },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
]

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    try {
      await logout()
    } finally {
      router.push('/login')
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5 px-1 pt-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck size={20} />
            </span>
            <div className="leading-tight">
              <span className="block font-serif text-xl text-foreground">Kalpee</span>
              <span className="block text-xs text-muted-foreground">Administration</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
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
          </nav>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/60 p-3 text-sm font-medium text-foreground transition-colors hover:bg-sidebar-accent"
        >
          <LogOut size={18} className="text-muted-foreground" />
          Se déconnecter
        </button>
      </aside>

      {/* Mobile top bar : marque uniquement, la nav et la deconnexion sont en bas */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-2.5 border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ShieldCheck size={18} />
        </span>
        <span className="font-serif text-lg text-foreground">Kalpee Admin</span>
      </header>

      {/* Mobile bottom tab bar : Statistiques / Utilisateurs / Deconnexion, a portee du pouce */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-sidebar-border bg-sidebar lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
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
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
        >
          <span className="flex size-9 items-center justify-center rounded-xl">
            <LogOut size={20} strokeWidth={2.2} />
          </span>
          Quitter
        </button>
      </nav>

      <div className="flex min-h-screen w-full flex-col lg:pl-64">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-[4.5rem] pb-24 sm:px-6 lg:px-10 lg:pt-10 lg:pb-16">
          {children}
        </main>
      </div>
    </div>
  )
}
