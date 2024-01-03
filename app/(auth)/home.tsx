import LottieView from 'lottie-react-native';
import * as React from 'react';
import { Platform, SafeAreaView, ScrollView, Text } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const Home = () => {
	const animationRef = React.useRef<Lottie>(null);

	return (
		<SafeAreaView className="h-full flex justify-center items-center">
			<ScrollView
				contentContainerStyle={{
					// backgroundColor: 'black',
					paddingHorizontal: 10,
					paddingTop: Platform.select({
						android: 30,
					}),
				}}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => {
							animationRef.current.play();
						}}
						tintColor={'transparent'}
					/>
				}>
				<LottieView
					ref={animationRef}
					source={require('../../assets/animations/heart.json')}
					loop={false}
					autoPlay
					style={{
						width: 90,
						height: 90,
						alignSelf: 'center',
					}}
				/>
				<Text className="text-center">Home Tab</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
