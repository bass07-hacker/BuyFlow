'use client'

import { Package, PiggyBank, ShoppingBag, Target, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { formatFCFA } from '@/lib/types'
import { type AdminStats, fetchAdminStats } from '@/lib/services/admin'

const PROVIDER_LABEL: Record<string, string> = {
  LOCAL: 'Email',
  GOOGLE: 'Google',
  APPLE: 'Apple',
}

export function AdminDashboardView() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .catch(() => setError('Impossible de charger les statistiques.'))
  }, [])

  if (error) {
    return <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
  }

  if (!stats) {
    return <p className="text-muted-foreground">Chargement des statistiques…</p>
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Vue d’ensemble"
        subtitle="Statistiques globales de la plateforme BuyFlow / Kalpee."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Utilisateurs"
          value={String(stats.totalUtilisateurs)}
          sub={`${stats.utilisateursActifs} actifs · +${stats.nouveauxUtilisateurs30j} (30j)`}
        />
        <StatCard
          icon={ShoppingBag}
          label="Achats planifiés"
          value={String(stats.totalAchats)}
          sub={formatFCFA(stats.montantTotalPlanifie)}
        />
        <StatCard
          icon={Package}
          label="Articles"
          value={String(stats.totalArticles)}
          sub={`${stats.articlesAchetes} achetés · ${formatFCFA(stats.montantTotalDepense)}`}
        />
        <StatCard
          icon={Target}
          label="Objectifs d’épargne"
          value={String(stats.totalObjectifs)}
          sub={formatFCFA(stats.montantTotalEpargne)}
        />
        <StatCard
          icon={PiggyBank}
          label="Dépôts cumulés"
          value={formatFCFA(stats.totalDepotsGlobal)}
          sub={`Retraits : ${formatFCFA(stats.totalRetraitsGlobal)}`}
        />
        <BreakdownCard title="Par priorité" data={stats.achatsParPriorite} />
        <BreakdownCard title="Par catégorie" data={stats.achatsParCategorie} />
        <BreakdownCard
          title="Par méthode de connexion"
          data={stats.utilisateursParProvider}
          labels={PROVIDER_LABEL}
        />
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2 font-serif text-2xl text-foreground">
          <TrendingUp size={22} className="text-primary" /> Articles les plus récurrents
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {stats.articlesRecurrents.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">
              Aucun article enregistré pour le moment.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Article</th>
                  <th className="px-4 py-3 font-medium">Occurrences</th>
                </tr>
              </thead>
              <tbody>
                {stats.articlesRecurrents.map((a) => (
                  <tr key={a.nom} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{a.nom}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.occurrences}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-cream text-[color:var(--brown-dark)]">
          <Icon size={16} />
        </span>
        {label}
      </div>
      <p className="font-serif text-2xl text-foreground">{value}</p>
      {sub ? <p className="text-xs text-muted-foreground">{sub}</p> : null}
    </div>
  )
}

function BreakdownCard({
  title,
  data,
  labels,
}: {
  title: string
  data: Record<string, number>
  labels?: Record<string, string>
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1])
  const total = entries.reduce((sum, [, v]) => sum + v, 0)
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="flex flex-col gap-2">
        {entries.length === 0 ? (
          <p className="text-xs text-muted-foreground">Aucune donnée</p>
        ) : (
          entries.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-foreground">{labels?.[key] ?? key}</span>
              <span className="text-xs text-muted-foreground">
                {value} {total > 0 ? `(${Math.round((value / total) * 100)}%)` : ''}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
