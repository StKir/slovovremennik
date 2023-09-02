import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction,
	createSelector
} from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

import { RootState } from './store';
import { ITags, IWord } from '@/interfaces/api.interface';
import { TWords } from '@/interfaces/store.interface';

const wordAdapter = createEntityAdapter<IWord>();

const initialState = {
	entities: {},
	ids: [],
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

export const searchWordbyInput = createAsyncThunk<IWord[] | 'empty', string>(
	'words/searchWordbyInput',
	async (word) => {
		if (word === '') return 'empty';
		return await axios({
			method: 'GET',
			url: `http://localhost:3004/words?word=${word}`
		})
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

export const getAllWords = createAsyncThunk<AxiosResponse<any, any>, number>(
	'words/getAllWords',
	async (num = 1) => {
		const res = await axios({
			method: 'GET',
			url: `http://localhost:3004/words?_limit=20&_page=${num}`
		});
		return res;
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
			.addCase(getAllWords.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(getAllWords.fulfilled, (state, { payload }) => {
				const res = payload.data;
				const total = payload.headers['x-total-count'];
				state.totalCount = Number(total);

				if (res.length > 0 && res.length < 20) {
					wordAdapter.addMany(state, res);
					state.error.words = null;
					state.LoadingStatus = 'error';
				} else {
					if (res.length) {
						state.LoadingStatus = 'start';
						wordAdapter.addMany(state, res);
						state.error.words = null;
					} else {
						state.LoadingStatus = 'error';
						state.error.words = null;
					}
				}
			})
			.addCase(getAllWords.rejected, (state, { error }) => {
				state.LoadingStatus = 'error';
				state.error.words = error.message!;
			})
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
			.addCase(addNewWord.pending, (state) => {
				state.addWordStatus = 'loading';
			})
			.addCase(addNewWord.rejected, (state) => {
				state.addWordStatus = 'error';
			})
			.addCase(addNewWord.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'start';
				if (state.addWordStatus !== 'error') {
					state.addWordStatus = 'added';
					wordAdapter.addOne(state, payload);
				}
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
					wordAdapter.removeAll(state);
					state.searchStatus = 'start';
				} else {
					if (payload.length) {
						wordAdapter.setAll(state, payload);
						state.searchStatus = 'end';
					} else {
						wordAdapter.removeAll(state);
						state.searchStatus = 'error';
					}
				}
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
		const idArray = selectedTags.map((el) => {
			return el.id;
		});
		return words.filter((el) => {
			const tagsIdArray = el.tags.map((el) => {
				return el.id;
			});
			return tagsIdArray.some((id) => idArray.includes(id));
		});
	}
);

export const { closeModalThx, selectTags, removeTags, addPage, setPage } =
	actions;

export default reducer;
