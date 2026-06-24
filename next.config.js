/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Vercel Blob CDN — stores all generated architectural images
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
  eslint: {
    // Exclude auto-generated Prisma client from ESLint during builds
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/lib', 'src/types'],
  },
};

module.exports = nextConfig;
