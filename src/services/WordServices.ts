import { IWord } from '@/interfaces/api.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wordApi = createApi({
	reducerPath: 'WordApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
	tagTypes: ['Word'],
	endpoints: (build) => ({
		getAllWords: build.query<
			{ apiResponse: IWord[]; totalCount: number },
			number
		>({
			query: (num = 1) => ({
				url: `/words`,
				params: {
					_limit: 20,
					_page: num
				}
			}),
			transformResponse(apiResponse: IWord[], meta) {
				return {
					apiResponse,
					totalCount: Number(meta?.response?.headers.get('X-Total-Count'))
				};
			},
			providesTags: (result) => ['Word']
		}),
		createNewWord: build.mutation<IWord, IWord>({
			query: (word) => ({
				url: `/words`,
				method: 'POST',
				body: word
			}),
			invalidatesTags: ['Word']
		})
	})
});
