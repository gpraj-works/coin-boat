const Env = {
	MongoURI: process.env.MONGO_URI,
	Ranking: {
		Key: process.env.COIN_RANKING_KEY,
		Base: 'https://api.coinranking.com/v2',
	},
	Compare: {
		Key: process.env.CRYPTO_COMPARE_KEY,
		Base: {
			typeOne: 'https://min-api.cryptocompare.com/data',
			typeTwo: 'https://data-api.cryptocompare.com/asset',
		},
	},

	Encode: {
		Salt: 'Its.My.B0At',
	},

	Mailer: {
		Email: 'gpraj@outlook.in',
		Password: 'mey.MEY.mey',
		Host: 'smtp-mail.outlook.com',
		Port: '587',
	},

	SendGrid: {
		Key: process.env.SENDGRID_API_KEY,
	},
};

export default Env;
