import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Monochrome editorial primitives modeled on microsoft.design's article system:
 * true black canvas, regular-weight display type, muted gray body copy,
 * no colored badges or boxed callouts — emphasis is carried by weight and
 * whitespace, not color.
 */

export function CategoryTags({ tags }: { tags: string[] }) {
  return (
    <p className="mb-6 font-sans text-[13px] tracking-[-0.005em] text-white/40">
      {tags.map((tag, i) => (
        <span key={tag}>
          {i > 0 && <span className="mx-2 text-white/20">–</span>}
          <span className="hover:text-white/70 transition-colors">{tag}</span>
        </span>
      ))}
    </p>
  )
}

export function ArticleH1({ children }: { children: ReactNode }) {
  return (
    <h1
      className="mb-5 font-sans font-normal leading-[1.15] tracking-[-0.01em] text-white"
      style={{ fontSize: 'clamp(32px, 4.6vw, 48px)' }}
    >
      {children}
    </h1>
  )
}

export function ArticleH2({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mb-5 font-sans font-normal leading-[1.25] tracking-[-0.005em] text-white"
      style={{ fontSize: 'clamp(22px, 2.8vw, 28px)' }}
    >
      {children}
    </h2>
  )
}

export function ArticleH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 mt-10 font-sans text-[18px] font-semibold tracking-[-0.005em] text-white">
      {children}
    </h3>
  )
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mb-6 font-sans text-[17px] leading-[1.75] tracking-[-0.003em] text-white/80', className)}>
      {children}
    </p>
  )
}

/** Bold lead-in paragraph — the Microsoft article's actual callout device:
 *  "Delightfully simple: ..." not a colored box, just a bold opening phrase. */
export function LeadIn({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <P>
      <strong className="font-semibold text-white">{lead}: </strong>
      {children}
    </P>
  )
}

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="my-10 border-l border-white/20 py-1 pl-6 sm:pl-8">
      <p
        className="m-0 font-sans font-normal italic leading-[1.5] tracking-[-0.005em] text-white/90"
        style={{ fontSize: 'clamp(19px, 2.1vw, 23px)' }}
      >
        {children}
      </p>
      {cite && (
        <cite className="mt-3 block font-sans text-[13px] not-italic text-white/35">{cite}</cite>
      )}
    </blockquote>
  )
}

export function Figure({
  caption,
  children,
}: {
  caption: string
  children: ReactNode
}) {
  return (
    <figure className="my-10">
      {children}
      <figcaption className="mt-3 text-center font-sans text-[13px] italic leading-[1.6] text-white/35">
        {caption}
      </figcaption>
    </figure>
  )
}

export function InlineTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="my-8 overflow-x-auto border-y border-white/[0.12]">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/[0.12]">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-white/45"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? 'border-b border-white/[0.06]' : ''}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-4 py-4 align-top font-sans text-[14px] leading-[1.6] tracking-[-0.003em]',
                    j === 0 ? 'font-medium text-white/85' : 'text-white/55',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ByLine({
  author,
  outlet,
  date,
  readTime,
}: {
  author: string
  outlet: string
  date: string
  readTime: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/10 pt-6 font-sans text-[14px] text-white/45">
      <span>
        By <span className="text-white/80">{author}</span>
      </span>
      <span className="text-white/20">·</span>
      <span>{outlet}</span>
      <span className="text-white/20">·</span>
      <span>{date}</span>
      <span className="text-white/20">–</span>
      <span>The estimated reading time is {readTime}</span>
    </div>
  )
}
