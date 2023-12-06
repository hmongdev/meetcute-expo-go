import React from 'react';
import { Button, Pressable, SafeAreaView, Text, TextInput } from 'react-native';

type VerificationProps = {
	code: string;
	setCode: (text: string) => void;
	handleVerification: () => void;
};

const Verification = ({
	code,
	setCode,
	handleVerification,
}: VerificationProps) => {
	return (
		<SafeAreaView className="w-full flex justify-center items-center">
			<Text className="text-white text-3xl w-4/5 text-center my-5">
				Check your email for the code we sent you
			</Text>
			<Pressable className="my-2 w-4/5 rounded-2xl p-[2%] bg-stone-500">
				<TextInput
					value={code}
					placeholder="Your email code goes here..."
					placeholderTextColor="lightgray"
					className="text-lg text-center h-10 text-white"
					onChangeText={(text) => setCode(text)}
				/>
			</Pressable>
			<Pressable className="my-2 w-4/5 rounded-full p-[2%] bg-stone-700">
				<Button
					onPress={handleVerification}
					title="Verify Code"
					color="white"
				/>
			</Pressable>
		</SafeAreaView>
	);
};

export default Verification;
