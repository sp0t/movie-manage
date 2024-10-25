/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
    reactStrictMode: true,
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8081/api/:path*',
        },
      ];
    },
  };