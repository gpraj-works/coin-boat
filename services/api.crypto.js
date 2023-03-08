import { CryptoFetch } from 'providers/crypto';
import React, { Component } from 'react';

export class GetCrypto extends Component {
	constructor(props) {
		super();
		this.state = {
			base: process.env.CRYPTO_API_BASE,
		};
	}

	All({ refCurrency, offset, tag }) {
		const url = `${
			this.state.base
		}/coins?referenceCurrencyUuid=${refCurrency}&limit=50&offset=${offset}${
			tag && '&tags[]=' + tag
		}`;

		return CryptoFetch(url);
	}
	ById({ coinId, refCurrency }) {
		const url = `${this.state.base}/coin/${coinId}?referenceCurrencyUuid=${refCurrency}`;
		return CryptoFetch(url);
	}
	Stats({ refCurrency }) {
		const url = `${this.state.base}/stats?referenceCurrencyUuid=${refCurrency}`;
		return CryptoFetch(url);
	}
	RefCurrencies({ refCurrency }) {
		const url = `${this.state.base}/reference-currencies?search=${refCurrency}`;
		return CryptoFetch(url);
	}
	RefAssets({ refAsset }) {
		const url = `${this.state.base}/search-suggestions?query=${refAsset}`;
		return CryptoFetch(url);
	}
}
