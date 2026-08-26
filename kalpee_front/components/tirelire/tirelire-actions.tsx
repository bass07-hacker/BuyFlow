'use client'

import { useState } from 'react'
import { useStore } from '@/components/store'
import { Button } from '@/components/ui/button'
import { Field, Input, Select } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import { formatFCFA } from '@/lib/types'

const MOTIFS_DEPOT = ['Épargne mensuelle', 'Salaire', 'Argent ajouté', 'Cadeau', 'Autre']
const MOTIFS_RETRAIT = ['Achat', 'Dépense', 'Retrait', 'Autre']

export function DepotModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { deposer } = useStore()
  const [montant, setMontant] = useState('')
  const [motif, setMotif] = useState(MOTIFS_DEPOT[0])

  function reset() {
    setMontant('')
    setMotif(MOTIFS_DEPOT[0])
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const valeur = Number(montant)
    if (!Number.isFinite(valeur) || valeur <= 0) return
    deposer(valeur, motif)
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Ajouter de l’argent" description="Dépose de l’argent dans ta tirelire.">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Montant" htmlFor="depot-montant" hint="En FCFA">
          <Input
            id="depot-montant"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="25 000"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            autoFocus
            required
          />
        </Field>
        <Field label="Motif" htmlFor="depot-motif">
          <Select id="depot-motif" value={motif} onChange={(e) => setMotif(e.target.value)}>
            {MOTIFS_DEPOT.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
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
            Déposer
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export function RetraitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { retirer, solde } = useStore()
  const [montant, setMontant] = useState('')
  const [motif, setMotif] = useState(MOTIFS_RETRAIT[0])
  const [erreur, setErreur] = useState<string | null>(null)

  function reset() {
    setMontant('')
    setMotif(MOTIFS_RETRAIT[0])
    setErreur(null)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const valeur = Number(montant)
    if (!Number.isFinite(valeur) || valeur <= 0) {
      setErreur('Entre un montant valide.')
      return
    }
    if (valeur > solde) {
      setErreur(`Ton solde disponible est de ${formatFCFA(solde)}.`)
      return
    }
    retirer(valeur, motif)
    reset()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Retirer de l’argent"
      description={`Solde disponible : ${formatFCFA(solde)}`}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Montant" htmlFor="retrait-montant" hint="En FCFA">
          <Input
            id="retrait-montant"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="15 000"
            value={montant}
            onChange={(e) => {
              setMontant(e.target.value)
              setErreur(null)
            }}
            autoFocus
            required
          />
        </Field>
        <Field label="Motif" htmlFor="retrait-motif">
          <Select id="retrait-motif" value={motif} onChange={(e) => setMotif(e.target.value)}>
            {MOTIFS_RETRAIT.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </Field>
        {erreur ? <p className="text-sm font-medium text-destructive">{erreur}</p> : null}
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
            Retirer
          </Button>
        </div>
      </form>
    </Modal>
  )
}
