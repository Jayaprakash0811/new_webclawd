import type { Variants } from 'framer-motion'

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const VIEWPORT_ONCE  = { once: true, amount: 0.2  } as const
export const VIEWPORT_EARLY = { once: true, amount: 0.05 } as const
export const VIEWPORT_MID   = { once: true, amount: 0.4  } as const

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay },
  }),
}

export const fadeUpFast: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay },
  }),
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11 } },
}

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04 } },
}

export const itemVariant: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
}
