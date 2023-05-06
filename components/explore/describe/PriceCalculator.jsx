import React from 'react';

const PriceCalculator = ({ currencySymbol, coinSymbol }) => {
	return (
		<>
			<h3 className='text-2xl mb-4 mt-3 ml-1 heading uppercase'>
				Price Calculator
			</h3>
			<div className='inline-flex mb-3'>
				<input
					type='text'
					className='border w-full rounded-l-full py-2 px-4 outline-none focus:border-primary dark:bg-slate-700 dark:border-blue-500'
					placeholder={`Price in ${coinSymbol}`}
				/>
				<button className='bg-primary w-12 rounded-r-full text-white'>
					<em className='bi bi-chevron-right'></em>
				</button>
			</div>
			<div className='inline-flex mb-3'>
				<input
					type='text'
					className='border w-full rounded-l-full py-2 px-4 outline-none focus:border-primary dark:bg-slate-700 dark:border-blue-500'
					placeholder={`Price in ${currencySymbol}`}
				/>
				<button className='bg-primary w-12 rounded-r-full text-white'>
					<em className='bi bi-chevron-right'></em>
				</button>
			</div>
		</>
	);
};

export default PriceCalculator;
