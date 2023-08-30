import { IWord } from '@/interfaces/api.interface';
import { TSettings } from '@/interfaces/store.interface';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	LoadingStatus: 'idle',
	dayWord: null,
	selectedWord: null
} as unknown as TSettings;

export const getDayWord = createAsyncThunk<IWord>(
	'settings/getDayWord',
	async () => {
		const res = await axios({
			method: 'GET',
			url: `http://localhost:3004/dayword`
		});
		return res.data;
	}
);

export const getSelectedWord = createAsyncThunk<IWord[], number | string>(
	'settings/getSelectedWord',
	async (id) => {
		const res = await axios({
			method: 'GET',
			url: `http://localhost:3004/words?id=${id}`
		});
		return res.data;
	}
);

const SettingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDayWord.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getDayWord.rejected, (state) => {
				state.LoadingStatus = 'error';
			})
			.addCase(getDayWord.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'start';
				state.dayWord = payload;
			})
			.addCase(getSelectedWord.pending, (state) => {
				state.LoadingStatus = 'loading';
				state.selectedWord = null!;
			})
			.addCase(getSelectedWord.rejected, (state) => {
				state.LoadingStatus = 'error';
			})
			.addCase(getSelectedWord.fulfilled, (state, { payload }) => {
				if (payload[0]) {
					state.LoadingStatus = 'start';
					state.selectedWord = payload[0];
				} else {
					state.LoadingStatus = 'error';
				}
			});
	}
});
const { actions, reducer } = SettingsSlice;

export default reducer;
