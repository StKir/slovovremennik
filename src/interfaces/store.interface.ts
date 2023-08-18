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
	dayWord: IWord;
};
