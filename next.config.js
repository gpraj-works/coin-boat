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
	env: {
		CRYPTO_API_KEY: 'd80ce7a7d6msh1362a55e1f15970p142d96jsn5c43891d674b',
		CRYPTO_API_HOST: process.env.CRYPTO_API_HOST,
		CRYPTO_API_BASE: process.env.CRYPTO_API_BASE,
		MONGO_DB_CONN:
			'mongodb+srv://work-gpraj:37taFZd3I662BtEJ@cluster0.dtetwnz.mongodb.net/?retryWrites=true&w=majority',
		NEWS_API_BASE: process.env.NEWS_API_BASE,
		NEWS_API_KEY: process.env.NEWS_API_KEY,
		SALT_FOR_CHIPS: process.env.SALT_FOR_CHIPS,
		MAILER_EMAIL: process.env.MAILER_EMAIL,
		MAILER_PASSWORD: process.env.MAILER_PASSWORD,
		MAILER_HOST: process.env.MAILER_HOST,
		MAILER_PORT: process.env.MAILER_PORT,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		BASE_URL: process.env.BASE_URL,
	},
};

module.exports = nextConfig;
