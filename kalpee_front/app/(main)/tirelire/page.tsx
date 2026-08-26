import { PageHeader } from '@/components/page-header'
import { TirelireView } from '@/components/tirelire/tirelire-view'

export default function TirelirePage() {
  return (
    <div>
      <PageHeader
        title="Ma tirelire"
        subtitle="Mets de l’argent de côté et suis tes mouvements."
      />
      <TirelireView />
    </div>
  )
}
