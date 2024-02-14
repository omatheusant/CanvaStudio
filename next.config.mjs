/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
