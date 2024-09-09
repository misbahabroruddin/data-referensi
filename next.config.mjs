/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sso.dev-unsia.id",
        port: "",
        pathname: "/backend/**",
      },
    ],
  },
};

export default nextConfig;
