import type { NextConfig } from "next";
import { redirects} from '@/routes'

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
        authInterrupts: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
            },
        ],
    },
    async redirects(){
        return [
            ...redirects
        ]
    },
    async rewrites() {
        return [
            {
                source: '/setting/:path*',
                destination: '/new-setting',
            }


        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },

                ],
            },

            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Max-Age',
                        value: '86400',
                    },
                ],
            },


        ];
    }
};

export default nextConfig;
