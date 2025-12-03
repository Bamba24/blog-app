import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
   images: {
    domains: ["res.cloudinary.com"], // ajoute le domaine de Cloudinary
  },
};

export default nextConfig;
