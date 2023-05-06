/* eslint-disable @next/next/no-img-element */
import { GetCrypto } from '@/services/crypto.api';
import { ToCurrency, TrimTitle } from '@/components/components.utils';
import Link from 'next/link';

const TopInPrice = ({ limit, refCurrency }) => {
	const Crypto = new GetCrypto();
	const { data } = Crypto.TopCoinsPriceBased({
		limit,
		refCurrency: refCurrency.id,
	});
	const Prices = data && data.data.coins;

	return (
		<>
			<div className='flex justify-between items-center py-2 px-4 border-b bg-white'>
				<h1 className=''>Top Coins</h1>
				<p className='text-sm text-slate-500'>Based on Price (24h)</p>
			</div>

			{Prices &&
				Prices.map((price, index) => (
					<div
						key={index}
						className={`grid grid-cols-3 py-2 px-4 items-center hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-gray-800 ${
							index === 2 ? 'border-b-0' : 'border-b-[0.1px]'
						}`}
					>
						<Link
							href={`/explore/${price.uuid}`}
							target='_blank'
							className='coin justify-start flex items-center col-span-2'
						>
							<img src={price.iconUrl} width={23} height={0} alt='Coin image' />
							<div className='px-3'>
								<h3 className=''>
									<TrimTitle string={price.name} length={15} />
								</h3>
								<p className='text-[12px] text-slate-600'>{price.symbol}</p>
							</div>
						</Link>
						<div className='price text-right col-auto'>
							<ToCurrency price={price.price} type={refCurrency.symbol} />
						</div>
					</div>
				))}
			<div className='pt-0.5 pb-1 text-right border-t bg-white'>
				<Link
					href='/highlights/price'
					target='_blank'
					className='mr-5 text-sm text-primary'
				>
					<em className='bi bi-box-arrow-up-right'></em>
				</Link>
			</div>
		</>
	);
};

export default TopInPrice;
