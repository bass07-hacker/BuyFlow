'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/components/store'
import { Button } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import {
  type Achat,
  CATEGORIE_LABEL,
  type CategorieKey,
  PRIORITE_LABEL,
  type Priorite,
} from '@/lib/types'

interface AchatFormModalProps {
  open: boolean
  onClose: () => void
  achat?: Achat
  onCreated?: (id: string) => void
}

const PRIORITES = Object.keys(PRIORITE_LABEL) as Priorite[]
const CATEGORIES = Object.keys(CATEGORIE_LABEL) as CategorieKey[]

export function AchatFormModal({ open, onClose, achat, onCreated }: AchatFormModalProps) {
  const { addAchat, updateAchat } = useStore()
  const isEdit = Boolean(achat)

  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [priorite, setPriorite] = useState<Priorite>('NORMAL')
  const [categorie, setCategorie] = useState<CategorieKey>('autre')
  const [dateLimite, setDateLimite] = useState('')

  useEffect(() => {
    if (open) {
      setNom(achat?.nom ?? '')
      setDescription(achat?.description ?? '')
      setPriorite(achat?.priorite ?? 'NORMAL')
      setCategorie(achat?.categorie ?? 'autre')
      setDateLimite(achat?.dateLimite ?? '')
    }
  }, [open, achat])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!nom.trim()) return
    const payload = {
      nom: nom.trim(),
      description: description.trim() || undefined,
      priorite,
      categorie,
      dateLimite: dateLimite || undefined,
    }
    if (isEdit && achat) {
      updateAchat(achat.id, payload)
      onClose()
    } else {
      addAchat(payload).then((id) => {
        onCreated?.(id)
        onClose()
      })
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Modifier l’achat' : 'Créer un nouvel achat'}
      description={
        isEdit ? undefined : 'Regroupe les articles que tu veux acheter ensemble.'
      }
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Nom de l’achat" htmlFor="achat-nom">
          <Input
            id="achat-nom"
            placeholder="Habits pour les vacances"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            autoFocus
            required
          />
        </Field>
        <Field label="Description" htmlFor="achat-desc">
          <Textarea
            id="achat-desc"
            placeholder="Quelques vêtements pour les vacances"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Priorité" htmlFor="achat-prio">
            <Select
              id="achat-prio"
              value={priorite}
              onChange={(e) => setPriorite(e.target.value as Priorite)}
            >
              {PRIORITES.map((p) => (
                <option key={p} value={p}>
                  {PRIORITE_LABEL[p]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Catégorie" htmlFor="achat-cat">
            <Select
              id="achat-cat"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value as CategorieKey)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORIE_LABEL[c]}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Date prévue" htmlFor="achat-date">
          <Input
            id="achat-date"
            type="date"
            value={dateLimite}
            onChange={(e) => setDateLimite(e.target.value)}
          />
        </Field>
        <div className="mt-2 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="h-11 flex-1 justify-center rounded-xl"
          >
            Annuler
          </Button>
          <Button type="submit" className="h-11 flex-1 justify-center rounded-xl">
            {isEdit ? 'Enregistrer' : 'Créer l’achat'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
