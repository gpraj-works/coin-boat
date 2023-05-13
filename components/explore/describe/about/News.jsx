/* eslint-disable @next/next/no-img-element */
import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import Link from 'next/link';
import axios from 'axios';

const fetcher = async (url) => (await axios.get(url)).data;

const News = ({ coinName }) => {
	const { data, error, isLoading } = useSWR(
		`${process.env.NEWS_API_BASE}${coinName}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
		fetcher
	);

	const cryptoNews = !error && data?.articles;

	const Simplify = (string, length) => {
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
				{cryptoNews &&
					cryptoNews.slice(0, 6).map(
						(item, index) =>
							item.title &&
							item.description && (
								<Link
									href={item.url}
									target='_blank'
									key={index}
									className='shadow-sm border m-2 p-4 rounded-md flex justify-between w-5/12'
								>
									<div className='w-72 mr-4'>
										<img
											src={item.urlToImage}
											alt=''
											className='w-full h-full rounded-md'
										/>
									</div>
									<div className='w-62'>
										<span className='uppercase text-sm text-slate-600 dark:text-slate-400'>
											{moment(item.publishedAt).format('DD-MM-YYYY h:m a')}
										</span>
										<h3 className='text-md my-1'>{Simplify(item.title, 35)}</h3>
										<p className='text-sm text-slate-800 dark:text-slate-400 text-justify'>
											{Simplify(item.description, 80)}
										</p>
									</div>
								</Link>
							)
					)}
			</div>
			{cryptoNews && (
				<button className='border border-primary text-primary hover:bg-primary hover:text-white px-7 py-1 rounded-full'>
					Read more
				</button>
			)}

			{!cryptoNews && 'Waiting for server response...'}
		</div>
	);
};

export default News;
