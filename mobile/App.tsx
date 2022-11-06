import React from 'react';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import Routes from './src/routes';
import { theme } from './src/styles/theme';
import { AuthProvider } from './src/hooks/useAuth';
import { Loading } from './src/components/Loading';

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
					<Routes />
				)}
			</AuthProvider>
		</NativeBaseProvider>
	);
}
