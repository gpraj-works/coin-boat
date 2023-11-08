import React from 'react';
import { FindLink } from '@/components/components.utils';

const SocialMedia = ({ links }) => {
	return (
		<div className='mb-10'>
			<h3 className='text-2xl font-medium'>#Social Media Links</h3>
			<div className='mt-10 flex md:flex-row flex-col'>
				<FindLink links={links} />
			</div>
		</div>
	);
};

export default SocialMedia;
