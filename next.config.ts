import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cbb.com.br",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        // Adicione esta entrada para imgur.com
        protocol: "https",
        hostname: "imgur.com",
        port: "",
        pathname: "/**", // Permite qualquer caminho do imgur.com
      },
    ],
  },
};

export default nextConfig;
