import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
	const { user } = useUser();

	return (
		<View className="flex h-full justify-center items-center">
			<Text className="text-xl">
				Welcome, {user?.emailAddresses[0].emailAddress}
				🎉
			</Text>
		</View>
	);
};

export default Home;
