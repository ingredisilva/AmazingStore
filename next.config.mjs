/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    types: ["jest", "@testing-library/jest-dom"],
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
