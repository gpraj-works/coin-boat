import React from 'react';

const TableHeader = () => {
	return (
		<div className='md:flex hidden px-3 dark:bg-gray-700 bg-white shadow-sm py-2 sticky top-0 z-30'>
			<div className='text-center w-[5%]'>
				<h3>#</h3>
			</div>
			<div className='md:w-[30%] w-[45%]'>
				<h3>Name</h3>
			</div>
			<div className='md:w-[10%] w-[30%]'>
				<h3>Price</h3>
			</div>
			<div className='w-[10%] mx-6'>
				<h3>Chart</h3>
			</div>
			<div className='md:w-[10%]'>
				<h3>Change</h3>
			</div>
			<div className='w-[15%] lg:block hidden'>
				<h3>Market cap</h3>
			</div>
			<div className='px-4'>
				<h3>More details</h3>
			</div>
		</div>
	);
};

export default TableHeader;
