// icons
import { Foundation, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// types
// interface TabBarIconProps {
// 	focused: boolean;
// 	iconName: string;
// 	size: number;
// 	color: 'string';
// }

//? TO DO:
//? 1. Create a focus state that alters (size, icon)
//? 2. Refactor code that renders only one Tabs.Screen

const BottomTabs = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveBackgroundColor: 'black',
				tabBarActiveTintColor: 'white',
				tabBarInactiveBackgroundColor: 'black',
				tabBarShowLabel: false,
			}}>
			<Tabs.Screen
				name="home"
				options={{
					tabBarIcon: () => (
						<Foundation
							name="home"
							size={27}
							color="gray"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					tabBarIcon: () => (
						<Ionicons
							name="people-circle-outline"
							size={27}
							color="gray"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="post"
				options={{
					tabBarIcon: () => (
						<Ionicons
							name="add-circle-outline"
							size={40}
							color="gray"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					tabBarIcon: () => (
						<Ionicons
							name="ios-chatbubbles-outline"
							size={27}
							color="gray"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: () => (
						<Ionicons
							name="person-outline"
							size={27}
							color="gray"
						/>
					),
				}}
			/>
		</Tabs>
	);
	// return (
	// 	<Tabs
	// 		screenOptions={({ route }) => ({
	// 			tabBarIcon: ({
	// 				color,
	// 				size,
	// 				focused,
	// 			}: TabBarIconProps) => {
	// 				// type alias IconProps to extract 'name' from Ionicons component
	// 				type IconProps = ComponentProps<
	// 					typeof Ionicons
	// 				>['name'];
	// 				// variable iconName with type `IconProps` or `undefined`
	// 				let iconName: IconProps;
	// 				// iconMap dictionary, maps route names to icon names for focused states (f and u)
	// 				const iconMap: Record<
	// 					string,
	// 					Record<'u' | 'f', IconProps>
	// 				> = {
	// 					Home: {
	// 						u: 'home-outline',
	// 						f: 'home',
	// 					},
	// 					Search: {
	// 						u: 'search-outline',
	// 						f: 'search',
	// 					},
	// 					Post: {
	// 						u: 'add',
	// 						f: 'add-circle',
	// 					},
	// 					Chat: {
	// 						u: 'chatbubbles-outline',
	// 						f: 'chatbubbles-sharp',
	// 					},
	// 					Profile: {
	// 						u: 'person-circle-outline',
	// 						f: 'person-circle',
	// 					},
	// 				};
	// 				// assigning route name to use in iconName
	// 				const routeName = route.name as string;

	// 				// assigning iconName based on route and focus state
	// 				iconName = focused
	// 					? iconMap[routeName]?.f
	// 					: iconMap[routeName]?.u;

	// 				return (
	// 					<Ionicons
	// 						focused={focused}
	// 						name={iconName}
	// 						size={size}
	// 						color={color}
	// 					/>
	// 				);
	// 			},
	// 		})}
	// 	/>
	// );
};

export default BottomTabs;
