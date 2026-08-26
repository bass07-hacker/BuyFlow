'use client'

import { useState } from 'react'
import { useStore } from '@/components/store'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import { type Objectif, formatFCFA, resteObjectif } from '@/lib/types'

export function ContributionModal({
  open,
  onClose,
  objectif,
}: {
  open: boolean
  onClose: () => void
  objectif: Objectif | null
}) {
  const { ajouterAObjectif } = useStore()
  const [montant, setMontant] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!objectif) return
    const valeur = Number(montant)
    if (!Number.isFinite(valeur) || valeur <= 0) return
    ajouterAObjectif(objectif.id, valeur)
    setMontant('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Épargner pour cet objectif"
      description={
        objectif
          ? `« ${objectif.nom} » — il reste ${formatFCFA(resteObjectif(objectif))}.`
          : undefined
      }
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Montant à ajouter" htmlFor="contrib-montant" hint="En FCFA">
          <Input
            id="contrib-montant"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="50 000"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            autoFocus
            required
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
            Ajouter
          </Button>
        </div>
      </form>
    </Modal>
  )
}
