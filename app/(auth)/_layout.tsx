import { useAuth } from '@clerk/clerk-expo';
import { Foundation, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons
				name="log-out-outline"
				size={30}
				color={'#fff'}
			/>
		</Pressable>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}>
			<Tabs.Screen
				name="home"
				options={{
					headerTitle: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Foundation
							name="home"
							size={size}
							color={color}
						/>
					),
					tabBarLabel: 'Home',
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerTitle: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="person-outline"
							size={size}
							color={color}
						/>
					),
					tabBarLabel: 'Profile',
					headerRight: () => <LogoutButton />,
				}}
				redirect={!isSignedIn}
			/>
		</Tabs>
	);
};

export default TabsPage;
