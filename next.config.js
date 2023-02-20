//  @type {import('next').NextConfig}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_ARTICLES: process.env.NEXT_PUBLIC_SITE_ARTICLES,
    NEXT_PUBLIC_SITE_CAPTCHA: process.env.NEXT_PUBLIC_SITE_CAPTCHA,
    NEXT_PUBLIC_SITE_CHECK_CAPTCHA: process.env.NEXT_PUBLIC_SITE_CHECK_CAPTCHA,
    NEXT_PUBLIC_SITE_CREATE_ACCOUNT:process.env.NEXT_PUBLIC_SITE_CREATE_ACCOUNT,
    NEXT_PUBLIC_SITE_GET_ACCOUNT: process.env.NEXT_PUBLIC_SITE_GET_ACCOUNT,
    NEXT_PUBLIC_SITE_GET_AMOUNT: process.env.NEXT_PUBLIC_SITE_GET_AMOUNT,
    NEXT_PUBLIC_SITE_GET_ARTICLES: process.env.NEXT_PUBLIC_SITE_GET_ARTICLES,
    NEXT_PUBLIC_SITE_GET_CITY: process.env.NEXT_PUBLIC_SITE_GET_CITY,
    NEXT_PUBLIC_SITE_NEWS: process.env.NEXT_PUBLIC_SITE_NEWS,
    NEXT_PUBLIC_SITE_SEND: process.env.NEXT_PUBLIC_SITE_SEND,
  },
};

module.exports = nextConfig;
