import React from 'react';
import Link from 'next/link';

const Menu = ({ numberOfExchanges, numberOfMarkets, symbol }) => {
	return (
		<div className='px-2 py-3 flex flex-col'>
			<ul className='list-inside list-none mb-2'>
				<li>
					<div className='inline-flex items-center text-md'>
						<em
							className={`bi bi-chevron-double-right mr-3 ${'text-primary'}`}
						></em>
						Overview
					</div>
					<ul className='pl-5 mt-2 space-y-1 list-inside'>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em
									className={`bi bi-chevron-right mr-3 ${'text-primary'}`}
								></em>
								Price Details
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className='bi bi-chevron-right mr-3'></em>
								Market Stats
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className='bi bi-chevron-right mr-3'></em>
								Historical
							</Link>
						</li>
					</ul>
				</li>
			</ul>
			<ul className='list-inside list-none mt-2'>
				<li>
					<Link href='#' className='inline-flex items-center text-md'>
						<em className='bi bi-chevron-double-right mr-3'></em>
						About
						<span className='font-bold ml-2 text-sm'>{symbol}</span>
					</Link>
					<ul className='pl-5 mt-3 space-y-1 list-inside'>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className='bi bi-chevron-right mr-3'></em>
								Resources
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className='bi bi-chevron-right mr-3'></em>
								Description
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className='bi bi-chevron-right mr-3'></em>
								Social Media
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className='bi bi-chevron-right mr-3'></em>
								Latest News
							</Link>
						</li>
					</ul>
				</li>
			</ul>
			<ul className='list-inside list-none my-3'>
				<li>
					<Link href='#' className='inline-flex items-center text-md'>
						<em className='bi bi-chevron-double-right mr-3'></em>
						Exchanges
						<span className='text-xs font-bold ml-1 -mb-0.5'>
							( {numberOfExchanges} )
						</span>
					</Link>
				</li>
			</ul>
			<ul className='list-inside list-none'>
				<li>
					<Link href='#' className='inline-flex items-center text-md'>
						<em className='bi bi-chevron-double-right mr-3'></em>
						Markets
						<span className='text-xs font-bold ml-1 -mb-0.5'>
							( {numberOfMarkets} )
						</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
