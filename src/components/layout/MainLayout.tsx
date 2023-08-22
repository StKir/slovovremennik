import React, { FC, PropsWithChildren } from 'react';
import Header from '../ui/header/Header';
import Footer from '../ui/footer/Footer';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { SessionProvider } from 'next-auth/react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Provider store={store}>
				<SessionProvider>
					<div style={{ minHeight: 'calc(100vh - 175px)' }}>
						<Header />
						{children}
					</div>
					<Footer />
				</SessionProvider>
			</Provider>
		</>
	);
};

export default MainLayout;
