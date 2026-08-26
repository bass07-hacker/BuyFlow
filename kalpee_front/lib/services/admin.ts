import { api } from '@/lib/api'

export interface AdminUser {
  id: number
  prenom: string
  nom: string
  email: string
  provider: 'LOCAL' | 'GOOGLE' | 'APPLE'
  role: 'USER' | 'ADMIN'
  actif: boolean
  nombreAchats: number
  createdAt: string
}

export interface AdminStats {
  totalUtilisateurs: number
  utilisateursActifs: number
  nouveauxUtilisateurs30j: number
  totalAchats: number
  totalArticles: number
  articlesAchetes: number
  montantTotalPlanifie: number
  montantTotalDepense: number
  totalDepotsGlobal: number
  totalRetraitsGlobal: number
  totalObjectifs: number
  montantTotalEpargne: number
  achatsParPriorite: Record<string, number>
  achatsParCategorie: Record<string, number>
  utilisateursParProvider: Record<string, number>
  articlesRecurrents: { nom: string; occurrences: number }[]
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const res = await api.get<AdminUser[]>('/api/admin/users')
  return res.data
}

export async function createAdminUser(data: {
  prenom: string
  nom: string
  email: string
  motDePasse: string
  admin: boolean
}): Promise<AdminUser> {
  const res = await api.post<AdminUser>('/api/admin/users', data)
  return res.data
}

export async function updateAdminUser(
  id: number,
  data: { prenom: string; nom: string; email: string; actif: boolean },
): Promise<AdminUser> {
  const res = await api.put<AdminUser>(`/api/admin/users/${id}`, data)
  return res.data
}

export async function deleteAdminUser(id: number): Promise<void> {
  await api.delete(`/api/admin/users/${id}`)
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await api.get<AdminStats>('/api/admin/stats')
  return res.data
}
