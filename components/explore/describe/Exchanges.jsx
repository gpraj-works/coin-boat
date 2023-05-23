import { useState } from 'react';
import { GetCrypto } from '@/services/crypto.api';
import Link from 'next/link';
import millify from 'millify';
import Image from 'next/image';
import Rating from 'react-rating';

const BeautifyChange = (data) => {
	let value = String(data).includes('-');
	let color = value ? 'text-red-500' : 'text-green-600';
	return (
		<>
			{data && <span className={color}>{data.toFixed(2)}&nbsp;%</span>}
			{!data && '0.00'}
		</>
	);
};

const Exchanges = ({ refSymbol }) => {
	const Crypto = new GetCrypto();
	const [limit, setLimit] = useState(50);

	const { data, error, isLoading } = Crypto.Exchanges({
		refSymbol,
	});

	let exchanges = null;

	if (data && !isLoading) {
		exchanges = Object.entries(data.Data)
			.map(([key, value]) => ({
				id: key,
				...value,
			}))
			.filter((exchange) => exchange.TOTALVOLUME24H[refSymbol] > 0);

		exchanges.sort(
			(a, b) => b.TOTALVOLUME24H[refSymbol] - a.TOTALVOLUME24H[refSymbol]
		);
	}

	return (
		<div>
			<h3 className='text-2xl font-medium'>
				<span>#{exchanges && exchanges.length} Exchanges</span>
			</h3>
			<div className='relative overflow-x-auto my-10'>
				<table className='text-left w-full'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='pl-6 py-3 w-0 text-slate-400'>
								No
							</th>
							<th scope='col' className='px-6 py-3'>
								Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Grade points
							</th>
							<th scope='col' className='px-6 py-3'>
								Rating
							</th>
							<th scope='col' className='px-6 py-3'>
								Volume( 24h )
							</th>
							<th scope='col' className='px-6 py-3'>
								Type
							</th>
						</tr>
					</thead>
					<tbody>
						{exchanges &&
							exchanges.slice(0, limit).map((item, index) => (
								<tr
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
									key={index}
								>
									<td className='pl-6 py-4 w-0 text-slate-400'>{index + 1}</td>
									<td className='px-6 py-4 capitalize flex items-center'>
										<Image
											src={`https://www.cryptocompare.com${item.LogoUrl}`}
											alt=''
											width={25}
											height={25}
											className='mr-2'
										/>
										<Link href='#'>{item.Name}</Link>
									</td>
									<td className='px-6 py-4'>{item.GradePoints}</td>
									<td
										className='px-6 py-4'
										title={item.Rating.TotalUsers + ' Users'}
									>
										<Rating
											initialRating={item.Rating.Avg}
											emptySymbol={<em className='bi bi-star'></em>}
											fullSymbol={<em className='bi bi-star-fill'></em>}
											placeholderSymbol={<em className='bi bi-star-half'></em>}
											readonly
										/>
									</td>
									<td className='px-6 py-4'>
										{millify(item.TOTALVOLUME24H[refSymbol])}
									</td>
									<td className='px-6 py-4'>{item.CentralizationType}</td>
								</tr>
							))}
					</tbody>
				</table>
				{!exchanges && (
					<h3 className='mt-8 text-center text-xl text-slate-600'>
						Requested data not available!
					</h3>
				)}

				<div
					className='w-full text-center mt-10'
					onClick={() => setLimit(limit + 50)}
				>
					<button className='btn bg-primary text-white'>Load more</button>
				</div>
			</div>
		</div>
	);
};
export default Exchanges;
