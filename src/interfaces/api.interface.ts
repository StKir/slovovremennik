export type TTeg = Array<ITags>;

export interface IWord {
	id: number | string;
	word: string;
	description: string;
	speech: string;
	tegs: TTeg;
	example: Array<string>;
	author: string;
	likes: string | number;
}

export interface ITags {
	id: number | string;
	name: string;
}
