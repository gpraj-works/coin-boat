import React, { useState } from 'react';
import { GetCrypto } from '@/services/crypto.api';
import { Table } from '../..';

const Watchlist = ({ currencyType, loggedIn, TableHolder, refSymbol }) => {
	const Crypto = new GetCrypto();
	let prepareList = [];

	for (let key in refSymbol) {
		prepareList += 'uuids[]=' + refSymbol[key] + '&';
	}

	const { data: Watchlist, isLoading: WatchlistLoading } =
		Crypto.SearchBySymbol({
			refSymbol: prepareList,
		});

	return (
		<div className='mb-10'>
			{!WatchlistLoading ? (
				<Table
					coinsProps={Watchlist?.data?.coins}
					currencyType={currencyType}
					loggedIn={loggedIn}
					watchList={Watchlist}
					refSymbol={refSymbol}
				/>
			) : (
				<>
					<TableHolder />
					<TableHolder />
					<TableHolder />
				</>
			)}
		</div>
	);
};

export default Watchlist;
