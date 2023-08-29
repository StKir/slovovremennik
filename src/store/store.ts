import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import wordsReducer from './wordsSlice';
import settingsReducer from './settingsSlice';

const rootRedusers = combineReducers({
	words: wordsReducer,
	settings: settingsReducer
});

const store = configureStore({
	reducer: rootRedusers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Redux-thunk встроен в стандартные мидлвееры!
	devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
