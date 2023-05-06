/* eslint-disable @next/next/no-img-element */
import { FindLink } from '@/components/components.utils';
import millify from 'millify';
import ToSymbol from 'currency-symbol-map';
import moment from 'moment';
import useSWR from 'swr';
import Link from 'next/link';
import PriceDetails from './overview/PriceDetails';
import MarketStats from './overview/MarketStats';
import Historical from './overview/Historical';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CoinOverview = ({ about, defaultCurrency }) => {
	const { data, error, isLoading } = useSWR(
		`${process.env.NEWS_API_BASE}${about.name}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
		fetcher
	);

	error && console.info(error);

	const cryptoNews = data?.articles;

	const Simplify = (string, length) => {
		let prepare = string.substr(0, length);
		return (
			prepare.substr(0, Math.min(prepare.length, prepare.lastIndexOf(' '))) +
			'...'
		);
	};

	return (
		<>
			<PriceDetails price={about.price} uuid={about.uuid} />
			<MarketStats defaultCurrency={defaultCurrency} about={about} />
			{/* PAID-ENDPOINT */}
			{/* <Historical defaultCurrency={defaultCurrency} uuid={about.uuid} /> */}
			<div className='p-2 rounded-lg dark:bg-slate-700' id='overview'>
				<h3 className='text-2xl my-3 heading'>About</h3>
				<p className='text-xl text-slate-700'>{about.description}</p>
				<hr className='my-6' />

				<hr className='my-6' />
				<FindLink links={about.links} />
			</div>
			<h3 className='text-2xl mt-3 mb-1 p-2'>Discover Latest News</h3>
			<div className='flex flex-wrap justify-evenly'>
				{!isLoading &&
					cryptoNews.slice(0, 6).map((item, index) => (
						<Link
							href={item.url}
							target='_blank'
							key={index}
							className='shadow-md w-[47%] m-2 p-4 rounded-lg flex justify-between'
						>
							<div className='w-[65%]'>
								<span className='uppercase text-sm text-slate-600 dark:text-slate-400'>
									{moment(item.publishedAt).format('DD-MM-YYYY h:m a')}
								</span>
								<h3 className='text-md my-1'>{Simplify(item.title, 35)}</h3>
								<p className='text-sm text-slate-800 dark:text-slate-400 text-justify'>
									{Simplify(item.description, 115)}
								</p>
							</div>
							<div className='w-[30%]'>
								<img
									src={item.urlToImage}
									alt=''
									className='h-full rounded-md'
								/>
							</div>
						</Link>
					))}
			</div>
		</>
	);
};

export default CoinOverview;
