'use client'

import { ShieldCheck, Trash2, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AdminUserFormModal } from '@/components/admin/admin-user-form-modal'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { formatDate } from '@/lib/types'
import {
  type AdminUser,
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  updateAdminUser,
} from '@/lib/services/admin'

const PROVIDER_LABEL: Record<string, string> = {
  LOCAL: 'Email',
  GOOGLE: 'Google',
  APPLE: 'Apple',
}

export function AdminUsersView() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)

  async function loadUsers() {
    setError(null)
    try {
      setUsers(await fetchAdminUsers())
    } catch {
      setError('Impossible de charger les utilisateurs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  function openCreate() {
    setEditingUser(undefined)
    setFormOpen(true)
  }

  function openEdit(user: AdminUser) {
    setEditingUser(user)
    setFormOpen(true)
  }

  async function handleSubmit(data: {
    prenom: string
    nom: string
    email: string
    motDePasse: string
    admin: boolean
    actif: boolean
  }) {
    if (editingUser) {
      const updated = await updateAdminUser(editingUser.id, {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        actif: data.actif,
      })
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    } else {
      const created = await createAdminUser(data)
      setUsers((prev) => [created, ...prev])
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setDeleteTarget(null)
    setUsers((prev) => prev.filter((u) => u.id !== id))
    try {
      await deleteAdminUser(id)
    } catch {
      setError('La suppression a échoué.')
      loadUsers()
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Chargement des utilisateurs…</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Utilisateurs"
        subtitle={`${users.length} compte${users.length > 1 ? 's' : ''} enregistré${users.length > 1 ? 's' : ''}.`}
        action={
          <Button onClick={openCreate} className="h-11 gap-2 rounded-xl px-4">
            <UserPlus size={18} /> Ajouter un utilisateur
          </Button>
        }
      />

      {error ? (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Utilisateur</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Connexion</th>
              <th className="px-4 py-3 font-medium">Achats</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Inscrit le</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <button type="button" onClick={() => openEdit(u)} className="text-left hover:underline">
                    <p className="font-medium text-foreground">
                      {u.prenom} {u.nom}
                      {u.role === 'ADMIN' ? (
                        <ShieldCheck size={14} className="ml-1.5 inline text-primary" />
                      ) : null}
                    </p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </button>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {PROVIDER_LABEL[u.provider] ?? u.provider}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.nombreAchats}</td>
                <td className="px-4 py-3">
                  <Badge variant={u.actif ? 'success' : 'danger'}>
                    {u.actif ? 'Actif' : 'Désactivé'}
                  </Badge>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                  {formatDate(u.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  {u.role !== 'ADMIN' ? (
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(u)}
                      aria-label="Supprimer l’utilisateur"
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminUserFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        user={editingUser}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Supprimer cet utilisateur ?"
        description={
          deleteTarget
            ? `« ${deleteTarget.prenom} ${deleteTarget.nom} » et toutes ses données (achats, tirelire, objectifs) seront définitivement supprimés.`
            : ''
        }
      />
    </div>
  )
}
