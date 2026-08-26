'use client'

import { useState } from 'react'
import { Check, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/components/store'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { logout } from '@/lib/auth'

export function ParametresView() {
  const router = useRouter()
  const { utilisateur, updateUtilisateur } = useStore()

  const [prenom, setPrenom] = useState(utilisateur.prenom)
  const [nom, setNom] = useState(utilisateur.nom)
  const [email, setEmail] = useState(utilisateur.email)
  const [saved, setSaved] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await logout()
    } finally {
      router.push('/login')
    }
  }

  const dirty =
    prenom !== utilisateur.prenom || nom !== utilisateur.nom || email !== utilisateur.email

  function save(e: React.FormEvent) {
    e.preventDefault()
    updateUtilisateur({ prenom: prenom.trim(), nom: nom.trim(), email: email.trim() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-7 pb-2">
      <PageHeader title="Paramètres" subtitle="Gère ton profil et ton compte" />

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-2 text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
            <User size={17} />
          </span>
          <h2 className="font-medium">Mon profil</h2>
        </div>
        <form onSubmit={save} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom" htmlFor="prenom">
              <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </Field>
            <Field label="Nom" htmlFor="nom">
              <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </Field>
          </div>
          <Field label="Adresse e-mail" htmlFor="email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={!dirty}
              className="h-11 gap-2 rounded-xl px-5 disabled:opacity-50"
            >
              {saved ? <Check size={17} /> : null}
              {saved ? 'Enregistré' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-1 font-medium text-foreground">Session</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Déconnecte-toi de ton compte Kalpee sur cet appareil.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setLogoutOpen(true)}
          className="h-11 gap-2 rounded-xl px-5"
        >
          <LogOut size={17} /> Se déconnecter
        </Button>
      </section>

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Se déconnecter ?"
        description="Tu devras te reconnecter pour accéder à ton espace."
        confirmLabel={loggingOut ? 'Déconnexion...' : 'Se déconnecter'}
      />
    </div>
  )
}
