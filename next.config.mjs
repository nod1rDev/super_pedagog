/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/teacher",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
