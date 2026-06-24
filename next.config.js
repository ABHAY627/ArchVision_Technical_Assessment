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
};

module.exports = nextConfig;
