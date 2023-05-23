import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateTabChild, updateTabParent } from '@/services/crypto.utils';
import { useSelector } from 'react-redux';

const Menu = ({ numberOfExchanges, numberOfMarkets, symbol }) => {
	const dispatch = useDispatch();
	const parentTab = useSelector((state) => state.currencyUtils.tabNames.parent);
	const childTab = useSelector((state) => state.currencyUtils.tabNames.child);

	const ParentTags = ({ title, parentName, childName }) => {
		return (
			<button
				className='inline-flex items-center text-md'
				onClick={() => {
					dispatch(updateTabParent(String(parentName)));
					dispatch(updateTabChild(null));
				}}
			>
				<em
					className={`bi bi-chevron-double-right mr-3 ${
						parentTab === String(parentName) && 'text-primary'
					}`}
				></em>
				{title}
			</button>
		);
	};

	const ChildTags = ({ title, childName, parentName }) => {
		return (
			<li>
				<button
					className='inline-flex items-center text-md my-1'
					onClick={() => {
						dispatch(updateTabChild(String(childName)));
						dispatch(updateTabParent(String(parentName)));
					}}
				>
					<em
						className={`bi bi-chevron-right mr-3 ${
							parentTab === String(parentName) &&
							childTab === String(childName) &&
							'text-primary'
						}`}
					></em>
					{title}
				</button>
			</li>
		);
	};

	return (
		<div className='px-2 py-3 flex flex-col'>
			<ul className='list-inside list-none mb-2'>
				<li>
					<ParentTags
						title='Overview'
						parentName='overview'
						childName='price_details'
					/>

					<ul className='pl-5 mt-2 space-y-1 list-inside'>
						<ChildTags
							title='Price Details'
							childName='price_details'
							parentName='overview'
						/>
						<ChildTags
							title='Market Stats'
							childName='market_stats'
							parentName='overview'
						/>
						<ChildTags
							title='Historical'
							childName='historical'
							parentName='overview'
						/>
					</ul>
				</li>
			</ul>
			<ul className='list-inside list-none mt-2'>
				<li>
					<ParentTags
						title={
							<>
								<span>About</span>
								<span className='font-bold ml-2 text-sm'>{symbol}</span>
							</>
						}
						parentName='about'
					/>
					<ul className='pl-5 mt-3 space-y-1 list-inside'>
						<ChildTags
							title='Resources'
							childName='resources'
							parentName='about'
						/>
						<ChildTags
							title='Social Links'
							childName='social_links'
							parentName='about'
						/>
						<ChildTags
							title='Social Stats'
							childName='social_stats'
							parentName='about'
						/>
					</ul>
				</li>
			</ul>
			<ul className='list-inside list-none my-3'>
				<li className='mb-3'>
					<ParentTags title='Markets' parentName='markets' />
				</li>
				<li className='mb-3'>
					<ParentTags title='Exchanges' parentName='exchanges' />
				</li>
				<li className='mb-3'>
					<ParentTags title='Latest News' parentName='latest_news' />
				</li>
				<li className='mb-3'>
					<ParentTags title='Calculator' parentName='latest_news' />
				</li>
			</ul>
			<hr className='mb-3' />
			<ul className='list-inside list-none my-3'>
				<li className='mb-3'>
					<Link href='#' legacyBehavior>
						<a className='inline-flex items-center text-md font-medium tracking-wide'>
							Highlights
						</a>
					</Link>
					<ul className='pl-5 mt-3 space-y-1 list-inside'>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className={`bi bi-chevron-right mr-3`}></em>
								Top Gainers
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className={`bi bi-chevron-right mr-3`}></em>
								Top Losers
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className={`bi bi-chevron-right mr-3`}></em>
								Top Coins
							</Link>
						</li>
						<li>
							<Link href='#' className='inline-flex items-center text-md my-1'>
								<em className={`bi bi-chevron-right mr-3`}></em>
								Recently Added
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
