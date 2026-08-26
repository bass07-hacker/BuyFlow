'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthShell } from '@/components/auth/auth-shell'
import { GoogleButton } from '@/components/auth/google-button'
import { AppleButton } from '@/components/auth/apple-button'
import { Field, Input } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { register, extractErrorMessage } from '@/lib/auth'

const MOT_DE_PASSE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

export default function RegisterPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function validerMotDePasse(): string | null {
    if (motDePasse.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.'
    if (!MOT_DE_PASSE_REGEX.test(motDePasse))
      return 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre.'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErreur(null)

    const erreurMotDePasse = validerMotDePasse()
    if (erreurMotDePasse) {
      setErreur(erreurMotDePasse)
      return
    }

    setLoading(true)
    try {
      const user = await register({ prenom, nom, email, motDePasse })
      router.push(user.role === 'ADMIN' ? '/admin' : '/')
    } catch (err) {
      setErreur(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Créer un compte"
      subtitle="Rejoignez Kalpee et prenez le contrôle de vos achats."
      footer={
        <>
          Déjà un compte ?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Se connecter
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom" htmlFor="prenom">
            <Input
              id="prenom"
              autoComplete="given-name"
              placeholder="Thierno"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="h-12 rounded-full bg-card px-5"
              required
            />
          </Field>
          <Field label="Nom" htmlFor="nom">
            <Input
              id="nom"
              autoComplete="family-name"
              placeholder="Diallo"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="h-12 rounded-full bg-card px-5"
              required
            />
          </Field>
        </div>

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

        <Field
          label="Mot de passe"
          htmlFor="password"
          hint="Au moins 8 caractères, avec une majuscule, une minuscule et un chiffre."
        >
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
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
          {loading ? 'Création...' : 'Créer mon compte'}
        </Button>
      </form>
    </AuthShell>
  )
}
