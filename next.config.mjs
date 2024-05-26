/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path((?!cadastrar).*)",
        destination: "/cadastrar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
