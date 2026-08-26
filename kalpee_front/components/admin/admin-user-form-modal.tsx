'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import type { AdminUser } from '@/lib/services/admin'

interface AdminUserFormModalProps {
  open: boolean
  onClose: () => void
  user?: AdminUser
  onSubmit: (data: {
    prenom: string
    nom: string
    email: string
    motDePasse: string
    admin: boolean
    actif: boolean
  }) => Promise<void>
}

export function AdminUserFormModal({ open, onClose, user, onSubmit }: AdminUserFormModalProps) {
  const isEdit = Boolean(user)

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [actif, setActif] = useState(true)
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setPrenom(user?.prenom ?? '')
      setNom(user?.nom ?? '')
      setEmail(user?.email ?? '')
      setMotDePasse('')
      setActif(user?.actif ?? true)
      setErreur(null)
    }
  }, [open, user])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!prenom.trim() || !nom.trim() || !email.trim()) return
    if (!isEdit && motDePasse.length < 8) {
      setErreur('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    setSaving(true)
    setErreur(null)
    try {
      await onSubmit({
        prenom: prenom.trim(),
        nom: nom.trim(),
        email: email.trim(),
        motDePasse,
        admin: false,
        actif,
      })
      onClose()
    } catch (err) {
      setErreur(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Modifier l’utilisateur' : 'Ajouter un utilisateur'}
      description={isEdit ? undefined : 'Crée un nouveau compte utilisateur manuellement.'}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom" htmlFor="admin-prenom">
            <Input id="admin-prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
          </Field>
          <Field label="Nom" htmlFor="admin-nom">
            <Input id="admin-nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
          </Field>
        </div>
        <Field label="Adresse email" htmlFor="admin-email">
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        {!isEdit && (
          <Field
            label="Mot de passe"
            htmlFor="admin-password"
            hint="Au moins 8 caractères, avec une majuscule, une minuscule et un chiffre."
          >
            <Input
              id="admin-password"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </Field>
        )}
        {isEdit && (
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={actif}
              onChange={(e) => setActif(e.target.checked)}
              className="size-4 rounded border-border"
            />
            Compte actif
          </label>
        )}

        {erreur ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{erreur}</p>
        ) : null}

        <div className="mt-1 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="h-11 flex-1 justify-center rounded-xl"
          >
            Annuler
          </Button>
          <Button type="submit" disabled={saving} className="h-11 flex-1 justify-center rounded-xl">
            {saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : 'Créer le compte'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
