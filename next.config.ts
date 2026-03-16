import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repositoryName.toLowerCase().endsWith(".github.io");
const hasCustomDomain =
  fs.existsSync(path.join(configDir, "public", "CNAME")) ||
  fs.existsSync(path.join(configDir, "CNAME"));
const repoBasePath =
  !isUserSiteRepo && !hasCustomDomain && repositoryName
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: configDir,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(repoBasePath
    ? {
        basePath: repoBasePath,
        assetPrefix: repoBasePath,
      }
    : {}),
};

export default nextConfig;
