'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { me } from '@/lib/auth'

/**
 * Verifie la session aupres de l'API au chargement des pages protegees.
 * Si l'utilisateur n'est pas authentifie (401), il est redirige vers /login.
 * Le cookie JWT etant httpOnly, c'est le seul moyen fiable de verifier la session cote client.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let active = true
    me()
      .then((user) => {
        if (!active) return
        if (user.role === 'ADMIN') {
          router.replace('/admin')
          return
        }
        setChecking(false)
      })
      .catch(() => {
        if (active) router.replace('/login')
      })
    return () => {
      active = false
    }
  }, [router])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Chargement...
      </div>
    )
  }

  return <>{children}</>
}
