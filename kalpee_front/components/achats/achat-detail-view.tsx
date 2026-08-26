'use client'

import { ArrowLeft, CalendarDays, CheckCircle2, Lock, Package, Pencil, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AchatFormModal } from '@/components/achats/achat-form-modal'
import { ArticleFormModal } from '@/components/achats/article-form-modal'
import { ArticleItem } from '@/components/achats/article-item'
import { CategoryIcon } from '@/components/category-icon'
import { PriorityBadge } from '@/components/priority-badge'
import { useStore } from '@/components/store'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { ProgressBar } from '@/components/ui/progress-bar'
import {
  type Article,
  formatDate,
  formatFCFA,
  montantAchete,
  progressionAchat,
  totalAchat,
} from '@/lib/types'
import { cn } from '@/lib/utils'

export function AchatDetailView({ achatId }: { achatId: string }) {
  const { achats, deleteAchat, cloturerAchat } = useStore()
  const router = useRouter()
  const achat = achats.find((a) => a.id === achatId)

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [cloturerOpen, setCloturerOpen] = useState(false)
  const [cloturing, setCloturing] = useState(false)
  const [cloturerErreur, setCloturerErreur] = useState<string | null>(null)
  const [articleOpen, setArticleOpen] = useState(false)
  const [articleEnEdition, setArticleEnEdition] = useState<Article | undefined>(undefined)

  if (!achat) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-[color:var(--brown-dark)]">
          <Package size={26} />
        </span>
        <p className="font-serif text-2xl text-foreground">Achat introuvable</p>
        <Link href="/achats" className={cn(buttonVariants(), 'h-11 rounded-xl px-4')}>
          Retour à mes achats
        </Link>
      </div>
    )
  }

  const total = totalAchat(achat)
  const depense = montantAchete(achat)
  const progression = progressionAchat(achat)
  const estCloture = achat.statut === 'TERMINE'

  async function handleCloturer() {
    setCloturing(true)
    setCloturerErreur(null)
    try {
      await cloturerAchat(achat!.id)
      setCloturerOpen(false)
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'La clôture a échoué.'
      setCloturerErreur(message)
    } finally {
      setCloturing(false)
    }
  }

  function openNewArticle() {
    setArticleEnEdition(undefined)
    setArticleOpen(true)
  }

  function openEditArticle(article: Article) {
    setArticleEnEdition(article)
    setArticleOpen(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/achats"
        className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} /> Mes achats
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <CategoryIcon categorie={achat.categorie} className="size-16" size={30} />
            <div>
              <div className="mb-2 flex items-center gap-2">
                <PriorityBadge priorite={achat.priorite} />
                {estCloture ? (
                  <Badge variant="success">
                    <CheckCircle2 size={12} /> Clôturé
                  </Badge>
                ) : null}
              </div>
              <h1 className="font-serif text-3xl text-foreground">{achat.nom}</h1>
              {achat.description ? (
                <p className="mt-1 text-muted-foreground">{achat.description}</p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!estCloture ? (
              <Button
                variant="secondary"
                onClick={() => setCloturerOpen(true)}
                aria-label="Clôturer l’achat"
                className="h-10 gap-2 rounded-xl px-3"
              >
                <Lock size={16} /> <span className="hidden sm:inline">Clôturer</span>
              </Button>
            ) : null}
            <Button
              variant="secondary"
              onClick={() => setEditOpen(true)}
              disabled={estCloture}
              aria-label="Modifier l’achat"
              className="h-10 gap-2 rounded-xl px-3"
            >
              <Pencil size={16} /> <span className="hidden sm:inline">Modifier</span>
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
              aria-label="Supprimer l’achat"
              className="h-10 gap-2 rounded-xl px-3"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-cream p-4">
            <p className="text-sm text-muted-foreground">Coût total</p>
            <p className="mt-1 font-serif text-2xl text-foreground">{formatFCFA(total)}</p>
          </div>
          <div className="rounded-2xl bg-cream p-4">
            <p className="text-sm text-muted-foreground">Déjà acheté</p>
            <p className="mt-1 font-serif text-2xl text-foreground">{formatFCFA(depense)}</p>
          </div>
          <div className="rounded-2xl bg-cream p-4">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays size={15} /> Date prévue
            </p>
            <p className="mt-1 font-serif text-lg text-foreground">
              {formatDate(achat.dateLimite)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Progression</span>
            <span className="font-semibold text-foreground">{progression}%</span>
          </div>
          <ProgressBar value={progression} className="h-3" />
        </div>
      </div>

      {/* Articles */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">
            Articles{' '}
            <span className="text-lg text-muted-foreground">({achat.articles.length})</span>
          </h2>
          <Button onClick={openNewArticle} disabled={estCloture} className="h-10 gap-2 rounded-xl px-4">
            <Plus size={18} /> Ajouter
          </Button>
        </div>

        {achat.articles.length > 0 ? (
          <div className="flex flex-col gap-3">
            {achat.articles.map((article) => (
              <ArticleItem
                key={article.id}
                achatId={achat.id}
                article={article}
                onEdit={() => openEditArticle(article)}
                disabled={estCloture}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-[color:var(--brown-dark)]">
              <Package size={26} />
            </span>
            <div>
              <p className="font-serif text-xl text-foreground">Aucun article</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Ajoute les articles que tu souhaites acheter.
              </p>
            </div>
            <Button onClick={openNewArticle} className="h-11 gap-2 rounded-xl px-4">
              <Plus size={18} /> Ajouter un article
            </Button>
          </div>
        )}
      </section>

      <AchatFormModal open={editOpen} onClose={() => setEditOpen(false)} achat={achat} />
      <ArticleFormModal
        open={articleOpen}
        onClose={() => setArticleOpen(false)}
        achatId={achat.id}
        article={articleEnEdition}
      />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteAchat(achat.id)
          router.push('/achats')
        }}
        title="Supprimer cet achat ?"
        description={`« ${achat.nom} » et tous ses articles seront supprimés.`}
      />

      <ConfirmDialog
        open={cloturerOpen}
        onClose={() => {
          setCloturerOpen(false)
          setCloturerErreur(null)
        }}
        onConfirm={handleCloturer}
        title="Clôturer cet achat ?"
        description={
          depense > 0
            ? `${formatFCFA(depense)} (le montant des articles « Achetés ») seront retirés de ta tirelire. L'achat ne pourra plus être modifié ensuite.`
            : "Aucun article n'est marqué « Acheté », donc rien ne sera retiré de ta tirelire. L'achat ne pourra plus être modifié ensuite."
        }
        confirmLabel={cloturing ? 'Clôture…' : 'Clôturer'}
      />
      {cloturerErreur ? (
        <p className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-xl bg-destructive px-4 py-3 text-center text-sm text-destructive-foreground shadow-lg">
          {cloturerErreur}
        </p>
      ) : null}
    </div>
  )
}
