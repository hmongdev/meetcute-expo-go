import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// types
type TabBarIconProps = {
	color: string;
	size: number;
	focused: string;
};

type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

type TabName = 'Home' | 'Search' | 'Create' | 'Chat' | 'Profile';

const BottomTabsNavigator = () => {
	const { isSignedIn } = useAuth();

	return (
		<Tabs
			screenOptions={() => ({
				tabBarIcon: ({
					color,
					size,
					focused,
				}: TabBarIconProps) => {
					// dictionary
					const iconMap: Record<
						TabName,
						Record<'u' | 'f', IonIconName>
					> = {
						Home: {
							u: 'home-outline',
							f: 'home-sharp',
						},
						Search: {
							u: 'search-outline',
							f: 'search',
						},
						Create: {
							u: 'add-circle-outline',
							f: 'add-circle',
						},
						Chat: {
							u: 'chatbubbles-outline',
							f: 'chatbubbles',
						},
						Profile: {
							u: 'person-outline',
							f: 'person',
						},
					};
				},
			})}>
			<Tabs.Screen
				options={{
					tabBarIcon: ({
						color,
						size,
						focused,
					}) => (
						<Ionicons
							name={focused}
							size={size}
							color={color}
						/>
					),
				}}
				redirect={!isSignedIn}
			/>
		</Tabs>
	);
};

export default BottomTabsNavigator;
