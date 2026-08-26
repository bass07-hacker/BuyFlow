import { api } from '@/lib/api'
import type { CategorieKey, Objectif } from '@/lib/types'

interface ObjectifApi {
  id: number
  nom: string
  description?: string | null
  montantCible: number
  montantEpargne: number
  reste: number
  progression: number
  dateCible?: string | null
  categorie: CategorieKey
  epargneMensuelleRecommandee: number
}

function mapObjectif(o: ObjectifApi): Objectif {
  return {
    id: String(o.id),
    nom: o.nom,
    description: o.description ?? undefined,
    montantCible: o.montantCible,
    montantEpargne: o.montantEpargne,
    dateCible: o.dateCible ?? undefined,
    categorie: o.categorie,
  }
}

export async function fetchObjectifs(): Promise<Objectif[]> {
  const res = await api.get<ObjectifApi[]>('/api/objectifs')
  return res.data.map(mapObjectif)
}

export async function createObjectif(data: {
  nom: string
  description?: string
  montantCible: number
  montantEpargne?: number
  dateCible?: string
  categorie: CategorieKey
}): Promise<Objectif> {
  const res = await api.post<ObjectifApi>('/api/objectifs', data)
  return mapObjectif(res.data)
}

export async function updateObjectifApi(
  id: string,
  data: {
    nom: string
    description?: string
    montantCible: number
    montantEpargne?: number
    dateCible?: string
    categorie: CategorieKey
  },
): Promise<Objectif> {
  const res = await api.put<ObjectifApi>(`/api/objectifs/${id}`, data)
  return mapObjectif(res.data)
}

export async function deleteObjectifApi(id: string): Promise<void> {
  await api.delete(`/api/objectifs/${id}`)
}

export async function contribuerObjectifApi(id: string, montant: number): Promise<Objectif> {
  const res = await api.post<ObjectifApi>(`/api/objectifs/${id}/contribution`, { montant })
  return mapObjectif(res.data)
}
