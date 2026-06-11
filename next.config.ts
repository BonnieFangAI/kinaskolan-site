import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  basePath: isGithubPages ? "/kinaskolan-site" : undefined,
  assetPrefix: isGithubPages ? "/kinaskolan-site" : undefined,
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: isGithubPages ? "/kinaskolan-site" : "",
  },
  images: {
    unoptimized: isGithubPages,
  },
};

export default nextConfig;
