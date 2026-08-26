'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { me, type Utilisateur } from '@/lib/auth'

/**
 * Verifie directement aupres de l'API que la session appartient a l'administrateur
 * (role ADMIN). Independant du StoreProvider "utilisateur" (achats/tirelire/objectifs) :
 * l'espace admin est totalement separe de l'espace utilisateur.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<'checking' | 'ok'>('checking')
  const [admin, setAdmin] = useState<Utilisateur | null>(null)

  useEffect(() => {
    let active = true
    me()
      .then((user) => {
        if (!active) return
        if (user.role !== 'ADMIN') {
          router.replace('/')
          return
        }
        setAdmin(user)
        setStatus('ok')
      })
      .catch(() => {
        if (active) router.replace('/login')
      })
    return () => {
      active = false
    }
  }, [router])

  if (status === 'checking' || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Vérification des droits d’accès…
      </div>
    )
  }

  return <>{children}</>
}
