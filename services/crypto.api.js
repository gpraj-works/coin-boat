import { CoinRanking, CryptoCompare } from 'providers/crypto';
import { Component } from 'react';
import Env from '@/config/envConfig';

const rankingUrl = Env.Ranking.Base;
const compareUrl = Env.Compare.Base;

export class GetCrypto extends Component {
	constructor() {
		super();
	}

	All({ refCurrency, offset, tag, changesFrom }) {
		const url = `${rankingUrl}/coins?timePeriod=${changesFrom}&referenceCurrencyUuid=${refCurrency}&limit=50&offset=${offset}${
			tag && '&tags[]=' + tag
		}`;

		return CoinRanking(url);
	}
	ById({ coinId, refCurrency }) {
		const url = `${rankingUrl}/coin/${coinId}?referenceCurrencyUuid=${refCurrency}`;
		return CoinRanking(url);
	}
	Stats({ refCurrency }) {
		const url = `${rankingUrl}/stats${
			refCurrency && '?referenceCurrencyUuid=' + refCurrency
		} `;
		return CoinRanking(url);
	}
	RefCurrencies({ refCurrency }) {
		const url = `${rankingUrl}/reference-currencies?search=${refCurrency}`;
		return CoinRanking(url);
	}
	RefAssets({ refAsset }) {
		const url = `${rankingUrl}/search-suggestions?query=${refAsset}`;
		return CoinRanking(url);
	}
	PriceById({ coinId, refCurrency, timePeriod }) {
		const url = `${rankingUrl}/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`;
		return CoinRanking(url);
	}
	PriceHistory({ coinId, refCurrency, timePeriod }) {
		const url = `${rankingUrl}/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`;
		return CoinRanking(url);
	}
	SearchBySymbol({ refSymbol }) {
		const url = `${rankingUrl}/coins?${refSymbol}`;
		return CoinRanking(url);
	}
	SupplyById({ coinId }) {
		const url = `${rankingUrl}/coin/${
			coinId ? coinId : 'Qwsogvtv82FCd'
		}/supply`;
		return CoinRanking(url);
	}
	TopGainers({ limit, timePeriod }) {
		const url = `${rankingUrl}/coins?orderBy=change&orderDirection=desc&timePeriod=${timePeriod}&limit=${limit}`;
		return CoinRanking(url);
	}
	TopLosers({ limit, timePeriod }) {
		const url = `${rankingUrl}/coins?orderBy=change&orderDirection=asc&timePeriod=${timePeriod}&limit=${limit}`;
		return CoinRanking(url);
	}
	Newest({ limit }) {
		const url = `${rankingUrl}/coins?orderBy=listedAt&orderDirection=desc&limit=${limit}`;
		return CoinRanking(url);
	}
	TopCoinsVolumeBased({ limit, refCurrency }) {
		const url = `${rankingUrl}/coins?orderBy=24hVolume&referenceCurrencyUuid=${refCurrency}&limit=${limit}`;
		return CoinRanking(url);
	}
	TopCoinsPriceBased({ limit, refCurrency }) {
		const url = `${rankingUrl}/coins?orderBy=price&referenceCurrencyUuid=${refCurrency}&limit=${limit}`;
		return CoinRanking(url);
	}

	History24h({ refSymbol, refCurrency }) {
		const url = `${compareUrl.typeOne}/v2/histohour?fsym=${refSymbol}&tsym=${refCurrency}&limit=24&aggregate=1&e=CCCAGG`;
		return CryptoCompare(url);
	}

	Historical({ limit, refSymbol, refCurrency }) {
		const url = `${compareUrl.typeOne}/v2/histoday?fsym=${refSymbol}&tsym=${refCurrency}&limit=7&aggregate=1&e=CCCAGG`;
		return CryptoCompare(url);
	}

	AssetBySymbol({ refSymbol }) {
		const url = `${compareUrl.typeTwo}/v1/data/by/symbol?asset_symbol=${refSymbol}`;
		return CryptoCompare(url);
	}

	Markets({ refSymbol, refCurrency, limit }) {
		const url = `${compareUrl.typeOne}/top/exchanges/full?fsym=${refSymbol}&tsym=${refCurrency}&limit=${limit}`;
		return CryptoCompare(url);
	}

	Exchanges({ refSymbol }) {
		const url = `${compareUrl.typeOne}/exchanges/general?tsym=${refSymbol}`;
		return CryptoCompare(url);
	}

	NewsArticles({ category }) {
		const url = `${compareUrl.typeOne}/v2/news/?lang=EN&sort=publishedAt&page=1&categories=${category}`;
		return CryptoCompare(url);
	}
}
