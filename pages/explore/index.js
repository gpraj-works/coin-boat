import Highlights from '@/components/explore/Highlights';
import { Explore, Footer, Navbar, Stats } from '@/components/index';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

const ExploreCoins = () => {
	return (
		<>
			<Head>
				<title>Explore | CoinBoat</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='icon' href='/images/brand/favicon.ico' />
			</Head>
			<Stats />
			<Navbar classProps='sticky' />
			<div className='mx-3 my-8 text-center'>
				<h1 className='mb-4 text-2xl font-extrabold leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white'>
					Discover cryptocurrency prices
				</h1>
				<p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 dark:text-gray-400'>
					The leading cryptocurrencies in the market based on <br />
					their impressive <span className='text-primary'>market capitalization</span>.
				</p>
			</div>
			<Explore />
			<Highlights />
			<Footer />
			<ToastContainer
				autoClose={1500}
				position='bottom-right'
				// theme={theme}
				limit={3}
			/>
		</>
	);
};

export default ExploreCoins;
