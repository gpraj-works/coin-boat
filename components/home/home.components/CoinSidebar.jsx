const CoinSidebar = () => {
	return (
		<>
			<form className='flex items-center'>
				<div className='relative w-full'>
					<div className='absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none'>
						<em className='bi bi-search'></em>
					</div>
					<input
						type='text'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-10 py-2  dark:bg-gray-700 w-full dark:border-gray-600 outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Search...'
						autoComplete='off'
						required
					/>
				</div>
			</form>
		</>
	);
};

export default CoinSidebar;
