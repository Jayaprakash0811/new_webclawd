import type { Metadata } from 'next'
import { inter, jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title:       'Webclawd — Websites for Tamil Nadu businesses',
  description: 'Done-for-you Standard and Ecommerce websites for Tamil Nadu businesses. Live in 48 hours. One-time payment, no subscriptions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-base font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
