import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    typedRoutes: true,
    allowedDevOrigins: ['http://localhost:3000', 'http://192.168.0.103:3000'],
};

export default nextConfig;
