const { withNextVideo } = require("next-video/process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "utfs.io"],
  },
  typescript: { ignoreBuildErrors: true },
};

module.exports = withNextVideo(nextConfig);
