/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Включаем статическую генерацию
  basePath: '/iichat', // Замените на название вашего репозитория
  images: {
    unoptimized: true,
  },
  assetPrefix: '/iichat/', // Замените на название вашего репозитория
}

export default nextConfig;