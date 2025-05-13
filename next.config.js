/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true // Required for static export
  },
  basePath: '/personal-website', // Required for GitHub Pages
  assetPrefix: '/personal-website/',
}

module.exports = nextConfig 