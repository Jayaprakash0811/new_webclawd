import Image from 'next/image'

export function NavLogo() {
  return (
    <a href="/" className="flex items-center gap-2 no-underline" aria-label="Webclawd — home">
      <Image src="/logo-webclawd.png" alt="" width={28} height={28} className="h-[26px] w-[26px]" priority />
      <span className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-zinc-900">
        Webclawd
      </span>
    </a>
  )
}
