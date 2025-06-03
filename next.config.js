/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/OpenMeditation',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  assetPrefix: '/OpenMeditation/',
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 