import { CoinRanking, CryptoCompare } from 'providers/crypto';
import { Component } from 'react';

export class GetCrypto extends Component {
	constructor() {
		super();
		this.state = {
			baseUrl: {
				coinRanking: 'https://api.coinranking.com/v2',
				cryptoCompare: 'https://min-api.cryptocompare.com/data/v2',
			},
		};
	}

	All({ refCurrency, offset, tag, changesFrom }) {
		const url = `${
			this.state.baseUrl.coinRanking
		}/coins?timePeriod=${changesFrom}&referenceCurrencyUuid=${refCurrency}&limit=50&offset=${offset}${
			tag && '&tags[]=' + tag
		}`;

		return CoinRanking(url);
	}
	ById({ coinId, refCurrency }) {
		const url = `${this.state.baseUrl.coinRanking}/coin/${coinId}?referenceCurrencyUuid=${refCurrency}`;
		return CoinRanking(url);
	}
	Stats({ refCurrency }) {
		const url = `${this.state.baseUrl.coinRanking}/stats${
			refCurrency && '?referenceCurrencyUuid=' + refCurrency
		} `;
		return CoinRanking(url);
	}
	RefCurrencies({ refCurrency }) {
		const url = `${this.state.baseUrl.coinRanking}/reference-currencies?search=${refCurrency}`;
		return CoinRanking(url);
	}
	RefAssets({ refAsset }) {
		const url = `${this.state.baseUrl.coinRanking}/search-suggestions?query=${refAsset}`;
		return CoinRanking(url);
	}
	PriceById({ coinId, refCurrency, timePeriod }) {
		const url = `${this.state.baseUrl.coinRanking}/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`;
		return CoinRanking(url);
	}
	PriceHistory({ coinId, refCurrency, timePeriod }) {
		const url = `${this.state.baseUrl.coinRanking}/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`;
		return CoinRanking(url);
	}
	SearchBySymbol({ refSymbol }) {
		const url = `${this.state.baseUrl.coinRanking}/coins?${refSymbol}`;
		return CoinRanking(url);
	}
	SupplyById({ coinId }) {
		const url = `${this.state.baseUrl.coinRanking}/coin/${
			coinId ? coinId : 'Qwsogvtv82FCd'
		}/supply`;
		return CoinRanking(url);
	}
	TopGainers({ limit, timePeriod }) {
		const url = `${this.state.baseUrl.coinRanking}/coins?orderBy=change&orderDirection=desc&timePeriod=${timePeriod}&limit=${limit}`;
		return CoinRanking(url);
	}
	TopLosers({ limit, timePeriod }) {
		const url = `${this.state.baseUrl.coinRanking}/coins?orderBy=change&orderDirection=asc&timePeriod=${timePeriod}&limit=${limit}`;
		return CoinRanking(url);
	}
	Newest({ limit }) {
		const url = `${this.state.baseUrl.coinRanking}/coins?orderBy=listedAt&orderDirection=desc&limit=${limit}`;
		return CoinRanking(url);
	}
	TopCoinsVolumeBased({ limit, refCurrency }) {
		const url = `${this.state.baseUrl.coinRanking}/coins?orderBy=24hVolume&referenceCurrencyUuid=${refCurrency}&limit=${limit}`;
		return CoinRanking(url);
	}
	TopCoinsPriceBased({ limit, refCurrency }) {
		const url = `${this.state.baseUrl.coinRanking}/coins?orderBy=price&referenceCurrencyUuid=${refCurrency}&limit=${limit}`;
		return CoinRanking(url);
	}

	History24h({ refSymbol, refCurrency }) {
		const url = `${this.state.baseUrl.cryptoCompare}/histohour?fsym=${refSymbol}&tsym=${refCurrency}&limit=24&aggregate=1&e=CCCAGG`;
		return CryptoCompare(url);
	}

	Historical({ limit, refSymbol, refCurrency }) {
		const url = `${this.state.baseUrl.cryptoCompare}/histoday?fsym=${refSymbol}&tsym=${refCurrency}&limit=7&aggregate=1&e=CCCAGG`;
		return CryptoCompare(url);
	}

	AssetBySymbol({ refSymbol }) {
		const url = `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${refSymbol}`;
		return CryptoCompare(url);
	}
}
