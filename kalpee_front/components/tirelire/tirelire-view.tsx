'use client'

import { ArrowDownLeft, ArrowUpRight, Minus, PiggyBank, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useStore } from '@/components/store'
import { DepotModal, RetraitModal } from '@/components/tirelire/tirelire-actions'
import { Button } from '@/components/ui/button'
import { formatFCFA, type Transaction } from '@/lib/types'

function labelJour(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const hier = new Date()
  hier.setDate(today.getDate() - 1)
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  if (sameDay(d, today)) return "Aujourd'hui"
  if (sameDay(d, hier)) return 'Hier'
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

export function TirelireView() {
  const { transactions, solde, totalDepose, totalRetire } = useStore()
  const [depotOpen, setDepotOpen] = useState(false)
  const [retraitOpen, setRetraitOpen] = useState(false)

  const groupes = useMemo(() => {
    const map = new Map<string, Transaction[]>()
    for (const t of transactions) {
      const key = labelJour(t.date)
      const arr = map.get(key) ?? []
      arr.push(t)
      map.set(key, arr)
    }
    return Array.from(map.entries())
  }, [transactions])

  return (
    <div className="flex flex-col gap-8">
      {/* Carte solde signature */}
      <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary via-primary to-brown-soft p-6 text-center text-primary-foreground shadow-lg shadow-primary/15 sm:p-8">
        <div
          className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-primary-foreground/5"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-primary-foreground/5"
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-foreground/15">
            <PiggyBank size={32} />
          </span>
          <div>
            <p className="font-serif text-4xl sm:text-5xl">{formatFCFA(solde)}</p>
            <p className="mt-2 text-sm text-primary-foreground/70">Argent disponible</p>
          </div>
          <div className="mt-2 flex w-full max-w-sm gap-3">
            <Button
              onClick={() => setDepotOpen(true)}
              className="h-11 flex-1 justify-center gap-2 rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Plus size={18} /> Ajouter
            </Button>
            <Button
              onClick={() => setRetraitOpen(true)}
              className="h-11 flex-1 justify-center gap-2 rounded-xl border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Minus size={18} /> Retirer
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <span className="flex size-11 items-center justify-center rounded-full bg-success/15 text-success">
            <ArrowDownLeft size={20} />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Total déposé</p>
            <p className="font-serif text-xl text-foreground">{formatFCFA(totalDepose)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <span className="flex size-11 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <ArrowUpRight size={20} />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Total retiré</p>
            <p className="font-serif text-xl text-foreground">{formatFCFA(totalRetire)}</p>
          </div>
        </div>
      </div>

      {/* Historique */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl text-foreground">Historique</h2>
        {groupes.length > 0 ? (
          <div className="flex flex-col gap-6">
            {groupes.map(([jour, items]) => (
              <div key={jour} className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-muted-foreground">{jour}</p>
                <div className="flex flex-col gap-2">
                  {items.map((t) => {
                    const depot = t.type === 'DEPOT'
                    return (
                      <div
                        key={t.id}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                      >
                        <span
                          className={
                            depot
                              ? 'flex size-10 items-center justify-center rounded-full bg-success/15 text-success'
                              : 'flex size-10 items-center justify-center rounded-full bg-destructive/15 text-destructive'
                          }
                        >
                          {depot ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-foreground">{t.motif}</p>
                          <p className="text-sm text-muted-foreground">
                            {depot ? 'Dépôt' : 'Retrait'}
                          </p>
                        </div>
                        <span
                          className={
                            depot
                              ? 'font-semibold text-success'
                              : 'font-semibold text-destructive'
                          }
                        >
                          {depot ? '+' : '-'} {formatFCFA(t.montant)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card py-14 text-center">
            <p className="font-serif text-xl text-foreground">Aucune transaction</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajoute de l’argent pour démarrer ta tirelire.
            </p>
          </div>
        )}
      </section>

      <DepotModal open={depotOpen} onClose={() => setDepotOpen(false)} />
      <RetraitModal open={retraitOpen} onClose={() => setRetraitOpen(false)} />
    </div>
  )
}
