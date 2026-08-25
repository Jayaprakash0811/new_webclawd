'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const STEPS = [
  {
    step: '01',
    title: 'Pick your niche & website type',
    desc:  'Browse templates by business type. Ecommerce for cloud kitchens, boutiques, jewellery. Standard for salons, clinics, gyms, yoga studios, event planners, interior designers.',
    tag:   '9 niches',
  },
  {
    step: '02',
    title: 'WhatsApp us your content',
    desc:  'Send your business name, logo, photos, and any text over WhatsApp. No forms, no logins, no technical steps. Just message us what you have.',
    tag:   'Zero friction',
  },
  {
    step: '03',
    title: 'We build & deploy in 48 hours',
    desc:  'We configure your domain, build your site, integrate WhatsApp CTAs or booking forms, and deploy to Vercel. You get a live link to review.',
    tag:   '48-hour delivery',
  },
  {
    step: '04',
    title: 'You own it forever',
    desc:  'One-time payment. Domain in your name. Hosting free on Vercel. Source code handed over. No monthly fees, no subscriptions, no lock-in.',
    tag:   'Full ownership',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-white/[0.06] bg-[#111111] py-16 sm:py-24 lg:py-32" aria-labelledby="how-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="mb-16"
        >
          <motion.p variants={itemV} className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">Process</motion.p>
          <motion.h2 id="how-heading" variants={itemV} className="mb-5 font-display font-extrabold leading-[1.06] tracking-[-0.045em] text-white" style={{ fontSize: 'clamp(28px, 3.8vw, 46px)' }}>
            Website live
            <br />
            <span className="font-display font-light tracking-[-0.02em] text-white/30">in 4 steps.</span>
          </motion.h2>
          <motion.p variants={itemV} className="max-w-[480px] font-sans text-[15px] leading-[1.75] tracking-[-0.01em] text-white/45">
            No meetings, no briefs, no back-and-forth. WhatsApp us your details and we'll have your site live in 48 hours.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.step}
              variants={itemV}
              className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] p-7 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono font-bold text-[13px] text-[#0099ff]">{s.step}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/25 border border-white/[0.06] px-2.5 py-1 rounded-full">{s.tag}</span>
              </div>
              <h3 className="font-sans text-[16px] font-bold text-white mb-2 leading-snug">{s.title}</h3>
              <p className="font-sans text-[13px] text-white/40 leading-[1.7]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemV} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/916379506279?text=Hi+webclawd,+I+want+a+website+for+my+business"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-white/90 text-[#0a0a0a] px-8 py-3.5 font-sans text-[14px] font-bold transition-all duration-200 active:scale-[0.98] no-underline border-none"
          >
            Start on WhatsApp
          </a>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/25">48-hour turnaround · One-time payment</span>
        </motion.div>
      </div>
    </section>
  )
}
