import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Platform, SafeAreaView, ScrollView, Text } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const Home = () => {
	const animationRef = useRef<LottieView>(null);

	return (
		<SafeAreaView className="h-full flex justify-center items-center">
			<ScrollView
				contentContainerStyle={{
					// backgroundColor: 'black',
					paddingHorizontal: 10,
					paddingTop:
						Platform.OS === 'android'
							? 30
							: 0,
				}}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => {
							if (
								animationRef.current
							) {
								animationRef.current.play();
							}
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
