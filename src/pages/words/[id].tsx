import RenderContentDayWord from '@/components/screens/dayWord/DayWord';
import Loading from '@/components/ui/loading/Loading';
import { getSelectedWord } from '@/store/settingsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Id = () => {
	const dispath = useAppDispatch();
	const params = usePathname();
	const word = useAppSelector((state) => state.settings.selectedWord);
	useEffect(() => {
		params && dispath(getSelectedWord(params.slice(7)));
	}, [dispath, params]);
	return (
		<section>
			<div className='container'>
				{word ? <RenderContentDayWord data={word} /> : <Loading />}
			</div>
		</section>
	);
};

export default Id;
