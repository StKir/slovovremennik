import RenderContentDayWord from '@/components/screens/dayWord/DayWord';
import Loading from '@/components/ui/loading/Loading';
import { getSelectedWord } from '@/store/settingsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Id = () => {
	const dispath = useAppDispatch();
	const params = usePathname();
	const word = useAppSelector((state) => state.settings.selectedWord);
	const status = useAppSelector((state) => state.settings.LoadingStatus);
	useEffect(() => {
		params && dispath(getSelectedWord(params.slice(7)));
	}, [dispath, params]);

	const renderContent = (status: string) => {
		switch (status) {
			case 'error':
				return <h2>Произошла ошибка, такого слова у нас нет</h2>;
			case 'start':
				return <RenderContentDayWord data={word} />;
			default:
				return <Loading />;
		}
	};

	const content = renderContent(status);
	console.log(word);

	return (
		<section>
			<div className='container'>{content}</div>
		</section>
	);
};

export default Id;
