import MainLayout from '@/components/layout/MainLayout';
import AddNewWord from '@/components/screens/addNewWord/AddNewWord';
import { NextPage } from 'next';
import React from 'react';

const AddWordPage: NextPage = () => {
	return (
		<MainLayout>
			<AddNewWord />
		</MainLayout>
	);
};

export default AddWordPage;
