'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'
import Link from 'next/link'

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export function HeroContent() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-20 lg:px-8 lg:pt-44 lg:pb-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        {/* How it works link */}
        <motion.a
          variants={itemVariants}
          href="#how-it-works"
          className="mb-6 hidden shrink-0 items-center gap-1.5 whitespace-nowrap font-sans text-[13.5px] font-medium text-white/45 no-underline transition-colors duration-200 hover:text-white sm:inline-flex"
        >
          <span className="text-white/80">How it works</span> · 4 simple steps
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 8h9M8.5 4L12.5 8l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mb-5 max-w-[820px] font-display font-extrabold text-white tracking-[-0.035em] leading-[1.06]"
          style={{ fontSize: 'clamp(34px, 5.2vw, 60px)' }}
        >
          Webclawd is the done-for-you builder for standout business sites.
        </motion.h1>

        {/* Sub headline */}
        <motion.h2
          variants={itemVariants}
          className="mb-9 max-w-[560px] font-sans font-medium text-white/50 leading-relaxed tracking-[-0.01em]"
          style={{ fontSize: 'clamp(14.5px, 1.6vw, 17px)' }}
        >
          Ecommerce and Standard websites for Tamil Nadu businesses — deployed to your domain in 48 hours. Send your details on WhatsApp, we build the rest.
        </motion.h2>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-[14px] font-bold text-[#0a0a0a] no-underline transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
            >
              Get started for free
            </Link>
            <a
              href="https://wa.me/916379506279?text=Hi%20webclawd%2C%20I%20want%20a%20website%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-transparent px-7 py-3.5 font-sans text-[14px] font-medium text-white/60 no-underline transition-all duration-200 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[12.5px] font-medium text-white/35">
            <span className="flex items-center gap-1.5"><span className="font-bold text-emerald-400">✓</span> Live in 48 hours</span>
            <span className="flex items-center gap-1.5"><span className="font-bold text-emerald-400">✓</span> Domain included</span>
            <span className="flex items-center gap-1.5"><span className="font-bold text-emerald-400">✓</span> One-time payment</span>
            <span className="flex items-center gap-1.5"><span className="font-bold text-emerald-400">✓</span> No monthly fees</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
