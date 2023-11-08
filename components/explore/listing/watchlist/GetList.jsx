import React, { useState } from 'react';
import { GetCrypto } from '@/services/crypto.api';
import Table from '../Table';
import { HoldTable } from '@/components/layouts/placeholder/HoldExplore';

const GetList = ({ currencyType, loggedIn, refSymbol }) => {
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
			{prepareList.length ? (
				WatchlistLoading ? (
					<HoldTable count={5} classProps='py-6' />
				) : (
					<Table
						coinsProps={Watchlist?.data?.coins}
						currencyType={currencyType}
						loggedIn={loggedIn}
						refSymbol={refSymbol}
					/>
				)
			) : (
				<div className='my-20 py-20 flex justify-center items-center'>
					<h3 className='text-center text-6xl my-32 font-black text-slate-500'>
						Watchlist Empty!
					</h3>
				</div>
			)}
		</div>
	);
};

export default GetList;
