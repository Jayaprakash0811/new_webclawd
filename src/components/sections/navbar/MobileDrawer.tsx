'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/nav'

interface MobileDrawerProps {
  open:    boolean
  onClose: () => void
  items:   NavItem[]
}

const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.22, delay: 0.1 } },
}

const drawerVariants: Variants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { duration: 0.38, ease: EASE_OUT_EXPO } },
  exit:    { x: '100%', transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
}

const navListVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
}

const navItemVariants: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 2l12 12M14 2L2 14" stroke="rgba(9,9,11,0.8)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export function MobileDrawer({ open, onClose, items }: MobileDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const goToTemplates = () => {
    onClose()
    window.location.href = '/marketplace'
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden" animate="visible" exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden" animate="visible" exit="exit"
            className={cn(
              'fixed bottom-0 right-0 top-0 z-50 flex flex-col',
              'w-[min(320px,100vw)]',
              'border-l border-white/[0.07] bg-white',
              'px-6 pb-10 pt-6',
            )}
            role="dialog" aria-modal="true" aria-label="Navigation menu"
          >
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/logo-webclawd.png" alt="" width={22} height={22} className="h-[20px] w-[20px]" />
                <span className="font-sans text-[13px] font-semibold text-zinc-800 tracking-[-0.01em]">Webclawd</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  'border border-white/[0.07] bg-white shadow-sm',
                  'transition-colors hover:bg-zinc-50',
                )}
              >
                <CloseIcon />
              </button>
            </div>

            <motion.ul
              variants={navListVariants}
              initial="hidden" animate="visible"
              className="mb-auto flex flex-col gap-1 list-none m-0 p-0"
            >
              {items.map((item) => (
                <motion.li key={item.label} variants={navItemVariants}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'block rounded-lg px-4 py-3.5 no-underline',
                      'font-sans text-[16px] font-medium tracking-[-0.02em] text-zinc-600',
                      'border border-transparent',
                      'transition-all duration-150',
                      'hover:border-white/[0.07] hover:bg-zinc-50 hover:text-zinc-950',
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="pt-8 border-t border-white/[0.07]">
              <button
                onClick={goToTemplates}
                className="w-full rounded-full bg-[#0a0a0a] hover:bg-[#0a0a0a]/90 py-3 font-sans font-bold text-[14px] text-white transition-all active:scale-[0.98] cursor-pointer border-none shadow-sm"
              >
                Browse Templates
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
