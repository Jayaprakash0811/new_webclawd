'use client'

import { motion } from 'framer-motion'
import { VIEWPORT_ONCE } from '@/lib/motion'

/**
 * The framework as a four-stage pipeline — Hook, Depth, Skim, Blueprint.
 * Plain monochrome, matching the rest of the article: no color, no
 * gradients, no light card. A horizontal connected sequence on desktop,
 * a vertical one on mobile.
 */

const STAGES = [
  { n: '01', title: 'Hook',      desc: 'A paradox in the product\u2019s own success story.' },
  { n: '02', title: 'Depth',     desc: 'Trade-offs and metrics that prove operator judgment.' },
  { n: '03', title: 'Skim',      desc: 'A layout a manager can extract value from in six seconds.' },
  { n: '04', title: 'Blueprint', desc: 'A repeatable structure for your own case study.' },
]

export function FrameworkConstellation() {
  return (
    <figure className="mx-auto my-4 max-w-[820px] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="border border-white/10 px-5 py-10 sm:px-10 sm:py-14"
      >
        {/* Desktop: horizontal pipeline */}
        <div className="hidden sm:flex sm:items-start">
          {STAGES.map((stage, i) => (
            <div key={stage.n} className="flex flex-1 items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col items-center text-center"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 font-sans text-[13px] text-white/70">
                  {stage.n}
                </span>
                <p className="mb-1.5 font-sans text-[16px] font-semibold tracking-[-0.005em] text-white">
                  {stage.title}
                </p>
                <p className="max-w-[150px] font-sans text-[12.5px] leading-[1.5] text-white/40">
                  {stage.desc}
                </p>
              </motion.div>

              {i < STAGES.length - 1 && (
                <div className="mt-[22px] h-px flex-1 bg-white/15" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="flex flex-col sm:hidden">
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/25 font-sans text-[12.5px] text-white/70">
                  {stage.n}
                </span>
                {i < STAGES.length - 1 && <div className="my-1 w-px flex-1 bg-white/15" />}
              </div>
              <div className={i < STAGES.length - 1 ? 'pb-8' : ''}>
                <p className="mb-1 pt-2 font-sans text-[16px] font-semibold tracking-[-0.005em] text-white">
                  {stage.title}
                </p>
                <p className="max-w-[240px] font-sans text-[13px] leading-[1.5] text-white/40">
                  {stage.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <figcaption className="mt-4 text-center font-sans text-[13px] italic leading-[1.6] text-white/35">
        The framework in one line — hook, depth, skim, blueprint.
      </figcaption>
    </figure>
  )
}
