import { AchatDetailView } from '@/components/achats/achat-detail-view'

export default async function AchatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <AchatDetailView achatId={id} />
}
