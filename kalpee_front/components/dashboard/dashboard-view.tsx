'use client'

import { ArrowRight, Plus, ShoppingBag, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CategoryIcon } from '@/components/category-icon'
import { PriorityBadge } from '@/components/priority-badge'
import { useStore } from '@/components/store'
import { DepotModal } from '@/components/tirelire/tirelire-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn } from '@/lib/utils'
import {
  formatFCFA,
  progressionAchat,
  progressionObjectif,
  resteObjectif,
  totalAchat,
} from '@/lib/types'
import { PiggyBank } from 'lucide-react'

const PRIORITE_ORDRE = { URGENT: 0, IMPORTANT: 1, NORMAL: 2, FAIBLE: 3 } as const

export function DashboardView() {
  const { utilisateur, achats, objectifs, solde } = useStore()
  const [depotOpen, setDepotOpen] = useState(false)

  const totalAchats = useMemo(
    () => achats.reduce((sum, a) => sum + totalAchat(a), 0),
    [achats],
  )
  const achatsTries = useMemo(
    () =>
      [...achats].sort(
        (a, b) => PRIORITE_ORDRE[a.priorite] - PRIORITE_ORDRE[b.priorite],
      ),
    [achats],
  )
  const objectifPrincipal = objectifs[0]

  return (
    <div className="flex flex-col gap-8 pb-2">
      <div>
        <p className="text-sm text-muted-foreground">Bonjour {utilisateur.prenom},</p>
        <h1 className="mt-1 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
          Voici où tu en es aujourd’hui.
        </h1>
      </div>

      {/* Résumé */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tirelire — carte marron signature */}
        <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary via-primary to-brown-soft p-6 text-primary-foreground shadow-lg shadow-primary/15 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
              <PiggyBank size={18} /> Ma tirelire
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
              <PiggyBank size={18} />
            </span>
          </div>
          <div>
            <p className="font-serif text-3xl">{formatFCFA(solde)}</p>
            <p className="mt-1 text-sm text-primary-foreground/70">Argent disponible</p>
          </div>
          <Button
            onClick={() => setDepotOpen(true)}
            className="h-10 w-full justify-center gap-2 rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Plus size={16} /> Ajouter de l’argent
          </Button>
        </div>

        {/* Achats */}
        <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-border/80 bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShoppingBag size={18} /> Mes achats
            </span>
            <CategoryIcon categorie="accessoires" className="size-9" size={18} />
          </div>
          <div>
            <p className="font-serif text-3xl text-foreground">{formatFCFA(totalAchats)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {achats.length} achat{achats.length > 1 ? 's' : ''} en cours
            </p>
          </div>
          <Link
            href="/achats"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Voir mes achats <ArrowRight size={15} />
          </Link>
        </div>

        {/* Épargne */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Target size={18} /> Épargne
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-success/15 text-success">
              <TrendingUp size={18} />
            </span>
          </div>
          {objectifPrincipal ? (
            <>
              <div>
                <p className="font-serif text-2xl text-foreground">
                  {formatFCFA(objectifPrincipal.montantEpargne)}
                  <span className="text-base text-muted-foreground">
                    {' '}
                    / {formatFCFA(objectifPrincipal.montantCible)}
                  </span>
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {objectifPrincipal.nom}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <ProgressBar
                  value={progressionObjectif(objectifPrincipal)}
                  indicatorClassName="bg-success"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {progressionObjectif(objectifPrincipal)}% atteint
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun objectif pour le moment.</p>
          )}
        </div>
      </div>

      {/* Achats prioritaires */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">Mes achats prioritaires</h2>
          <Link
            href="/achats"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Tout voir
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {achatsTries.slice(0, 4).map((achat) => {
            const progression = progressionAchat(achat)
            return (
              <Link
                key={achat.id}
                href={`/achats/${achat.id}`}
                className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CategoryIcon categorie={achat.categorie} className="size-14" size={26} />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-serif text-lg text-foreground">{achat.nom}</h3>
                    <PriorityBadge priorite={achat.priorite} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      {formatFCFA(totalAchat(achat))}
                    </span>
                    <span className="text-muted-foreground">
                      {achat.articles.length} article{achat.articles.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <ProgressBar value={progression} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recommandation épargne */}
      {objectifPrincipal ? (
        <section className="flex flex-col gap-3 rounded-3xl border border-dashed border-primary/40 bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Target size={22} />
            </span>
            <div>
              <p className="font-serif text-lg text-foreground">Continue sur ta lancée</p>
              <p className="text-sm text-muted-foreground">
                Il te reste {formatFCFA(resteObjectif(objectifPrincipal))} pour «{' '}
                {objectifPrincipal.nom} ».
              </p>
            </div>
          </div>
          <Link
            href="/objectifs"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'h-10 shrink-0 justify-center gap-2 rounded-xl px-4',
            )}
          >
            Voir mes objectifs <ArrowRight size={16} />
          </Link>
        </section>
      ) : null}

      <DepotModal open={depotOpen} onClose={() => setDepotOpen(false)} />
    </div>
  )
}
