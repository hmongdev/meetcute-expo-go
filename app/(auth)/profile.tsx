import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput } from 'react-native';

const profile = () => {
	const { user } = useUser();
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);

	const onSaveUser = async () => {
		try {
			// This is not working!
			const result = await user?.update({
				firstName: 'John',
				lastName: 'Doe',
			});
			console.log(
				'🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:',
				result
			);
		} catch (e) {
			console.log(
				'🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e',
				JSON.stringify(e)
			);
		}
	};

	return (
		<SafeAreaView className="h-full flex justify-center items-center bg-stone-800">
			<Text className="text-lg text-center h-10 text-white">
				Good morning {user?.firstName} {user?.lastName}!
			</Text>

			<TextInput
				placeholder="First Name"
				value={firstName}
				onChangeText={setFirstName}
				className="text-lg text-center h-10 text-white"
			/>
			<TextInput
				placeholder="Last Name"
				value={lastName}
				onChangeText={setLastName}
				className="text-lg text-center h-10 text-white"
			/>
			<Button
				onPress={onSaveUser}
				title="Update account"
				color={'#6c47ff'}
			/>
		</SafeAreaView>
	);
};

export default profile;
