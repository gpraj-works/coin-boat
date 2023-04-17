import { CryptoFetch } from 'providers/crypto';
import React, { Component } from 'react';

export class GetCrypto extends Component {
	constructor() {
		super();
		this.state = {
			baseUrl: process.env.CRYPTO_API_BASE,
		};
	}

	All({ refCurrency, offset, tag, changesFrom }) {
		const url = `${
			this.state.baseUrl
		}/coins?timePeriod=${changesFrom}&referenceCurrencyUuid=${refCurrency}&limit=50&offset=${offset}${
			tag && '&tags[]=' + tag
		}`;

		return CryptoFetch(url);
	}
	ById({ coinId, refCurrency }) {
		const url = `${this.state.baseUrl}/coin/${coinId}?referenceCurrencyUuid=${refCurrency}`;
		return CryptoFetch(url);
	}
	Stats({ refCurrency }) {
		const url = `${this.state.baseUrl}/stats${
			refCurrency && '?referenceCurrencyUuid=' + refCurrency
		} `;
		return CryptoFetch(url);
	}
	RefCurrencies({ refCurrency }) {
		const url = `${this.state.baseUrl}/reference-currencies?search=${refCurrency}`;
		return CryptoFetch(url);
	}
	RefAssets({ refAsset }) {
		const url = `${this.state.baseUrl}/search-suggestions?query=${refAsset}`;
		return CryptoFetch(url);
	}
	PriceById({ coinId, refCurrency, timePeriod }) {
		const url = `${this.state.baseUrl}/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`;
		return CryptoFetch(url);
	}
	PriceHistory({ coinId, refCurrency, timePeriod }) {
		const url = `${this.state.baseUrl}/coin/${coinId}/history?referenceCurrencyUuid=${refCurrency}&timePeriod=${timePeriod}`;
		return CryptoFetch(url);
	}
	SearchBySymbol({ refSymbol }) {
		const url = `${this.state.baseUrl}/coins?${refSymbol}`;
		return CryptoFetch(url);
	}
	SupplyById({ coinId }) {
		const url = `${this.state.baseUrl}/coin/${
			coinId ? coinId : 'Qwsogvtv82FCd'
		}/supply`;
		return CryptoFetch(url);
	}
	TopGainers({ limit, timePeriod }) {
		const url = `${this.state.baseUrl}/coins?orderBy=change&orderDirection=desc&timePeriod=${timePeriod}&limit=${limit}`;
		return CryptoFetch(url);
	}
	TopLosers({ limit, timePeriod }) {
		const url = `${this.state.baseUrl}/coins?orderBy=change&orderDirection=asc&timePeriod=${timePeriod}&limit=${limit}`;
		return CryptoFetch(url);
	}
	Newest({ limit }) {
		const url = `${this.state.baseUrl}/coins?orderBy=listedAt&orderDirection=desc&limit=${limit}`;
		return CryptoFetch(url);
	}
	TopCoinsVolumeBased({ limit }) {
		const url = `${this.state.baseUrl}/coins?orderBy=24hVolume&limit=${limit}`;
		return CryptoFetch(url);
	}
	TopCoinsPriceBased({ limit }) {
		const url = `${this.state.baseUrl}/coins?orderBy=price&limit=${limit}`;
		return CryptoFetch(url);
	}
}
