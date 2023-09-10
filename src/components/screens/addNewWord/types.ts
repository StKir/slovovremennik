import { ITags, IWord } from '@/interfaces/api.interface';
import { AppDispatch } from '@/store/store';

export type Inputs = {
	id: number | string;
	word: string;
	description: string;
	speech: string;
	example: string;
	tags: ITags[];
};

export type PropsComponents = {
	dispatch: AppDispatch;
};

export type TFormAdded = {
	createNewWord: (IWord: IWord) => void;
} & PropsComponents;

export type TModalForm = {
	reset: () => void;
};
