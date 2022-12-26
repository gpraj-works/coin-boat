import Head from 'next/head';
import {
	Navbar,
	ExploreStats,
	ExploreTable,
} from '@/home/home.components/home.components';
import { useState } from 'react';

const StatsHolder = () => {
	return (
		<div
			role='status'
			className='shadow-sm md:w-[25%] w-[45%] md:mx-3 px-5 py-6 my-3 bg-white rounded-md dark:bg-gray-700 dark:text-gray-400'
		>
			<div className='flex justify-between items-center animate-pulse'>
				<div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
					<div className='w-32 h-2 bg-gray-300 rounded-full dark:bg-gray-600'></div>
				</div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-12'></div>
			</div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

const TableHolder = () => {
	return (
		<div role='status' className='animate-pulse py-10'>
			<div className='h-4 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[75%] my-2.5 mx-auto'></div>
			<div className='h-3 mx-auto my-1.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[50%]'></div>
			<div className='h-3 mx-auto my-1.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[25%]'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

const Explore = ({ coins }) => {
	const [lazy, setLazy] = useState(false);
	setTimeout(() => (coins ? setLazy(true) : setLazy(false)), 1500);
	return (
		<>
			<Head>
				<title>Explore | CoinBoat</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			<div className='statistics my-6'>
				<div className='totals flex flex-wrap md:flex-nowrap justify-evenly items-center w-[100%]'>
					{lazy ? (
						<ExploreStats
							totalCoins={coins.data.stats.totalCoins}
							totalExchanges={coins.data.stats.totalExchanges}
							totalMarkets={coins.data.stats.totalMarkets}
							totalMarketCap={coins.data.stats.totalMarketCap}
						/>
					) : (
						<>
							<StatsHolder />
							<StatsHolder />
							<StatsHolder />
							<StatsHolder />
						</>
					)}
				</div>
			</div>
			{lazy ? (
				<ExploreTable coinsProps={coins.data.coins} />
			) : (
				<div className='shadow-sm bg-white dark:bg-gray-700 dark:text-gray-400 mx-3'>
					<TableHolder />
					<TableHolder />
					<TableHolder />
				</div>
			)}
		</>
	);
};

export default Explore;

export const getServerSideProps = async () => {
	const res = await fetch(
		`${process.env.REMOTE_API_URL}/coins?${process.env.COIN_API_KEY}`
	);
	const data = await res.json();
	if (res.status !== 200) {
		return {
			props: {
				coins: false,
			},
		};
	} else {
		return {
			props: {
				coins: data,
			},
		};
	}
};