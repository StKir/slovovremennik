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
	selectedTags: [],
	page: 9
} as TWords;

export const getAllWords = createAsyncThunk<IWord[], number>(
	'words/getAllWords',
	async (num = 0) => {
		return await axios({
			method: 'GET',
			url: `http://localhost:3004/words?_start=${0}&_end=${num}`
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
			url: `http://localhost:3004/tegs`
		})
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
		},
		addPage: (state) => {
			state.page += 9;
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
		const idArray = selectedTags.map((el) => {
			return el.id;
		});
		return words.filter((el) => {
			const tagsIdArray = el.tegs.map((el) => {
				return el.id;
			});
			return tagsIdArray.some((id) => idArray.includes(id));
		});
	}
);

export const { closeModalThx, selectTags, removeTags, addPage } = actions;

export default reducer;
