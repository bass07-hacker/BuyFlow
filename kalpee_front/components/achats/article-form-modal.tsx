'use client'

import { Camera, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/components/store'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import { type Article, formatFCFA } from '@/lib/types'
import { uploadArticlePhoto } from '@/lib/services/achats'

interface ArticleFormModalProps {
  open: boolean
  onClose: () => void
  achatId: string
  article?: Article
}

export function ArticleFormModal({ open, onClose, achatId, article }: ArticleFormModalProps) {
  const { addArticle, updateArticle } = useStore()
  const isEdit = Boolean(article)
  const fileRef = useRef<HTMLInputElement>(null)

  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [quantite, setQuantite] = useState('1')
  const [prix, setPrix] = useState('')
  const [source, setSource] = useState('')
  const [photo, setPhoto] = useState<string | undefined>(undefined)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (open) {
      setNom(article?.nom ?? '')
      setDescription(article?.description ?? '')
      setQuantite(String(article?.quantite ?? 1))
      setPrix(article ? String(article.prixUnitaire) : '')
      setSource(article?.source ?? '')
      setPhoto(article?.photo)
      setPhotoFile(null)
    }
  }, [open, article])

  const total = (Number(quantite) || 0) * (Number(prix) || 0)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = Number(quantite)
    const p = Number(prix)
    if (!nom.trim() || !Number.isFinite(q) || q <= 0 || !Number.isFinite(p) || p < 0) return

    let photoUrl = photo
    if (photoFile) {
      setUploading(true)
      try {
        photoUrl = await uploadArticlePhoto(photoFile)
      } catch {
        setUploading(false)
        return
      }
      setUploading(false)
    }

    const payload = {
      nom: nom.trim(),
      description: description.trim() || undefined,
      quantite: q,
      prixUnitaire: p,
      source: source.trim() || undefined,
      photo: photoUrl,
    }
    if (isEdit && article) {
      updateArticle(achatId, article.id, payload)
    } else {
      addArticle(achatId, { ...payload, statut: 'A_ACHETER' })
    }
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Modifier l’article' : 'Ajouter un article'}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        {/* Photo */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-muted text-muted-foreground transition-colors hover:bg-secondary"
        >
          {photo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="Aperçu de l’article" className="h-full w-full object-cover" />
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  setPhoto(undefined)
                }}
                className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-[color:var(--brown-dark)]/60 text-white"
              >
                <X size={15} />
              </span>
            </>
          ) : (
            <span className="flex flex-col items-center gap-2 text-sm">
              <Camera size={26} />
              Ajouter une photo
            </span>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />

        <Field label="Nom" htmlFor="art-nom">
          <Input
            id="art-nom"
            placeholder="Jean noir"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </Field>
        <Field label="Description" htmlFor="art-desc">
          <Input
            id="art-desc"
            placeholder="Jean noir coupe droite"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Quantité" htmlFor="art-qte">
            <Input
              id="art-qte"
              type="number"
              min={1}
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              required
            />
          </Field>
          <Field label="Prix unitaire" htmlFor="art-prix" hint="En FCFA">
            <Input
              id="art-prix"
              type="number"
              min={0}
              placeholder="15 000"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
            />
          </Field>
        </div>
        <Field label="Magasin / source" htmlFor="art-source">
          <Input
            id="art-source"
            placeholder="Zara"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Field>

        <div className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">Total</span>
          <span className="font-serif text-xl text-foreground">{formatFCFA(total)}</span>
        </div>

        <div className="mt-1 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="h-11 flex-1 justify-center rounded-xl"
          >
            Annuler
          </Button>
          <Button type="submit" disabled={uploading} className="h-11 flex-1 justify-center rounded-xl">
            {uploading ? 'Envoi de la photo…' : isEdit ? 'Enregistrer' : 'Ajouter l’article'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
