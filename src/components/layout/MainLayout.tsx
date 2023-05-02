import React, { FC, PropsWithChildren } from 'react';
import Header from '../ui/header/Header';
import Backgrounds from '../ui/background/Backgrounds';
import Footer from '../ui/footer/Footer';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<Backgrounds />
			{children}
			<Footer />
		</>
	);
};

export default MainLayout;
