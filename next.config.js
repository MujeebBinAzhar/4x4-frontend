// noinspection JSUnusedGlobalSymbols
module.exports = {
  env: {
    basePath: process.env.BASE_PATH || "",
  },
  basePath: process.env.BASE_PATH || "",
  i18n: {
    locales: ["en", "ru", "ar"],
    defaultLocale: "en",
  },
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/website/:path*",
        destination: "http://localhost:5055/api/website/:path*",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fix for SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
