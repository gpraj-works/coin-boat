/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/layouts/Navbar';
import CoinOverview from '@/components/explore/describe/Overview';
import CoinSidebar from '@/components/explore/describe/sidebar/CoinSidebar';
import TopBar from '@/components/explore/describe/TopBar';
import ExploreStats from '@/components/explore/Stats';
import { GetCrypto } from '@/services/crypto.api';
import Head from 'next/head';
import { useSelector } from 'react-redux';

const AboutCoin = ({ coinId }) => {
	const Crypto = new GetCrypto();
	const defaultCurrency = useSelector(
		(state) => state.currencyUtils.defaultCurrency
	);
	const { data, isLoading, error } = Crypto.ById({
		coinId: coinId,
		refCurrency: defaultCurrency.id,
	});

	if (error) {
		console.log(error.response.message);
		if (error.response.status === 429) {
			console.info('Limit exceeded');
		}
	}

	const explore = !isLoading && data?.data?.coin;

	return (
		<>
			<Head>
				<title>Explore | CoinBoat</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/images/brand/favicon.ico' />
			</Head>
			<ExploreStats />
			<Navbar />
			{explore && (
				<>
					<div className='flex flex-col md:flex-row flex-1 md:mx-3 my-3'>
						<main className='flex-1 md:order-2 w-full order-2'>
							<div className='bg-white dark:bg-slate-700 shadow-sm rounded-md md:ml-1 pt-7 px-4'>
								<TopBar explore={explore} defaultCurrency={defaultCurrency} />
								<div className='w-full'>
									<div className='p-3 mt-6'>
										<CoinOverview
											about={explore}
											defaultCurrency={defaultCurrency}
										/>
									</div>
								</div>
							</div>
						</main>
						<aside className='bg-white dark:bg-slate-700 w-full md:w-72 shadow-sm rounded-md md:mr-2 px-4 pt-7 md:order-1 order-1 md:sticky h-[30%] top-[7px] z-0'>
							<CoinSidebar about={explore} defaultCurrency={defaultCurrency} />
						</aside>
					</div>
				</>
			)}
		</>
	);
};

export default AboutCoin;

export async function getServerSideProps(context) {
	const id = context.query.coinId;
	return {
		props: {
			coinId: id,
		},
	};
}
