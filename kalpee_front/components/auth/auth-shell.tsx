import Link from 'next/link'
import { ArrowUpRight, Check, Wallet } from 'lucide-react'

const BENEFITS = ['Une vue claire de tes priorités', 'Une tirelire qui suit ton rythme', 'Des objectifs qui restent motivants']

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background lg:flex-row">
      <section className="relative overflow-hidden bg-primary px-5 pb-8 pt-6 text-primary-foreground sm:px-8 sm:pb-10 lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-12">
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-2xl">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15"><Wallet size={18} /></span>
            Kalpee
          </Link>
          <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium">Ton espace financier</span>
        </div>
        <div className="relative z-10 mt-10 max-w-lg lg:mt-0">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/65">Reprends le contrôle</p>
          <h2 className="font-serif text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
            Chaque projet commence par une bonne décision.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Centralise tes envies, avance à ton rythme et transforme tes achats en objectifs vraiment atteignables.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-primary-foreground/85">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/15"><Check size={14} /></span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-8 flex items-center justify-between border-t border-primary-foreground/15 pt-4 text-xs text-primary-foreground/60 lg:mt-0">
          <span>Vos données, votre rythme.</span><ArrowUpRight size={16} />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="text-sm font-medium text-primary">Bienvenue dans ton espace</p>
          </div>
          <h1 className="font-serif text-4xl leading-tight text-foreground text-balance sm:text-5xl">{title}</h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </section>
    </div>
  )
}
