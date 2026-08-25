import { notFound } from 'next/navigation'
import { templates } from '@/lib/templates/data'
import { TemplateDetailClient } from './TemplateDetailClient'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = templates.find((t) => t.slug === params.slug)
  if (!template) return {}
  return {
    title: `${template.name} — Webclawd Templates`,
    description: template.description,
  }
}

export default function TemplatePage({ params }: Props) {
  const template = templates.find((t) => t.slug === params.slug)
  if (!template) notFound()

  // Related templates — same category, exclude current
  const related = templates
    .filter((t) => t.category === template.category && t.slug !== template.slug)
    .slice(0, 3)

  return (
    <main>
      <TemplateDetailClient template={template} related={related} />
    </main>
  )
}
