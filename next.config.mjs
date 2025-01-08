/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "innovative-cut-cauliflower.glitch.me",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
};

export default nextConfig;
