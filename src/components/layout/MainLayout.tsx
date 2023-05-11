import React, { FC, PropsWithChildren } from 'react';
import Header from '../ui/header/Header';
import Backgrounds from '../ui/background/Backgrounds';
import Footer from '../ui/footer/Footer';
import { FormModalsAuth } from '../ui/modals';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Backgrounds />
      <FormModalsAuth />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
