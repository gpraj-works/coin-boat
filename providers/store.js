import authSlice from '@/services/auth.utils';
import { configureStore } from '@reduxjs/toolkit';
import cryptoUtils from 'services/crypto.utils';

export default configureStore({
	reducer: {
		currencyUtils: cryptoUtils.reducer,
		authUtils: authSlice.reducer,
	},
});
