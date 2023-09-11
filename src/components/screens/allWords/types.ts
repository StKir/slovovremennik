import { IWord } from '@/interfaces/api.interface';
import { PropsComponents } from '../addNewWord/types';
import { FormEvent } from 'react';
import { TErrors } from '@/interfaces/store.interface';

export type TSerach = {
	onSearch: (e: FormEvent<HTMLFormElement>, word: string) => void;
};

export type TTagsFormProps = {
	error: TErrors;
} & PropsComponents;

export type TSearchWordProps = {
	wordStatusSearch: 'start' | 'loading' | 'end' | 'error';
	seachDataWord: IWord[] | undefined;
};

export type TWordList = {
	selectedTags: ITags[];
} & PropsComponents;
