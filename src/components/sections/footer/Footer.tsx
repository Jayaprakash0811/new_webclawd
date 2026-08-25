'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0099ff] to-[#7000ff] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_10px_rgba(0,153,255,0.3)]">W</div>
          <div>
            <span className="font-sans font-bold tracking-tight text-white text-[15px]">webclawd</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/25 ml-2">WEB · DONE RIGHT</span>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12.5px] text-white/35">
          <Link href="/marketplace"          className="hover:text-white transition-colors no-underline">Templates</Link>
          <Link href="#how-it-works"                className="hover:text-white transition-colors no-underline">How it works</Link>
          <Link href="#pricing"                     className="hover:text-white transition-colors no-underline">Pricing</Link>
          <a href="https://wa.me/916379506279" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors no-underline">WhatsApp</a>
        </nav>

        <p className="font-mono text-[10px] text-white/20 text-center sm:text-right">
          © 2026 Webclawd · Tamil Nadu, India
        </p>
      </div>
    </footer>
  )
}
