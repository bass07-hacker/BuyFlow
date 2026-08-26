'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { Achat, Article, ArticleStatut, Objectif, Priorite, Transaction } from '@/lib/types'
import { me, updateProfile } from '@/lib/auth'
import {
  cloturerAchatApi,
  createAchat,
  createArticle,
  deleteAchatApi,
  deleteArticleApi,
  fetchAchats,
  updateAchatApi,
  updateArticleApi,
  updateArticleStatutApi,
} from '@/lib/services/achats'
import { deposerApi, fetchTirelire, fetchTransactions, retirerApi } from '@/lib/services/tirelire'
import {
  contribuerObjectifApi,
  createObjectif,
  deleteObjectifApi,
  fetchObjectifs,
  updateObjectifApi,
} from '@/lib/services/objectifs'

/* ----------------------------- Context ----------------------------- */

interface StoreValue {
  loading: boolean
  error: string | null
  utilisateur: { prenom: string; nom: string; email: string; role: 'USER' | 'ADMIN' }
  achats: Achat[]
  transactions: Transaction[]
  objectifs: Objectif[]
  solde: number
  totalDepose: number
  totalRetire: number
  addAchat: (data: Omit<Achat, 'id' | 'articles' | 'statut'>) => Promise<string>
  updateAchat: (id: string, data: Partial<Omit<Achat, 'id' | 'articles' | 'statut'>>) => void
  deleteAchat: (id: string) => void
  cloturerAchat: (id: string) => Promise<void>
  addArticle: (achatId: string, data: Omit<Article, 'id'>) => void
  updateArticle: (achatId: string, articleId: string, data: Partial<Omit<Article, 'id'>>) => void
  deleteArticle: (achatId: string, articleId: string) => void
  setArticleStatut: (achatId: string, articleId: string, statut: ArticleStatut) => void
  deposer: (montant: number, motif: string) => void
  retirer: (montant: number, motif: string) => boolean
  addObjectif: (data: Omit<Objectif, 'id'>) => void
  updateObjectif: (id: string, data: Partial<Omit<Objectif, 'id'>>) => void
  deleteObjectif: (id: string) => void
  ajouterAObjectif: (id: string, montant: number) => void
  updateUtilisateur: (data: Partial<{ prenom: string; nom: string; email: string }>) => void
  refresh: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [utilisateur, setUtilisateur] = useState<{
    prenom: string
    nom: string
    email: string
    role: 'USER' | 'ADMIN'
  }>({ prenom: '', nom: '', email: '', role: 'USER' })
  const [achats, setAchats] = useState<Achat[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [objectifs, setObjectifs] = useState<Objectif[]>([])
  const [solde, setSolde] = useState(0)
  const [totalDepose, setTotalDepose] = useState(0)
  const [totalRetire, setTotalRetire] = useState(0)

  const loadTirelire = useCallback(async () => {
    const [resume, historique] = await Promise.all([fetchTirelire(), fetchTransactions()])
    setSolde(resume.solde)
    setTotalDepose(resume.totalDepose)
    setTotalRetire(resume.totalRetire)
    setTransactions(historique)
  }, [])

  const loadAll = useCallback(async () => {
    setError(null)
    try {
      const [user, achatsData, objectifsData] = await Promise.all([
        me(),
        fetchAchats(),
        fetchObjectifs(),
        loadTirelire(),
      ])
      setUtilisateur({ prenom: user.prenom, nom: user.nom, email: user.email, role: user.role })
      setAchats(achatsData)
      setObjectifs(objectifsData)
    } catch {
      setError("Impossible de charger tes données. Vérifie que l'API est bien lancée.")
    } finally {
      setLoading(false)
    }
  }, [loadTirelire])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  /* ----------------------------- Achats ----------------------------- */

  const addAchat = useCallback(async (data: Omit<Achat, 'id' | 'articles' | 'statut'>) => {
    const created = await createAchat(data)
    setAchats((prev) => [created, ...prev])
    return created.id
  }, [])

  const updateAchat = useCallback(
    (id: string, data: Partial<Omit<Achat, 'id' | 'articles' | 'statut'>>) => {
      setAchats((prev) => {
        const current = prev.find((a) => a.id === id)
        if (!current) return prev
        const merged = { ...current, ...data }
        updateAchatApi(id, {
          nom: merged.nom,
          description: merged.description,
          priorite: merged.priorite,
          dateLimite: merged.dateLimite,
          categorie: merged.categorie,
        })
          .then((updated) =>
            setAchats((p) => p.map((a) => (a.id === id ? { ...updated, articles: a.articles } : a))),
          )
          .catch(() => setError("La modification de l'achat a échoué."))
        return prev.map((a) => (a.id === id ? merged : a))
      })
    },
    [],
  )

  const deleteAchat = useCallback(
    (id: string) => {
      setAchats((prev) => prev.filter((a) => a.id !== id))
      deleteAchatApi(id).catch(() => {
        setError("La suppression de l'achat a échoué.")
        loadAll()
      })
    },
    [loadAll],
  )

  /** Debite la tirelire du montant des articles achetés, puis clôture l'achat (RB12 vérifiée côté serveur). */
  const cloturerAchat = useCallback(
    async (id: string) => {
      const updated = await cloturerAchatApi(id)
      setAchats((prev) => prev.map((a) => (a.id === id ? updated : a)))
      await loadTirelire()
    },
    [loadTirelire],
  )

  /* ----------------------------- Articles ----------------------------- */

  const addArticle = useCallback(async (achatId: string, data: Omit<Article, 'id'>) => {
    const created = await createArticle(achatId, {
      nom: data.nom,
      description: data.description,
      photoUrl: data.photo,
      quantite: data.quantite,
      prixUnitaire: data.prixUnitaire,
      source: data.source,
    })
    setAchats((prev) =>
      prev.map((a) => (a.id === achatId ? { ...a, articles: [...a.articles, created] } : a)),
    )
  }, [])

  const updateArticle = useCallback(
    (achatId: string, articleId: string, data: Partial<Omit<Article, 'id'>>) => {
      setAchats((prev) => {
        const achat = prev.find((a) => a.id === achatId)
        const article = achat?.articles.find((ar) => ar.id === articleId)
        if (!achat || !article) return prev
        const merged = { ...article, ...data }
        updateArticleApi(articleId, {
          nom: merged.nom,
          description: merged.description,
          photoUrl: merged.photo,
          quantite: merged.quantite,
          prixUnitaire: merged.prixUnitaire,
          source: merged.source,
        })
          .then((updated) =>
            setAchats((p) =>
              p.map((a) =>
                a.id === achatId
                  ? { ...a, articles: a.articles.map((ar) => (ar.id === articleId ? updated : ar)) }
                  : a,
              ),
            ),
          )
          .catch(() => setError("La modification de l'article a échoué."))
        return prev.map((a) =>
          a.id === achatId
            ? { ...a, articles: a.articles.map((ar) => (ar.id === articleId ? merged : ar)) }
            : a,
        )
      })
    },
    [],
  )

  const deleteArticle = useCallback(
    (achatId: string, articleId: string) => {
      setAchats((prev) =>
        prev.map((a) =>
          a.id === achatId ? { ...a, articles: a.articles.filter((ar) => ar.id !== articleId) } : a,
        ),
      )
      deleteArticleApi(articleId).catch(() => {
        setError("La suppression de l'article a échoué.")
        loadAll()
      })
    },
    [loadAll],
  )

  const setArticleStatut = useCallback(
    (achatId: string, articleId: string, statut: ArticleStatut) => {
      setAchats((prev) =>
        prev.map((a) =>
          a.id === achatId
            ? { ...a, articles: a.articles.map((ar) => (ar.id === articleId ? { ...ar, statut } : ar)) }
            : a,
        ),
      )
      updateArticleStatutApi(articleId, statut).catch(() => {
        setError("Le changement de statut a échoué.")
        loadAll()
      })
    },
    [loadAll],
  )

  /* ----------------------------- Tirelire ----------------------------- */

  const deposer = useCallback(
    (montant: number, motif: string) => {
      deposerApi(montant, motif)
        .then(loadTirelire)
        .catch(() => setError('Le dépôt a échoué.'))
    },
    [loadTirelire],
  )

  const retirer = useCallback(
    (montant: number, motif: string) => {
      retirerApi(montant, motif)
        .then(loadTirelire)
        .catch(() => setError('Solde insuffisant ou retrait refusé par le serveur.'))
      return true
    },
    [loadTirelire],
  )

  /* ----------------------------- Objectifs ----------------------------- */

  const addObjectif = useCallback((data: Omit<Objectif, 'id'>) => {
    createObjectif(data)
      .then((created) => setObjectifs((prev) => [created, ...prev]))
      .catch(() => setError("La création de l'objectif a échoué."))
  }, [])

  const updateObjectif = useCallback(
    (id: string, data: Partial<Omit<Objectif, 'id'>>) => {
      setObjectifs((prev) => {
        const current = prev.find((o) => o.id === id)
        if (!current) return prev
        const merged = { ...current, ...data }
        updateObjectifApi(id, {
          nom: merged.nom,
          description: merged.description,
          montantCible: merged.montantCible,
          montantEpargne: merged.montantEpargne,
          dateCible: merged.dateCible,
          categorie: merged.categorie,
        })
          .then((updated) => setObjectifs((p) => p.map((o) => (o.id === id ? updated : o))))
          .catch(() => setError("La modification de l'objectif a échoué."))
        return prev.map((o) => (o.id === id ? merged : o))
      })
    },
    [],
  )

  const deleteObjectif = useCallback(
    (id: string) => {
      setObjectifs((prev) => prev.filter((o) => o.id !== id))
      deleteObjectifApi(id).catch(() => {
        setError("La suppression de l'objectif a échoué.")
        loadAll()
      })
    },
    [loadAll],
  )

  const ajouterAObjectif = useCallback((id: string, montant: number) => {
    contribuerObjectifApi(id, montant)
      .then((updated) => setObjectifs((prev) => prev.map((o) => (o.id === id ? updated : o))))
      .catch(() => setError("L'ajout à l'objectif a échoué."))
  }, [])

  /* ----------------------------- Profil ----------------------------- */

  const updateUtilisateur = useCallback(
    (data: Partial<{ prenom: string; nom: string; email: string }>) => {
      setUtilisateur((prev) => {
        const merged = { ...prev, ...data }
        updateProfile({ prenom: merged.prenom, nom: merged.nom }).catch(() =>
          setError('La mise à jour du profil a échoué.'),
        )
        return merged
      })
    },
    [],
  )

  const value: StoreValue = {
    loading,
    error,
    utilisateur,
    achats,
    transactions,
    objectifs,
    solde,
    totalDepose,
    totalRetire,
    addAchat,
    updateAchat,
    deleteAchat,
    cloturerAchat,
    addArticle,
    updateArticle,
    deleteArticle,
    setArticleStatut,
    deposer,
    retirer,
    addObjectif,
    updateObjectif,
    deleteObjectif,
    ajouterAObjectif,
    updateUtilisateur,
    refresh: loadAll,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore doit être utilisé dans un StoreProvider')
  return ctx
}

export type { Priorite }
