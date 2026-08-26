'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthShell } from '@/components/auth/auth-shell'
import { GoogleButton } from '@/components/auth/google-button'
import { AppleButton } from '@/components/auth/apple-button'
import { Field, Input } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { login, extractErrorMessage } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErreur(null)
    setLoading(true)
    try {
      const user = await login({ email, motDePasse })
      router.push(user.role === 'ADMIN' ? '/admin' : '/')
    } catch (err) {
      setErreur(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Content de vous revoir"
      subtitle="Connectez-vous pour retrouver vos achats."
      footer={
        <>
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Inscrivez-vous
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <GoogleButton
          onSuccess={(role) => router.push(role === 'ADMIN' ? '/admin' : '/')}
          onError={setErreur}
        />
        <AppleButton
          onSuccess={(role) => router.push(role === 'ADMIN' ? '/admin' : '/')}
          onError={setErreur}
        />
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Adresse email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-full bg-card px-5"
            required
          />
        </Field>

        <Field label="Mot de passe" htmlFor="password">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="h-12 rounded-full bg-card px-5"
            required
          />
        </Field>

        {erreur && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{erreur}</p>
        )}

        <Button type="submit" size="lg" className="mt-2 h-12 w-full rounded-full" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
    </AuthShell>
  )
}
