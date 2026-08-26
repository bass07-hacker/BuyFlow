'use client'

import { useState } from 'react'
import { Plus, Target, TrendingUp, PiggyBank } from 'lucide-react'
import { useStore } from '@/components/store'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { ObjectifCard } from '@/components/objectifs/objectif-card'
import { ObjectifFormModal } from '@/components/objectifs/objectif-form-modal'
import { ContributionModal } from '@/components/objectifs/contribution-modal'
import {
  formatFCFA,
  epargneMensuelleRecommandee,
  type Objectif,
} from '@/lib/types'

export function ObjectifsView() {
  const { objectifs, deleteObjectif } = useStore()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Objectif | undefined>(undefined)
  const [contribFor, setContribFor] = useState<Objectif | null>(null)
  const [toDelete, setToDelete] = useState<Objectif | null>(null)

  const totalCible = objectifs.reduce((s, o) => s + o.montantCible, 0)
  const totalEpargne = objectifs.reduce((s, o) => s + o.montantEpargne, 0)
  const effortMensuel = objectifs.reduce(
    (s, o) => s + (o.montantEpargne >= o.montantCible ? 0 : epargneMensuelleRecommandee(o)),
    0,
  )

  function openCreate() {
    setEditing(undefined)
    setFormOpen(true)
  }

  function openEdit(objectif: Objectif) {
    setEditing(objectif)
    setFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-7 pb-2">
      <PageHeader
        title="Mes objectifs"
        subtitle="Épargne pour ce qui compte vraiment"
        action={
          <Button onClick={openCreate} className="h-11 gap-2 rounded-xl px-4">
            <Plus size={18} /> Nouvel objectif
          </Button>
        }
      />

      {objectifs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Target size={18} />}
            label="Objectifs actifs"
            value={String(objectifs.length)}
          />
          <StatCard
            icon={<PiggyBank size={18} />}
            label="Total épargné"
            value={formatFCFA(totalEpargne)}
            hint={`sur ${formatFCFA(totalCible)}`}
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Effort mensuel conseillé"
            value={formatFCFA(effortMensuel)}
            hint="pour tenir les échéances"
          />
        </div>
      )}

      {objectifs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Target size={22} />
          </div>
          <h3 className="font-medium text-foreground">Aucun objectif pour l&apos;instant</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Crée ton premier objectif d&apos;épargne pour suivre ta progression vers un achat
            important.
          </p>
          <Button onClick={openCreate} className="mt-2 h-11 gap-2 rounded-xl px-4">
            <Plus size={18} /> Créer un objectif
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {objectifs.map((o) => (
            <ObjectifCard
              key={o.id}
              objectif={o}
              onEdit={() => openEdit(o)}
              onDelete={() => setToDelete(o)}
              onContribute={() => setContribFor(o)}
            />
          ))}
        </div>
      )}

      <ObjectifFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        objectif={editing}
      />
      <ContributionModal
        open={contribFor !== null}
        onClose={() => setContribFor(null)}
        objectif={contribFor}
      />
      <ConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) deleteObjectif(toDelete.id)
          setToDelete(null)
        }}
        title="Supprimer cet objectif ?"
        description={
          toDelete
            ? `« ${toDelete.nom} » sera définitivement supprimé.`
            : ''
        }
        confirmLabel="Supprimer"
      />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-xl font-semibold text-card-foreground">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
