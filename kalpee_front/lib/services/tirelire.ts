import { api } from '@/lib/api'
import type { Transaction } from '@/lib/types'

interface TirelireApi {
  id: number
  solde: number
  totalDepose: number
  totalRetire: number
}

interface TransactionApi {
  id: number
  type: 'DEPOT' | 'RETRAIT'
  montant: number
  motif: string
  date: string
}

function mapTransaction(t: TransactionApi): Transaction {
  return {
    id: String(t.id),
    type: t.type,
    montant: t.montant,
    motif: t.motif,
    date: t.date,
  }
}

export async function fetchTirelire(): Promise<{
  solde: number
  totalDepose: number
  totalRetire: number
}> {
  const res = await api.get<TirelireApi>('/api/tirelire')
  return {
    solde: res.data.solde,
    totalDepose: res.data.totalDepose,
    totalRetire: res.data.totalRetire,
  }
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await api.get<TransactionApi[]>('/api/tirelire/transactions')
  return res.data.map(mapTransaction)
}

export async function deposerApi(montant: number, motif: string): Promise<void> {
  await api.post('/api/tirelire/depot', { montant, motif })
}

/** Leve une erreur (avec message lisible) si le solde est insuffisant — le backend fait foi (RB12). */
export async function retirerApi(montant: number, motif: string): Promise<void> {
  await api.post('/api/tirelire/retrait', { montant, motif })
}
