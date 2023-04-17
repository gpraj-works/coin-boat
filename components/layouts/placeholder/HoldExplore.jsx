import React from 'react';

const HoldTable = ({ count, classProps }) => {
	let HoldCount = count ? count : 1;

	return (
		<>
			{[...Array(HoldCount)].map((item, index) => (
				<div
					role='status'
					className={`animate-pulse flex md:flex-row flex-wrap ${classProps} px-4 w-full items-center border-[0.3px] dark:border-gray-800`}
					key={index}
				>
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 sm:w-[3%] w-[5%] mx-2'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[27%] mx-2'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[13%] mx-2'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[10%] mx-2'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[6%] mx-2'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[10%] mx-2 sm:block hidden'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[10%] mx-2 sm:block hidden'></div>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-[10%] mx-2 sm:block hidden'></div>
				</div>
			))}
		</>
	);
};

export { HoldTable };
