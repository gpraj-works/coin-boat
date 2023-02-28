/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		CRYPTO_API_KEY: process.env.CRYPTO_API_KEY,
		CRYPTO_API_HOST: process.env.CRYPTO_API_HOST,
		CRYPTO_API_BASE: process.env.CRYPTO_API_BASE,
		MONGO_DB_CONN: process.env.MONGO_DB_CONN,
		NEWS_API_BASE: process.env.NEWS_API_BASE,
		NEWS_API_KEY: process.env.NEWS_API_KEY,
		SALT_FOR_CHIPS: process.env.SALT_FOR_CHIPS,
		MAILER_EMAIL: process.env.MAILER_EMAIL,
		MAILER_PASSWORD: process.env.MAILER_PASSWORD,
		MAILER_HOST: process.env.MAILER_HOST,
		MAILER_PORT: process.env.MAILER_PORT,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	},
};

module.exports = nextConfig;
