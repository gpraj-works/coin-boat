import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
	'x-rapidapi-host': process.env.CRYPTO_API_HOST,
	'x-rapidapi-key': process.env.CRYPTO_API_KEY,
};
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.CRYPTO_API_BASE }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: ({ offset, currency }) =>
				createRequest(
					`/coins?referenceCurrencyUuid=${currency}&limit=50&offset=${offset}`
				),
		}),
		getCryptoById: builder.query({
			query: ({ coinId, currency }) =>
				createRequest(`/coin/${coinId}?referenceCurrencyUuid=${currency}`),
		}),
		getCryptoStats: builder.query({
			query: (refCurrency) =>
				createRequest(`/stats?referenceCurrencyUuid=${refCurrency}`),
		}),
		getRefCurrency: builder.query({
			query: (refCurrency) =>
				createRequest(`/reference-currencies?search=${refCurrency}`),
		}),
		getRefAsset: builder.query({
			query: (refAsset) =>
				createRequest(`/search-suggestions?query=${refAsset}`),
		}),
		getPriceHistory: builder.query({
			query: ({ coinId, refCurrency, timePeriod }) =>
				createRequest(
					`/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`
				),
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetCryptoByIdQuery,
	useGetCryptoStatsQuery,
	useGetRefCurrencyQuery,
	useGetRefAssetQuery,
	useGetPriceHistoryQuery,
} = cryptoApi;
