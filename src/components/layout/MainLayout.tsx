import React, { FC, PropsWithChildren } from 'react';
import Header from '../ui/header/Header';
import Backgrounds from '../ui/background/Backgrounds';
import Footer from '../ui/footer/Footer';
import { Provider } from 'react-redux';
import store from '@/store/store';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Provider store={store}>
				<Header />
				<Backgrounds />
				{children}
				<Footer />
			</Provider>
		</>
	);
};

export default MainLayout;
