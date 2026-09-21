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
  // Local preview: old bookmarked /personal-website URLs still land on the app
  ...(!isProd
    ? {
        async redirects() {
          return [
            {
              source: '/personal-website',
              destination: '/',
              permanent: false,
            },
            {
              source: '/personal-website/:path*',
              destination: '/:path*',
              permanent: false,
            },
          ];
        },
      }
    : {}),
}

module.exports = nextConfig
