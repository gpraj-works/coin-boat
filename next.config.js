/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.COIN_IMAGE_HOST,
			},
		],
	},
};

module.exports = nextConfig;
