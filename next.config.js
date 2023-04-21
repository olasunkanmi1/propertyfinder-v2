const rewrites = () => {
  return [
    // auth
    {
      source: "/login",
      destination: `${process.env.BACKEND_URL}/auth/login`
    },
    {
      source: "/register",
      destination: `${process.env.BACKEND_URL}/auth/register`
    },
    {
      source: "/verify-email",
      destination: `${process.env.BACKEND_URL}/auth/verify-email`
    },
    {
      source: "/logout",
      destination: `${process.env.BACKEND_URL}/auth/logout`
    },
    {
      source: "/forgot-password",
      destination: `${process.env.BACKEND_URL}/auth/forgot-password`
    },
    {
      source: "/reset-password",
      destination: `${process.env.BACKEND_URL}/auth/reset-password`
    },
    // user
    {
      source: "/user",
      destination: `${process.env.BACKEND_URL}/user`
    },
    {
      source: "/update-password",
      destination: `${process.env.BACKEND_URL}/user/update-password`
    },
    {
      source: "/update-photo",
      destination: `${process.env.BACKEND_URL}/user/update-photo`
    },
    {
      source: "/delete-photo/:encodedPublicId",
      destination: `${process.env.BACKEND_URL}/user/update-photo?public_id=:encodedPublicId`
    },
    // property
    {
      source: "/property",
      destination: `${process.env.BACKEND_URL}/property`
    },
    {
      source: "/unsave-property/:externalID",
      destination: `${process.env.BACKEND_URL}/property?externalID=:externalID`
    },
  ]
}

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
  },
  rewrites: rewrites
}
