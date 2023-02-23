/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		CRYPTO_API_KEY: 'eece9b6f86mshc764de2a905df41p1325f5jsnb28af1060e95',
		CRYPTO_API_HOST: 'coinranking1.p.rapidapi.com',
		CRYPTO_API_BASE: 'https://coinranking1.p.rapidapi.com',
	},
};

module.exports = nextConfig;
