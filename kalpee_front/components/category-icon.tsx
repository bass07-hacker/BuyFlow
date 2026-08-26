import {
  Gamepad2,
  Home,
  Laptop,
  Package,
  Shirt,
  Smartphone,
  Watch,
  type LucideIcon,
} from 'lucide-react'
import type { CategorieKey } from '@/lib/types'
import { cn } from '@/lib/utils'

const ICONS: Record<CategorieKey, LucideIcon> = {
  vetements: Shirt,
  informatique: Laptop,
  telephone: Smartphone,
  maison: Home,
  accessoires: Watch,
  loisirs: Gamepad2,
  autre: Package,
}

export function categorieIcon(categorie: CategorieKey): LucideIcon {
  return ICONS[categorie] ?? Package
}

export function CategoryIcon({
  categorie,
  className,
  size = 22,
}: {
  categorie: CategorieKey
  className?: string
  size?: number
}) {
  const Icon = categorieIcon(categorie)
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-2xl bg-secondary text-[color:var(--brown-dark)]',
        className,
      )}
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  )
}
