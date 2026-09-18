/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // Gh-pages needs /personal-website; local `next dev` should work at localhost:3000/
  ...(isProd ? { basePath: '/personal-website' } : {}),
}

module.exports = nextConfig
