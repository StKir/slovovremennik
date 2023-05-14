import MainLayout from '@/components/layout/MainLayout';
import AllWords from '@/components/screens/allWords/AllWords';
import { NextPage } from 'next';
import React from 'react';

const AllWordsPage: NextPage = () => {
	return (
		<MainLayout>
			<AllWords />
		</MainLayout>
	);
};

export default AllWordsPage;
