module.exports = {
  reactStrictMode: true,
  // passing environmetal variable to browser side
  env: {
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
    OPEN_WEATHER_KEY: process.env.OPEN_WEATHER_KEY,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
};
