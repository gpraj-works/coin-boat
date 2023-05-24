import millify from 'millify';
import moment from 'moment';
import React from 'react';
import ToSymbol from 'currency-symbol-map';
import { GetCrypto } from '@/services/crypto.api';
import { ToCurrency, localeString } from '@/components/components.utils';

const AssetDetails = ({ defaultCurrency, symbol }) => {
	const Crypto = new GetCrypto();

	const { data, error } = Crypto.AssetBySymbol({
		refSymbol: String(symbol),
	});

	const asset = data && data.Data;

	return (
		<div className='mb-12 w-full'>
			<h3 className='text-2xl font-medium'>#Asset Details</h3>
			<div className='relative overflow-x-auto mt-10'>
				<table className='w-full text-left'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Category
							</th>
							<th scope='col' className='px-6 py-3 text-right'>
								Total Value
							</th>
						</tr>
					</thead>
					<tbody>
						{asset && (
							<>
								<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
									<th
										scope='row'
										className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
									>
										Created
									</th>
									<td className='px-6 py-4 text-right'>
										{moment(asset.LAUNCH_DATE * 1000).format('MMM-DD-YYYY')}
									</td>
								</tr>
								{asset.HASHING_ALGORITHM_TYPES && (
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
										>
											Hashing Algorithms
										</th>
										<td className='px-6 py-4 text-right'>
											{asset.HASHING_ALGORITHM_TYPES.map((item, index) => (
												<span key={index} className='ml-2'>
													{item.NAME}
												</span>
											))}
										</td>
									</tr>
								)}

								{asset.CONSENSUS_MECHANISMS && (
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
										>
											Consensus Mechanisms
										</th>
										<td className='px-6 py-4 text-right'>
											{asset.CONSENSUS_MECHANISMS.map((item, index) => (
												<span key={index} className='ml-2'>
													{item.NAME}
												</span>
											))}
										</td>
									</tr>
								)}

								{asset.LAST_BLOCK_NUMBER && (
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
										>
											Last Block Number
										</th>
										<td className='px-6 py-4 text-right'>
											{localeString(asset.LAST_BLOCK_NUMBER)}
										</td>
									</tr>
								)}
								{asset.LAST_BLOCK_TIMESTAMP && (
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white'
										>
											Last Block Time
										</th>
										<td className='px-6 py-4 text-right'>
											{moment(asset.LAST_BLOCK_TIMESTAMP * 1000).format(
												'h:mm A - MMM-DD-YYYY'
											)}
										</td>
									</tr>
								)}
							</>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AssetDetails;
