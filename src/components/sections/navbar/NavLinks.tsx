'use client'

import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/nav'

interface NavLinksProps {
  items: NavItem[]
}

export function NavLinks({ items }: NavLinksProps) {
  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-8 list-none m-0 p-0">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={cn(
                'font-sans text-[14px] tracking-[-0.01em] text-white/40',
                'transition-colors duration-200 no-underline hover:text-white',
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
