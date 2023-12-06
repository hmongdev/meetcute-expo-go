import { ActivityIndicator, SafeAreaView } from 'react-native';

const StartPage = () => {
	return (
		<SafeAreaView className="h-full flex justify-center items-center bg-stone-800">
			<ActivityIndicator size="large" color="#0000ff" />
		</SafeAreaView>
	);
};

export default StartPage;
