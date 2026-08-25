'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, LayoutGrid, HelpCircle, Mail, BookOpen,
  ShoppingCart, Calendar, SlidersHorizontal, ArrowUpDown, Menu, X
} from 'lucide-react'
import { templates as liveTemplates } from '@/lib/templates/data'

// Proxy external screenshots through the same allowlisted route used on the
// template detail pages, so real thumbnails render without CORS/hotlink issues.
const proxied = (url: string) => (url.startsWith('http') ? `/api/img?url=${encodeURIComponent(url)}` : url)

// ─── Data ───────────────────────────────────────────────────────────────────
const NICHES = [
  { id: 'cloud-kitchen', label: 'Cloud Kitchen', emoji: '🍱', type: 'Ecommerce', typeColor: 'text-violet-400' },
  { id: 'boutique',      label: 'Boutique',       emoji: '👗', type: 'Ecommerce', typeColor: 'text-violet-400' },
  { id: 'jewellery',     label: 'Jewellery',      emoji: '💍', type: 'Ecommerce', typeColor: 'text-violet-400' },
  { id: 'salon',         label: 'Salon & Beauty', emoji: '✂️', type: 'Standard',  typeColor: 'text-cyan-400' },
  { id: 'clinic',        label: 'Clinic',         emoji: '🏥', type: 'Standard',  typeColor: 'text-cyan-400' },
  { id: 'event-planner', label: 'Event Planner',  emoji: '🎉', type: 'Standard',  typeColor: 'text-cyan-400' },
  { id: 'gym',           label: 'Gym & Fitness',  emoji: '💪', type: 'Standard',  typeColor: 'text-cyan-400' },
  { id: 'yoga',          label: 'Yoga & Wellness',emoji: '🧘', type: 'Standard',  typeColor: 'text-cyan-400' },
  { id: 'interior',      label: 'Interior Design',emoji: '🏠', type: 'Standard',  typeColor: 'text-cyan-400' },
]

const TYPE_PRICE: Record<string, string> = {
  Ecommerce: '₹25,000',
  Standard:  '₹9,999',
}

const TYPE_COLOR: Record<string, string> = {
  Ecommerce: '#7c3aed',
  Standard:  '#0099ff',
}

// Niches that now have real, live templates (from src/lib/templates/data.ts).
// Everything else still falls back to the Style A/B mock cards below.
const REAL_NICHE_TEMPLATES: Record<string, string[]> = {
  'clinic':        ['oralcare', 'dentora', 'dentiva'],
  'event-planner': ['aventis', 'eventry'],
  'gym':           ['fitcore', 'fitbix', 'fit-zone'],
  'yoga':          ['lumina', 'yogastic', 'pranava'],
  'interior':      ['aurivio', 'intro'],
  'jewellery':     ['pearlgem', 'estelle'],
  'salon':         ['salonix', 'salona'],
  'cloud-kitchen': ['craving', 'aroma'],
  'boutique':      ['ecom', 'moss'],
}

interface MarketTemplate {
  id: string
  nicheId: string
  nicheLabel: string
  emoji: string
  name: string
  type: string
  price: string
  variant: 'A' | 'B' | 'C'
  slug?: string       // present => real, clickable template with a live preview
  image?: string      // real screenshot, only used when slug is present
  previewUrl?: string // live site URL — used for the hover live-scroll preview
}

const VARIANT_LETTERS = ['A', 'B', 'C'] as const

const TEMPLATES: MarketTemplate[] = NICHES.flatMap((n): MarketTemplate[] => {
  const realSlugs = REAL_NICHE_TEMPLATES[n.id]
  if (realSlugs) {
    return realSlugs.map((slug, i) => {
      const t = liveTemplates.find((pt) => pt.slug === slug)
      return {
        id: slug,
        nicheId: n.id,
        nicheLabel: n.label,
        emoji: n.emoji,
        name: t?.name ?? slug,
        type: n.type,
        price: TYPE_PRICE[n.type],
        variant: VARIANT_LETTERS[i] ?? 'A',
        slug: t?.slug,
        image: t?.image,
        previewUrl: t?.previewUrl,
      }
    })
  }
  return [
    { id: `${n.id}-1`, nicheId: n.id, nicheLabel: n.label, emoji: n.emoji, name: `${n.label} — Style A`, type: n.type, price: TYPE_PRICE[n.type], variant: 'A' },
    { id: `${n.id}-2`, nicheId: n.id, nicheLabel: n.label, emoji: n.emoji, name: `${n.label} — Style B`, type: n.type, price: TYPE_PRICE[n.type], variant: 'B' },
  ]
})

// Featured = 3 hand-picked highlights shown at the top — real, live templates
// with real screenshots so the section never looks empty.
const FEATURED = [
  {
    id: 'cloud-kitchen-1', nicheId: 'cloud-kitchen', emoji: '🍱', name: 'Aromas Kitchen', type: 'Ecommerce', price: '₹25,000', accent: '#7c3aed',
    desc: 'Home-cooked meal subscriptions with a live price calculator',
    slug: 'aroma',
    image: liveTemplates.find((t) => t.slug === 'aroma')?.image,
    previewUrl: liveTemplates.find((t) => t.slug === 'aroma')?.previewUrl,
  },
  {
    id: 'salon-1', nicheId: 'salon', emoji: '✂️', name: 'Salonix', type: 'Standard', price: '₹9,999', accent: '#0099ff',
    desc: 'Premium hair & beauty salon site with online booking',
    slug: 'salonix',
    image: liveTemplates.find((t) => t.slug === 'salonix')?.image,
    previewUrl: liveTemplates.find((t) => t.slug === 'salonix')?.previewUrl,
  },
  {
    id: 'boutique-moss', nicheId: 'boutique', emoji: '👗', name: 'Moss & Stone', type: 'Ecommerce', price: '₹25,000', accent: '#7c3aed',
    desc: 'Earth-toned slow-fashion storefront with sustainability metrics',
    slug: 'moss',
    image: liveTemplates.find((t) => t.slug === 'moss')?.image,
    previewUrl: liveTemplates.find((t) => t.slug === 'moss')?.previewUrl,
  },
]

const NAV_SIDEBAR: { id: 'templates' | 'portfolios' | 'how-it-works' | 'contact'; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'templates',    label: 'Templates',    icon: LayoutGrid },
  { id: 'portfolios',   label: 'Portfolios',   icon: BookOpen },
  { id: 'how-it-works', label: 'How it Works', icon: HelpCircle },
  { id: 'contact',      label: 'Contact',      icon: Mail },
]

const TYPE_TABS = [
  { id: 'All',        label: 'All',        icon: LayoutGrid },
  { id: 'Ecommerce',  label: 'Ecommerce',  icon: ShoppingCart },
  { id: 'Standard',   label: 'Standard',   icon: Calendar },
  { id: 'Portfolios', label: 'Portfolios', icon: BookOpen },
]

// Designer portfolio templates — pulled straight from the real template
// catalogue (category === 'Portfolio'), same data source as everything else.
const PORTFOLIOS = liveTemplates
  .filter((t) => t.category === 'Portfolio')
  .map((t) => ({
    id: t.slug, nicheId: 'portfolio', emoji: '🎨', name: t.name, type: t.type, price: '₹4,999',
    slug: t.slug, image: t.image, previewUrl: t.previewUrl,
  }))

// ─── Niche thumbnail mockups ─────────────────────────────────────────────────
// Each returns a styled div that fills the thumb area — mimics a real website
// screenshot until actual preview images are ready.
const THUMB_STYLES: Record<string, { bg: string; content: React.ReactNode }> = {
  'cloud-kitchen': {
    bg: '#0f1a0f',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-4 h-4 rounded bg-[#4ade80]/20 flex items-center justify-center text-[8px]">🍱</div>
          <div className="h-1.5 w-16 bg-white/10 rounded-full" />
        </div>
        <div className="h-2 w-3/4 bg-white/15 rounded-full" />
        <div className="h-1.5 w-1/2 bg-white/8 rounded-full" />
        <div className="mt-auto grid grid-cols-3 gap-1">
          {['#1a2e1a','#162814','#0f1f0f'].map((c,i) => <div key={i} className="aspect-square rounded" style={{background:c}} />)}
        </div>
        <div className="h-5 w-24 rounded-md bg-[#4ade80]/20 mt-1" />
      </div>
    ),
  },
  'boutique': {
    bg: '#1a1018',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between mb-1">
          <div className="h-1.5 w-12 bg-white/20 rounded-full" />
          <div className="flex gap-1">{[1,2,3].map(i=><div key={i} className="h-1 w-6 bg-white/10 rounded-full"/>)}</div>
        </div>
        <div className="flex gap-2 flex-1">
          <div className="flex-1 rounded bg-[#2d1a28]" />
          <div className="flex-1 rounded bg-[#251520]" />
        </div>
        <div className="h-1.5 w-2/3 bg-white/15 rounded-full mt-1" />
        <div className="h-4 w-20 rounded bg-white/10 mt-0.5" />
      </div>
    ),
  },
  'jewellery': {
    bg: '#1a1508',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="h-1.5 w-20 bg-[#f59e0b]/40 rounded-full mx-auto mb-1" />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-[#f59e0b]/30 flex items-center justify-center text-lg">💍</div>
        </div>
        <div className="h-1.5 w-3/4 bg-white/10 rounded-full mx-auto" />
        <div className="h-4 w-16 rounded bg-[#f59e0b]/15 mx-auto mt-0.5" />
      </div>
    ),
  },
  'salon': {
    bg: '#12100f',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="h-1.5 w-24 bg-[#ec4899]/30 rounded-full mb-1" />
        <div className="h-2 w-3/4 bg-white/15 rounded-full" />
        <div className="h-1.5 w-1/2 bg-white/8 rounded-full" />
        <div className="mt-2 flex gap-1.5">
          {['✂️','💅','🧖'].map((e,i)=>(
            <div key={i} className="flex-1 rounded bg-[#1e1218] p-1.5 flex flex-col items-center gap-1">
              <span className="text-[10px]">{e}</span>
              <div className="h-1 w-full bg-white/10 rounded-full" />
            </div>
          ))}
        </div>
        <div className="h-4 w-20 rounded bg-[#ec4899]/15 mt-1" />
      </div>
    ),
  },
  'clinic': {
    bg: '#0d1212',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-3 h-3 rounded bg-[#10b981]/20 text-[6px] flex items-center justify-center text-[#10b981]">+</div>
          <div className="h-1.5 w-14 bg-white/15 rounded-full" />
        </div>
        <div className="h-2 w-2/3 bg-white/15 rounded-full" />
        <div className="mt-2 grid grid-cols-2 gap-1">
          {[1,2,3,4].map(i=><div key={i} className="rounded bg-[#0f1f1a] p-1.5"><div className="h-1 w-full bg-white/10 rounded-full mb-0.5"/><div className="h-0.5 w-2/3 bg-white/6 rounded-full"/></div>)}
        </div>
        <div className="h-4 w-20 rounded bg-[#10b981]/15 mt-1" />
      </div>
    ),
  },
  'event-planner': {
    bg: '#130f1a',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="h-1.5 w-20 bg-[#a855f7]/30 rounded-full mb-1" />
        <div className="h-2 w-3/4 bg-white/15 rounded-full" />
        <div className="flex-1 flex gap-1.5 mt-2">
          <div className="flex-1 rounded bg-[#1e1428]" />
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="rounded flex-1 bg-[#1a1222]" />
            <div className="rounded flex-1 bg-[#16101e]" />
          </div>
        </div>
        <div className="h-4 w-20 rounded bg-[#a855f7]/15 mt-1" />
      </div>
    ),
  },
  'gym': {
    bg: '#100d0a',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="h-2 w-3/4 bg-white/20 rounded-full mb-1" />
        <div className="h-1.5 w-1/2 bg-[#f97316]/30 rounded-full" />
        <div className="mt-2 flex flex-col gap-1">
          {['MON','WED','FRI'].map(d=>(
            <div key={d} className="flex items-center gap-1.5">
              <span className="text-[7px] text-white/20 w-6">{d}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[#f97316]/15" />
            </div>
          ))}
        </div>
        <div className="h-4 w-24 rounded bg-[#f97316]/20 mt-2" />
      </div>
    ),
  },
  'interior': {
    bg: '#0f0d0a',
    content: (
      <div className="w-full h-full p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between mb-1">
          <div className="h-1.5 w-14 bg-white/20 rounded-full" />
          <div className="flex gap-1">{[1,2,3].map(i=><div key={i} className="h-1 w-4 bg-white/10 rounded-full"/>)}</div>
        </div>
        <div className="flex-1 rounded bg-[#1e1a12]" />
        <div className="grid grid-cols-3 gap-1 mt-1.5">
          {['#1a1810','#16140d','#12100a'].map((c,i)=><div key={i} className="h-6 rounded" style={{background:c}}/>)}
        </div>
        <div className="h-4 w-20 rounded bg-white/8 mt-1" />
      </div>
    ),
  },
}

// ─── Live-scroll thumbnail ────────────────────────────────────────────────────
// Static screenshot by default (cheap, fast). On hover, mounts a real iframe of
// the live site and lets a CSS keyframe animate translateY on the iframe itself
// — the box slides up inside its clipped wrapper, which reads as the page
// scrolling. No cross-origin JS access needed, since we never touch the
// iframe's own DOM — we only move the iframe element as a whole.
// Only wired up on hover so we never have 20+ live iframes loaded at once.
function NicheThumb({ nicheId, type, variant }: { nicheId: string; type: string; variant: 'A'|'B'|'C' }) {
  const style = THUMB_STYLES[nicheId]
  const color = TYPE_COLOR[type] ?? '#0099ff'
  // Style B/C get a slightly lighter/shifted bg tint
  const bg = variant !== 'A'
    ? style?.bg.replace(/0f|0d/g, '14') ?? '#111115'
    : style?.bg ?? '#111115'

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ background: style ? bg : `radial-gradient(ellipse at 50% 40%, ${color}18 0%, #111115 70%)` }}
    >
      {style ? style.content : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-2xl opacity-40">🌐</span>
        </div>
      )}
    </div>
  )
}

// ─── Card component — Framer card anatomy ────────────────────────────────────
// Thumbnail fills the rounded rect (no padding, edge to edge).
// Meta row sits BELOW the thumb, outside the border — just avatar + name + type·price.
function TemplateCard({ emoji, name, type, price, nicheId, variant, slug, image }: {
  emoji: string; name: string; type: string; price: string; nicheId: string; variant: 'A'|'B'|'C'; slug?: string; image?: string
}) {
  const isLive = Boolean(slug)

  const card = (
    <div className="group flex flex-col cursor-pointer select-none">
      {/* Thumbnail — rounded, bordered, lifts on hover */}
      <div className="relative w-full rounded-xl border border-white/[0.07] overflow-hidden aspect-[4/3] transition-all duration-200 group-hover:-translate-y-[3px] group-hover:border-white/[0.18] group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.55)]">
        {isLive && image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={proxied(image)}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <NicheThumb nicheId={nicheId} type={type} variant={variant} />
        )}
      </div>
      {/* Meta row — outside the border, no background — name left, price right */}
      <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
        <p className="text-[12px] font-semibold text-white/85 group-hover:text-white transition-colors truncate leading-tight">{name}</p>
        <p className="text-[11px] text-white/35 leading-tight whitespace-nowrap shrink-0">{price}</p>
      </div>
    </div>
  )

  if (isLive && slug) {
    return (
      <Link href={`/templates/${slug}`} className="no-underline">
        {card}
      </Link>
    )
  }

  return card
}

// ─── Featured card — Framer "Featured Picks" anatomy ─────────────────────────
// Full-bleed image, larger 3/2 aspect, name + meta overlaid at the bottom on
// a gradient scrim, small round avatar chip bottom-right.
function FeaturedCard({ item }: { item: typeof FEATURED[0] }) {
  const isLive = Boolean(item.slug && item.image)

  const card = (
    <div className="group relative flex flex-col cursor-pointer select-none rounded-2xl overflow-hidden border border-white/[0.07] aspect-[3/2] transition-all duration-200 hover:-translate-y-[2px] hover:border-white/[0.18] hover:shadow-[0_14px_32px_rgba(0,0,0,0.55)]">
      {/* Full-bleed thumbnail */}
      {isLive ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={proxied(item.image!)}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0">
          <NicheThumb nicheId={item.nicheId} type={item.type} variant="A" />
        </div>
      )}

      {/* Bottom gradient scrim so text stays legible over any image */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

      {/* Meta — overlaid at the bottom of the card, name left, avatar chip right */}
      <div className="absolute inset-x-0 bottom-0 px-4 py-3.5 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-white leading-tight truncate">{item.name}</p>
          <p className="text-[12px] text-white/60 leading-tight mt-0.5">Template · {item.price}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-[14px] shrink-0">
          {item.emoji}
        </div>
      </div>
    </div>
  )

  if (isLive && item.slug) {
    return (
      <Link href={`/templates/${item.slug}`} className="no-underline">
        {card}
      </Link>
    )
  }

  return card
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  activeSection, setActiveSection, activeType, setActiveType, activeNiche, setActiveNiche, searchQuery, setSearchQuery,
  variant = 'desktop', onClose,
}: {
  activeSection: 'templates' | 'portfolios' | 'how-it-works' | 'contact'
  setActiveSection: (s: 'templates' | 'portfolios' | 'how-it-works' | 'contact') => void
  activeType: string
  setActiveType: (t: string) => void
  activeNiche: string | null
  setActiveNiche: (n: string | null) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  variant?: 'desktop' | 'mobile'
  onClose?: () => void
}) {
  return (
    <aside className={`w-[220px] min-w-[220px] shrink-0 border-r border-white/[0.07] bg-[#0c0c0f] flex-col overflow-y-auto ${variant === 'mobile' ? 'flex h-full' : 'hidden md:flex sticky top-0 h-screen'}`}>

      {/* Logo / user row */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-white/[0.06]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center font-bold text-white text-[11px] shrink-0">W</div>
        <span className="text-[13px] font-bold text-white tracking-tight">webclawd</span>
        {variant === 'mobile' ? (
          <button onClick={onClose} className="ml-auto w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center border-none cursor-pointer">
            <X className="w-4 h-4 text-white/60" />
          </button>
        ) : (
          <span className="ml-auto text-white/20 text-[10px]">▾</span>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-white/[0.05] border border-white/[0.07] rounded-lg pl-7 pr-3 py-1.5 text-[12px] text-white placeholder-white/25 outline-none focus:border-[#0099ff]/40 transition-colors"
          />
        </div>
      </div>

      {/* Explore */}
      <div>
        <p className="px-4 py-1 text-[10px] font-semibold text-white/25 uppercase tracking-widest">Explore</p>
        {NAV_SIDEBAR.map((item) => {
          const Icon = item.icon
          const active = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); onClose?.() }}
              className={`w-full flex items-center gap-2.5 px-4 py-[7px] text-[13px] text-left transition-colors cursor-pointer border-none outline-none ${active ? 'bg-white/[0.06] text-white' : 'bg-transparent text-white/45 hover:bg-white/[0.03] hover:text-white/80'}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#0099ff]' : 'text-white/25'}`} />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Type filter — only shown in the templates section */}
      {activeSection === 'templates' && (
        <div className="mt-3">
          <p className="px-4 py-1 text-[10px] font-semibold text-white/25 uppercase tracking-widest">Category</p>
          {[
            { id: 'All', label: 'All Templates', count: TEMPLATES.length },
            { id: 'Ecommerce', label: 'Ecommerce', count: TEMPLATES.filter(t => t.type === 'Ecommerce').length },
            { id: 'Standard',  label: 'Standard',  count: TEMPLATES.filter(t => t.type === 'Standard').length },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => { setActiveType(f.id); setActiveNiche(null) }}
              className={`w-full flex items-center gap-2 px-4 py-[7px] text-[13px] text-left transition-colors cursor-pointer border-none outline-none ${activeType === f.id ? 'bg-white/[0.06] text-white' : 'bg-transparent text-white/40 hover:bg-white/[0.03] hover:text-white/70'}`}
            >
              <span className="flex-1">{f.label}</span>
              <span className="text-[10px] text-white/20 font-mono">{f.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Niche sub-filter */}
      {activeSection === 'templates' && (
        <div className="mt-3 pb-4">
          <p className="px-4 py-1 text-[10px] font-semibold text-white/25 uppercase tracking-widest">Niche</p>
          {NICHES.filter(n => activeType === 'All' || n.type === activeType).map((niche) => (
            <button
              key={niche.id}
              onClick={() => { setActiveNiche(activeNiche === niche.id ? null : niche.id); onClose?.() }}
              className={`w-full flex items-center gap-2 px-4 py-[6px] text-[12.5px] text-left transition-colors cursor-pointer border-none outline-none ${activeNiche === niche.id ? 'bg-white/[0.06] text-white' : 'bg-transparent text-white/40 hover:bg-white/[0.03] hover:text-white/70'}`}
            >
              <span className="text-sm">{niche.emoji}</span>
              <span className="flex-1">{niche.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto px-4 py-3 border-t border-white/[0.06]">
        <p className="text-[10px] text-white/20">© 2026 webclawd</p>
      </div>
    </aside>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function MarketplaceClient() {
  const [activeSection, setActiveSectionState] = useState<'templates' | 'portfolios' | 'how-it-works' | 'contact'>('templates')
  const [activeType, setActiveType]       = useState('All')
  const [activeNiche, setActiveNiche]     = useState<string | null>(null)
  const [searchQuery, setSearchQuery]     = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [contactForm, setContactForm]     = useState({ name: '', phone: '', type: 'Ecommerce Website', message: '' })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Keep the URL hash in sync with the active section so any tab — e.g.
  // Portfolios — can be linked to directly: /marketplace#portfolio
  const SECTION_HASH: Record<typeof activeSection, string> = {
    templates: 'templates', portfolios: 'portfolio', 'how-it-works': 'how-it-works', contact: 'contact',
  }
  const HASH_SECTION: Record<string, typeof activeSection> = {
    templates: 'templates', portfolio: 'portfolios', portfolios: 'portfolios', 'how-it-works': 'how-it-works', contact: 'contact',
  }

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      const section = HASH_SECTION[hash]
      if (section) setActiveSectionState(section)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setActiveSection = (section: typeof activeSection) => {
    setActiveSectionState(section)
    if (typeof window !== 'undefined') {
      const newHash = `#${SECTION_HASH[section]}`
      if (window.location.hash !== newHash) window.history.replaceState(null, '', newHash)
    }
  }

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const q = searchQuery.toLowerCase()
      const matchQ     = !q || t.name.toLowerCase().includes(q) || t.nicheLabel.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)
      const matchType  = activeType === 'All' || t.type === activeType
      const matchNiche = !activeNiche || t.nicheId === activeNiche
      return matchQ && matchType && matchNiche
    })
  }, [searchQuery, activeType, activeNiche])

  const totalResources = TEMPLATES.length + PORTFOLIOS.length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => { setFormSubmitted(false); setContactForm({ name: '', phone: '', type: 'Ecommerce Website', message: '' }) }, 4000)
  }

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white antialiased">
      <Sidebar
        activeSection={activeSection} setActiveSection={setActiveSection}
        activeType={activeType}       setActiveType={setActiveType}
        activeNiche={activeNiche}     setActiveNiche={setActiveNiche}
        searchQuery={searchQuery}     setSearchQuery={setSearchQuery}
      />

      {/* Mobile drawer — slide-in sidebar + backdrop, only rendered when open */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <Sidebar
            variant="mobile" onClose={() => setMobileMenuOpen(false)}
            activeSection={activeSection} setActiveSection={setActiveSection}
            activeType={activeType}       setActiveType={setActiveType}
            activeNiche={activeNiche}     setActiveNiche={setActiveNiche}
            searchQuery={searchQuery}     setSearchQuery={setSearchQuery}
          />
          <div className="flex-1 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar — logo + hamburger, replaces the sidebar on small screens */}
        <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-[#0c0c0f]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center font-bold text-white text-[11px] shrink-0">W</div>
            <span className="text-[14px] font-bold text-white tracking-tight">Marketplace</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center border-none cursor-pointer"
          >
            <Menu className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Mobile type tabs — horizontally scrollable */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-b border-white/[0.07] bg-[#0c0c0f] [&::-webkit-scrollbar]:hidden">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'Portfolios') { setActiveSection('portfolios') }
                else { setActiveType(tab.id); setActiveSection('templates') }
              }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12.5px] transition-colors cursor-pointer border-none outline-none ${(tab.id === 'Portfolios' ? activeSection === 'portfolios' : activeType === tab.id && activeSection === 'templates') ? 'bg-white text-[#09090b] font-semibold' : 'bg-white/[0.06] text-white/50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop type tabs — always visible, switches between templates/portfolios sections */}
        <div className="hidden md:flex border-b border-white/[0.07] px-12 pt-6">
          {TYPE_TABS.map((tab) => {
            const isActive = tab.id === 'Portfolios'
              ? activeSection === 'portfolios'
              : (activeSection === 'templates' && activeType === tab.id)
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'Portfolios') { setActiveSection('portfolios') }
                  else { setActiveType(tab.id); setActiveSection('templates') }
                }}
                className={`px-3.5 py-2.5 text-[13px] border-b-2 -mb-px transition-colors cursor-pointer border-none outline-none bg-transparent ${isActive ? 'border-b-2 border-white text-white' : 'border-b-2 border-transparent text-white/45 hover:text-white/80'}`}
                style={{ borderBottomColor: isActive ? 'white' : 'transparent' }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 md:pl-12 md:pr-10 md:py-10 md:pb-10">

        {/* ── TEMPLATES ── */}
        {activeSection === 'templates' && (
          <AnimatePresence mode="wait">
            <motion.div key="templates" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>

              {/* Page header */}
              <div className="flex items-start justify-between mb-5 md:mb-8">
                <div>
                  <h1 className="text-[18px] md:text-[20px] font-bold text-white mb-1.5">Marketplace</h1>
                  <p className="text-[13px] text-white/40">Ready-made websites for Tamil Nadu businesses — live in 48 hours.</p>
                </div>
                <a
                  href="https://wa.me/916379506279?text=Hi+webclawd,+I+want+a+website"
                  target="_blank" rel="noopener noreferrer"
                  className="hidden md:inline-block bg-white text-[#09090b] text-[13px] font-bold px-4 py-1.5 rounded-lg hover:bg-white/90 transition-colors no-underline shrink-0"
                >
                  Get yours
                </a>
              </div>

              {/* Featured section */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-white">Featured</span>
                  <span className="text-white/25 tracking-[4px] text-sm">•••</span>
                </div>
                <button className="text-[12px] text-white/40 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer">See all</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
                {FEATURED.map((item) => <FeaturedCard key={item.id} item={item} />)}
              </div>

              {/* Section divider — matches the breathing room between Featured and the main grid on Framer */}
              <div className="border-t border-white/[0.07] mb-9" />

              {/* All resources */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[13px] text-white/40">{totalResources} Templates</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 bg-transparent border border-white/[0.1] rounded-md text-white/40 text-[11px] px-2.5 py-1 hover:border-white/20 hover:text-white/70 transition-colors cursor-pointer">
                    <SlidersHorizontal className="w-3 h-3" /> Filter
                  </button>
                  <button className="flex items-center gap-1.5 bg-transparent border border-white/[0.1] rounded-md text-white/40 text-[11px] px-2.5 py-1 hover:border-white/20 hover:text-white/70 transition-colors cursor-pointer">
                    <ArrowUpDown className="w-3 h-3" /> Sort
                  </button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-white/30 text-[14px]">No templates match "{searchQuery}"</p>
                  <button onClick={() => { setSearchQuery(''); setActiveType('All'); setActiveNiche(null) }} className="mt-3 text-[#0099ff] text-[12px] bg-transparent border-none cursor-pointer hover:underline">Clear filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-9 md:gap-x-5 md:gap-y-12">
                  {filtered.map((t) => (
                    <TemplateCard key={t.id} emoji={t.emoji} name={t.name} type={t.type} price={t.price} nicheId={t.nicheId} variant={t.variant} slug={t.slug} image={t.image} />
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}

        {/* ── PORTFOLIOS ── */}
        {activeSection === 'portfolios' && (
          <AnimatePresence mode="wait">
            <motion.div key="portfolios" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
              <div className="flex items-start justify-between mb-5 md:mb-8">
                <div>
                  <h1 className="text-[18px] md:text-[20px] font-bold text-white mb-1.5">Designer Portfolios</h1>
                  <p className="text-[13px] text-white/40">Premium portfolio templates for product, UX, and visual designers — ₹4,999 each.</p>
                </div>
                <a href="https://wa.me/916379506279?text=Hi+webclawd,+I+want+a+portfolio+website" target="_blank" rel="noopener noreferrer"
                  className="hidden md:inline-block bg-white text-[#09090b] text-[13px] font-bold px-4 py-1.5 rounded-lg hover:bg-white/90 transition-colors no-underline shrink-0">
                  Get yours
                </a>
              </div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[13px] text-white/40">{PORTFOLIOS.length} Portfolios</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-9 md:gap-x-5 md:gap-y-12">
                {PORTFOLIOS.map((p) => (
                  <TemplateCard key={p.id} emoji={p.emoji} name={p.name} type="Portfolio" price={p.price} nicheId="portfolio" variant="A" slug={p.slug} image={p.image} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── HOW IT WORKS ── */}
        {activeSection === 'how-it-works' && (
          <AnimatePresence mode="wait">
            <motion.div key="hiw" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="max-w-2xl">
              <h1 className="text-[20px] font-bold text-white mb-1">How it Works</h1>
              <p className="text-[13px] text-white/40 mb-8">We build and deploy your business website in 48 hours. No tech knowledge needed.</p>
              <div className="flex flex-col gap-4">
                {[
                  { step: '01', title: 'Pick your template', desc: 'Browse by business type — Ecommerce or Standard. Each template is built for a specific niche in Tamil Nadu.' },
                  { step: '02', title: 'WhatsApp us your details', desc: 'Send your business name, logo, photos, and content over WhatsApp. We handle the rest — no technical knowledge needed.' },
                  { step: '03', title: 'We build & deploy in 48 hours', desc: 'Domain setup, Vercel hosting, WhatsApp CTAs, booking forms, and order links — all configured for your business.' },
                  { step: '04', title: 'You own it forever', desc: 'One-time payment. No subscriptions. Domain in your name. Source code is yours. We hand over everything.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-mono text-[12px] font-bold text-[#0099ff] shrink-0">{s.step}</div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex-1">
                      <h3 className="text-[14px] font-bold text-white mb-1">{s.title}</h3>
                      <p className="text-[13px] text-white/40 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-white/[0.03] border border-[#0099ff]/15 rounded-xl p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[14px] font-bold text-white mb-0.5">Ready to start?</p>
                  <p className="text-[12px] text-white/35">Ecommerce ₹25,000 · Standard ₹9,999</p>
                </div>
                <a href="https://wa.me/916379506279" target="_blank" rel="noopener noreferrer"
                  className="bg-[#0099ff] hover:bg-[#0088ee] text-white text-[13px] font-bold px-4 py-2 rounded-lg transition-colors no-underline shrink-0">
                  WhatsApp us
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── CONTACT ── */}
        {activeSection === 'contact' && (
          <AnimatePresence mode="wait">
            <motion.div key="contact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="max-w-xl">
              <h1 className="text-[20px] font-bold text-white mb-1">Get in Touch</h1>
              <p className="text-[13px] text-white/40 mb-6">Want a website for your business? We'll reply within a few hours.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a href="https://wa.me/916379506279" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] hover:border-white/15 p-3.5 rounded-xl no-underline transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0 text-lg">📱</div>
                  <div>
                    <p className="text-[13px] font-semibold text-white group-hover:text-[#25D366] transition-colors">WhatsApp</p>
                    <p className="text-[11px] text-white/35">Chat with us</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/company/webclawd/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] hover:border-white/15 p-3.5 rounded-xl no-underline transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] shrink-0 text-lg">💼</div>
                  <div>
                    <p className="text-[13px] font-semibold text-white group-hover:text-[#0A66C2] transition-colors">LinkedIn</p>
                    <p className="text-[11px] text-white/35">Connect directly</p>
                  </div>
                </a>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-[14px] font-semibold text-white mb-4">Send an inquiry</h3>
                {formSubmitted ? (
                  <div className="py-10 text-center">
                    <p className="text-2xl mb-2">✅</p>
                    <p className="text-[14px] font-semibold text-white">Received!</p>
                    <p className="text-[12px] text-white/40 mt-1">We'll reach out within a few hours on WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-white/30 uppercase tracking-wider">Business Name</label>
                        <input required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="Your business name"
                          className="bg-white/[0.05] border border-white/[0.08] focus:border-[#0099ff]/50 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 outline-none transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-white/30 uppercase tracking-wider">WhatsApp / Email</label>
                        <input required value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                          placeholder="Phone or email"
                          className="bg-white/[0.05] border border-white/[0.08] focus:border-[#0099ff]/50 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 outline-none transition-colors" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-white/30 uppercase tracking-wider">Website Type</label>
                      <select value={contactForm.type} onChange={e => setContactForm({...contactForm, type: e.target.value})}
                        className="bg-white/[0.05] border border-white/[0.08] focus:border-[#0099ff]/50 rounded-lg px-3 py-2 text-[13px] text-white outline-none transition-colors cursor-pointer">
                        <option>Ecommerce Website — ₹25,000</option>
                        <option>Standard Website — ₹9,999</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-white/30 uppercase tracking-wider">About your business</label>
                      <textarea required rows={3} value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="What does your business do? Where are you based?"
                        className="bg-white/[0.05] border border-white/[0.08] focus:border-[#0099ff]/50 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 outline-none transition-colors resize-none" />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-[#0099ff] hover:bg-[#0088ee] text-white text-[13px] font-bold rounded-lg transition-colors border-none cursor-pointer">
                      Send inquiry
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

      </main>

        {/* Mobile bottom nav — fixed tab bar, mirrors the Framer mobile app chrome */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around bg-[#0c0c0f] border-t border-white/[0.07] px-2 py-2.5">
          {NAV_SIDEBAR.map((item) => {
            const Icon = item.icon
            const active = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="flex flex-col items-center justify-center gap-1 flex-1 bg-transparent border-none cursor-pointer py-1"
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#0099ff]' : 'text-white/40'}`} />
              </button>
            )
          })}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 flex-1 bg-transparent border-none cursor-pointer py-1"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center text-white text-[10px] font-bold">W</div>
          </button>
        </div>

      </div>
    </div>
  )
}
