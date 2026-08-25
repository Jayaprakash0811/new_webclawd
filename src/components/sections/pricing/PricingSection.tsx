'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'

const itemV = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } } }

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="flex-shrink-0 text-[#0099ff] mt-0.5">
    <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PLANS = [
  {
    type:    'Standard',
    emoji:   '📅',
    niches:  'Salons · Clinics · Gyms · Yoga Studios · Event Planners · Interior Designers',
    price:   '₹9,999',
    color:   '#0099ff',
    glow:    'rgba(0,153,255,0.3)',
    border:  'border-blue-500/20',
    featured: true,
    includes: [
      'Services list + pricing page',
      'Portfolio / gallery section',
      'WhatsApp booking / enquiry CTA',
      'Team / profile section',
      'Custom domain + hosting',
      'Live in 48 hours',
    ],
    cta: 'Get Standard Site',
    wa:  'I+want+a+Standard+website+for+my+business',
  },
  {
    type:    'Ecommerce',
    emoji:   '🛒',
    niches:  'Cloud Kitchens · Boutiques · Jewellery',
    price:   '₹25,000',
    color:   '#7c3aed',
    glow:    'rgba(124,58,237,0.3)',
    border:  'border-violet-500/20',
    includes: [
      'Product catalogue with categories',
      'WhatsApp order integration',
      'Enquiry form per product',
      'Mobile-first responsive design',
      'Custom domain + hosting',
      'Live in 48 hours',
    ],
    cta: 'Get Ecommerce Site',
    wa:  'I+want+an+Ecommerce+website+for+my+business',
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-white/[0.06] bg-[#111111] py-28 sm:py-36" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="mb-14 text-center"
        >
          <motion.p variants={itemV} className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">Pricing</motion.p>
          <motion.h2 id="pricing-heading" variants={itemV} className="mb-4 font-display font-extrabold leading-[1.06] tracking-[-0.045em] text-white" style={{ fontSize: 'clamp(28px, 3.8vw, 42px)' }}>
            One-time payment.
            <br />
            <span className="font-display font-light text-white/30">No subscriptions. Ever.</span>
          </motion.h2>
          <motion.p variants={itemV} className="mx-auto max-w-lg font-sans text-[15px] leading-[1.65] text-white/45">
            Pick the template type for your business. We'll build and deploy it to your domain in 48 hours.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.type}
              variants={itemV}
              className={`relative flex flex-col rounded-2xl border ${plan.border} bg-[#0c0c0c] p-7 ${plan.featured ? 'ring-1 ring-[#0099ff]/30' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0099ff] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span className="text-2xl mb-3 block">{plan.emoji}</span>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30 mb-1">{plan.niches}</p>
                <h3 className="font-sans text-[18px] font-bold text-white mb-0">{plan.type} Website</h3>
              </div>

              <div className="mb-6">
                <span
                  className="font-display font-extrabold tracking-[-0.04em] leading-none"
                  style={{ fontSize: 'clamp(32px, 3vw, 40px)', color: plan.color }}
                >
                  {plan.price}
                </span>
                <span className="font-sans text-[12px] text-white/30 ml-2">one-time</span>
              </div>

              <ul className="m-0 mb-8 flex flex-col gap-3 list-none p-0 flex-1">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="font-sans text-[13px] leading-[1.5] tracking-[-0.01em] text-white/55">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/916379506279?text=Hi+webclawd,+${plan.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-full py-3.5 font-sans text-[13.5px] font-bold transition-all duration-200 active:scale-[0.98] cursor-pointer no-underline text-white border-none"
                style={{
                  background: plan.color,
                  boxShadow: `0 0 0 0 ${plan.glow}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 20px ${plan.glow}`)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0 ${plan.glow}`)}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={itemV} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="mt-10 text-center font-mono text-[10px] tracking-[0.04em] text-white/25 uppercase"
        >
          All plans include domain registration · Vercel hosting · Source code handover · WhatsApp support
        </motion.p>
      </div>
    </section>
  )
}
