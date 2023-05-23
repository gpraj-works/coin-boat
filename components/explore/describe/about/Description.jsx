import React, { useState } from 'react';
import Link from 'next/link';
import { GetCrypto } from '@/services/crypto.api';

const Description = ({ defaultCurrency, symbol, githubLink }) => {
	const Crypto = new GetCrypto();

	const [brief, setBrief] = useState(false);
	const [dropdown, openDropdown] = useState(false);

	const { data, error } = Crypto.AssetBySymbol({
		refSymbol: symbol,
		refCurrency: defaultCurrency && defaultCurrency.symbol,
	});

	const asset = data && data.Data;

	const Resources = ({ whitepaper, website, explorers }) => {
		return (
			<>
				<h3 className='text-2xl font-medium'>#Resources</h3>
				<div className='mt-8 flex items-center'>
					<Link href={whitepaper} target='_blank' className='mr-8'>
						<em className='bi bi-file-earmark-text text-lg mr-1.5'></em>
						Whitepaper
					</Link>
					<Link href={website.url} target='_blank' className='mr-8 capitalize'>
						<em className='bi bi-globe text-lg mr-1.5'></em>
						{website.name}
					</Link>
					<div className='relative mr-8'>
						<button className='' onClick={() => openDropdown(!dropdown)}>
							<em className='bi bi-search text-md mr-1.5'></em>Explorers
							<em className='bi bi-caret-down-fill text-sm text-slate-500 ml-1.5'></em>
						</button>
						{dropdown && (
							<ul
								className='absolute bg-white z-20 w-64 left-0 top-8 rounded-md drop-shadow-xl px-5 text-slate-700 py-2'
								onMouseLeave={() => setTimeout(() => openDropdown(false), 1000)}
								onMouseUp={() => openDropdown(true)}
							>
								{explorers.slice(0, 4).map((item, index) => (
									<li className='my-1.5' key={index}>
										<Link href='#' legacyBehavior>
											<a className='hover:text-blue-700'>
												{item.URL.replace(/.+\/\/|www.|\/+/g, '')}
												<em className='bi bi-box-arrow-in-up-right text-sm ml-1'></em>
											</a>
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					{githubLink && (
						<Link
							href={githubLink.url}
							target='_blank'
							className='mr-8 capitalize'
						>
							<em className='bi bi-code-slash text-lg mr-1.5'></em>
							Source code
						</Link>
					)}
				</div>
			</>
		);
	};

	return (
		<>
			{asset && (
				<>
					<Resources
						whitepaper={asset.WEBSITE_URL}
						website={{
							name: asset.WEBSITE_URL.replace(/.+\/\/|www.|\/+/g, ''),
							url: asset.WEBSITE_URL,
						}}
						explorers={asset.EXPLORER_ADDRESSES}
					/>
					<div className='my-10'>
						<h3 className='text-2xl font-medium'>#Description</h3>
						<div className='mt-8 relative'>
							<pre
								className={`w-full ${
									!brief && 'h-96'
								} overflow-hidden whitespace-pre-wrap text-slate-700`}
							>
								{asset.ASSET_DESCRIPTION}
							</pre>

							{!brief && (
								<div className='before:bg-gradient-to-b before:from-[rgba(250,250,250,0.2)] before:via-white before:to-white before:absolute before:h-48 before:bottom-0 before:left-0 before:right-0 flex items-center relative'>
									<button
										className='border border-primary text-primary hover:bg-primary absolute bottom-5 hover:text-white px-7 py-0.5 rounded-full'
										onClick={() => setBrief(true)}
									>
										Read more
									</button>
								</div>
							)}

							{brief && (
								<button
									className='border border-primary text-primary hover:bg-primary hover:text-white px-7 py-0.5 mt-7 rounded-full'
									onClick={() => setBrief(false)}
								>
									Show less
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Description;
