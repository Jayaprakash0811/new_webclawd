'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { NavLogo } from './NavLogo'
import { NavLinks } from './NavLinks'
import { NavActions } from './NavActions'
import { MobileDrawer } from './MobileDrawer'
import type { NavItem } from '@/types/nav'

const NAV_ITEMS: NavItem[] = [
  { label: 'Templates',    href: '/marketplace' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Portfolio',    href: '/portfolio' },
]

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50">
        <header
          role="banner"
          className={cn(
            'flex h-14 items-center justify-between',
            'px-4 sm:px-6 lg:px-8',
            'transition-[background,border-color,backdrop-filter] duration-300 ease-out',
            scrolled
              ? 'border-b border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-[12px]'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <NavLogo />
          <div className="hidden md:block">
            <NavLinks items={NAV_ITEMS} />
          </div>
          <NavActions onMenuOpen={() => setDrawerOpen(true)} />
        </header>
      </div>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={NAV_ITEMS} />
    </>
  )
}
