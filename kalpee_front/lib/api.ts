import axios from 'axios'

// URL de l'API Spring Boot. A definir dans .env.local : NEXT_PUBLIC_API_URL=http://localhost:8080
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
  withCredentials: true, // indispensable : le token JWT est transporte via un cookie httpOnly
  headers: { 'Content-Type': 'application/json' },
})

// Rafraichissement automatique du token si une requete renvoie 401 (session expiree)
let isRefreshing = false

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry && !isRefreshing) {
      original._retry = true
      isRefreshing = true
      try {
        await api.post('/api/auth/refresh')
        isRefreshing = false
        return api(original)
      } catch {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)
