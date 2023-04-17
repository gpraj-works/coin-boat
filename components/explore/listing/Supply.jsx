import React, { useState } from 'react';
import { GetCrypto } from '@/services/crypto.api';
import millify from 'millify';

const Supply = ({ coinId, refSymbol }) => {
	const Crypto = new GetCrypto();
	const [coinInfo, setCoinInfo] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const { data } = Crypto.SupplyById({
		coinId: coinInfo,
	});

	const { circulatingAmount, maxAmount, totalAmount } = data
		? data.data.supply
		: false;

	return (
		<div
			className='relative'
			onMouseEnter={() => {
				setCoinInfo(coinId);
				setIsHovered(true);
			}}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isHovered && (
				<div className='absolute rounded-md shadow-md bg-white w-64 right-2 -top-6 py-3 z-30 px-6'>
					{data && (
						<>
							<div className='flex justify-between'>
								<span className='text-slate-600'>Circulating</span>
								<span className=''>
									{millify(circulatingAmount)}
									<span className='ml-1.5'>{refSymbol}</span>
								</span>
							</div>
							{maxAmount && (
								<div className='flex justify-between'>
									<span className='text-slate-600'>Maximum</span>
									<span>
										{millify(maxAmount)}
										<span className='ml-1.5'>{refSymbol}</span>
									</span>
								</div>
							)}
						</>
					)}

					{!data && <span className='loader primary'></span>}
				</div>
			)}

			<span className='bi bi-info-circle'></span>
		</div>
	);
};

export default Supply;
