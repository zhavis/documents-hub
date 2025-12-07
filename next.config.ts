import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GITHUB_DOCS_REPO: process.env.GITHUB_DOCS_REPO,
  },
  
};

export default nextConfig;
