import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';

import { theme } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/pages/SignIn';
import { AuthProvider } from './src/hooks/useAuth';

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

	return (
		<NativeBaseProvider theme={theme}>
			<AuthProvider>
				<StatusBar
					barStyle='light-content'
					backgroundColor='transparent'
					translucent
				/>

				{!fontsLoaded ? (
					<Loading />
				) : (
					<SignIn />
				)}
			</AuthProvider>
		</NativeBaseProvider>
	);
}
