import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from 'providers/storage';
const persistedState = loadState('crypto');

const cryptoSlice = createSlice({
	name: 'cryptoUtils',
	initialState: {
		defaultCurrency: persistedState
			? persistedState
			: { id: '6mUvpzCc2lFo', symbol: 'INR' },
	},
	reducers: {
		updateCurrency: (state, action) => {
			state.defaultCurrency = action.payload;
			saveState({ name: 'crypto', value: action.payload });
		},
	},
});

export const { updateCurrency } = cryptoSlice.actions;
export default cryptoSlice;
