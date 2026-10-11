import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Content Security Policy: only allows scripts, frames and connections the site actually uses.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://apis.google.com https://accounts.google.com https://www.gstatic.com https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.google-analytics.com https://www.googletagmanager.com https://firebase.googleapis.com https://firebaseinstallations.googleapis.com${isDev ? ' ws: http://localhost:*' : ''}`,
  'frame-src https://*.firebaseapp.com https://accounts.google.com https://www.youtube-nocookie.com https://www.youtube.com https://maps.google.com https://www.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Security: Remove X-Powered-By header
  compress: true, // Speed: Enable Brotli / Gzip compression

  // Speed: Modern Next.js Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },

  // Security: Comprehensive HTTP Security Headers
  async headers() {
    return [
      { source: '/:path*', headers: [{ key: 'Content-Security-Policy', value: csp }] },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },

  // SEO: Ensure /favicon.ico requests from Google-Favicon & Bing bots serve the 192x192 Royal SB icon
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icon',
      },
    ];
  },
};

export default nextConfig;
