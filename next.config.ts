import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  transpilePackages: ["@fluentui/react-components", "@fluentui/react-icons"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
