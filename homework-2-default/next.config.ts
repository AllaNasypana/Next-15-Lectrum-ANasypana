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


        ];
    }
};

export default nextConfig;
