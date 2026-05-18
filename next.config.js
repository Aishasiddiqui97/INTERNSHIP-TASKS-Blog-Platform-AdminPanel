/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for Vercel deployment
  output: 'standalone',
  
  // Expose env vars to server
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  
  // Configure webpack for Cloudinary
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.path = false
      config.resolve.fallback.os = false
      config.resolve.fallback.crypto = false
      config.resolve.fallback.net = false
      config.resolve.fallback.tls = false
      config.resolve.fallback.child_process = false
    }
    return config
  },
}

module.exports = nextConfig
