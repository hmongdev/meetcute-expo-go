import { useSignUp } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Button,
	KeyboardAvoidingView,
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Verification from './verification';

const RegisterModal = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [verifying, setVerifying] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [code, setCode] = useState('');
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	// Create the user and send the verification email
	const handleCreateAccount = async () => {
		if (!isLoaded && !signUp) return null;

		// loading TRUE while attempting to sign the user up
		setLoading(true);

		try {
			//! Start the Sign Up process using the email address method
			// required
			await signUp.create({
				firstName,
				lastName,
				emailAddress,
			});

			//! Start verification code via emailAddress => OTP to email
			await signUp.prepareEmailAddressVerification();

			//! Set 'verifying' true to display the OTP form, and request the code
			setVerifying(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	// Verify the email address
	const handleVerification = async () => {
		// if Clerk or useSignUp hook is not loaded, exit immediately
		if (!isLoaded && !signUp) return null;

		setLoading(true);
		// Use the code provided by the user and attempt verification
		try {
			const completeSignUp =
				await signUp.attemptEmailAddressVerification({
					code,
				});

			// If verification was completed, create a session for the user
			if (completeSignUp.status === 'complete') {
				await setActive({
					session: completeSignUp.createdSessionId,
				});

				// redirect user
				router.replace('/home');
			}
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			className="h-full flex justify-center items-center bg-stone-800">
			<Stack.Screen
				options={{
					headerBackVisible: !verifying,
				}}
			/>
			<Spinner visible={loading} />

			{!verifying ? (
				<View className="w-full flex justify-center items-center">
					<Text className="text-white text-3xl w-4/5 text-center my-5">
						Create an account
					</Text>
					<Pressable className="my-2 w-4/5 rounded-2xl p-[2%] bg-stone-500">
						<TextInput
							autoCapitalize="words"
							placeholder="First (Preferred) Name*"
							placeholderTextColor="lightgray"
							value={firstName}
							onChangeText={
								setFirstName
							}
							className="text-white text-lg text-center h-10"
						/>
					</Pressable>
					<Pressable className="my-2 w-4/5 rounded-2xl p-[2%] bg-stone-500">
						<TextInput
							autoCapitalize="words"
							placeholder="Last Name*"
							placeholderTextColor="lightgray"
							value={lastName}
							onChangeText={
								setLastName
							}
							className="text-white text-lg text-center h-10"
						/>
					</Pressable>
					<Pressable className="my-2 w-4/5 rounded-2xl p-[2%] bg-stone-500">
						<TextInput
							autoCapitalize="none"
							placeholder="Email Address*"
							placeholderTextColor="lightgray"
							value={emailAddress}
							onChangeText={
								setEmailAddress
							}
							className="text-white text-lg text-center h-10"
						/>
					</Pressable>
					<Pressable className="my-2 w-4/5 rounded-full p-[2%] bg-stone-700">
						<Button
							onPress={
								handleCreateAccount
							}
							title="Create Account"
							color="white"
						/>
					</Pressable>
				</View>
			) : (
				<Verification
					code={code}
					setCode={setCode}
					handleVerification={handleVerification}
				/>
			)}
		</KeyboardAvoidingView>
	);
};

export default RegisterModal;
