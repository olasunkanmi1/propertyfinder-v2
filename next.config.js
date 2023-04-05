module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.istockphoto.com', 'bayut-production.s3.eu-central-1.amazonaws.com', 'i.ibb.co', 'lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
