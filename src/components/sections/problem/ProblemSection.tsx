'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const STATS = [
  { value: '₹0/month', label: 'No hosting subscription. Ever. You pay once and own it forever.' },
  { value: '48 Hours', label: 'From WhatsApp to a live website on your own domain.' },
  { value: '707+',     label: 'Tamil Nadu SMBs already identified who need a website.' },
]

const PROBLEMS = [
  {
    bad:     'JustDial listing',
    badSub:  'Paying every month for leads you don\'t own, on a platform that sends them to your competitors too.',
    good:    'Your own website',
    goodSub: 'Customers find you on Google, land on your site, and contact only you. No monthly fee.',
  },
  {
    bad:     'Instagram-only business',
    badSub:  'DMs, highlights, and bio links — all rented space. One algorithm change and your reach drops.',
    good:    'Permanent web presence',
    goodSub: 'A domain you own that ranks on Google, loads fast, and works even when Instagram doesn\'t.',
  },
  {
    bad:     'WhatsApp catalogue',
    badSub:  'Sending product photos one by one on WhatsApp is slow, forgettable, and hard to share.',
    good:    'Ecommerce catalogue site',
    goodSub: 'A clean product page customers can browse, share, and order from — 24/7, without you being online.',
  },
  {
    bad:     'No online booking',
    badSub:  'Customers call, leave voicemails, forget — and book somewhere else that was easier to reach.',
    good:    'Booking page that converts',
    goodSub: 'A services page with a WhatsApp CTA or appointment form. Customers book while you sleep.',
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-white/[0.06] bg-[#0a0a0a] py-16 sm:py-24 lg:py-32" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="mb-16">
          <motion.p variants={itemV} className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">The Problem</motion.p>
          <motion.h2 id="problem-heading" variants={itemV} className="mb-5 font-display font-extrabold leading-[1.06] tracking-[-0.045em] text-white" style={{ fontSize: 'clamp(28px, 3.8vw, 46px)' }}>
            Most Tamil Nadu businesses
            <br />
            <span className="font-display font-light tracking-[-0.02em] text-white/30">are invisible online.</span>
          </motion.h2>
          <motion.p variants={itemV} className="max-w-[520px] font-sans text-[15px] leading-[1.75] tracking-[-0.01em] text-white/45">
            Your customers search Google before they visit. If you don't have a website, they find your competitor. JustDial charges you every month and sends the same lead to 5 others. Instagram gives you reach but no ownership. Webclawd fixes this — one payment, your own website, live in 48 hours.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <motion.div key={stat.value} variants={itemV} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
              <p className="mb-2 font-display font-extrabold text-[#0099ff]" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.value}</p>
              <p className="m-0 font-sans text-[13px] leading-[1.6] tracking-[-0.01em] text-white/35">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison */}
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-white/[0.07] bg-white/[0.03] gap-1">
            <div className="px-5 py-3.5 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 font-medium">Without a website</span>
            </div>
            <div className="px-5 py-3.5 flex items-center gap-2 bg-[#0099ff]/[0.07] border-l border-[#0099ff]/10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0099ff]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0099ff] font-bold">With Webclawd</span>
            </div>
          </div>
          {PROBLEMS.map((row, i) => (
            <motion.div key={row.bad} variants={itemV} className={`grid grid-cols-1 sm:grid-cols-2 items-stretch ${i < PROBLEMS.length - 1 ? 'border-b border-white/[0.05]' : ''}`}>
              <div className="flex gap-3 px-5 py-6 sm:border-r border-white/[0.05] border-b sm:border-b-0">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
                  <X className="h-3 w-3 text-white/25" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="mb-1 font-sans text-[13px] font-medium tracking-[-0.01em] text-white/25 line-through">{row.bad}</p>
                  <p className="m-0 font-sans text-[12.5px] leading-[1.6] tracking-[-0.01em] text-white/25">{row.badSub}</p>
                </div>
              </div>
              <div className="flex gap-3 px-5 py-6 bg-[#0099ff]/[0.04]">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0099ff]/15">
                  <Check className="h-3 w-3 text-[#0099ff]" strokeWidth={3} />
                </span>
                <div>
                  <p className="mb-1 font-sans text-[15px] font-bold tracking-[-0.015em] text-white">{row.good}</p>
                  <p className="m-0 font-sans text-[12.5px] leading-[1.6] tracking-[-0.01em] text-white/50">{row.goodSub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
