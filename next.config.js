/** @type {import('next').NextConfig} */

const withImages = require("next-images");

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         and: [/\.(js|ts)x?$/]
//       },

//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
// }

// module.exports = nextConfig
module.exports = withImages();
