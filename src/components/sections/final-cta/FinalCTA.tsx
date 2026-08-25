'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export function FinalCTA() {
  return (
    <section className="border-t border-white/[0.06] bg-[#111111] py-24 sm:py-32" aria-label="Get started">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
        >
          <motion.p variants={itemV} className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/25">
            WEB · DONE RIGHT
          </motion.p>
          <motion.h2
            variants={itemV}
            className="mb-5 font-display font-extrabold leading-[1.06] tracking-[-0.04em] text-white"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            Your business is ready.
            <br />
            <span className="font-display font-light text-white/25">Is your website?</span>
          </motion.h2>
          <motion.p variants={itemV} className="mb-10 mx-auto max-w-lg font-sans text-[15px] leading-[1.75] text-white/45">
            707 businesses in Tamil Nadu don't have a website yet. Be the first in your niche to get online — and make it harder for competitors to catch up.
          </motion.p>

          <motion.div variants={itemV} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/916379506279?text=Hi+webclawd,+I+want+a+website+for+my+business"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-white/90 text-[#0a0a0a] px-10 py-4 font-sans text-[15px] font-bold transition-all duration-200 active:scale-[0.98] no-underline border-none shadow-md"
            >
              WhatsApp Us Now
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 8h9M8.5 4L12.5 8l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/marketplace"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-transparent px-8 py-4 font-sans text-[15px] font-medium text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all no-underline"
            >
              Browse Templates
            </a>
          </motion.div>

          <motion.div variants={itemV} className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-white/25 text-[12px] font-sans">
            <span>📅 Standard — ₹9,999</span>
            <span>🛒 Ecommerce — ₹25,000</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
