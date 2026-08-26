import Link from 'next/link'
import { CategoryIcon } from '@/components/category-icon'
import { PriorityBadge } from '@/components/priority-badge'
import { ProgressBar } from '@/components/ui/progress-bar'
import {
  type Achat,
  formatFCFA,
  progressionAchat,
  totalAchat,
} from '@/lib/types'

export function AchatCard({ achat }: { achat: Achat }) {
  const total = totalAchat(achat)
  const progression = progressionAchat(achat)
  const nbArticles = achat.articles.length

  return (
    <Link
      href={`/achats/${achat.id}`}
      className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <CategoryIcon categorie={achat.categorie} className="size-12" size={24} />
        <PriorityBadge priorite={achat.priorite} />
      </div>

      <div>
        <h3 className="font-serif text-xl text-foreground">{achat.nom}</h3>
        {achat.description ? (
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {achat.description}
          </p>
        ) : null}
      </div>

      <div className="flex items-end justify-between">
        <span className="text-lg font-semibold text-foreground">{formatFCFA(total)}</span>
        <span className="text-sm text-muted-foreground">
          {nbArticles} article{nbArticles > 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <ProgressBar value={progression} />
        <span className="text-xs font-medium text-muted-foreground">{progression}% acheté</span>
      </div>
    </Link>
  )
}
