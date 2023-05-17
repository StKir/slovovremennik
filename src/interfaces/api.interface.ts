export type TTeg = Array<string>;

export interface IWord {
  word: string;
  description: string;
  speech: string;
  tegs: TTeg;
  example: Array<string>;
  author: string;
  likes: string | number;
}
