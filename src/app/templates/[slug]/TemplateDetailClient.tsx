'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  LayoutGrid,
  HelpCircle,
  Mail,
  Check,
  ExternalLink,
  Menu,
  X,
  RefreshCw,
} from 'lucide-react'
import type { Template } from '@/types'

const WHATSAPP_BASE = 'https://wa.me/916379506279'

const TYPE_PRICE: Record<string, string> = {
  Standard:  '₹9,999',
  Ecommerce: '₹25,000',
  Portfolio: '₹4,999',
}

function getWhatsAppUrl(templateName: string) {
  const msg = `Hi webclawd, I want this ${templateName} website for my business`
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`
}


/* ─────────────────────────────────────────────────────────────────
   Live Preview iframe with browser chrome
   ───────────────────────────────────────────────────────────────── */
function LivePreview({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d10] shadow-2xl"
      style={{ aspectRatio: '16 / 10' }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d0d10] z-10">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="font-mono text-[10px] text-white/25 tracking-widest">LOADING PREVIEW</p>
        </div>
      )}

      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 border-b border-white/[0.06] bg-[#16161c]/95 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="mx-3 flex flex-1 items-center gap-2 rounded-md bg-black/40 px-3 py-1 border border-white/[0.05]">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-white/20 flex-shrink-0">
            <path d="M13 8A5 5 0 1 1 3 8a5 5 0 0 1 10 0z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 3c-1 1.5-1.5 3-1.5 5s.5 3.5 1.5 5M8 3c1 1.5 1.5 3 1.5 5S9 16 8 16M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-mono text-[10px] text-white/35 truncate select-all">{url}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="flex items-center justify-center rounded-lg p-1.5 text-white/35 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => { setLoaded(false); setIframeKey(k => k + 1) }}
            title="Refresh"
            className="flex items-center justify-center rounded-lg p-1.5 text-white/35 hover:text-white hover:bg-white/[0.05] transition-colors border-none bg-transparent"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <iframe
        key={iframeKey}
        src={url}
        title={`${name} live preview`}
        className="absolute inset-0 h-full w-full border-0"
        style={{ paddingTop: '42px' }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Screenshot gallery (for templates without live preview)
   ───────────────────────────────────────────────────────────────── */
function ScreenshotGallery({ screenshots, bg }: { screenshots: { src: string; alt: string }[]; bg: string }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main large screenshot */}
      <div
        className="w-full overflow-hidden rounded-2xl border border-white/[0.08] relative"
        style={{ background: bg, aspectRatio: '16/9' }}
      >
        <img
          src={screenshots[active]?.src}
          alt={screenshots[active]?.alt}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </div>

      {/* Thumbnail strip */}
      {screenshots.length > 1 && (
        <div className="flex gap-3">
          {screenshots.map((shot, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-xl border flex-1 transition-all duration-200 ${
                active === i
                  ? 'border-[#0099ff] ring-1 ring-[#0099ff]/40'
                  : 'border-white/[0.06] hover:border-white/20'
              }`}
              style={{ background: bg, aspectRatio: '16/9' }}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Main Client Component
   ───────────────────────────────────────────────────────────────── */
interface Props {
  template: Template
  related:  Template[]
}

export function TemplateDetailClient({ template, related }: Props) {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const proxied = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    return url.startsWith('/')
      || url.startsWith('https://image.thum.io')
      || url.startsWith('https://www.framer.com')
      || url.startsWith('https://images.unsplash.com')
      ? url
      : `/api/img?url=${encodeURIComponent(url)}`
  }

  const screenshots = [
    { src: proxied(template.image), alt: `${template.name} — Hero` },
    ...(template.image2 && template.image2 !== template.image
      ? [{ src: proxied(template.image2), alt: `${template.name} — Detail` }]
      : []),
  ]

  const sidebarItems = [
    { id: 'templates',    label: 'Templates',   icon: LayoutGrid },
    { id: 'how-it-works', label: 'How it Works', icon: HelpCircle },
    { id: 'contact',      label: 'Contact',      icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-[#09090c] text-white font-sans flex flex-col md:flex-row antialiased selection:bg-[#0099ff]/30 selection:text-white">

      {/* ══════════════════════════════════════════════════
          MOBILE TOP BAR
          ══════════════════════════════════════════════════ */}
      <div className="md:hidden flex items-center justify-between px-5 h-14 bg-[#0c0c10] border-b border-white/[0.06] w-full shrink-0 z-40 sticky top-0">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_12px_rgba(0,153,255,0.35)]">
            W
          </div>
          <span className="font-sans font-bold tracking-tight text-base text-white">webclawd</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white/60 hover:text-white transition-colors hover:bg-white/[0.05] rounded-lg border-none bg-transparent"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════
          LEFT SIDEBAR
          ══════════════════════════════════════════════════ */}
      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 z-40
        w-[264px] shrink-0
        bg-[#0c0c10] border-r border-white/[0.06]
        flex flex-col h-screen transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="hidden md:flex items-center gap-2.5 px-5 h-[60px] border-b border-white/[0.06] shrink-0">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center font-bold text-white text-base shadow-[0_0_14px_rgba(0,153,255,0.35)]">
              W
            </div>
            <span className="font-sans font-bold tracking-tight text-[17px] text-white">webclawd</span>
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 pt-5 pb-3 shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search templates..."
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const v = (e.target as HTMLInputElement).value.trim()
                  if (v) router.push(`/marketplace?q=${encodeURIComponent(v)}`)
                }
              }}
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl pl-9 pr-3 py-2.5 text-[12.5px] text-white/70 placeholder-white/25 outline-none focus:border-[#0099ff]/40 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 px-4 flex flex-col gap-0.5 overflow-y-auto">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/25 px-2 pt-2 pb-2">
            Explore
          </p>
          {sidebarItems.map(item => {
            const Icon = item.icon
            const active = item.id === 'templates'
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(`/marketplace?tab=${item.id}`)
                  setSidebarOpen(false)
                }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium border-none outline-none transition-all duration-150 cursor-pointer w-full
                  ${active
                    ? 'bg-[#0099ff]/10 text-white border border-[#0099ff]/20'
                    : 'text-white/45 bg-transparent hover:text-white/80 hover:bg-white/[0.04]'}
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#0099ff]' : 'text-white/30'}`} />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/[0.05] shrink-0">
          <div className="flex items-center justify-between text-[10.5px] text-white/25">
            <span>© 2026 webclawd</span>
            <span>v1.2.0</span>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════ */}
      <main className="flex-1 min-h-screen flex flex-col overflow-x-hidden">

        {/* ── Top nav bar ── */}
        <header className="h-[60px] border-b border-white/[0.06] bg-[#09090c]/90 backdrop-blur-md flex items-center justify-between px-5 md:px-6 sticky top-0 z-20 shrink-0">
          {/* Left: Back + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/marketplace/templates"
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white text-[12px] font-medium transition-all no-underline shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/25 min-w-0">
              <Link href="/marketplace/templates" className="text-white/25 hover:text-white/50 transition no-underline shrink-0">Templates</Link>
              <span className="text-white/15">/</span>
              <span className="text-white/25 shrink-0">Categories</span>
              <span className="text-white/15">/</span>
              <span className="text-[#0099ff]/80 truncate">{template.category}</span>
            </div>
          </div>

          {/* Right: template name + actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Template name — hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2 mr-2">
              <span className="font-sans text-[14px] font-bold text-white">{template.name}</span>
              <span className="text-white/25 text-[14px]">·</span>
              <span className="font-sans text-[13px] text-white/40">{template.category}</span>
            </div>

<a
              href={getWhatsAppUrl(template.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 inline-flex items-center gap-2 px-4 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white text-[12.5px] font-bold transition-all duration-150 hover:shadow-[0_0_16px_rgba(0,153,255,0.35)] active:scale-[0.97] no-underline border-none shadow-sm"
            >
              Get this Website
            </a>
          </div>
        </header>

        {/* ── Page body ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 md:py-10">

            {/* ── Preview area ── */}
            <section className="mb-10">
              {template.previewUrl ? (
                <LivePreview url={template.previewUrl} name={template.name} />
              ) : (
                <ScreenshotGallery screenshots={screenshots} bg={template.bg} />
              )}
            </section>

            {/* ── Two-column layout: info + sidebar ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

              {/* ── LEFT: description, features, pages, related ── */}
              <div className="flex flex-col gap-10">

                {/* Title block */}
                <div className="border-b border-white/[0.05] pb-8">
                  <div className="flex items-start gap-3 mb-3">
                    <div>
                      <h1 className="font-sans text-[26px] sm:text-[30px] font-bold tracking-tight text-white leading-tight mb-1">
                        {template.name}
                      </h1>
                      <p className="font-sans text-[14px] text-white/40 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {template.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {template.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border border-white/[0.07]"
                          style={{ background: template.tagBg + '33', color: template.tagColor }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* About */}
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans text-[16px] font-bold text-white">About {template.name}</h2>
                  <p className="font-sans text-[14px] text-white/45 leading-[1.8]">{template.about}</p>
                </div>

                {/* What's Included */}
                {template.features?.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-sans text-[13px] font-bold text-white uppercase tracking-widest">What's included</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
                      {template.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-white/50">
                          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0099ff]/15 border border-[#0099ff]/25 mt-0.5 shrink-0">
                            <Check className="w-2.5 h-2.5 text-[#0099ff]" />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                <div className="flex flex-col gap-4 border-t border-white/[0.04] pt-8">
                  <h3 className="font-sans text-[13px] font-bold text-white uppercase tracking-widest">What we'll need from you</h3>
                  <ul className="flex flex-col gap-2.5 list-disc pl-4 marker:text-white/25">
                    <li className="text-[13.5px] text-white/50">Your business logo and product / service photos</li>
                    <li className="text-[13.5px] text-white/50">Preferred domain name — or we'll help you pick one</li>
                    <li className="text-[13.5px] text-white/50">WhatsApp number for customer enquiries</li>
                  </ul>
                </div>

                {/* Pages */}
                {template.pages?.length > 0 && (
                  <div className="flex flex-col gap-4 border-t border-white/[0.04] pt-8">
                    <h3 className="font-sans text-[13px] font-bold text-white uppercase tracking-widest">Pages</h3>
                    <div className="flex flex-wrap gap-2">
                      {template.pages.map((pg, i) => (
                        <span
                          key={i}
                          className="font-sans text-[12.5px] text-white/60 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-1.5"
                        >
                          {pg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related templates */}
                {related.length > 0 && (
                  <div className="flex flex-col gap-6 border-t border-white/[0.04] pt-10 pb-8">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans text-[15px] font-bold text-white">More {template.category} Templates</h3>
                      <Link
                        href="/marketplace/templates"
                        className="font-sans text-[12px] font-semibold text-white/30 hover:text-white/70 no-underline transition"
                      >
                        See all →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {related.map(t => (
                        <Link key={t.slug} href={`/templates/${t.slug}`} className="group flex flex-col no-underline text-white">
                          <div
                            className="w-full overflow-hidden rounded-xl border border-white/[0.06] group-hover:border-white/[0.14] transition-all"
                            style={{ background: t.bg, aspectRatio: '16/10' }}
                          >
                            <img
                              src={proxied(t.image)}
                              alt={t.name}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex items-center justify-between pt-3 px-0.5">
                            <span className="font-sans text-[13px] font-bold text-white/75 group-hover:text-white transition">
                              {t.name}
                            </span>
                            <span className="font-mono text-[11.5px] text-white/35 font-semibold">
                              {TYPE_PRICE[t.type]}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── RIGHT: Details sidebar ── */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-[76px]">

                {/* Detail card */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0e0e13] overflow-hidden">
                  {/* Preview thumbnail */}
                  <div
                    className="w-full overflow-hidden border-b border-white/[0.06] relative"
                    style={{ background: template.bg, aspectRatio: '16/9' }}
                  >
                    <img
                      src={proxied(template.image)}
                      alt={template.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    {/* New badge */}
                    <span className="absolute top-3 right-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-1 bg-[#0099ff] text-white rounded-full">
                      New
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-5">
                    {/* Details */}
                    <div className="flex flex-col gap-3">
                      <p className="font-sans text-[13px] font-bold text-white">Details</p>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between text-[12.5px]">
                          <span className="text-white/35">Creator</span>
                          <span className="flex items-center gap-1.5 font-semibold text-white/75">
                            <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center text-[7px] font-bold text-white shrink-0">W</span>
                            Webclawd
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[12.5px]">
                          <span className="text-white/35">Website Type</span>
                          <span className="font-semibold text-white/75">{template.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-[12.5px]">
                          <span className="text-white/35">Price</span>
                          <span className="font-semibold text-white/75">{TYPE_PRICE[template.type]}</span>
                        </div>
                        <div className="flex items-center justify-between text-[12.5px]">
                          <span className="text-white/35">Published</span>
                          <span className="font-semibold text-white/75">June 2026</span>
                        </div>
                        <div className="flex items-center justify-between text-[12.5px]">
                          <span className="text-white/35">License</span>
                          <span className="font-semibold text-white/75">Single-Use License</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-col gap-2.5">
                      <a
                        href={getWhatsAppUrl(template.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-sans text-[13px] font-bold flex items-center justify-center gap-2 no-underline transition-all hover:shadow-[0_0_20px_rgba(0,153,255,0.3)] active:scale-[0.98] border-none cursor-pointer"
                      >
                        Get this Website — {TYPE_PRICE[template.type]}
                      </a>
                      {template.previewUrl && (
                        <a
                          href={template.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-white/70 hover:text-white font-sans text-[12.5px] font-semibold flex items-center justify-center gap-2 no-underline transition-all cursor-pointer border-solid"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Preview live site
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categories pill list */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0e0e13] p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[13px] font-bold text-white">Categories</p>
                    <Link href="/marketplace/templates" className="font-sans text-[11.5px] font-semibold text-white/30 hover:text-white/70 no-underline transition">
                      See all
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set([template.category, template.dark ? 'Dark' : 'Light', ...(template.tags ?? [])])).slice(0, 8).map((tag, i) => (
                      <span
                        key={tag}
                        className={
                          i === 0
                            ? 'font-sans text-[12px] text-white/70 bg-[#0099ff]/10 border border-[#0099ff]/20 rounded-lg px-2.5 py-1'
                            : 'font-sans text-[12px] text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1'
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features pill list */}
                {template.features?.length > 0 && (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0e0e13] p-5 flex flex-col gap-3">
                    <p className="font-sans text-[13px] font-bold text-white">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feat) => (
                        <span
                          key={feat}
                          className="font-sans text-[12px] text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
