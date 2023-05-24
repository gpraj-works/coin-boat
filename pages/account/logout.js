import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Logout = () => {
	Cookies.remove('token');
	useEffect(() => {
		window.location.href = '/';
	}, []);
};

export default Logout;
