import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateAccess } from '@/services/auth.utils';
import Cookies from 'js-cookie';

const Logout = () => {
	const router = useRouter();
	const to = router.query.to;
	const dispatch = useDispatch();
	Cookies.remove('token');
	dispatch(updateAccess(false));
	router.push(to);
};

export default Logout;
