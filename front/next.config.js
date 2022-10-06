/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: 'register',
  //       destination: `register`,
  //     },
  //     {
  //       source: 'login',
  //       destination: `login`,
  //     },
  //     {
  //       source: '',
  //       destination: ``,
  //     },
  //   ];
  // },
  reactStrictMode: true,
  trailingSlash: true,
  devIndicators: {
    buildActivity: true,
  },

  exclude: /\.svg$/,
  poweredByHeader: false,
  inlineImageLimit: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
        // test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },

};

module.exports = nextConfig;
