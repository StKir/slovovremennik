import { ITags, IWord } from '@/interfaces/api.interface';

export const filteredWord = (words: IWord[], selectedTags: ITags[]) => {
	if (!selectedTags.length) return words;
	const idArray = selectedTags.map((el) => el.id);
	return words.filter((el) => {
		const tagsIdArray = el.tags.map((el) => {
			return el.id;
		});
		return tagsIdArray.some((id) => idArray.includes(id));
	});
};
