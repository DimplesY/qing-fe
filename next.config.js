/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  env: {
    API_URL: 'http://localhost:1337/api',
  },
}

module.exports = nextConfig
