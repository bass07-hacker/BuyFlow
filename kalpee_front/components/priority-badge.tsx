import { Badge } from '@/components/ui/badge'
import { PRIORITE_LABEL, type Priorite } from '@/lib/types'
import { cn } from '@/lib/utils'

const VARIANT: Record<Priorite, 'danger' | 'warning' | 'primary' | 'neutral'> = {
  URGENT: 'danger',
  IMPORTANT: 'warning',
  NORMAL: 'primary',
  FAIBLE: 'neutral',
}

const DOT: Record<Priorite, string> = {
  URGENT: 'bg-destructive',
  IMPORTANT: 'bg-warning',
  NORMAL: 'bg-primary',
  FAIBLE: 'bg-muted-foreground',
}

export function PriorityBadge({ priorite }: { priorite: Priorite }) {
  return (
    <Badge variant={VARIANT[priorite]}>
      <span className={cn('size-1.5 rounded-full', DOT[priorite])} aria-hidden />
      {PRIORITE_LABEL[priorite]}
    </Badge>
  )
}
