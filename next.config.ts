import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export — deploy jako statické HTML do najdikouce/vycvik/
  output: 'export',
  images: {
    // Static export nepodporuje image optimization loader
    unoptimized: true,
  },
  // headers() záměrně odstraněno — output: 'export' je nepodporuje.
  // CSP/security hlavičky řeší najdikouce/vercel.json na úrovni deploye.
}

export default nextConfig
