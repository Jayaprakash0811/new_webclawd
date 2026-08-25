'use client'

import { cn } from '@/lib/utils'

interface NavActionsProps { onMenuOpen: () => void }

const HamburgerIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
    <path d="M0 1h18M0 7h18M0 13h12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export function NavActions({ onMenuOpen }: NavActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block">
        <a
          href="https://wa.me/916379506279?text=Hi+webclawd,+I+want+a+website+for+my+business"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2 rounded-full no-underline',
            'bg-white hover:bg-white/90 px-5 py-2 font-sans font-bold text-[13px] text-[#0a0a0a] shadow-sm',
            'transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,153,255,0.4)] active:scale-[0.98]',
            'focus-visible:outline-none cursor-pointer border-none',
          )}
        >
          Get Your Website
        </a>
      </div>
      <button
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg sm:hidden',
          'border border-white/[0.1] bg-white/[0.04]',
          'transition-colors duration-150 hover:bg-white/[0.08]',
        )}
      >
        <HamburgerIcon />
      </button>
    </div>
  )
}
