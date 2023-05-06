import AuthGet from '@/services/auth.get';
import HandleWatchlist from '@/services/handle.watchlist';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddNew = ({ coinId, coinSymbol, coinName, refSymbol, loggedIn }) => {
	const [userId, setUserId] = useState();
	const User = AuthGet();
	useEffect(() => {
		if (User) {
			setUserId(User._id);
		}
	}, [User]);

	const addToList = async () => {
		let element = document.getElementById(`watchlist${coinId}`).classList;
		!loggedIn && toast.warning('Login is required!');
		if (loggedIn) {
			const result = await HandleWatchlist.UpdateList({
				WatchlistItem: {
					userId,
					coinId,
					coinSymbol,
					coinName,
				},
			});

			if (result.success) {
				toast.success('Watchlist updated');
				element.contains('bi-star')
					? element.replace('bi-star', 'bi-star-fill')
					: element.replace('bi-star-fill', 'bi-star');
			}
			!result.success && toast.error('Watchlist not updated');
		}
	};

	return (
		<>
			{refSymbol ? (
				<>
					{refSymbol.includes(coinId) ? (
						<button
							className='bi bi-star-fill'
							id={`watchlist${coinId}`}
							onClick={addToList}
						></button>
					) : (
						<button
							className='bi bi-star'
							id={`watchlist${coinId}`}
							onClick={addToList}
						></button>
					)}
				</>
			) : (
				<button
					className='bi bi-star'
					id={`watchlist${coinId}`}
					onClick={addToList}
				></button>
			)}
		</>
	);
};

export default AddNew;
