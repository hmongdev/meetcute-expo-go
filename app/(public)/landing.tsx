import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Landing = () => {
	const [loading, setLoading] = useState(false);

	return (
		<SafeAreaView className="flex h-full justify-end items-center bg-black">
			<Spinner visible={loading} />
			<View className="w-full flex justify-center items-center">
				<Pressable className="my-2 w-4/5 rounded-full p-[3.5%] bg-stone-700">
					<Link href="/register" asChild>
						<Text className="text-lg text-center text-white">
							Create Account
						</Text>
					</Link>
				</Pressable>
				<Pressable className="my-2 w-4/5 rounded-full p-[3.5%] bg-stone-700">
					<Link href="/login" asChild>
						<Text className="text-lg text-center text-white">
							Log In
						</Text>
					</Link>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Landing;
