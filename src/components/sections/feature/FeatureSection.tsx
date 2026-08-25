'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const FEATURES = [
  {
    emoji: '⚡',
    title: 'Live in 48 hours',
    desc:  'Most agencies take 2–4 weeks. We deliver in 48 hours — domain registered, site built, content populated, deployed.',
  },
  {
    emoji: '💬',
    title: 'WhatsApp-first workflow',
    desc:  'No forms, no portals, no logins. Just WhatsApp. Send us your logo, photos, and details and we handle everything else.',
  },
  {
    emoji: '🛒',
    title: 'Ecommerce that sells',
    desc:  'Product catalogues with WhatsApp order integration — ideal for jewellery shops, boutiques, and cloud kitchens that want orders without Swiggy commission.',
  },
  {
    emoji: '📅',
    title: 'Standard sites that convert',
    desc:  'Services page, gallery, and a WhatsApp booking or enquiry CTA — built for salons, clinics, gyms, yoga studios, event planners, and interior designers. No third-party booking software needed.',
  },
  {
    emoji: '🔒',
    title: 'You own everything',
    desc:  'Domain in your name. Source code handed over. Hosted free on Vercel. Zero monthly fees. One payment, yours forever.',
  },
]

export function FeatureSection() {
  return (
    <section id="features" className="border-t border-white/[0.06] bg-[#0a0a0a] py-16 sm:py-24 lg:py-32" aria-labelledby="features-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="mb-16"
        >
          <motion.p variants={itemV} className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">Why Webclawd</motion.p>
          <motion.h2 id="features-heading" variants={itemV} className="mb-5 font-display font-extrabold leading-[1.06] tracking-[-0.045em] text-white" style={{ fontSize: 'clamp(28px, 3.8vw, 46px)' }}>
            Built for Tamil Nadu
            <br />
            <span className="font-display font-light tracking-[-0.02em] text-white/30">small businesses.</span>
          </motion.h2>
          <motion.p variants={itemV} className="max-w-[480px] font-sans text-[15px] leading-[1.75] tracking-[-0.01em] text-white/45">
            Not a generic website builder. A done-for-you service that understands local business needs — fast delivery, WhatsApp integration, and pricing that makes sense.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={itemV}
              className="group rounded-2xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] p-6 transition-all duration-300"
            >
              <span className="text-2xl mb-4 block">{f.emoji}</span>
              <h3 className="font-sans text-[15px] font-bold text-white mb-2">{f.title}</h3>
              <p className="font-sans text-[13px] text-white/40 leading-[1.7] m-0">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
