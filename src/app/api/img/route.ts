import { NextRequest, NextResponse } from 'next/server'

// Trusted image CDN hosts for portfolio template thumbnails
const ALLOWED_HOSTS = [
  'www.framer.com',
  'y4pdgnepgswqffpt.public.blob.vercel-storage.com',
  // Screenshot services — used for live-preview thumbnails
  'image.thum.io',
  'api.thumbnail.ws',
  's.wordpress.com',
  // Direct template site assets
  'axis2.invariant.design',
  'images.unsplash.com',
  'framerusercontent.com',
]

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) {
    return new NextResponse('Missing url param', { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new NextResponse('Invalid url', { status: 400 })
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return new NextResponse('Host not allowed', { status: 403 })
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://webclawd.design/',
      },
      referrerPolicy: 'no-referrer',
    })

    if (!upstream.ok) {
      return new NextResponse('Upstream fetch failed', { status: upstream.status })
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
    const body = await upstream.arrayBuffer()

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    })
  } catch {
    return new NextResponse('Proxy error', { status: 502 })
  }
}
