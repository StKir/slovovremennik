import RenderContentDayWord from '@/components/screens/dayWord/DayWord';
// import { getWordById } from '@/hooks/useWordById';
import { IWord } from '@/interfaces/api.interface';
import axios, { AxiosResponse } from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Id = () => {
	console.log(Boolean(''));

	const [word, SetWord] = useState<IWord>();
	const pathname = usePathname();
	useEffect(() => {
		axios<number, AxiosResponse<IWord[]>>({
			method: 'GET',
			url: `http://localhost:3004/words?id=${pathname.slice(7)}`
		})
			.then((data) => SetWord(data.data[0]))
			.catch((err) => err);
	}, [pathname]);

	return (
		<div className='container'>
			{word ? <RenderContentDayWord data={word} /> : <h1>Загрузка</h1>}
		</div>
	);
};

export default Id;
