import Link from 'next/link'

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
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brown-dark via-primary to-brown-soft p-12 lg:flex lg:w-1/2">
        <Link href="/" className="font-serif text-2xl text-primary-foreground">
          Kalpee
        </Link>
        <div className="max-w-md">
          <h2 className="font-serif text-4xl leading-tight text-primary-foreground text-balance">
            Planifiez vos achats, maîtrisez votre argent.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-primary-foreground/70">
            Centralisez vos achats, ajoutez vos articles, remplissez votre tirelire et suivez vos
            objectifs d&apos;épargne — tranquillement.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">Vos données, votre rythme.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex font-serif text-2xl text-foreground lg:hidden">
            Kalpee
          </Link>
          <h1 className="font-serif text-4xl text-foreground text-balance">{title}</h1>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  )
}
