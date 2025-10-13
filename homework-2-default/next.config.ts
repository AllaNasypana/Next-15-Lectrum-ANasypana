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

        ];
    }
};

export default nextConfig;
