import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

const Home = () => {
	return (
		<SafeAreaView className="flex h-full justify-center items-center">
			<ScrollView>
				<LottieView
					source={require('../../assets/animations/heart.json')}
					loop={true}
					autoPlay
					style={{
						width: 90,
						height: 90,
						alignSelf: 'center',
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
