import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from 'providers/storage';
const persistedState = loadState('auth');

const authSlice = createSlice({
	name: 'authUtils',
	initialState: {
		loggedIn: persistedState ? persistedState : false
	},
	reducers: {
		updateAccess: (state, action) => {
			state.loggedIn = action.payload;
			saveState({ name: 'auth', value: action.payload });
		},
	},
});

export const { updateAccess } = authSlice.actions;
export default authSlice;
