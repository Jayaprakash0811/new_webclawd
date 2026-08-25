import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base:     'var(--color-bg-base)',
        surface:  'var(--color-bg-surface)',
        elevated: 'var(--color-bg-elevated)',
        accent:   'var(--color-accent)',
      },
      fontFamily: {
        // font-display: Geist Sans
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        // font-sans: Geist Sans
        sans:    ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        // font-mono: Geist Mono
        mono:    ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'widest-2': '0.12em',
        'widest-3': '0.14em',
      },
    },
  },
  plugins: [],
}

export default config
