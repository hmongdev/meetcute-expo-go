import { useSignIn } from '@clerk/clerk-expo';
import { EmailCodeFactor, SignInFirstFactor } from '@clerk/types';
import { Stack, useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	Button,
	KeyboardAvoidingView,
	Pressable,
	SafeAreaView,
	TextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Verification from './verification';

const LoginModal = () => {
	// hooks
	const { isLoaded, signIn, setActive } = useSignIn();
	const [emailAddress, setEmailAddress] = useState('');
	const [loading, setLoading] = useState(false); // spinner
	const [verifying, setVerifying] = useState(false); // codeVerifying
	const [code, setCode] = useState('');
	const [error, setError] = useState(false);
	const router = useRouter();
	const navigation = useNavigation();

	// functions
	const handleRouter = () => {
		router.replace('/register');
	};

	// authenticate login
	const handleLogIn = async () => {
		// if Clerk and useSignIn() are NOT loaded, exit immediately
		if (!isLoaded && !signIn) return null;

		// loading is TRUE while attempting to sign the user in
		setLoading(true);

		//! SIGN IN LOGIC
		try {
			// Start the Sign Up process using the email method
			const { supportedFirstFactors } = await signIn.create({
				identifier: emailAddress,
			});

			// Filter the returned array to find the 'email_code' entry
			const isEmailCodeFactor = (
				factor: SignInFirstFactor
			): factor is EmailCodeFactor => {
				return factor.strategy === 'email_code';
			};

			const emailCodeFactor =
				supportedFirstFactors?.find(isEmailCodeFactor);

			if (emailCodeFactor) {
				// Grab the emailAddressId
				const { emailAddressId } = emailCodeFactor;

				// Send the OTP code to the user via EMAIL
				await signIn.prepareFirstFactor({
					strategy: 'email_code',
					emailAddressId,
				});

				// Set 'verifying' true to display second form and capture the OTP code
				setVerifying(true);
				setLoading(false);
			}
		} catch (error: any) {
			alert(error.errors[0].message);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	// verify the email address
	const handleVerification = async () => {
		// if Clerk or useSignUp hook is not loaded, exit immediately
		if (!isLoaded && !signIn) return null;

		setLoading(true);
		// Use the code provided by the user and attempt verification
		try {
			const completeSignIn = await signIn.attemptFirstFactor({
				strategy: 'email_code',
				code,
			});

			// If verification was completed, create a session for the user
			if (completeSignIn.status === 'complete') {
				await setActive({
					session: completeSignIn.createdSessionId,
				});

				// redirect user
				router.replace('/home');
			}
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
			setError(false);
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding">
			<SafeAreaView className="h-full flex justify-center items-center bg-stone-800">
				<Stack.Screen
					options={{
						headerBackVisible: !verifying,
					}}
				/>
				<Spinner visible={loading} />

				{!verifying ? (
					<SafeAreaView className="w-full flex justify-center items-center">
						<Pressable className="my-2 w-4/5 rounded-2xl p-[2%] bg-stone-700">
							<TextInput
								autoCapitalize="none"
								placeholder="Email Address"
								placeholderTextColor="white"
								value={
									emailAddress
								}
								onChangeText={
									setEmailAddress
								}
								className="text-lg text-center h-10 text-white"
							/>
						</Pressable>
						<Pressable className="my-2 w-4/5 rounded-full p-[2%] bg-stone-500">
							<Button
								onPress={
									handleLogIn
								}
								title="Log In"
								color="white"
							/>
						</Pressable>
						{error && (
							<Pressable className="my-2 w-4/5 rounded-full p-[2%] bg-sky-500">
								<Button
									onPress={
										handleRouter
									}
									title="Create Account?"
									color="white"
								/>
							</Pressable>
						)}
					</SafeAreaView>
				) : (
					<Verification
						code={code}
						setCode={setCode}
						handleVerification={
							handleVerification
						}
					/>
				)}
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default LoginModal;
