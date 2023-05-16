export interface IWord {
  word: string;
  description: string;
  speech: string;
  tegs: Array<string>;
  example: Array<string>;
  author: string;
  likes: string | number;
}
