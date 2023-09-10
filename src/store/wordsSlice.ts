import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction,
	createSelector
} from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

import { RootState, useAppSelector } from './store';
import { ITags, IWord } from '@/interfaces/api.interface';
import { TWords } from '@/interfaces/store.interface';

const initialState = {
	searchWord: null,
	tags: [],
	LoadingStatus: 'start',
	error: {
		words: null,
		tags: null,
		search: null
	},
	addWordStatus: 'start',
	searchStatus: 'start',
	selectedTags: [],
	page: 1,
	totalCount: 0
} as unknown as TWords;

export const searchWord = createAsyncThunk<IWord[], string>(
	'words/searchWord',
	async (word) => {
		return await axios({
			method: 'GET',
			url: `http://localhost:3004/words?word=${word}`
		})
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

export const searchWordbyInput = createAsyncThunk<IWord | 'empty', string>(
	'words/searchWordbyInput',
	async (word) => {
		if (word === '') return 'empty';
		const res = await axios({
			method: 'GET',
			url: `http://localhost:3004/words?word=${word}`
		});
		return res.data[0];
	}
);

export const getAllTags = createAsyncThunk<ITags[]>(
	'words/getAllTags',
	async () => {
		const res = await axios({
			method: 'GET',
			url: `http://localhost:3004/tegs`
		});
		return res.data;
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
		},
		addPage: (state) => {
			if (state.LoadingStatus !== 'error') {
				state.page += 1;
			}
		},
		setPage: (state, { payload }: PayloadAction<number>) => {
			state.page = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTags.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllTags.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'start';
				state.tags = payload;
				state.error.tags = null;
			})
			.addCase(getAllTags.rejected, (state, { error }) => {
				state.LoadingStatus = 'error';
				state.error.tags = error.message!;
			})
			.addCase(searchWord.rejected, (state) => {
				state.addWordStatus = 'start';
			})
			.addCase(searchWord.fulfilled, (state, { payload }) => {
				if (payload.length) {
					state.addWordStatus = 'error';
				} else {
					state.addWordStatus = 'start';
				}
			})
			.addCase(searchWordbyInput.pending, (state) => {
				state.searchStatus = 'loading';
			})
			.addCase(searchWordbyInput.fulfilled, (state, { payload }) => {
				if (payload === 'empty') {
					state.searchStatus = 'start';
				} else {
					if (payload) {
						state.searchWord = payload;
						state.searchStatus = 'end';
					} else {
						state.searchWord = null!;
						state.searchStatus = 'error';
					}
				}
			});
	}
});

const { reducer, actions } = wordsSlice;

// export const filteredWords = createSelector(
// 	[
// 		(state) => state.wordsApi.endpoints.getAllWords(),
// 		(state) => state.words.selectedTags
// 	],
// 	(words, selectedTags: ITags[]) => {
// 		if (!selectedTags.length) return words;

// 		const idArray = selectedTags.map((el) => el.id);

// 		return words.filter((el) => {
// 			const tagsIdArray = el.tags.map((el) => {
// 				return el.id;
// 			});
// 			return tagsIdArray.some((id) => idArray.includes(id));
// 		});
// 	}
// );

export const { closeModalThx, selectTags, removeTags, addPage, setPage } =
	actions;

export default reducer;
