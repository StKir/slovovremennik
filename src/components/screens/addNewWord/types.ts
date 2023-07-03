import { ITags } from '@/interfaces/api.interface';
import { AppDispatch } from '@/store/store';

export type Inputs = {
	id: number | string;
	word: string;
	description: string;
	speech: string;
	example: string;
	tegs: ITags[];
};

export type PropsComponents = {
	dispatch: AppDispatch;
};
