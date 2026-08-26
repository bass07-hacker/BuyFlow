'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/components/store'
import { Button } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import { CATEGORIE_LABEL, type CategorieKey, type Objectif } from '@/lib/types'

const CATEGORIES = Object.keys(CATEGORIE_LABEL) as CategorieKey[]

export function ObjectifFormModal({
  open,
  onClose,
  objectif,
}: {
  open: boolean
  onClose: () => void
  objectif?: Objectif
}) {
  const { addObjectif, updateObjectif } = useStore()
  const isEdit = Boolean(objectif)

  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [montantCible, setMontantCible] = useState('')
  const [montantInitial, setMontantInitial] = useState('')
  const [dateCible, setDateCible] = useState('')
  const [categorie, setCategorie] = useState<CategorieKey>('autre')

  useEffect(() => {
    if (open) {
      setNom(objectif?.nom ?? '')
      setDescription(objectif?.description ?? '')
      setMontantCible(objectif ? String(objectif.montantCible) : '')
      setMontantInitial(objectif ? String(objectif.montantEpargne) : '')
      setDateCible(objectif?.dateCible ?? '')
      setCategorie(objectif?.categorie ?? 'autre')
    }
  }, [open, objectif])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const cible = Number(montantCible)
    const initial = Number(montantInitial) || 0
    if (!nom.trim() || !Number.isFinite(cible) || cible <= 0) return
    const payload = {
      nom: nom.trim(),
      description: description.trim() || undefined,
      montantCible: cible,
      montantEpargne: Math.min(initial, cible),
      dateCible: dateCible || undefined,
      categorie,
    }
    if (isEdit && objectif) {
      updateObjectif(objectif.id, payload)
    } else {
      addObjectif(payload)
    }
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Modifier l’objectif' : 'Nouvel objectif d’épargne'}
      description={isEdit ? undefined : 'Fixe un montant à atteindre et une échéance.'}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Nom de l’objectif" htmlFor="obj-nom">
          <Input
            id="obj-nom"
            placeholder="Acheter mon ordinateur"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            autoFocus
            required
          />
        </Field>
        <Field label="Description" htmlFor="obj-desc">
          <Textarea
            id="obj-desc"
            placeholder="Un bon PC pour le travail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Montant cible" htmlFor="obj-cible" hint="En FCFA">
            <Input
              id="obj-cible"
              type="number"
              min={1}
              placeholder="300 000"
              value={montantCible}
              onChange={(e) => setMontantCible(e.target.value)}
              required
            />
          </Field>
          <Field label="Déjà épargné" htmlFor="obj-initial" hint="En FCFA">
            <Input
              id="obj-initial"
              type="number"
              min={0}
              placeholder="0"
              value={montantInitial}
              onChange={(e) => setMontantInitial(e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Date cible" htmlFor="obj-date">
            <Input
              id="obj-date"
              type="date"
              value={dateCible}
              onChange={(e) => setDateCible(e.target.value)}
            />
          </Field>
          <Field label="Catégorie" htmlFor="obj-cat">
            <Select
              id="obj-cat"
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
            {isEdit ? 'Enregistrer' : 'Créer l’objectif'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
