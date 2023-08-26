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
		return await axios({
			method: 'GET',
			url: `http://localhost:3004/dayword`
		})
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

const SettingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		selectWord: (state, { payload }: PayloadAction<IWord>) => {
			state.selectedWord = payload;
		}
	},
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
			});
	}
});
const { actions, reducer } = SettingsSlice;
export const { selectWord } = actions;

export default reducer;
