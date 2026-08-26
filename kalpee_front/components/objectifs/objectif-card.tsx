'use client'

import { MoreVertical, Pencil, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'
import { ProgressBar } from '@/components/ui/progress-bar'
import { CategoryIcon } from '@/components/category-icon'
import {
  formatFCFA,
  formatDate,
  progressionObjectif,
  resteObjectif,
  type Objectif,
} from '@/lib/types'
import { cn } from '@/lib/utils'

export function ObjectifCard({
  objectif,
  onEdit,
  onDelete,
  onContribute,
}: {
  objectif: Objectif
  onEdit: () => void
  onDelete: () => void
  onContribute: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pct = progressionObjectif(objectif)
  const reste = resteObjectif(objectif)
  const atteint = objectif.montantEpargne >= objectif.montantCible

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-strong">
      <div className="flex items-start gap-3">
        <CategoryIcon categorie={objectif.categorie} className="size-11 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-card-foreground">{objectif.nom}</h3>
          <p className="text-xs text-muted-foreground">
            {objectif.dateCible ? `Échéance\u00a0: ${formatDate(objectif.dateCible)}` : 'Sans échéance'}
          </p>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label="Options"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onEdit()
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted"
                >
                  <Pencil size={15} /> Modifier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onDelete()
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 size={15} /> Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-semibold text-card-foreground">
            {formatFCFA(objectif.montantEpargne)}
          </span>
          <span className="text-sm text-muted-foreground">
            / {formatFCFA(objectif.montantCible)}
          </span>
        </div>
        <ProgressBar value={pct} className={cn(atteint && 'text-success')} />
        <div className="flex items-center justify-between text-xs">
          <span className={cn('font-medium', atteint ? 'text-success' : 'text-muted-foreground')}>
            {pct}%
          </span>
          <span className="text-muted-foreground">
            {atteint ? 'Objectif atteint' : `Reste ${formatFCFA(reste)}`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onContribute}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-transparent py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
      >
        <Plus size={15} /> Ajouter de l&apos;argent
      </button>
    </div>
  )
}
