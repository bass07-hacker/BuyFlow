import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
  indicatorClassName?: string
}

export function ProgressBar({ value, className, indicatorClassName }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2.5 w-full overflow-hidden rounded-full bg-secondary', className)}
    >
      <div
        className={cn('h-full rounded-full bg-primary transition-all duration-500', indicatorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
