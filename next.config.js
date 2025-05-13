/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/personal-website' : '', // Only in production
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-website/' : '', // Only in production
}

module.exports = nextConfig 