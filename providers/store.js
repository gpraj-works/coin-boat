import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from 'services/crypto.api';
import cryptoUtils from 'services/crypto.utils';

export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		currencyType: cryptoUtils.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cryptoApi.middleware),
});
