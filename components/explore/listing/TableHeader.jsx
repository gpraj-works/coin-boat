import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChangesFrom } from '@/services/crypto.utils';

const TableHeader = () => {
	const dispatch = useDispatch();
	const [changeToggle, setChangeToggle] = useState(false);
	const [changeName, setChangeName] = useState('1H');

	const ChangesBtn = ({ title, changeTo }) => {
		return (
			<button
				className='border hover:bg-primary hover:text-white hover:border-primary border-slate-300 shadow-sm px-2.5 py-0.5 m-1 rounded-md text-sm'
				onClick={() => {
					dispatch(updateChangesFrom(`${changeTo}`));
					setChangeName(`${title}`);
					setChangeToggle(!changeToggle);
				}}
			>
				{title}
			</button>
		);
	};

	return (
		<div className='grid grid-cols-10 items-center gap-1 w-full dark:bg-gray-700 bg-white shadow-sm py-2 sticky top-0 z-30 mb-2'>
			<div className='text-center'>
				<h3>#</h3>
			</div>
			<div className='col-span-2'>
				<h3>Name</h3>
			</div>
			<div className='text-right mr-1.5'>
				<h3>Price</h3>
			</div>
			<div className='text-right'>
				<button onClick={() => setChangeToggle(!changeToggle)}>
					{changeName} % <em className='bi bi-caret-down'></em>
				</button>
				{changeToggle && (
					<div className='absolute flex flex-wrap justify-center bg-white shadow-lg border rounded-b-lg p-3 max-w-auto w-44 mr-8 mt-1.5'>
						<ChangesBtn title='1H' changeTo='1h' />
						<ChangesBtn title='1D' changeTo='24h' />
						<ChangesBtn title='1W' changeTo='7d' />
						<ChangesBtn title='1M' changeTo='30d' />
						<ChangesBtn title='1Y' changeTo='1y' />
					</div>
				)}
			</div>
			<div className='text-right'>
				<h3>Chart</h3>
			</div>
			<div className='text-right'>
				<h3>Market cap</h3>
			</div>
			<div className='text-right'>
				<h3>24H Volume</h3>
			</div>
			<div className='text-center'>
				<h3> Supply</h3>
			</div>
			<div className='text-left'>
				<h3> View More</h3>
			</div>
		</div>
	);
};

export default TableHeader;
