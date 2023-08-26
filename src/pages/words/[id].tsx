import RenderContentDayWord from '@/components/screens/dayWord/DayWord';
import Loading from '@/components/ui/loading/Loading';
import { useAppSelector } from '@/store/store';

const Id = () => {
	const word = useAppSelector((state) => state.settings.selectedWord);

	return (
		<section>
			<div className='container'>
				{word ? <RenderContentDayWord data={word} /> : <Loading />}
			</div>
		</section>
	);
};

export default Id;
