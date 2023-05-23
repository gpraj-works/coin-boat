/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { GetCrypto } from '@/services/crypto.api';
import HoldNews from '@/components/layouts/placeholder/HoldNews';

const News = ({ refSymbol }) => {
	const Crypto = new GetCrypto();
	const [limit, setLimit] = useState(12);
	const { data, error, isLoading } = Crypto.NewsArticles({
		category: refSymbol,
	});

	const cryptoNews = !error && data?.Data;

	const Simplify = ({ string, length }) => {
		let prepare = string.substr(0, length);
		return (
			prepare.substr(0, Math.min(prepare.length, prepare.lastIndexOf(' '))) +
			'...'
		);
	};

	return (
		<div className='mb-10'>
			<h3 className='text-2xl font-medium'>#Discover Latest News</h3>
			<div className='my-6 flex flex-wrap'>
				{!isLoading ? (
					cryptoNews.slice(0, limit).map(
						(item, index) =>
							item.title &&
							item.body && (
								<Link
									href={item.url}
									target='_blank'
									key={index}
									className='shadow-sm border m-2 p-4 rounded-md flex sm:w-full md:w-[48%]'
								>
									<div className='mr-4'>
										<img
											src={item.imageurl}
											alt=''
											className='rounded-md image_block w-36 max-w-md'
										/>
									</div>
									<div className='w-full'>
										<div className='flex justify-between w-full'>
											<p className='uppercase text-sm text-slate-600 dark:text-slate-400'>
												{moment(item.published_on * 1000).format(
													'DD-MM-YYYY h:m a'
												)}
											</p>
										</div>
										<h3 className='text-md my-1.5'>{item.title}</h3>
										<p className='text-sm text-slate-800 dark:text-slate-400 text-justify mb-2'>
											<Simplify string={item.body} length='150' />
										</p>
									</div>
								</Link>
							)
					)
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2'>
						<HoldNews count={4} classNameProps='w-auto m-4' />
					</div>
				)}
			</div>
			{cryptoNews && (
				<button
					className='border border-primary text-primary hover:bg-primary hover:text-white px-7 py-1 mx-2 rounded-full outline-0 focus:outline-none'
					onClick={() => setLimit(limit < 50 ? limit + 6 : limit)}
				>
					Load more
				</button>
			)}
		</div>
	);
};

export default News;
