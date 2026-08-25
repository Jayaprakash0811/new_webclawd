import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

// Geist Sans — used for body text, UI, nav, and headings (v0's default font)
export const inter = GeistSans

// Geist Mono — used for code blocks, pricing, and technical labels
export const jetbrainsMono = GeistMono

// Re-export aliases so layout.tsx doesn't need changes
export const fraunces    = inter       // mapped to --font-display via tailwind
export const bricolage   = inter       // mapped to --font-sans
