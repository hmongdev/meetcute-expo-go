import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const CLERK_PUBLISHABLE_KEY =
	'pk_test_ZHJpdmluZy1jcmFuZS02MS5jbGVyay5hY2NvdW50cy5kZXYk';

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	// use segments + router to check where we are
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const authFolder = segments[0] === '(auth)';

		console.log('User changed: ', isSignedIn);

		if (isSignedIn && !authFolder) {
			router.replace('/home');
		} else if (!isSignedIn) {
			router.replace('/landing');
		}
	}, [isSignedIn]);

	return <Slot />;
};
// store the token session => automatically log in
const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};

const RootLayout = () => {
	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}>
			<InitialLayout />
		</ClerkProvider>
	);
};

export default RootLayout;
