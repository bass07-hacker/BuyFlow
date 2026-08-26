'use client'

import { Check, Circle, ImageIcon, Pencil, PauseCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/components/store'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import {
  type Article,
  type ArticleStatut,
  formatFCFA,
  totalArticle,
} from '@/lib/types'
import { cn } from '@/lib/utils'

const STATUT_LABEL: Record<ArticleStatut, string> = {
  A_ACHETER: 'À acheter',
  MIS_DE_COTE: 'Mis de côté',
  ACHETE: 'Acheté',
}

const STATUT_ORDRE: ArticleStatut[] = ['A_ACHETER', 'MIS_DE_COTE', 'ACHETE']

export function ArticleItem({
  achatId,
  article,
  onEdit,
  disabled = false,
}: {
  achatId: string
  article: Article
  onEdit: () => void
  disabled?: boolean
}) {
  const { setArticleStatut, deleteArticle } = useStore()
  const [confirmOpen, setConfirmOpen] = useState(false)

  function cycleStatut() {
    if (disabled) return
    const idx = STATUT_ORDRE.indexOf(article.statut)
    const next = STATUT_ORDRE[(idx + 1) % STATUT_ORDRE.length]
    setArticleStatut(achatId, article.id, next)
  }

  const statutBadge =
    article.statut === 'ACHETE' ? (
      <Badge variant="success">
        <Check size={13} /> Acheté
      </Badge>
    ) : article.statut === 'MIS_DE_COTE' ? (
      <Badge variant="warning">
        <PauseCircle size={13} /> Mis de côté
      </Badge>
    ) : (
      <Badge variant="outline">
        <Circle size={13} /> À acheter
      </Badge>
    )

  return (
    <div
      className={cn(
        'flex gap-4 rounded-2xl border border-border bg-card p-3 transition-colors',
        article.statut === 'ACHETE' && 'bg-cream',
      )}
    >
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-muted-foreground">
        {article.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.photo} alt={article.nom} className="h-full w-full object-cover" />
        ) : (
          <ImageIcon size={22} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{article.nom}</p>
            <p className="text-sm text-muted-foreground">
              {article.quantite} × {formatFCFA(article.prixUnitaire)}
              {article.source ? ` · ${article.source}` : ''}
            </p>
          </div>
          <span className="shrink-0 font-semibold text-foreground">
            {formatFCFA(totalArticle(article))}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={cycleStatut}
            disabled={disabled}
            title={disabled ? 'Achat clôturé' : 'Changer le statut'}
            className={cn(disabled && 'cursor-not-allowed opacity-70')}
          >
            {statutBadge}
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onEdit}
              disabled={disabled}
              aria-label="Modifier l’article"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={disabled}
              aria-label="Supprimer l’article"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteArticle(achatId, article.id)}
        title="Supprimer cet article ?"
        description={`« ${article.nom} » sera retiré de cet achat.`}
      />
    </div>
  )
}

export { STATUT_LABEL }
