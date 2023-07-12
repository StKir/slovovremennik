import { ITags } from './api.interface';

export type TWords = {
	entities: {};
	ids: [];
	tags: ITags[];
	LoadingStatus: 'idle' | 'loading' | 'error' | 'start';
	addWordStatus: 'start' | 'added' | 'error' | 'loading';
	selectedTags: ITags[];
};
