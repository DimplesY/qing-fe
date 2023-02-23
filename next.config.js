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
        hostname: '124.221.156.70',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dimples-yanjie.oss-cn-beijing.aliyuncs.com',
        pathname: '/**',
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
