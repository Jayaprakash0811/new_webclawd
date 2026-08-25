/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.framer.com',
        pathname: '/creators-assets/**',
      },
      {
        protocol: 'https',
        hostname: 'y4pdgnepgswqffpt.public.blob.vercel-storage.com',
        pathname: '/templates/**',
      },
      {
        protocol: 'https',
        hostname: 'api.thumbnail.ws',
      },
    ],
  },
  // Allow cross-origin images from Framer CDN
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
