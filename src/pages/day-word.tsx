import MainLayout from '@/components/layout/MainLayout';
import DayWord from '@/components/screens/dayWord/DayWord';
import { NextPage } from 'next';
import React from 'react';

const DayWordPage: NextPage = () => {
  return (
    <MainLayout>
      <DayWord />
    </MainLayout>
  );
};

export default DayWordPage;
