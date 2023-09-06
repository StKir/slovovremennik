import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import wordsReducer from './wordsSlice';
import settingsReducer from './settingsSlice';
import { wordApi } from '@/services/WordServices';

const rootRedusers = combineReducers({
	words: wordsReducer,
	settings: settingsReducer,
	[wordApi.reducerPath]: wordApi.reducer
});

const store = configureStore({
	reducer: rootRedusers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			wordApi.middleware
		),
	// Redux-thunk встроен в стандартные мидлвееры!
	// serializableCheck поставлен в false для предотвращения ошибки при записи totalCount (это максимальное кол-во записей words которое приходт с сервера в поле headers.[x-total-count])
	devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
