const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.cryptocompare.com',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
