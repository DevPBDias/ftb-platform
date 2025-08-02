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
  // Configuração para garantir que as rotas da API sejam dinâmicas
  experimental: {
    serverActions: true,
  },
  // Configuração para lidar com CORS
  async headers() {
    return [
      {
        // Aplica a todas as rotas da API
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
