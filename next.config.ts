import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
};

export default nextConfig;

// import withBundleAnalyzer from '@next/bundle-analyzer';

// const analyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {}
 
// export default analyzer(nextConfig)