import MainLayout from '@/components/layout/MainLayout';
import Profile from '@/components/screens/profile/Profile';
import { NextPage } from 'next';
import React from 'react';

const ProfilePage: NextPage = () => {
	return (
		<MainLayout>
			<Profile />
		</MainLayout>
	);
};

export default ProfilePage;
