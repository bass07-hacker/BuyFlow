'use client'

import { Plus, Search, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { AchatCard } from '@/components/achats/achat-card'
import { AchatFormModal } from '@/components/achats/achat-form-modal'
import { PageHeader } from '@/components/page-header'
import { useStore } from '@/components/store'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/field'
import { PRIORITE_LABEL, type Priorite } from '@/lib/types'

const PRIORITE_ORDRE: Record<Priorite, number> = {
  URGENT: 0,
  IMPORTANT: 1,
  NORMAL: 2,
  FAIBLE: 3,
}

export function AchatsView() {
  const { achats } = useStore()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filtre, setFiltre] = useState<'TOUS' | Priorite>('TOUS')
  const [formOpen, setFormOpen] = useState(false)

  const resultats = useMemo(() => {
    return achats
      .filter((a) => (filtre === 'TOUS' ? true : a.priorite === filtre))
      .filter((a) => a.nom.toLowerCase().includes(query.trim().toLowerCase()))
      .sort((a, b) => PRIORITE_ORDRE[a.priorite] - PRIORITE_ORDRE[b.priorite])
  }, [achats, filtre, query])

  return (
    <div>
      <PageHeader
        title="Mes achats"
        subtitle="Organise ce que tu veux acheter et suis ta progression."
        action={
          <Button onClick={() => setFormOpen(true)} className="h-11 gap-2 rounded-xl px-4">
            <Plus size={18} /> Nouvel achat
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Rechercher un achat"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filtre}
          onChange={(e) => setFiltre(e.target.value as 'TOUS' | Priorite)}
          className="sm:w-48"
          aria-label="Filtrer par priorité"
        >
          <option value="TOUS">Toutes les priorités</option>
          {(Object.keys(PRIORITE_LABEL) as Priorite[]).map((p) => (
            <option key={p} value={p}>
              {PRIORITE_LABEL[p]}
            </option>
          ))}
        </Select>
      </div>

      {resultats.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultats.map((achat) => (
            <AchatCard key={achat.id} achat={achat} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-[color:var(--brown-dark)]">
            <ShoppingBag size={26} />
          </span>
          <div>
            <p className="font-serif text-xl text-foreground">Aucun achat trouvé</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Crée ton premier achat pour commencer à t’organiser.
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)} className="h-11 gap-2 rounded-xl px-4">
            <Plus size={18} /> Nouvel achat
          </Button>
        </div>
      )}

      <AchatFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={(id) => router.push(`/achats/${id}`)}
      />
    </div>
  )
}
