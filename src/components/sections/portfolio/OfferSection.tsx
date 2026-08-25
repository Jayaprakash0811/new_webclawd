'use client'

import { motion } from 'framer-motion'
import { Check, Figma, Globe2, ShieldCheck, Zap } from 'lucide-react'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const INCLUDES = [
  {
    icon:  Zap,
    title: '3 premium case studies, rewritten',
    desc:  'We restructure 3 of your existing projects into high-impact, data-backed product stories using the exact framework above.',
    note:  'No solid projects yet? Pick from 25 curated enterprise problem statements — Zomato, Zepto, Uber-style briefs — design the raw UI screens yourself, and we write the full end-to-end case study text for you.',
  },
  {
    icon:  Globe2,
    title: 'The signature web framework',
    desc:  'Your portfolio is fully deployed on our live, high-conversion, minimal intro template.',
  },
  {
    icon:  ShieldCheck,
    title: 'Custom domain, 1 year free',
    desc:  'We set up and secure a personal .design or .me domain for your branding, at no extra cost.',
  },
  {
    icon:  Check,
    title: 'Zero recurring fees',
    desc:  'Hosted permanently on Vercel\u2019s free tier. No monthly platform fees, no hidden maintenance charges.',
  },
  {
    icon:  Figma,
    title: 'Full Figma source handover',
    desc:  'You keep ownership of every visual asset, the typographic grid, and all component source files.',
  },
]

export function OfferSection() {
  return (
    <section id="offer" className="border-t border-white/10 bg-black py-16 sm:py-20" aria-labelledby="offer-heading">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="border border-white/[0.16] p-6 sm:p-10"
        >
          <motion.p variants={itemV} className="mb-6 font-sans text-[12px] uppercase tracking-[0.1em] text-white/40">
            Do it for me — weekend cohort, 5 slots
          </motion.p>

          <motion.h2
            variants={itemV}
            id="offer-heading"
            className="mb-4 font-sans font-normal leading-[1.2] tracking-[-0.005em] text-white"
            style={{ fontSize: 'clamp(24px, 3.2vw, 32px)' }}
          >
            Stop guessing. Launch your elite portfolio this weekend.
          </motion.h2>

          <motion.p variants={itemV} className="mb-8 max-w-[580px] font-sans text-[15.5px] leading-[1.75] tracking-[-0.003em] text-white/60">
            You can take the framework above and spend the next three weeks restructuring
            projects, writing copy, and fighting with hosting and layout on your own — or you
            can let us handle the heavy lifting in 48 hours. One transparent payment removes
            every friction point between you and your next design interview.
          </motion.p>

          <motion.div variants={itemV} className="mb-8 flex items-end gap-3 border-t border-white/10 pt-6">
            <span
              className="font-sans font-semibold leading-none tracking-[-0.01em] text-white"
              style={{ fontSize: 'clamp(34px, 4.4vw, 44px)' }}
            >
              ₹4,999
            </span>
            <span className="mb-1 font-sans text-[13px] text-white/40">one-time · no subscriptions</span>
          </motion.div>

          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }} className="mb-9 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {INCLUDES.map(({ icon: Icon, title, desc, note }) => (
              <motion.div key={title} variants={itemV} className="flex gap-4 py-5">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center border border-white/15">
                  <Icon className="h-3.5 w-3.5 text-white/70" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="mb-1 font-sans text-[15px] font-semibold tracking-[-0.005em] text-white">{title}</p>
                  <p className="m-0 font-sans text-[13.5px] leading-[1.6] tracking-[-0.003em] text-white/50">{desc}</p>
                  {note && (
                    <p className="mb-0 mt-3 border-l border-white/15 pl-3 font-sans text-[13px] italic leading-[1.6] tracking-[-0.003em] text-white/40">
                      {note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemV} className="flex flex-col items-center gap-3 sm:items-start">
            <a
              href="https://wa.me/916379506279?text=Hi+webclawd,+I+want+to+upgrade+my+portfolio+for+%E2%82%B94%2C999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 bg-white px-8 py-4 font-sans text-[15px] font-semibold text-black no-underline transition-opacity duration-200 hover:opacity-85 active:scale-[0.98] sm:w-auto"
            >
              Upgrade my portfolio for ₹4,999
            </a>
            <p className="m-0 font-sans text-[12px] text-white/35">
              5 slots open this weekend, to finish rewrites before Monday shortlists
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
