import React, { FC, PropsWithChildren } from 'react';
import Header from '../ui/header/Header';
import Footer from '../ui/footer/Footer';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { SessionProvider } from 'next-auth/react';
import { PersistGate } from 'redux-persist/integration/react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SessionProvider>
						<div style={{ minHeight: 'calc(100vh - 175px)' }}>
							<Header />
							{children}
						</div>
						<Footer />
					</SessionProvider>
				</PersistGate>
			</Provider>
		</>
	);
};

export default MainLayout;
