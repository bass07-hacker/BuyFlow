'use client'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Supprimer',
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="h-11 flex-1 justify-center rounded-xl"
        >
          Annuler
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            onConfirm()
            onClose()
          }}
          className="h-11 flex-1 justify-center rounded-xl"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
