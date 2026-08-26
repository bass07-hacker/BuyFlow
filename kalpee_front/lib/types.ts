export type Priorite = 'URGENT' | 'IMPORTANT' | 'NORMAL' | 'FAIBLE'

export type ArticleStatut = 'A_ACHETER' | 'MIS_DE_COTE' | 'ACHETE'

export type CategorieKey =
  | 'vetements'
  | 'informatique'
  | 'telephone'
  | 'maison'
  | 'accessoires'
  | 'loisirs'
  | 'autre'

export interface Article {
  id: string
  nom: string
  description?: string
  photo?: string
  quantite: number
  prixUnitaire: number
  source?: string
  statut: ArticleStatut
}

export type StatutAchat = 'EN_COURS' | 'TERMINE' | 'ANNULE'

export interface Achat {
  id: string
  nom: string
  description?: string
  priorite: Priorite
  dateLimite?: string
  categorie: CategorieKey
  articles: Article[]
  statut: StatutAchat
}

export interface Transaction {
  id: string
  type: 'DEPOT' | 'RETRAIT'
  montant: number
  motif: string
  date: string
}

export interface Objectif {
  id: string
  nom: string
  description?: string
  montantCible: number
  montantEpargne: number
  dateCible?: string
  categorie: CategorieKey
}

/* ----------------------------- Helpers ----------------------------- */

export function formatFCFA(montant: number): string {
  return `${Math.round(montant).toLocaleString('fr-FR').replace(/\u202f/g, ' ')} FCFA`
}

export function totalArticle(article: Article): number {
  return article.quantite * article.prixUnitaire
}

export function totalAchat(achat: Achat): number {
  return achat.articles.reduce((sum, a) => sum + totalArticle(a), 0)
}

export function montantAchete(achat: Achat): number {
  return achat.articles
    .filter((a) => a.statut === 'ACHETE')
    .reduce((sum, a) => sum + totalArticle(a), 0)
}

export function progressionAchat(achat: Achat): number {
  const total = totalAchat(achat)
  if (total === 0) return 0
  return Math.round((montantAchete(achat) / total) * 100)
}

export function progressionObjectif(objectif: Objectif): number {
  if (objectif.montantCible === 0) return 0
  return Math.min(100, Math.round((objectif.montantEpargne / objectif.montantCible) * 100))
}

export function resteObjectif(objectif: Objectif): number {
  return Math.max(0, objectif.montantCible - objectif.montantEpargne)
}

export function moisRestants(dateCible?: string): number {
  if (!dateCible) return 0
  const now = new Date()
  const cible = new Date(dateCible)
  const mois =
    (cible.getFullYear() - now.getFullYear()) * 12 + (cible.getMonth() - now.getMonth())
  return Math.max(1, mois)
}

export function epargneMensuelleRecommandee(objectif: Objectif): number {
  return Math.ceil(resteObjectif(objectif) / moisRestants(objectif.dateCible))
}

export function formatDate(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateCourte(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}

export const PRIORITE_LABEL: Record<Priorite, string> = {
  URGENT: 'Urgent',
  IMPORTANT: 'Important',
  NORMAL: 'Normal',
  FAIBLE: 'Faible',
}

export const CATEGORIE_LABEL: Record<CategorieKey, string> = {
  vetements: 'Vêtements',
  informatique: 'Informatique',
  telephone: 'Téléphone',
  maison: 'Maison',
  accessoires: 'Accessoires',
  loisirs: 'Loisirs',
  autre: 'Autre',
}
