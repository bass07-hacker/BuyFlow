import { api } from '@/lib/api'
import type { Achat, Article, ArticleStatut, CategorieKey, Priorite } from '@/lib/types'

/* ------------------------------------------------------------------ */
/* Types bruts renvoyes par l'API Spring Boot                          */
/* ------------------------------------------------------------------ */

interface ArticleApi {
  id: number
  nom: string
  description?: string | null
  photoUrl?: string | null
  quantite: number
  prixUnitaire: number
  total: number
  source?: string | null
  statut: ArticleStatut
}

interface AchatApi {
  id: number
  nom: string
  description?: string | null
  priorite: Priorite
  dateLimite?: string | null
  categorie: CategorieKey
  statut: string
  totalAchat: number
  montantAchete: number
  progression: number
  articles: ArticleApi[]
  createdAt: string
}

/* ------------------------------------------------------------------ */
/* Mapping API -> types du front (utilises tels quels par les composants) */
/* ------------------------------------------------------------------ */

function mapArticle(a: ArticleApi): Article {
  return {
    id: String(a.id),
    nom: a.nom,
    description: a.description ?? undefined,
    photo: a.photoUrl ?? undefined,
    quantite: a.quantite,
    prixUnitaire: a.prixUnitaire,
    source: a.source ?? undefined,
    statut: a.statut,
  }
}

function mapAchat(a: AchatApi): Achat {
  return {
    id: String(a.id),
    nom: a.nom,
    description: a.description ?? undefined,
    priorite: a.priorite,
    dateLimite: a.dateLimite ?? undefined,
    categorie: a.categorie,
    articles: a.articles.map(mapArticle),
    statut: a.statut as Achat['statut'],
  }
}

/* ------------------------------------------------------------------ */
/* Achats                                                               */
/* ------------------------------------------------------------------ */

export async function fetchAchats(): Promise<Achat[]> {
  const res = await api.get<AchatApi[]>('/api/achats')
  return res.data.map(mapAchat)
}

export async function createAchat(data: {
  nom: string
  description?: string
  priorite: Priorite
  dateLimite?: string
  categorie: CategorieKey
}): Promise<Achat> {
  const res = await api.post<AchatApi>('/api/achats', data)
  return mapAchat(res.data)
}

export async function updateAchatApi(
  id: string,
  data: {
    nom: string
    description?: string
    priorite: Priorite
    dateLimite?: string
    categorie: CategorieKey
  },
): Promise<Achat> {
  const res = await api.put<AchatApi>(`/api/achats/${id}`, data)
  return mapAchat(res.data)
}

export async function deleteAchatApi(id: string): Promise<void> {
  await api.delete(`/api/achats/${id}`)
}

/** Debite de la tirelire le montant des articles marqués « Acheté », puis passe l'achat en TERMINE. */
export async function cloturerAchatApi(id: string): Promise<Achat> {
  const res = await api.post<AchatApi>(`/api/achats/${id}/cloturer`)
  return mapAchat(res.data)
}

/* ------------------------------------------------------------------ */
/* Articles                                                             */
/* ------------------------------------------------------------------ */

export async function createArticle(
  achatId: string,
  data: {
    nom: string
    description?: string
    photoUrl?: string
    quantite: number
    prixUnitaire: number
    source?: string
  },
): Promise<Article> {
  const res = await api.post<ArticleApi>(`/api/achats/${achatId}/articles`, data)
  return mapArticle(res.data)
}

export async function updateArticleApi(
  articleId: string,
  data: {
    nom: string
    description?: string
    photoUrl?: string
    quantite: number
    prixUnitaire: number
    source?: string
  },
): Promise<Article> {
  const res = await api.put<ArticleApi>(`/api/articles/${articleId}`, data)
  return mapArticle(res.data)
}

export async function updateArticleStatutApi(
  articleId: string,
  statut: ArticleStatut,
): Promise<Article> {
  const res = await api.patch<ArticleApi>(`/api/articles/${articleId}/statut`, { statut })
  return mapArticle(res.data)
}

export async function deleteArticleApi(articleId: string): Promise<void> {
  await api.delete(`/api/articles/${articleId}`)
}

/* ------------------------------------------------------------------ */
/* Upload de photo                                                      */
/* ------------------------------------------------------------------ */

export async function uploadArticlePhoto(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const base = api.defaults.baseURL ?? ''
  const res = await fetch(`${base}/api/uploads/photo`, {
    method: 'POST',
    body: formData,
    credentials: 'include', // envoie le cookie JWT httpOnly, comme l'instance axios
  })
  if (!res.ok) {
    throw new Error("L'envoi de la photo a échoué")
  }
  const data: { url: string } = await res.json()
  // L'API renvoie un chemin relatif (/uploads/xxx) : on le resout en URL absolue vers le backend.
  return `${base}${data.url}`
}
