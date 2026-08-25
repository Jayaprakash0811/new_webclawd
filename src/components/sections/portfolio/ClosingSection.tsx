'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const PORTFOLIO_PICKS = [
  {
    tag:   'Dark, editorial',
    name:  'Inertia',
    desc:  'A premium designer portfolio template for product, UX, and visual designers.',
    slug:  'inertia',
    image: 'https://image.thum.io/get/width/1200/crop/900/noanimate/https://inertia.webclawd.in/',
  },
  {
    tag:   'Light, minimal',
    name:  'Jores',
    desc:  'A premium designer portfolio template for product, UX, and visual designers.',
    slug:  'jores',
    image: 'https://image.thum.io/get/width/1200/crop/900/noanimate/https://jores.webclawd.in/',
  },
  {
    tag:   'Dark, structural',
    name:  'Struqx',
    desc:  'A premium designer portfolio template for product, UX, and visual designers.',
    slug:  'struqx',
    image: 'https://image.thum.io/get/width/1200/crop/900/noanimate/https://struqx.webclawd.in/',
  },
]

export function ClosingSection() {
  return (
    <>
      {/* Closing pull-quote */}
      <section className="border-t border-white/10 bg-black py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={itemV}
          className="mx-auto max-w-[680px] px-4 sm:px-6 lg:px-8"
        >
          <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.1em] text-white/35">
            The one-sentence version
          </p>
          <p
            className="font-sans font-normal leading-[1.4] tracking-[-0.005em] text-white"
            style={{ fontSize: 'clamp(22px, 3.4vw, 30px)' }}
          >
            Every section should answer a business question using a design decision as
            evidence — never the reverse.
          </p>
          <p className="mt-6 max-w-[480px] font-sans text-[14.5px] leading-[1.7] tracking-[-0.003em] text-white/45">
            If a paragraph could be deleted without losing a number, a decision, or a
            trade-off, it&rsquo;s decoration. Cut it.
          </p>
        </motion.div>
      </section>

      {/* Select your portfolio style */}
      <section className="border-t border-white/10 bg-black py-16 sm:py-20" aria-labelledby="pick-style-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={itemV}
            className="mb-8 max-w-[560px]"
          >
            <p id="pick-style-heading" className="mb-2 font-sans text-[12px] uppercase tracking-[0.1em] text-white/35">
              Select your portfolio style
            </p>
            <p className="m-0 font-sans text-[15px] leading-[1.6] tracking-[-0.003em] text-white/45">
              This framework gives you the words. These templates give you the layout it lives
              in — pick a style and drop your rewritten case studies straight in.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
          >
            {PORTFOLIO_PICKS.map((item) => (
              <motion.div key={item.slug} variants={itemV}>
                <Link href={`/templates/${item.slug}`} className="group flex h-full flex-col no-underline">
                  <div className="relative mb-4 aspect-[16/12] w-full overflow-hidden border border-white/10 bg-white/[0.02]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={`${item.name} portfolio template preview`}
                      className="h-full w-full object-cover object-top opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  <span className="mb-2 font-sans text-[12px] uppercase tracking-[0.08em] text-white/40">
                    {item.tag}
                  </span>
                  <span className="mb-1.5 font-sans text-[16px] font-semibold leading-[1.35] tracking-[-0.005em] text-white">
                    {item.name}
                  </span>
                  <span className="font-sans text-[13.5px] leading-[1.6] tracking-[-0.003em] text-white/45">
                    {item.desc}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={itemV} className="mt-8">
            <Link
              href="/marketplace"
              className="font-sans text-[14px] font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
            >
              Browse all portfolio templates →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
