export interface IWord {
	id: number | string;
	word: string;
	description: string;
	speech: string;
	tegs: ITags[];
	example: string;
	author?: string;
	likes?: string | number;
}

export interface ITags {
	id: number | string;
	name: string;
}
