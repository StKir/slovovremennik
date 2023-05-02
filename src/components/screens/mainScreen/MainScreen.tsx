import Link from 'next/link';
import React from 'react';

const MainScreen = () => {
	return (
		<div>
			Main
			<Link href={'/'}>Main</Link>
			<Link href={'/all-words'}>All</Link>
			<Link href={'/day-word'}>Word of the day</Link>
		</div>
	);
};

export default MainScreen;
