/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/OpenMeditation',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 