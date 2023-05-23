import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from 'providers/storage';
const persistedState = loadState('crypto');

const cryptoSlice = createSlice({
	name: 'cryptoUtils',
	initialState: {
		defaultCurrency: persistedState
			? persistedState
			: { id: '6mUvpzCc2lFo', symbol: 'INR' },
		changesFrom: null,
		tabNames: { parent: 'overview', child: 'price_details' },
	},
	reducers: {
		updateCurrency: (state, action) => {
			state.defaultCurrency = action.payload;
			saveState({ name: 'crypto', value: action.payload });
		},

		updateChangesFrom: (state, action) => {
			state.changesFrom = action.payload;
		},

		updateTabChild: (state, action) => {
			state.tabNames.child = action.payload;
		},
		updateTabParent: (state, action) => {
			state.tabNames.parent = action.payload;
		},
	},
});

export const {
	updateCurrency,
	updateChangesFrom,
	updateTabChild,
	updateTabParent,
} = cryptoSlice.actions;
export default cryptoSlice;
