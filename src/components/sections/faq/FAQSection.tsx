'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const FAQS = [
  {
    q: 'How is Webclawd different from Wix or WordPress?',
    a: 'Wix and WordPress are DIY tools — you build it yourself. Webclawd is a done-for-you service. You WhatsApp us your content, we build and deploy your site in 48 hours. No learning curve, no monthly subscription, no ongoing maintenance needed from you.',
  },
  {
    q: 'What if I don\'t have a logo or professional photos?',
    a: 'Send us whatever you have — even a photo of your shopboard on your phone works. We\'ll work with it. If you need a logo, we can recommend a quick solution or create a simple one for a small additional cost.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'Yes. All our sites are built with Next.js on Vercel — fast-loading and SEO-ready. We add your business name, city, and keywords so local customers searching on Google can find you.',
  },
  {
    q: 'Can customers order or book through the website?',
    a: 'Yes. Ecommerce sites have WhatsApp order buttons per product. Standard sites have a service page with a WhatsApp booking or enquiry CTA. All enquiries go directly to your WhatsApp — no third-party payment gateway needed unless you want it.',
  },
  {
    q: 'What happens after the website is live?',
    a: 'You own it. The domain is in your name, the hosting is free on Vercel, and we hand over the source code. There are no monthly fees from us. If you want future updates or changes, we offer support at a small additional cost.',
  },
  {
    q: 'Is ₹25,000 for Ecommerce negotiable?',
    a: 'The pricing reflects the complexity — ecommerce sites with product catalogues, category filters, and WhatsApp order flows take significantly more work than a standard site. However, we can discuss scope — if you need a simpler 5-product catalogue, we may be able to offer a reduced price.',
  },
  {
    q: 'Do you work with businesses outside Tamil Nadu?',
    a: 'Primarily we focus on Tamil Nadu small businesses, but we can work with anyone in India. WhatsApp us and let\'s talk.',
  },
  {
    q: 'How do I get started?',
    a: 'Just WhatsApp us at +91 63795 06279. Tell us your business name, what type of website you need (Standard / Ecommerce), and your city. We\'ll take it from there.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-white/[0.06] last:border-b-0`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 bg-transparent border-none cursor-pointer group"
      >
        <span className="font-sans text-[14.5px] font-semibold text-white/80 group-hover:text-white transition-colors leading-snug">{q}</span>
        <span className={`text-white/30 font-light text-[20px] leading-none shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[13.5px] text-white/45 leading-[1.75] pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="border-t border-white/[0.06] bg-[#0a0a0a] py-16 sm:py-24 lg:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="mb-14 text-center"
        >
          <motion.p variants={itemV} className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">FAQ</motion.p>
          <motion.h2 id="faq-heading" variants={itemV} className="mb-4 font-display font-extrabold leading-[1.06] tracking-[-0.045em] text-white" style={{ fontSize: 'clamp(28px, 3.8vw, 42px)' }}>
            Common questions
          </motion.h2>
        </motion.div>
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 divide-y-0"
        >
          {FAQS.map((faq) => (
            <motion.div key={faq.q} variants={itemV}>
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
