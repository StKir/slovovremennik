import { ITags, IWord } from './api.interface';

export type TWords = {
	entities: {};
	ids: [];
	tags: ITags[];
	LoadingStatus: 'idle' | 'loading' | 'error' | 'start';
	addWordStatus: 'start' | 'added' | 'error' | 'loading';
	selectedTags: ITags[];
	searchStatus: 'start' | 'loading' | 'end' | 'error';
	page: number;
	error: TErrors;
	totalCount: number;
};

export type TErrors = {
	words: null | string;
	tags: null | string;
	search: null | string;
};

export type TSettings = {
	LoadingStatus: 'idle' | 'loading' | 'error' | 'start';
	dayWord: IWord;
	selectedWord: IWord;
};
