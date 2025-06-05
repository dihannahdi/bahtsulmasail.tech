/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Increase chunk loading timeout and add chunk loading settings
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 600,
      poll: 1000,
    };
    
    // Add chunk loading settings
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      },
    };
    
    return config;
  },
  /* config options here */
};

export default nextConfig;
