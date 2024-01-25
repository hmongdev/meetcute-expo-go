import { Stack } from 'expo-router';
import React from 'react';

const PublicLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: 'black',
				},
				headerTintColor: 'white',
				headerBackTitle: 'Back',
				// headerShown: false,
			}}
			initialRouteName="landing">
			<Stack.Screen
				name="landing"
				options={{
					headerTitle: 'Landing',
				}}
			/>
			<Stack.Screen
				name="login"
				options={{
					headerTitle: 'Login',
					presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					headerTitle: 'Register',
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default PublicLayout;
