/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // GitHub Pages needs the base path in production; local dev serves from /
  basePath: process.env.NODE_ENV === 'production' ? '/personal-website' : '',
}

module.exports = nextConfig 