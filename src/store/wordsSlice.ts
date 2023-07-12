import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction,
	createSelector
} from '@reduxjs/toolkit';

import axios from 'axios';

import { RootState } from './store';
import { ITags, IWord } from '@/interfaces/api.interface';
import { TWords } from '@/interfaces/store.interface';

const wordAdapter = createEntityAdapter<IWord>();

const initialState = {
	entities: {},
	ids: [],
	tags: [],
	LoadingStatus: 'start',
	addWordStatus: 'start',
	selectedTags: []
} as TWords;

export const getAllWords = createAsyncThunk<IWord[]>(
	'words/getAllWords',
	async () => {
		return await axios({
			method: 'GET',
			url: 'http://localhost:3004/words'
		})
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

export const addNewWord = createAsyncThunk<IWord, IWord>(
	'words/addNewWord',
	async (word) => {
		return await axios({
			method: 'POST',
			url: 'http://localhost:3004/words',
			data: { ...word }
		})
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

export const getAllTags = createAsyncThunk<ITags[]>(
	'words/getAllTags',
	async () => {
		return await axios({
			method: 'GET',
			url: 'http://localhost:3004/tegs'
		})
			// .then((data) => console.log(data))
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {
		closeModalThx: (state) => {
			state.addWordStatus = 'start';
		},
		selectTags: (state, { payload }: PayloadAction<ITags>) => {
			state.selectedTags = [...state.selectedTags, payload];
		},
		removeTags: (state, { payload }: PayloadAction<ITags>) => {
			state.selectedTags = state.selectedTags.filter(
				(el) => el.id !== payload.id
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllWords.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllWords.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'start';
				wordAdapter.setAll(state, payload);
			})
			.addCase(getAllWords.rejected, (state) => {
				state.LoadingStatus = 'error';
			})
			.addCase(getAllTags.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllTags.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'start';
				state.tags = payload;
			})
			.addCase(getAllTags.rejected, (state) => {
				state.LoadingStatus = 'error';
			})
			.addCase(addNewWord.pending, (state) => {
				state.addWordStatus = 'loading';
			})
			.addCase(addNewWord.rejected, (state) => {
				state.addWordStatus = 'error';
			})
			.addCase(addNewWord.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'start';
				state.addWordStatus = 'added';
				wordAdapter.addOne(state, payload);
			});
	}
});

const { reducer, actions } = wordsSlice;

export const { selectAll } = wordAdapter.getSelectors<RootState>(
	(state) => state.words
);

export const filteredWords = createSelector(
	[selectAll, (state) => state.words.selectedTags],
	(words, selectedTags: ITags[]) => {
		if (!selectedTags.length) {
			return words;
		}
		const sele: IWord[] = [];
		selectedTags.forEach((selectag) => {
			words.forEach((el1) => {
				el1.tegs.forEach((teg) => {
					if (teg.id === selectag.id) {
						sele.push(el1);
					}
				});
			});
		});
		return sele;
	}
);

export const { closeModalThx, selectTags, removeTags } = actions;

export default reducer;
