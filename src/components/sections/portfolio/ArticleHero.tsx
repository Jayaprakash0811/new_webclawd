'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'
import { ArticleH1, ByLine, CategoryTags } from './ArticleUI'

const itemV = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export function ArticleHero() {
  return (
    <header className="bg-black pb-14 pt-28 sm:pt-32">
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-[720px] px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemV}>
          <CategoryTags tags={['Product', 'Design Systems', 'Career']} />
        </motion.div>

        <motion.div variants={itemV}>
          <ArticleH1>The Product Storytelling Framework</ArticleH1>
        </motion.div>

        <motion.p
          variants={itemV}
          className="mb-10 max-w-[560px] font-sans text-[18px] leading-[1.65] tracking-[-0.005em] text-white/55"
        >
          How senior product designers write case studies that get hired — reverse-engineered
          from a case study built to read like a business memo, not a portfolio piece.
        </motion.p>

        <motion.div variants={itemV}>
          <ByLine author="Jayaprakash M" outlet="Webclawd Design" date="July 2026" readTime="9 min" />
        </motion.div>
      </motion.div>

      {/* Signature visual — the hook formula, rendered in the same restrained
          monochrome language as the rest of the piece */}
      <motion.div
        variants={itemV}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto mt-14 max-w-[820px] px-4 sm:px-6 lg:px-8"
      >
        <div className="border border-white/[0.14] p-6 sm:p-10">
          <p className="mb-6 font-sans text-[12px] uppercase tracking-[0.1em] text-white/35">
            The hook formula
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1 border border-white/10 px-5 py-5">
              <p className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.08em] text-white/40">Celebrated strength</p>
              <p className="m-0 font-sans text-[14.5px] leading-[1.5] tracking-[-0.005em] text-white/75">
                The thing your product is famous for
              </p>
            </div>

            <span className="self-center font-sans text-[18px] text-white/25">+</span>

            <div className="flex-1 border border-white/10 px-5 py-5">
              <p className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.08em] text-white/40">but</p>
              <p className="m-0 font-sans text-[14.5px] leading-[1.5] tracking-[-0.005em] text-white/75">
                The specific business cost that same strength quietly causes
              </p>
            </div>

            <span className="self-center font-sans text-[18px] text-white/25">=</span>

            <div className="flex-1 border border-white/30 bg-white/[0.04] px-5 py-5">
              <p className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.08em] text-white/60">The hook</p>
              <p className="m-0 font-sans text-[14.5px] font-medium leading-[1.5] tracking-[-0.005em] text-white">
                A paradox a hiring manager can&apos;t scroll past
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
