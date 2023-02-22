/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'p6-juejin.byteimg.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '124.221.156.70:1337',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/recommended',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
