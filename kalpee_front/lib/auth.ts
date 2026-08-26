import { api } from '@/lib/api'

export interface Utilisateur {
  id: number
  prenom: string
  nom: string
  email: string
  provider: 'LOCAL' | 'GOOGLE' | 'APPLE'
  photoUrl?: string
  role: 'USER' | 'ADMIN'
}

export async function register(data: {
  prenom: string
  nom: string
  email: string
  motDePasse: string
}): Promise<Utilisateur> {
  const res = await api.post<Utilisateur>('/api/auth/register', data)
  return res.data
}

export async function login(data: { email: string; motDePasse: string }): Promise<Utilisateur> {
  const res = await api.post<Utilisateur>('/api/auth/login', data)
  return res.data
}

export async function loginWithGoogle(idToken: string): Promise<Utilisateur> {
  const res = await api.post<Utilisateur>('/api/auth/google', { idToken })
  return res.data
}

export async function loginWithApple(
  identityToken: string,
  prenom?: string,
  nom?: string,
): Promise<Utilisateur> {
  const res = await api.post<Utilisateur>('/api/auth/apple', { identityToken, prenom, nom })
  return res.data
}

export async function me(): Promise<Utilisateur> {
  const res = await api.get<Utilisateur>('/api/auth/me')
  return res.data
}

export async function updateProfile(data: { prenom: string; nom: string }): Promise<Utilisateur> {
  const res = await api.put<Utilisateur>('/api/auth/me', data)
  return res.data
}

export async function logout(): Promise<void> {
  await api.post('/api/auth/logout')
}

/** Extrait un message d'erreur lisible depuis une reponse Axios de l'API BuyFlow */
export function extractErrorMessage(err: unknown): string {
  const anyErr = err as { response?: { data?: { message?: string } } }
  return anyErr?.response?.data?.message ?? 'Une erreur est survenue. Reessaie.'
}
